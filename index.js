import express from 'express';
import { promises as fs } from 'fs';
import gradesRouter from './routes/grades.js';
import valuesRouter from './routes/grades-values.js';

global.fileName = 'grades.json';

const { readFile, writeFile } = fs;
const app = express();
app.use(express.json());
app.use('/grades', gradesRouter);
app.use('/values', valuesRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    console.log('API Started');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      grades: [],
    };
    writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        console.log('API Started and File Created');
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
