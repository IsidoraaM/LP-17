const express = require('express');
const Flashcard = require('../models/Flashcard');
const router = express.Router();
//definisemo rute za kartice u ovom fajlu
// Kreiranje nove kartice
router.post('/', async (req, res) => {
    const { question, answer, collection } = req.body;

    try {
        const newFlashcard = new Flashcard({
            question,
            answer,
            collection
        });

        await newFlashcard.save();
        res.status(201).json(newFlashcard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Prikazivanje svih kartica
router.get('/', async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        res.status(200).json(flashcards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Prikazivanje kartice po ID-u
router.get('/:id', async (req, res) => {
    try {
        const flashcard = await Flashcard.findById(req.params.id);
        if (!flashcard) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.status(200).json(flashcard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Brisanje kartice
router.delete('/:id', async (req, res) => {
    try {
        const flashcard = await Flashcard.findByIdAndDelete(req.params.id);
        if (!flashcard) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.status(200).json({ message: 'Flashcard deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
