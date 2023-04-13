function prueba() {
	document.getElementById('textoUsuario').innerHTML = document.cookie


	const nombres = ["Carlos", "Ana", "Miguel", "Lucía", "Pedro", "María", "Jorge", "Isabel"];
	const apellidos = ["González", "Pérez", "García", "López", "Hernández", "Martínez", "Sánchez", "Fernández"];
	const licencias = ["12345A", "67890B", "54321C", "09876D", "13579E", "24680F", "97531G", "86420H"];

	const nombresCentros = ["Hospital Universitario", "Clínica San Francisco", "Hospital de la Luz", "Hospital Quirón", "Hospital La Paz", "Hospital 12 de Octubre"];
	const direccionesCentros = ["Calle Mayor", "Plaza del Sol", "Avenida de la Libertad", "Callejón Sin Salida"];
	//const plantasSalas = [1, 2, 3, 4];
	//const puertasSalas = ["A", "B", "C", "D"];

	const listaMedicos = [];
	const listaCentros = [];


	for (let i = 0; i < 10; i++) {
		const nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
		const apellidoAleatorio = apellidos[Math.floor(Math.random() * apellidos.length)];
		const licenciaAleatoria = licencias[Math.floor(Math.random() * licencias.length)];

		const medico = new Medico(nombreAleatorio, apellidoAleatorio, licenciaAleatoria);

		listaMedicos.push(medico);

		const nombreCentrosAleatorio = nombresSalas[Math.floor(Math.random() * nombresCentros.length)];
		const direccionAleatoria = direccionesSalas[Math.floor(Math.random() * direccionesCentros.length)];
		//const plantaAleatoria = plantasSalas[Math.floor(Math.random() * plantasSalas.length)];
		//const puertaAleatoria = puertasSalas[Math.floor(Math.random() * puertasSalas.length)];

		const centro = new Centro(nombreCentrosAleatorio, direccionAleatoria);
		//const sala = new Sala(nombreCentrosAleatorio, direccionAleatoria, plantaAleatoria, puertaAleatoria);

		listaCentros.push(centro);
	}

	console.log(listaMedicos);
}

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

}

function crearCita(form) {
	let usuario = Usuario.addUsuario()
	let medico = Medico.addMedico()
	let sala = Sala.addSala()
	//Date fecha = prompt("Introduce la fecha del usuario:")
	listaCitas.push(new Cita(usuario, medico, sala))
}
