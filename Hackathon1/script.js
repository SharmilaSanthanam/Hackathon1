let currentPage = 1;
let per = 10;

var header = document.createElement("div");
header.setAttribute("class", "header");
header.innerHTML = "<p><b>POKEMON API<b></p>";
var sidenav = document.createElement("div");
sidenav.setAttribute("class", "sidenav");
sidenav.innerText = "POKEMON API"

var footer = document.createElement("div");
footer.setAttribute("class", "footer");
footer.innerHTML = `
<p id="currentPage"></p>
<button type="button" onclick="previous()">Previous</button>
<button onclick="next()">Next</button>`
var section = document.createElement("section");
section.setAttribute("class", "section")
document.body.append(header, sidenav, footer, section);

function createData({ ability, pokemon, move, weight}) {
    var container = document.createElement("div");
    container.setAttribute("class", "container");
    container.innerHTML = `
    
<p>ability       :    ${ability}</p>
<p>pokemon      :   ${pokemon}</p>
<p>move       :   ${move}</p>
<p>weight    :   ${weight}</p>`

    section.appendChild(container);
}

async function per_page(num) {
    document.querySelector(".box").innerHTML = ``;
    try {
        let data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&per_page=${num}`+cc);
        let info = await data.json();
        console.log(info);
        info.forEach((pokemon1) => createData(pokemon1));
    }
    catch (error) {
        console.error(error);
    }
   
}



async function page(num) {
    document.querySelector(".section").innerHTML = ``;
    document.querySelector("#currentPage").innerHTML = `Page: ${num}`


    try {
        let data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&per_page=${per}&page=${num}`+cc);
        let info = await data.json();
        console.log(info);
        info.forEach((pokemon1) => createData(pokemon1));
    }
    catch (error) {
        console.error(error);
    }
    currentPage = num;
}


function previous() {
    let a = currentPage - 1;
    if (a < 1) {
        page(1);
    }
    else {
        page(a);
    }
}

function next() {
    let b = currentPage + 1;
    page(b);
}