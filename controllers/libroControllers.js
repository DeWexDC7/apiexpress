//Define los controladores para manejar 
import { readData, writeData } from '../models/libroModel.js';

const getLibros = (req, res) => {
    const data = readData();
    if (data) {
        res.json(data.libros);
    } else {
        res.status(500).send('Error leyendo datos');
    }
};

const getLibroById = (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id, 10);
    if (data) {
        const libro = data.libros.find(libro => libro.id === id);
        if (libro) {
            res.json(libro);
        } else {
            res.status(404).send('Libro no encontrado');
        }
    } else {
        res.status(500).send('Error leyendo datos');
    }
};

const addLibro = (req, res) => {
    const data = readData();
    if (data) {
        const nuevoLibro = req.body;
        data.libros.push(nuevoLibro);
        writeData(data);
        res.status(201).send('Libro agregado');
    } else {
        res.status(500).send('Error al leer datos');
    }
};

const updateLibro = (req, res) => {
    const data = readData();
    if (data) {
        const libroId = parseInt(req.params.id);
        const index = data.libros.findIndex(l => l.id === libroId);
        if (index !== -1) {
            data.libros[index] = { id: libroId, ...req.body };
            writeData(data);
            res.send('Libro actualizado');
        } else {
            res.status(404).send('Libro no encontrado');
        }
    } else {
        res.status(500).send('Error al leer datos');
    }
};

const deleteLibro = (req, res) => {
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
};

export { getLibros, getLibroById, addLibro, updateLibro, deleteLibro };
