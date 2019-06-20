const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./router/user-routes');
const inventoryRouter = require('./router/inventory-routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/Users', { useNewUrlParser: true });

app.use('/api/users', userRouter);
app.use('/api/inventory', inventoryRouter);

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
