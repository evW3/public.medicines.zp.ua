const cors = require('cors');
const path = require('path');
const express = require('express');

const defaultRoutes = require('./providers/root');

const app = express();
const server = require('http').Server(app);

app.use(cors());
app.use(express.json({ extender: true }));

app.use('/api', defaultRoutes);
app.use('/api/*', (_, res) => res.status(404).json({ message: 'route not found' }));

app.use('/admin', express.static(path.join(__dirname, 'client', 'admin', 'dist')));
app.get('/admin/*', (_, res) => res.sendFile(path.resolve(__dirname, 'client', 'admin', 'dist', 'index.html')));

app.use('/', express.static(path.join(__dirname, 'client', 'medicines', 'dist')));
app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, 'client', 'medicines', 'dist', 'index.html')));

module.exports = { server };