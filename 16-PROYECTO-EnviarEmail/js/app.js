const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventsListener();
function eventsListener() {
	// cuando la app carga
	document.addEventListener('DOMContentLoaded', iniciarApp);

	// campos del formulario
	email.addEventListener('blur', validadFormulario);
	asunto.addEventListener('blur', validadFormulario);
	mensaje.addEventListener('blur', validadFormulario);

	// reinicia el formulario
	btnReset.addEventListener('click', resetFormulario);
	// Enviar email
	btnEnviar.addEventListener('click', enviarEmail);
}

// funiones

function iniciarApp() {
	btnEnviar.disabled = true;
	btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// valida el formulario
function validadFormulario(e) {
	// console.log(e.target.type);
	if (e.target.value.length > 0) {
		// eliminar error
		const error = document.querySelector('.error');
		if (error) {
			error.remove();
		}

		e.target.classList.remove('border', 'border-red-500');
		e.target.classList.add('border', 'border-green-500');
	} else {
		// e.target.style.borderBottomColor = 'red';
		e.target.classList.remove('border', 'border-green-500');
		e.target.classList.add('border', 'border-red-500');

		mostrarError('Todos los campos son obligatorios');
	}
	if (e.target.type === 'email') {
		if (er.test(e.target.value)) {
			// console.log('Si es valido el email');
			const error = document.querySelector('.error');
			if (error) {
				error.remove();
			}

			e.target.classList.remove('border', 'border-red-500');
			e.target.classList.add('border', 'border-green-500');
		} else {
			e.target.classList.remove('border', 'border-green-500');
			e.target.classList.add('border', 'border-red-500');
			mostrarError('El email no es valido');
		}
		/**
		const resultado = e.target.value.indexOf('@');
		// console.log(resultado);
		if (resultado < 0) {
			mostrarError('El email no es valido');
		}
     */
	}
	if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
		// console.log('Validacion correcta');

		btnEnviar.disabled = false;
		btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
	} else {
		iniciarApp();
	}
}

function mostrarError(mensaje) {
	const mensajeError = document.createElement('p');
	mensajeError.textContent = mensaje;
	mensajeError.classList.add(
		'border',
		'border-red-500',
		'background-red-100',
		'text-red-500',
		'p-3',
		'mt-5',
		'text-center',
		'error'
	);
	const errores = document.querySelectorAll('.error');
	if (errores.length === 0) {
		formulario.appendChild(mensajeError);
		// formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
	}
}

// enviar el email
function enviarEmail(e) {
	e.preventDefault();
	// mostrar spinner
	const spinner = document.querySelector('#spinner');
	spinner.style.display = 'flex';

	// despues de 3 segundos ocultar spinner y mostrar el mensaje
	setTimeout(() => {
		spinner.style.display = 'none';
		// mensaje que dice que se envio correctamente
		const parrafo = document.createElement('p');
		parrafo.textContent = 'EL mensaje se envió correctamente';
		parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
		// inserta el parrafo antes del spinner
		formulario.insertBefore(parrafo, spinner);
		setTimeout(() => {
			parrafo.remove();
			resetFormulario();
		}, 5000);
	}, 3000);
}

// funcion que resetea el formulario
function resetFormulario() {
	formulario.reset();
	iniciarApp();
}
