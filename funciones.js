const fs = require('fs');

listaCursos = [];

let crearCurso = (curso) => {
  if (!encontrarCurso(curso.id)) {
        addnuevo();
        listaCursos.push(curso);
        saveJson();
        return true
    } else {
        return false;
    }

}

const saveJson = () => {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('listaCursos.json', datos, (err) => {
        if (err) throw (err);
        return 'curso creado con éxito';
    });
}

const addnuevo = () => {
    try {
        listaCursos = require('./listaCursos');
    } catch (e) {
        listaCursos = [];
    }
}

const encontrarCurso = (id) => {
    addnuevo();
    return listaCursos.find(cursos => cursos.id == id);
}

const listarCursos = () => {
    let cursosDispinobles = [];
    addnuevo();
    for (let curso in listaCursos) {

            cursosDispinobles.push(listaCursos[curso]);

    }
    return (cursosDispinobles .length > 0) ? cursosDispinobles : "No hay cursos disponibles";

}

const editarCurso = (id, estado) => {

        let encotrado = encontrarCurso(id);
        if (encotrado) {
            encotrado.estado = estado;
            saveJson();
            return "Estado editado correctamente"
        } else {
            return 'Curso con el id ' + id + ' no existe';
        }


}


const eliminarCurso = (id) => {
    addnuevo();
    let datos = listaCursos.filter(cursos => cursos.id != id);

    if (datos.length == listaCursos.length) {
        return "curso no existe"
    } else {
        listaCursos = datos;
        saveJson();
        return "Curso eliminado con éxito";
    }
}

module.exports = {
    crearCurso,
    listarCursos,
    encontrarCurso,
    editarCurso,
    eliminarCurso
}
