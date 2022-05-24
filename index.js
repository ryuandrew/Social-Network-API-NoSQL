const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = 3001 || process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//mongo
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Social-Network-API', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

mongoose.set('debug', true);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});