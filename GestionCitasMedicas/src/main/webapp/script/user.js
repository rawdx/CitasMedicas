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

	if (nombre != "" && apellidos != "" && dni != "")
		listaUsuarios.push(new Usuario(nombre, apellidos, dni))
}

function inicioSesion(form) {
	for (let i = 0; i < listaUsuarios.length; i++) {
		if (listaUsuarios[i].dni === form.dniLogin.value) {
			document.cookie = "nombre=" + listaUsuarios[i].nombre
			document.cookie = "apellidos=" + listaUsuarios[i].apellidos
			document.cookie = "dni=" + listaUsuarios[i].dni
			break;
		}
	}
	if (listaUsuarios.some(usuario => usuario.dni === form.dniLogin.value)) {
		window.location.href = 'home.html'
	} else {
		document.getElementById('error').innerHTML = '[Error] No se ha podido encontrar el usuario'
	}
}

