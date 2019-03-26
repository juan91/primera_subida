const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser')
require('./src/helpers');

const dirpublico = path.join(__dirname + '/public');
;
const directoriopartials = path.join(__dirname + '/partials');
app.use(express.static(dirpublico));
hbs.registerPartials(directoriopartials);
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false}));


const funciones = require('./funciones');
const funcionesUser = require('./funcionesusuario');


app.get('/oferta', (req, res) => {
    let listaC = funciones.listarCursos();
    res.render('oferta', {
        curso: listaC
    });
});


app.get('/', (req, res) => {

    res.render('index', {

    });
});


app.get('/usuarios', (req, res) => {
    res.render('index', {
        titulo: 'Usuarios'
    });
});


app.post('/addCurso', (req, res) => {
    let curso = {
        id: req.body.idCurso,
        nombre: req.body.nombre,
        descripcion: req.body.desc,
        valor: req.body.valor,
        modalidad: req.body.modalidad,
        intesidad: req.body.intesidad,
        estado: true
    }

    let resp;
    if (funciones.crearCurso(curso)) {
        resp = {
            mensaje: "Curso registrado con éxito",
            tipo: "success",
            url: "/cursos"
        }
        res.redirect('/cursos');

    } else {
        resp = {
            mensaje: "Error al registrar Curso, ID: " + req.body.idCurso + " ya existe",
            tipo: "danger",
            url: "/cursos"
        }
        res.render('mensaje', {
            curso: resp
        });
    }

});


app.post('/registrar_usuario', (req, res) => {
    let user = {
        cc: req.body.cc,
        nombre: req.body.nombre,
        email: req.body.email,
        tel: req.body.telefono,
        idcurso: req.body.idcurso
    }

    let resp;
    if (funcionesUser.crearregistro(user)) {
        resp = {
            mensaje: req.body.nombre + " te has registrado al curso con éxito :)",
            tipo: "success",
            url: "/oferta"
        }
        res.render('mensaje', {
            curso: resp
        });

    } else {
        resp = {
            mensaje: req.body.nombre + " ya te has registrad@ al curso",
            tipo: "danger",
            url: "/oferta"

        }
        res.render('mensaje', {
            curso: resp
        });
    }

});

app.get('/cursos', (req, res) => {
    let listaC = funciones.listarCursos();
    res.render('cursos', {
        cursoLista: listaC
    });
});

app.post('/cerrar_cursos', (req, res) => {
    let idc = req.body.idc
    let estado = (req.body.estado == '1') ? true : false;
    funciones.editarCurso(idc, estado);
    res.redirect('/cursos');
});

app.post('/eliminar_usuario', (req, res) => {
    let cc = req.body.cc
    funcionesUser.eliminarUsuairo(cc);
    setTimeout(() => res.redirect('/inscritos') , 300);
});


app.get('/detalle_curso/:id', function (req, res) {
    var id = req.params.id;
    let curso = funciones.encontrarCurso(id)
    res.render('detalle_curso', {
        detallecurso: curso
    });
});

app.get('/inscritos', (req, res) => {
    let usercursos = funcionesUser.listarCursosUser();
    res.render('inscritos', {
        usercursos: usercursos
    });
});

app.get('*', (req, res) => {
    res.render('error');
})

app.listen(3000, () => {
    console.log('esuchano en el puerto 3000');
});
