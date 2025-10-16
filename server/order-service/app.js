const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./src/routes/orderRoutes');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config();

const app = express();
const PORT = process.env.ORDER_SERVICE_PORT || 5005;

app.use(helmet());

app.use(bodyParser.json());

app.use('/', orderRoutes);

app.get('/', (req, res) => {
    res.send('Order Service is running!');
});

app.listen(PORT, () => {
    console.log(`Order Service is running on port ${PORT}`);
});
