var listaUsuarios = [];

class Usuario {
	constructor(nombre, apellidos, dni) {
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.dni = dni;
	}
}

function registrar(form) {
	let nombre = form.nombre.value
	let apellidos = form.apellidos.value
	let dni = form.dniRegistro.value
	listaUsuarios.push(new Usuario(nombre, apellidos, dni))
}

function inicioSesion(form) {
	if (listaUsuarios.some(usuario => usuario.dni === form.dniLogin.value)) {
		window.location.href = 'home.html'
	} else {
		document.getElementById('error').innerHTML = '[Error] No se ha podido encontrar el usuario'
	}
}