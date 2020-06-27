const express = require('express');
var bodyParser = require('body-parser');
const app = express();

const connectDb = require('./dbConfig');

const port = 3000;

const ESTUDIANTES = [
    {
        nombre: "John Doe",
        edad: "15"
    },
    {
        nombre: "Jane Doe",
        edad: "25"
    },
    {
        nombre: "Phill Doe",
        edad: "30"
    },
    {
        nombre: "Saint Doe",
        edad: "20"
    },
    {
        nombre: "Janeth Doe",
        edad: "18"
    }

];
//Intermediario
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Working'));

// (Retorna la lista completa de estudiantes almacenados
app.get('/estudiantes/', (req,res) => {
    res.json(ESTUDIANTES);
});

// Crea un nuevo estudiante y lo agrega a la lista de estudiantes
app.post('/estudiantes/', (req,res) => {
        ESTUDIANTES.push(req.body);
        res.json(req.body);
});

// Retorna a un estudiante específico basado en el id recibido
app.get('/estudiantes/:id', (req,res) => {
    res.json(
        ESTUDIANTES[req.params.id]
    );
});

// Actualiza uno o más campos de un estudiante específico basado en el id recibido
app.put('/estudiantes/update/:id', (req,res) => {
   ESTUDIANTES[req.params.id].nombre = req.body.nombre;
   ESTUDIANTES[req.params.id].edad = req.body.edad;
   res.send("Record has been updated");
});

// Elimina un estudiante de la lista de estudiantes basado en el id recibido
app.delete('/estudiantes/delete/:id', (req,res) => {
    ESTUDIANTES.splice(req.params.id,1);
    res.send("Record has been deleted");
 });


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));