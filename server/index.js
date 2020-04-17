
const express = require('express');
const path = require('path');
const routes = require('./routes');

const configs = require('./config');



const app = express();


//habilito pug 

app.set('view engine','pug');

app.set('views',path.join(__dirname,'./views'));

//cargar carpeta statica llamada public

app.use(express.static('public'));


//valido si estamos en desarrollo o en produccion
const config = configs[app.get('env')];
//creo var para sitio web

app.locals.titulo = config.nombresitio;

//muestra anio actual
app.use((req,res,next) =>{
    //creo la fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    return next();
})


app.use('/',routes());

app.listen(3000);