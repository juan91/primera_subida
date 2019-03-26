const id = {demand: true, alias: 'i'}
const nombre = {demand: true, alias: 'n'}
const descripcion = {demand: true, alias: 'd'}
const valor = {demand: true, alias: 'v'}
const modalidad = {demand: false, alias: 'm'}
const horas = {demand: false, alias: 'h'}
const  estado = {demand: false, alias: 'e',default:1}

let creacionCursos = {
    id,
    nombre,
    descripcion,
    valor,
    modalidad,
    horas,
    estado
}

let detalleC= {
    id
}

let editarCurso = {
    idc: {
        demand: true,
        alias: 'c'
    },
    est: {
        default:1,
        alias: 'd'
    }
}

const  argv = require('yargs')
                .command('crear', 'crear curso', creacionCursos)
                .command('mostrar', 'mostrar cursos')
                .command('detalleCurso', 'detalle curso',detalleC)
                .command('editarCurso', 'editar curso',editarCurso)
                .command('eliminarCurso', 'eliminar curso',detalleC)
                .argv;

module.exports= {
    argv
}
