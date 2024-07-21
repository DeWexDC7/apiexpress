import express from 'express';
import libroRoutes from './routes/libroRoutes.js';

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configurar rutas
app.use('/libros', libroRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
