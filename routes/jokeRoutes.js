"use strict";
const express = require("express");
const router = express.Router();
const jokeController = require('../controllers/jokeController');

router.get("/categories", jokeController.fetchAllJokesCat);
router.get("/category/:category", jokeController.fetchJokeByCat);
router.get("/random", jokeController.fetchRandomJoke);
router.post("/joke/add", jokeController.createJoke);

// router.post("", jokeController.createProduct);
// router.delete("/:id", jokeController.removeProduct);
module.exports = router;