const hbs = require('hbs');
const funciones = require('../funciones');

const fs = require('fs');
listaCursos = [];

hbs.registerHelper('registrar_curso', (curso) => {

 if (!encontrarCurso(curso.id)) {
        addnuevo();
        listaCursos.push(curso);
        saveJson();
        mensaje  = {
            men: 'Curso registrado con éxito',
        }
     return "<h1>ok</h1>";

    }

    return false;

});


hbs.registerHelper('isactivo', (estado) => {
   if(estado == 1){
       return true;
   }
   return false;
});

hbs.registerHelper('listadoCursos', () => {
    text = `<table class="table m-5">
        <thead class="thead-dark">
        <tr>
            <th scope="col">#</th>
            <th scope="col">Curso</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Valor</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>`;

    return text;
});

const saveJson = () => {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('listaCursos.json', datos, (err) => {
        if (err) throw (err);
        return 'curso creado con éxito';
    });
}

const addnuevo = () => {
    try {
        listaCursos = require('../listaCursosold');
    } catch (e) {
        listaCursos = [];
    }
}

const encontrarCurso = (id) => {
    addnuevo();
    return listaCursos.find(cursos => cursos.id == id);
}

