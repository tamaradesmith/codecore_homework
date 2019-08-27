const express = require('express');
const logger = require('morgan');
const app = express();
const methodOverride = require('method-override');
const path = require('path');

const cohortsRouter = require('./routes/cohorts');

app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname)
app.use(express.urlencoded({ extented: true }));
app.use(logger('dev'))


app.set('view engine', 'ejs');


app.use(cohortsRouter);





const PORT = 5050;
const ADDRESS = 'localhost';
app.listen(PORT, ADDRESS, () => {
    console.log(`port: ${PORT}, address: ${ADDRESS} `)
})