import express from 'express';
import fs from 'fs';

const app = express();

const readData = () => {
    try {
        const data = fs.readFileSync('data/libros.json', 'utf-8');
        return JSON.parse(data); // Retornar los datos leídos y parseados
    } catch (err) {
        console.log(err);
        return null; // Retornar null en caso de error
    }
}

const writeData = (data) => {
    try {
        fs.writeFileSync('data/libros.json', JSON.stringify(data, null, 2));
        console.log('Data written to file');
    } catch (err) {
        console.log(err);
    }
}

app.get('/lectura/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id, 10); // Asegúrate de que el ID sea un número
    if (data) {
        const libro = data.libros.find(libro => libro.id === id); // Buscar el libro por ID
        if (libro) {
            res.json(libro); // Enviar el libro encontrado como respuesta
        } else {
            res.status(404).send('Libro no encontrado'); // Enviar error 404 si no se encuentra el libro
        }
    } else {
        res.status(500).send('Error leyendo datos'); // Enviar error 500 si hay un problema al leer los datos
    }
});

app.get('/lectura', (req, res) => {
    const data = readData();
    if (data) {
        console.log(data.libros);
        res.json(data); // Enviar la respuesta al cliente
    } else {
        res.status(500).send('Error reading data');
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
