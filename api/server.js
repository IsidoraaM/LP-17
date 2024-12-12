const express = require('express');
const mongoose = require('mongoose');

// Kreiramo express aplikaciju
const app = express();

// Middleware za parsiranje JSON podataka (možeš koristiti express.json() umesto body-parser)
app.use(express.json());

// Povezivanje sa MongoDB bazom
mongoose.connect('mongodb://localhost:27017/karticeApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Error connecting to MongoDB: ', err));

// Importovanje ruta
const zbirkeRoutes = require('./api/zbirke');
const karticeRoutes = require('./api/kartice');

// Koristi rute
app.use('/api/zbirke', zbirkeRoutes);
app.use('/api/kartice', karticeRoutes);

// Startovanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
