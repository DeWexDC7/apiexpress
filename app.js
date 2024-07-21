import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Función para leer datos desde el archivo JSON
const readData = () => {
    try {
        const data = fs.readFileSync('data/libros.json', 'utf-8');
        return JSON.parse(data); // Retornar los datos leídos y parseados
    } catch (err) {
        console.log(err);
        return null; // Retornar null en caso de error
    }
}

// Función para escribir datos al archivo JSON
const writeData = (data) => {
    try {
        fs.writeFileSync('data/libros.json', JSON.stringify(data, null, 2));
        console.log('Data written to file');
    } catch (err) {
        console.log(err);
    }
}

// Endpoint para agregar un nuevo libro
app.post('/add', (req, res) => {
    const data = readData();
    if (data) {
        const nuevoLibro = req.body;
        data.libros.push(nuevoLibro);
        writeData(data);
        res.status(201).send('Libro agregado');
    } else {
        res.status(500).send('Error al leer datos');
    }
});


// Endpoint para actualizar un libro existente
app.patch('/update/:id', (req, res) => {
    const data = readData();
    if (data) {
        const libroId = parseInt(req.params.id);
        const index = data.libros.findIndex(l => l.id === libroId);
        if (index !== -1) {
            data.libros[index] = { ...data.libros[index], ...req.body };
            writeData(data);
            res.send('Libro actualizado');
        } else {
            res.status(404).send('Libro no encontrado');
        }
    } else {
        res.status(500).send('Error al leer datos');
    }
});

// Endpoint para eliminar un libro
app.delete('/delete/:id', (req, res) => {
    const data = readData();
    if (data) {
        const libroId = parseInt(req.params.id);
        const index = data.libros.findIndex(l => l.id === libroId);
        if (index !== -1) {
            data.libros.splice(index, 1);
            writeData(data);
            res.send('Libro eliminado');
        } else {
            res.status(404).send('Libro no encontrado');
        }
    } else {
        res.status(500).send('Error al leer datos');
    }
});

// Endpoint para leer un libro por ID
app.get('/read/:id', (req, res) => {
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

// Endpoint para leer todos los libros
app.get('/read', (req, res) => {
    const data = readData();
    if (data) {
        console.log(data.libros);
        res.json(data); // Enviar la respuesta al cliente
    } else {
        res.status(500).send('Error leyendo datos');
    }
});

// Endpoint de prueba
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

