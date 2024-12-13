const express = require('express');
const Zbirka = require('../models/Zbirka');
const Kartica = require('../models/Kartica');  // Koristićemo ovaj model da bismo povezali kartice sa zbirkom

const router = express.Router();

// 1. Kreiranje nove zbirke
router.post('/', async (req, res) => {
  const { name, description, flashcards } = req.body;

  try {
    // Kreiramo novu zbirku
    const zbirka = new Zbirka({
      name,
      description,
      flashcards  // ovo je niz ID-jeva kartica
    });

    // Spasavamo zbirku u bazu
    const savedZbirka = await zbirka.save();
    res.status(201).json(savedZbirka);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 2. Prikazivanje svih zbirki
router.get('/', async (req, res) => {
  try {
    const zbirke = await Zbirka.find();
    res.status(200).json(zbirke);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Prikazivanje konkretne zbirke (sa karticama)
router.get('/:id', async (req, res) => {
  try {
    // Prvo nalazimo zbirku na osnovu ID-a
    const zbirka = await Zbirka.findById(req.params.id).populate('flashcards');
    
    if (!zbirka) {
      return res.status(404).json({ message: 'Zbirka not found' });
    }

    res.status(200).json(zbirka);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Ažuriranje zbirke
router.put('/:id', async (req, res) => {
  try {
    const { name, description, flashcards } = req.body;

    // Ažuriramo zbirku na osnovu ID-a
    const zbirka = await Zbirka.findByIdAndUpdate(req.params.id, {
      name,
      description,
      flashcards
    }, { new: true });

    if (!zbirka) {
      return res.status(404).json({ message: 'Zbirka not found' });
    }

    res.status(200).json(zbirka);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. Brisanje zbirke
router.delete('/:id', async (req, res) => {
  try {
    const zbirka = await Zbirka.findByIdAndDelete(req.params.id);

    if (!zbirka) {
      return res.status(404).json({ message: 'Zbirka not found' });
    }

    res.status(200).json({ message: 'Zbirka deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

 
