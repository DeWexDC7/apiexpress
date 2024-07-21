import fs from 'fs';
import path from 'path';

// Obtén la ruta absoluta a 'libros.json'
const dataPath = path.resolve('data/libros.json');

const readData = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading data from ${dataPath}:`, error);
        return null;
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        console.log('Data written to file');
    } catch (error) {
        console.error(`Error writing data to ${dataPath}:`, error);
    }
};

export { readData, writeData };
