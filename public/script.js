"use strict";
    (function () {

        const MY_SERVER_BASEURL = "/jokebook";
        window.addEventListener("load", init);

        let search = document.getElementById("search")
        let jokeForm = document.getElementById("add-joke-form")


        function init() {
            getRandomJoke();
            let catButton = document.getElementById("catButton");
            catButton.addEventListener("click", getJokeCategories);
            search.addEventListener("submit", searchJokeCategories);
            jokeForm.addEventListener("submit", addJoke);


        }


        function getRandomJoke() {
            let jokesDiv = document.getElementById("jokes-container");
            jokesDiv.innerHTML = "";

            fetch(MY_SERVER_BASEURL + "/random")
                .then(checkStatus)
                .then((response) => {

                    const joke = response[0]
                    addParagraph(jokesDiv, `this joke is ${joke.category} ${joke.setup}.....${joke.delivery}`);
                }

                )
                .catch((error) => {
                    console.error("Error: ", error);
                });
        }


        function getJokeCategories() {
        let categories = document.getElementById("joke-cat-container");
        categories.innerHTML = "";

        fetch(MY_SERVER_BASEURL + "/categories")
            .then(checkStatus)
            .then((response) => {
                for (const joke of response) {
                    addParagraph(categories, `${joke.category}`);
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }


    function searchJokeCategories(event) {
        event.preventDefault(); 
        let jokes = document.getElementById("jokes-in-category");
        jokes.innerHTML = "";

        let params = new FormData(search);
        let object = Object.fromEntries(params);
        let category = object.category;
        let limit = object.limit;


        fetch(MY_SERVER_BASEURL + "/category/" + category + "?limit=" + limit)
            .then(checkStatus)
            .then((response) => {
                for (const joke of response) {
                    addParagraph(jokes, `${joke.category} - ${joke.setup} - ${joke.delivery}`);
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }


    function addJoke(event) {
        event.preventDefault();

        let jokes = document.getElementById("jokes-updated");
        jokes.innerHTML = "";

        let jokeData = {
            category: document.getElementById("xcategory").value,
            setup: document.getElementById("xsetup").value,
            delivery: document.getElementById("xdelivery").value,
        };

        fetch(MY_SERVER_BASEURL + "/joke/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jokeData)
        })
        .then(checkStatus)
        .then(() => {


            fetch(MY_SERVER_BASEURL + "/category/" + document.getElementById("xcategory").value)
            .then(checkStatus)
            .then((response) => {
                for (const joke of response) {
                    addParagraph(jokes, `${joke.category} - ${joke.setup} - ${joke.delivery}`);
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
            });




            document.getElementById("add-joke-form").reset();
        })
        .catch(err => console.error(err));
    }



    //     let params = new FormData(document.getElementById("search"));
    // let object = Object.fromEntries(params);
    // let username = object.name;
    // const apiUrl = "https://api.github.com/users/" + username + "/repos?sort=created&direction=desc";

        




        function addParagraph(parent, text) {
            const p = document.createElement("p");
            p.textContent = text;
            parent.appendChild(p);
        }



        function checkStatus(response) {
            if (!response.ok) {
                throw Error("Error in request: " + response.statusText);
            }
            return response.json();
        }

    })()