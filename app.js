const express = require('express');
const path = require('path');
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');
const routerSpace = require('./routes/space');

const app = express();

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})

app.use('/', routerCards);
app.use('/', routerUsers);
app.use('/', routerSpace);



app.use(express.static(path.join(__dirname, 'public')));