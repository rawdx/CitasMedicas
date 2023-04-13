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
}

class Medico {
	constructor(nombre, apellidos, licencia) {
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.licencia = licencia;
	}
}

class Cita {
	constructor(centro, sala, medico, fecha) {
		//Cada vez que se crea un objeto el id aumenta en 1
		this.id = (Cita.lastId = ++Cita.lastId || 1);
		this.centro = centro;
		this.sala = sala;
		this.medico = medico;
		this.fecha = fecha;
	}
}


var listaMedicos = [];
var listaCentros = [];
var listaCitas = []

//Obtención de las cookies
var cookieArray = document.cookie.split("; ")


function inicio() {
	//Presentación de cada valor de las cookies
	document.getElementById('textoUsuario').innerHTML = "Hola " + cookieArray[0].split("=")[1] + " " + cookieArray[1].split("=")[1] + "<br>Para reservar una cita rellene el siguiente formulario:"

	//(Valores ficticios, para que parezca una app real)
	let nombres = ["Lucía", "Juan", "Ana", "Pedro", "María", "Luis", "Carmen", "Pablo", "Marta", "José"];
	let apellidos = ["García", "Martínez", "Fernández", "González", "Rodríguez", "López", "Sánchez", "Pérez", "Gómez", "Navarro"];
	let licencias = ["LM12345", "LM67890", "LM24680", "LM13579", "LM98765", "LM54321", "LM36912", "LM78013", "LM24068", "LM97531"];

	let nombresCentros = ["Hospital San Juan", "Clínica Los Olivos", "Centro Médico Ciudad Real", "Clínica San Rafael", "Hospital General de la Montaña", "Centro Médico El Bosque", "Hospital Santa Lucía", "Clínica de la Costa", "Centro Médico San Francisco", "Hospital Virgen del Mar"];
	let direcciones = ["Calle San Juan, 25", "Avenida de los Olivos, 10", "Calle Mayor, 15", "Calle San Rafael, 8", "Carretera de la Montaña, km 5", "Calle El Bosque, 20", "Avenida Santa Lucía, 3", "Calle de la Costa, 12", "Calle San Francisco, 45", "Calle Virgen del Mar, 7"];
	//const plantasSalas = [1, 2, 3, 4];
	//const puertasSalas = ["A", "B", "C", "D"];

	//Generación de objetos de médicos y de centros aleatorios
	for (let i = 0; i < 5; i++) {
		let nombreRandom = nombres[Math.floor(Math.random() * nombres.length)];
		let apellidoRandom = apellidos[Math.floor(Math.random() * apellidos.length)];
		let licenciaRandom = licencias[Math.floor(Math.random() * licencias.length)];

		let nombreCentroRandom = nombresCentros[Math.floor(Math.random() * nombresCentros.length)];
		let direccionRandom = direcciones[Math.floor(Math.random() * direcciones.length)];


		let medico = new Medico(nombreRandom, apellidoRandom, licenciaRandom);
		let centro = new Centro(nombreCentroRandom, direccionRandom);

		//Se comprueba que no se repita una licencia
		if (!listaMedicos.some(m => m.licencia === medico.licencia))
			listaMedicos.push(medico);

		//Se comprueba que no se repita un centro
		if (!listaCentros.some(c => c.nombre === centro.nombre) && !listaCentros.some(c => c.direccion === centro.direccion))
			listaCentros.push(centro);
	}

	console.log(listaMedicos)
	console.log(listaCentros)


	//Crear select option con la lista de centros
	let select = document.getElementById('selectCentros');

	listaCentros.forEach((centro) => {
		let option = document.createElement('option');
		option.value = centro.nombre + ", " + centro.direccion;
		option.text = centro.nombre + ", " + centro.direccion;
		select.appendChild(option);
	});


	//Creación de un mínimo de tres días y máximo de dos semanas para el input date
	let now = new Date()
	let minimo = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
	let maximo = new Date(now.getTime() + (14 * 24 * 60 * 60 * 1000));

	document.getElementById("fecha").min = minimo.toISOString().split('T')[0];
	document.getElementById("fecha").max = maximo.toISOString().split('T')[0];
}


function crearCita(form) {
	let centro = form.selectCentros.options[document.getElementById("selectCentros").selectedIndex].value

	//Crear una sala aleatoria con el formato "1A"
	let plantas = [1, 2, 3, 4]
	let puertas = ['A', 'B', 'C', 'D']
	let sala = plantas[Math.floor(Math.random() * plantas.length)] + puertas[Math.floor(Math.random() * puertas.length)]

	let medico = listaMedicos[Math.floor(Math.random() * listaMedicos.length)]

	let fecha = new Date(form.fecha.value)
	//Establecer valores aleatorios de una hora
	fecha.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);

	//Verificar que la fecha se haya introducido para crear la lista y que no se creen demasiadas citas, si no dara mensaje de error
	if (!isNaN(fecha) && listaCitas.length < 3) {
		listaCitas.push(new Cita(centro, sala, medico, fecha))
		document.getElementById('info').innerHTML = "La cita se ha creado exitosamente."
	}
	else
		if (isNaN(fecha))
			document.getElementById('info').innerHTML = '[Error] Introduce una fecha para crear la cita.'
		else
			document.getElementById('info').innerHTML = "[Error] Has superado el numero de citas permitido."
}


function listarCitas() {
	//Variable que contendrá el bloque de citas
	let stringCitas = ""
	for (let i = 0; i < listaCitas.length; i++) {
		//Variables con todos los datos de cada objeto cita de la lista, incluyendo además el usuario
		let cita = "<b>Cita " + listaCitas[i].id + ":</b><br>" + cookieArray[1].split("=")[1] + ", " + cookieArray[0].split("=")[1] + "<br>" +
			cookieArray[2].split("=")[1] + "<br>" + listaCitas[i].centro + "<br>" + listaCitas[i].medico.apellidos + ", " + listaCitas[i].medico.nombre +
			"<br>Consulta " + listaCitas[i].sala + "<br>Día: <b>" + listaCitas[i].fecha.getDate() + "/" + (listaCitas[i].fecha.getMonth() + 1) + "/" + listaCitas[i].fecha.getFullYear() +
			"</b><br>Hora: <b>" + listaCitas[i].fecha.getHours().toString().padStart(2, '0') + ":" + listaCitas[i].fecha.getMinutes().toString().padStart(2, '0') + "</b><br><br>";

		//Se añaden todas las citas para añadirlas a un elemento html
		stringCitas += cita
	}
	document.getElementById('citas').innerHTML = stringCitas
}

function borrarCita(form) {
	//Si el valor no se pone vacio, se recorre la lista buscando la posición a borrar viendo que el valor introducido coincida con algún id de una cita
	if (form.idBorrar.value != "")
		for (let i = 0; i < listaCitas.length; i++)
			if (form.idBorrar.value == listaCitas[i].id)
				listaCitas.splice(i, 1)
}
