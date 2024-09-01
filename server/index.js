require('./configs/db.config');
const express = require('express');
const cors = require('cors');
const route = require('./routes/index.route');
const morgan = require('morgan');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

route(app);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
