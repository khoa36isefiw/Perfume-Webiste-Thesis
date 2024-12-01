require('./configs/db.config');
const express = require('express');
const cors = require('cors');
const route = require('./routes/index.route');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const app = express();
const port = 3001;

app.use(
    cors({
        origin: ['http://localhost:3000', 'https://perfume-webiste-thesis.vercel.app/'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true, // Allow cookies and authorization headers
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

route(app);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
