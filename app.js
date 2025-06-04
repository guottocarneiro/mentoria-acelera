// app.js / 
const express = require('express');
const tarefaRoutes = require('./tarefaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Middleware para loggar as requisições (opcional, mas útil)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Usar as rotas de tarefas sob o prefixo /api/tarefas
app.use('/api/tarefas', tarefaRoutes);

// Rota raiz simples
app.get('/', (req, res) => {
  res.send('API de Tarefas funcionando! Acesse /api/tarefas para interagir.');
});

// Middleware para tratar rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware para tratamento de erros global (opcional, mas boa prática)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocorreu um erro interno no servidor', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});