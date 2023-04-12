class Centro {
	constructor(nombre, direccion) {
		this.nombre = nombre;
		this.direccion = direccion;
	}
}

class Sala extends Centro {
	constructor(nombre, direccion, planta, puerta) {
		super(nombre, direccion);
		this.planta = planta;
		this.puerta = puerta;
	}

	static addSala() {
		let nombre = prompt("Introduce el nombre de la sala:")
		let direccion = prompt("Introduce la dirección de la sala:")
		let planta = prompt("Introduce la planta de la sala:")
		let puerta = prompt("Introduce la puerta de la sala:")
		return new Sala(nombre, direccion, planta, puerta)
	}
}

class Medico {
	constructor(nombre, apellidos, licencia) {
		this.id;
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.licencia = licencia;
	}

	static addMedico() {
		let nombre = prompt("Introduce el nombre del médico:")
		let apellidos = prompt("Introduce los apellidos del médico:")
		let licencia = prompt("Introduce la licencia del médico:")
		return new Medico(nombre, apellidos, licencia)
	}
}

class Cita {
	constructor(usuario, medico, sala, fecha) {
		this.id;
		this.usuario = usuario;
		this.medico = medico;
		this.sala = sala;
		this.fecha = fecha;
	}

	addCita() {
		let usuario = Usuario.addUsuario()
		let medico = Medico.addMedico()
		let sala = Sala.addSala()
		//Date fecha = prompt("Introduce la fecha del usuario:")
		listaCitas.push(new Cita(usuario, medico, sala))
	}

	borrarCita() {
		
	}

	listarCitas() {
		for (let i = 0; i < listaCitas.length; i++) {
			if (listaCitas[i].usuario.dni == document.getElementsByName('usuario')[0].value)
				console.log(listaCitas[i].usario.nombre)
		}
	}
}
