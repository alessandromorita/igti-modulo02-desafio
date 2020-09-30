import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const aux = req.query;
    const buscaQuery = data.grades.filter(
      (item) => item.student === aux.student && item.subject === aux.subject
    );
    const soma = buscaQuery.reduce((acc, curr) => {
      return acc + parseInt(curr.value);
    }, 0);
    res.send('Soma das notas: ' + JSON.stringify(soma));
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/media', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const aux = req.query;
    const buscaQuery = data.grades.filter((item) => {
      return item.type === aux.type && item.subject === aux.subject;
    });

    const soma = buscaQuery.reduce((acc, curr) => {
      return acc + parseInt(curr.value);
    }, 0);

    res.send('Média das notas: ' + JSON.stringify(soma / buscaQuery.length));
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/top', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const aux = req.query;
    const buscaQuery = data.grades.filter((item) => {
      return item.type === aux.type && item.subject === aux.subject;
    });

    res.send(
      buscaQuery
        .sort((a, b) => {
          return b.value - a.value;
        })
        .slice(0, 3)
    );
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
