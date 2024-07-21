import express from 'express';
import { getLibros, getLibroById, addLibro, updateLibro, deleteLibro } from '../controllers/libroController.js';

const router = express.Router();

router.get('/getLibros', getLibros);              // GET /libros/getLibros
router.get('/getLibro/:id', getLibroById);        // GET /libros/getLibro/:id
router.post('/addLibro', addLibro);               // POST /libros/addLibro
router.put('/updateLibro/:id', updateLibro);      // PUT /libros/updateLibro/:id
router.delete('/deleteLibro/:id', deleteLibro);   // DELETE /libros/deleteLibro/:id

export default router;
