require('dotenv').config()

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routeUser = require('./routes/User');
const routeProduct = require('./routes/Product');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(response => {
    console.log('Database terhubung');
})
.catch(error => {
    console.log('Error dalam menghubungkan database');
});

app.use(bodyParser.json());
app.use('/', routeUser);
app.use('/user', routeProduct);

app.listen(process.env.PORT, (request, response) => {
    console.log(`Server berjalan pada port ${process.env.PORT}`);
});
