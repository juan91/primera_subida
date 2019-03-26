const fs = require('fs');

listaCursos = [];
listaUsers = [];
let listaRelacion = [];

let crearregistro = (usuario) => {
    if (!encontrarRegistroCurso(usuario.cc,usuario.idcurso)) {
        addnuevo();
        listaUsers.push(usuario);
        saveJson();
        return true
    } else {
        return false;
    }
}

const saveJson = () => {
    let datos = JSON.stringify(listaUsers);
    fs.writeFile('registros.json', datos, (err) => {
        if (err) throw (err);
        return 'usuario creado con éxito';
    });
}

const addnuevo = () => {
    try {
        listaUsers = require('./registros');
    } catch (e) {
        listaUsers = [];
    }
}

const encontrarRegistroCurso = (cc,idc) => {
    addnuevo();
    return listaUsers.find(user => user.cc == cc && user.idcurso == idc);
}

const encontrarRegistro = (cc) => {
    addnuevo();
    return listaUsers.find(user => user.cc == cc);
}

const listarCursosUser = () => {
    listaUsers = [];
    listaCursos = [];
    listaRelacion = [];
    try{
        listaUsers = require('./registros');
    }catch (e) {
        console.log('no hay usuario registrador...');
        listaUsers = [];
    }
    try {
        listaCursos = require('./listaCursos');

        for (let curso in listaCursos) {
            listaRelacion.push(
                {
                    id: listaCursos[curso].id,
                    nombre: listaCursos[curso].nombre,
                    descripcion: listaCursos[curso].descripcion,
                    valor: listaCursos[curso].valor,
                    modalidad: listaCursos[curso].modalidad,
                    intesidad: listaCursos[curso].intesidad,
                    estado: listaCursos[curso].estado,
                    users:[]
                }
            )
          for (let user in listaUsers) {
                if (listaUsers[user].idcurso === listaCursos[curso].id) {
                    listaRelacion[curso].users.push(listaUsers[user]);
                }
            }
        }
        return listaRelacion;
    } catch (e) {
        listaRelacion = [];
    }

}


const editarCurso = (cc, estado) => {
    if (estado === 1 || estado === 0) {
        let encotrado = encontrarRegistro(cc);
        if (encotrado) {
            encotrado.estado = estado;
            saveJson();
            return "Estado editado correctamente"
        } else {
            return 'Curso con el cc ' + cc + ' no existe';
        }
    } else {
        return 'el estado no es correcto';
    }

}

const eliminarUsuairo = (cc,callback) => {
    listaUsers = [];
    try{
        listaUsers = require('./registros');
        let datos = listaUsers.filter(user => user.cc != cc);
        if (datos.length == listaUsers.length) {
            return "usuario no existe"
        } else {
            listaUsers = datos;
            saveJson();
            return "Curso eliminado con éxito";
        }

    }catch (e) {
        console.log('no hay usuario registrador...');
        listaUsers = [];
    }
    callback();
}

module.exports = {
    crearregistro,
    listarCursosUser,
    editarCurso,
    eliminarUsuairo
}
