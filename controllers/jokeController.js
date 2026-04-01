"use strict";
const model = require('../models/jokeModel');

async function fetchAllJokesCat(req, res) {
    try {
        const jokes = await model.getAllJokesCat();
        res.json(jokes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchJokeByCat(req, res) {
    const category = req.params.category;
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined; // <- fixed here

    if (!category) {
        return res.status(400).send("Missing required category param!");
    }

    try {
        const jokes = await model.getJokeByCat(category, limit);

        if (jokes.length === 0) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json(jokes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}


async function fetchRandomJoke(req, res) {
    try {
        const jokes = await model.getRandomJoke();
        res.json(jokes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function createJoke(req, res) {
    const { category, setup, delivery } = req.body;
    if (category && setup && delivery) {
        try {
            const newJoke = await model.addJoke(category, setup, delivery);
            res.status(201).json(newJoke);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required product fields!");
    }
}

module.exports = {

    fetchAllJokesCat,
    fetchJokeByCat,
    fetchRandomJoke,
    createJoke

}
