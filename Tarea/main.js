// Archivo: main.js

const readline = require('readline');

let elecciones = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mainMenu() {
  console.log("\n📋 Simulador de Votación");
  console.log("1. Crear nueva elección");
  console.log("2. Agregar candidatos");
  console.log("3. Emitir voto");
  console.log("4. Ver resultados");
  console.log("5. Cerrar eleccion")
  console.log("6. Salir\n");
  rl.question("Seleccione una opción: ", (option) => {
    if (option === '1') {
      crearEleccion();
    } else if (option === '2') {
      agregarCandidatos();
    } else if (option === '3') {
      emitirVoto();
    } else if (option === '4') {
      verResultados();
    } else if (option === '5') {
      cerrarEleccion();
    } else if (option === '6') {
      rl.close();
    } else {
      console.log("Opción inválida.");
      mainMenu();
    }
  });
}

function crearEleccion() {
  rl.question("Nombre de la elección: ", (nombre) => {
    elecciones.push({
      nombre: nombre,
      candidatos: [],
      estadoEleccion: 'abierta'
    });
    console.log(`Elección "${nombre}" creada.`);
    mainMenu();
  });
}

function agregarCandidatos() {
  if (elecciones.length === 0) {
    console.log("Primero debe crear una elección.");
    mainMenu();
    return;
  }

  rl.question("Nombre del candidato: ", (nombreCandidato) => {
    const eleccion = elecciones[elecciones.length - 1]; // última elección creada
    eleccion.candidatos.push({ nombre: nombreCandidato, votos: 0 });
    console.log(`Candidato "${nombreCandidato}" agregado a "${eleccion.nombre}".`);
    mainMenu();
  });
}

function emitirVoto() {
  if (elecciones.length === 0) {
    console.log("No hay elecciones disponibles.");
    mainMenu();
    return;
  }

  const eleccion = elecciones[elecciones.length - 1];
  if (eleccion.estadoEleccion !== 'abierta') {
    console.log(`La eleccion "${eleccion.nombre}" no está abierta para votacion.`);
    mainMenu();
    return;
  }

  if (eleccion.candidatos.length === 0) {
    console.log("No hay candidatos en esta elección.");
    mainMenu();
    return;
  }

  console.log(`\nElección: ${eleccion.nombre}`);
  eleccion.candidatos.forEach((c, i) => {
    console.log(`${i + 1}. ${c.nombre}`);
  });

  rl.question("Seleccione el número del candidato: ", (num) => {
    const idx = parseInt(num) - 1;
    if (idx >= 0 && idx < eleccion.candidatos.length) {
      eleccion.candidatos[idx].votos++;
      console.log(`Voto registrado para ${eleccion.candidatos[idx].nombre}`);
    } else {
      console.log("Candidato inválido.");
    }
    mainMenu();
  });
}

function verResultados() {
  if (elecciones.length === 0) {
    console.log("No hay elecciones creadas.");
    mainMenu();
    return;
  }
  const eleccion = elecciones[elecciones.length - 1];
  console.log(`\n📊 Resultados para "${eleccion.nombre}":`);
  eleccion.candidatos.forEach(c => {
    console.log(`- ${c.nombre}: ${c.votos} voto(s)`);
  });
  mainMenu();
  }

  function cerrarEleccion() {
    if (elecciones.length === 0) {
      console.log('No hay elecciones en curso');
      mainMenu();
      return;
    }
    if (!elecciones.find(eleccion => eleccion.estadoEleccion === 'abierta')) {
      console.log('No hay elecciones abiertas para cerrar');
      mainMenu();
      return;
    }
    const eleccionesAbiertas = elecciones.filter(eleccion => eleccion.estadoEleccion === 'abierta');
    console.log('Elecciones abiertas:');
    eleccionesAbiertas.forEach(eleccion => {
      console.log(`${elecciones.indexOf(eleccion)+1}. ${eleccion.nombre}`)
    });
    rl.question('Seleccione el numero de la eleccion que desea cerrar: ', (num => {
      const idx = parseInt(num) - 1;
      if (idx >= 0 && idx < elecciones.length) {
        elecciones[idx].estadoEleccion = 'cerrada';
        console.log(`Eleccion: "${elecciones[idx].nombre}" cerrada.`);
        mainMenu();
      } else {
        console.log('Eleccion invalida');
        mainMenu();
      }
    }))
  }

mainMenu();
