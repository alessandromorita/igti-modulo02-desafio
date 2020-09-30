import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let gradesAux = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    gradesAux = { id: data.nextId++, ...gradesAux, timestamp: new Date() };
    data.grades.push(gradesAux);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(gradesAux);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const gradesAux = data.grades.find(
      (item) => item.id === parseInt(req.params.id)
    );
    res.send(gradesAux);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.grades = data.grades.filter(
      (item) => item.id !== parseInt(req.params.id)
    );
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const gradesAux = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.grades.findIndex((item) => item.id === gradesAux.id);
    data.grades[index] = { ...gradesAux, timestamp: new Date() };
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data.grades[index]);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
