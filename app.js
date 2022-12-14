const inputFiled = document.querySelector(".input");
const searchBtn = document.getElementById("submit");
const cardsHolder = document.querySelector(".cards-holder");

// fetchHeros function calls printHeroCards function to with 
// link to fetch heros and appends them to cardsHolder 
function fetchHeros(offset){
    exploreMore.innerText = "Loading.."
    let link = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=efd40fdc0f2ca4ad805f7b3e8693d6d9&hash=81f598233e5700c2f031daf0f0328f57&offset=${offset}`;
    printHeroCards(link,cardsHolder,"./singleHero");
}

// fetchSearchedHeros function calls printHeroCards function to with 
// link to fetch heros and appends them to cardsHolder 
function fetchSearchedHeros(){
    let searchText = inputFiled.value;
    if(searchText != ""){
        exploreMore.innerText = "Loading.."
        cardsHolder.innerHTML = "";
        let link = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchText}&ts=1&apikey=efd40fdc0f2ca4ad805f7b3e8693d6d9&hash=81f598233e5700c2f031daf0f0328f57`;
        printHeroCards(link,cardsHolder,"./singleHero");
    }
    
}
let offset = 0;
fetchHeros(offset);

// adding more cards to cardsHolder when click on explore more button
exploreMore.addEventListener("click",()=>{
    if(inputFiled.value == ""){
        offset += 20;
        fetchHeros(offset)
    }
});

// addEventListener for search button
searchBtn.addEventListener("click",fetchSearchedHeros);

