"use strict";
const pool = require('./dbConnection');

async function getAllJokesCat() {
    const queryText = "SELECT DISTINCT category FROM jokes";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getJokeByCat(category, limit) {
    let queryText = "SELECT * FROM jokes where category = $1";
    let values = [category];
    if (limit) {
        queryText += " LIMIT $2";
        values.push(limit);
    }
    const result = await pool.query(queryText, values);
    return result.rows;
}

async function getRandomJoke() {

    let queryText = "SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1";
    const result = await pool.query(queryText);
    return result.rows;



}

async function addJoke(category, setup, delivery) {
    let queryText = "INSERT INTO jokes (category, setup, delivery) VALUES ($1, $2, $3) RETURNING *";
    let values = [category, setup, delivery];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}





module.exports = {
    getAllJokesCat,
    getJokeByCat,
    getRandomJoke,
    addJoke

}