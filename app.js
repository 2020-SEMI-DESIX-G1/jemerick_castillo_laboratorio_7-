require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const connectDb = require('./dbConfig');
const Estudiantes = require('./models/Estudiantes');

const PORT = 3000;

// Intermediarios
app.use(bodyParser.json());


// (Retorna la lista completa de estudiantes almacenados
app.get('/', async (req, res) => {
    const estudiantes = await Estudiantes.find().select('nombre edad');
    res.render('estudiantes', { estudiantes });
});



app.get('/estudiantes/', async (req, res) => {
    const estudiantes = await Estudiantes.find().select('nombre edad');
    res.json({
        estudiantes,
        cantidad: estudiantes.length
    });
});

// Crea un nuevo estudiante y lo agrega a la lista de estudiantes
app.post('/estudiantes/', async (req, res) => {
    const { nombre, edad } = req.body;
    await Estudiantes.create({ nombre, edad });
    res.json({ nombre, edad });
});

// Retorna a un estudiante específico basado en el id recibido
app.get('/estudiantes/:id', async (req, res) => {
    try {
        const estudiante = await Estudiantes.findById(req.params.id).select('nombre edad');
        res.json(estudiante);
    } catch (error) {
        console.log(error);
        res.json({});
    }
});

// Actualiza uno o más campos de un estudiante específico basado en el id recibido
app.put('/estudiantes/update/:id', async (req, res) => {
    try {
        const { nombre, edad } = req.body;
        const estudiante = await Estudiantes.findByIdAndUpdate(req.params.id,{ nombre, edad });
        res.json(estudiante);
    } catch (error) {
        console.log(error);
        res.json({});
    }
});

// Elimina un estudiante de la lista de estudiantes basado en el id recibido
app.delete('/estudiantes/delete/:id', async (req, res) => {
    try {
        const estudiante = await Estudiantes.findByIdAndRemove(req.params.id,{useFindAndModify: false})
        res.json(estudiante);
    } catch (error) {
        console.log(error);
        res.json({});
    }
});



connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`Ejecutando en el puerto ${PORT}`);
    });
});