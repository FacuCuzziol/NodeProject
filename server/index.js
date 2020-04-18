
const express = require('express');
const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');
const configs = require('./config');
const db = require('./config/database');

require('dotenv').config({path:'variables.env'});

db.authenticate()
    .then(() =>console.log('DB conectada'))
    .catch(error => console.log(error));


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

//muestra anio actual y genero la ruta
app.use((req,res,next) =>{
    //creo la fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    
    return next();
})


app.use(bodyParser.urlencoded({extended:true}));

app.use('/',routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port,host, () =>{
    console.log('el servidor esta funcionando');
});