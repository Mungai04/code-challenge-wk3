// Your code here
const baseURL = 'http://localhost:3000/films/';

document.addEventListener("DOMContentLoaded", () => {
    getMovies();
    document.querySelector("#buy-ticket").addEventListener("click", handleBuyTicket);
});

function getMovies() {
    fetch(baseURL) 
        .then(res => res.json())
        .then(movies => {
            movies.forEach(movie => {
                renderMovieList(movie);
            });
            const firstMovie = document.querySelector("#id1");
            firstMovie.dispatchEvent(new Event("click"));
        });
}

function renderMovieList(movie) {
    const li = document.createElement("li");
    li.textContent = movie.title;
    li.id = "id" + movie.id;
    const ul = document.querySelector("#films");
    ul.appendChild(li);
    li.classList.add("film");
    li.classList.add("item");
    li.addEventListener("click", () => {
        handleMovieClick(movie);
    });
}

function handleMovieClick(movie) {
    fetch(baseURL + movie.id) 
        .then(res => res.json())
        .then(movie => {
            const poster = document.querySelector("IMG#POSTER");
            poster.src = movie.poster;
            poster.alt = movie.title;
            const info = document.querySelector("#showing");
            info.querySelector("#title").textContent = movie.title;
            info.querySelector("#runtime").textContent = movie.runtime + " minutes";
            info.querySelector("#filminfo").textContent = movie.description;
            info.querySelector("#showtime").textContent = movie.showtime;
            info.querySelector("#ticketnumber").textContent = movie.capacity - movie.ticketssold + " remaining tickets";
        });
}

function handleBuyTicket(e) {
    const ticketDiv = document.querySelector("#ticketnum");
    const tickets = parseInt(ticketDiv.textContent.split(' ')[0]);
    if (tickets > 0) {
        ticketDiv.textContent = tickets - 1 + " remaining tickets";
    } else if (tickets === 0) {
        document.querySelector("#buy-ticket").innerText = "SOLD OUT!";
        e.target.classList.remove("orange");
    }
}

const movies = [
    { title: "The Giant Gila Monster", description: "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature", runtime: 120, showtime: '6:50 PM', tickets: 100, fontSize: "50px" },
    { title: "Manos; The Hands of Fate", fontSize: "28px" },
    { title: "Time Chasers", fontSize: "20px" },
    { title: "The Touch of Satan", fontSize: "19px" },
    { title: "Santa Claus Conquers the Martians", fontSize: "18px" },
    { title: "Track of the Moon Beast", fontSize: "18px" },
    { title: "The Skydivers", fontSize: "18px" },
    { title: "The Killer Shrews", fontSize: "18px" },
    { title: "Project Moon Base", fontSize: "18px" },
    { title: "The Giant Spider Invasion", fontSize: "18px" },
    { title: "Catalina Caper", fontSize: "18px" },
    { title: "Secret Agent Super Dragon", fontSize: "18px" },
    { title: "Wild Rebels", fontSize: "18px" },
    { title: "Danger: Diabolik", fontSize: "18px" },
    { title: "Village of the Giants", fontSize: "18px" }
    
];

function populateMovieList() {
    const filmList = document.getElementById("films");
    filmList.innerHTML = "";
    movies.forEach(movie => {
        const listItem = document.createElement("li");
        listItem.textContent = movie.title;
        listItem.style.fontSize = movie.fontSize || "inherit";
        filmList.appendChild(listItem);
        listItem.addEventListener("click", () => {
            showMovieDetails(movie);
        });
    });
}

function showMovieDetails(movie) {
    
    console.log("Showing details for:", movie.title);
}
