//Define las rutas y asigna los controladores correspondientes.

import express from 'express';
import { getLibros, getLibroById, addLibro, updateLibro, deleteLibro } from '../controllers/libroControllers.js';

const router = express.Router();

router.get('/', getLibros);
router.get('/:id', getLibroById);
router.post('/', addLibro);
router.put('/:id', updateLibro);
router.delete('/:id', deleteLibro);

export default router;
