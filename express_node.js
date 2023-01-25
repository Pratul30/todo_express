const express = require('express');

const app = express();

app.use(express.json());

const tasks = [];

app.get('/tasks', (req, res) => {
  res.send(tasks);
});

app.get('/tasks/:id', (req, res) => {
  res.send(tasks[req.params.id - 1]);
});

app.get('/tasks/active', (req, res) => {
  const tempArr = tasks.filter((task) => task.isComplete === false);
  res.send(tempArr);
});

app.get('/tasks/complete', (req, res) => {
  const tempArr = tasks.filter((task) => task.isComplete === true);
  res.send(tempArr);
});

app.post('/tasks', (req, res) => {
  const newObj = {
    name: req.body.name,
    id: parseInt(Math.random() * 100, 10),
    isComplete: false,
  };
  tasks.push(newObj);
  res.send(newObj);
});

app.delete('/tasks', (req, res) => {
  tasks.length = 0;
  res.send(tasks);
});

app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex((task) => task.id === parseInt(req.params.id, 10));
  tasks.splice(index, 1);
  res.send(tasks);
});

app.put('/tasks/:id', (req, res) => {
  const index = tasks.findIndex((task) => task.id === parseInt(req.params.id, 10));
  tasks[index] = { id: tasks[index].id, ...(req.body) };
  res.send(tasks[index]);
});

app.patch('/tasks/:id', (req, res) => {
  const index = tasks.findIndex((task) => task.id === parseInt(req.params.id, 10));
  tasks[index] = { ...tasks[index], ...(req.body) };
  res.send(tasks[index]);
});

app.listen(3000);
