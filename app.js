const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const config = require('config');
const db = config.get('mongoURI');
const PORT = process.env.PORT || 8000;

app.use(express.static('./public'));

mongoose
  .connect(process.env.MONGODB_URI || db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connected.'))
mongoose.connection.on('error', err => console.log('DB connection error: ' + err.message));

app.use(express.json());
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); //relative path
  });
} else if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: process.env.CLIENT_URL }));
  app.use(morgan('dev'));
}


app.listen(PORT, () => console.log(`APP listening on port ${PORT}`));