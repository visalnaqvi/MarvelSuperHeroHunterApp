const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const heroInfoBox = document.querySelector(".hero");
const favBtnElem = document.getElementById("fav-btn");

// ahnge favroties button text
if(favroties.includes(id)){
    favBtnElem.innerHTML = "Remove from Favourites"
}

// function to print comics cards
function printComicsCards(comicsData){
    const cardsHolder = document.querySelector(".cards-holder-comics");
    comicsData.comics.items.forEach((comic)=>{
        let link = comic.resourceURI+"?ts=1&apikey=efd40fdc0f2ca4ad805f7b3e8693d6d9&hash=81f598233e5700c2f031daf0f0328f57";
        printNoButtonsCards(link,cardsHolder);
    })
}

// function to print event cards
function printEventsCards(eventsData){
    const cardsHolder = document.querySelector(".cards-holder-events");
    eventsData.events.items.forEach((event)=>{
        let link = event.resourceURI+"?ts=1&apikey=efd40fdc0f2ca4ad805f7b3e8693d6d9&hash=81f598233e5700c2f031daf0f0328f57";
        printNoButtonsCards(link,cardsHolder);
    })
}

// function to searies comics cards
function printSeriesCards(seriesData){
    const cardsHolder = document.querySelector(".cards-holder-series");
    seriesData.series.items.forEach((series)=>{
        let link = series.resourceURI+"?ts=1&apikey=efd40fdc0f2ca4ad805f7b3e8693d6d9&hash=81f598233e5700c2f031daf0f0328f57";
        printNoButtonsCards(link,cardsHolder);
    })
}

function moreDetails(data){
    let url = data.urls[0].url;
    document.querySelector(".moreDetails").innerHTML= `
        <a target="_blank" href = "${url}"><button>See More Details</button></a>
    `
}

// function to toggle text in view more div to view less or vica versa
function toggleCollaps(elem,e){
    elem.classList.toggle("collaps")
    if(elem.classList.contains("collaps")){
        e.target.innerHTML = "View All"
    }else{
        e.target.innerHTML = "View Less"
    }
}

// function to count number of comics, event, series
function countAvailableItems(heroData){
    if(heroData.comics.available <5){
        document.getElementById("view-more-comics").style.display = "none";
        document.querySelector(".cards-holder-comics").style.height = "100%";
    }
    if(heroData.events.available == 0){
        document.querySelector(".eventSection").style.display = "none";
    }else if(heroData.events.available <5){
        document.getElementById("view-more-events").style.display = "none";
        document.querySelector(".cards-holder-events").style.height = "100%";
    }
    if(heroData.series.available == 0){
        document.querySelector(".seriesSection").style.display = "none";
    }else if(heroData.series.available <5){
        document.getElementById("view-more-series").style.display = "none";
        document.querySelector(".cards-holder-series").style.height = "100%";
    }
}


// function to print hero information in hero div
function printHeroInformation(heroData){
    favBtnElem.dataset.id = heroData.id;
    heroInfoBox.innerHTML = `
    <div class="left">
        <img src="${heroData.thumbnail.path}.${heroData.thumbnail.extension}">
    </div>
<div class="right">
    <h1>${heroData.name}</h1>
    <div class="infoBox">
        <p class="infoText">Total Comics: <span>${heroData.comics.available}</span></p>
        <a href="#comicsSection"><button class="infoButton" id="comics">View All</button></a>
    </div>
    <div class="infoBox">
        <p class="infoText">Total Events: <span>${heroData.events.available}</span></p>
        <a href="#eventSection"><button class="infoButton" id="events">View All</button></a>
    </div>
    <div class="infoBox">
        <p class="infoText">Total Series: <span>${heroData.series.available}</span></p>
        <a href="#seriesSection"><button class="infoButton" id="series">View All</button></a>
    </div>
    <div class="infoBox">
        <p class="infoText">Total Stories: <span>${heroData.stories.available}</span></p>
        <button class="infoButton" id="stories">View All</button>
    </div>
    ${heroData.description != ""?
    `<div class="dicsBox">
    <p class="disc">Description</p>
     <p class="text" id="description">${heroData.description}</p>
     </div>`:""}

   
</div>
    `
}


function printData(hero){
    countAvailableItems(hero)
    printHeroInformation(hero);
}


function handleClick(e){
    let elemId = e.target.id;
    if(elemId == "view-more-comics"){
        const elem = document.querySelector(".cards-holder-comics");
        toggleCollaps(elem,e);
    }else if(elemId == "view-more-events"){
        const elem = document.querySelector(".cards-holder-events");
        toggleCollaps(elem,e);
        
    }else if(elemId == "view-more-series"){
        const elem = document.querySelector(".cards-holder-series");
        toggleCollaps(elem,e);
    }
   
}



document.addEventListener("click",handleClick);
fetch(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=efd40fdc0f2ca4ad805f7b3e8693d6d9&hash=81f598233e5700c2f031daf0f0328f57`)
.then((res)=>{
    return res.json();
}).then((data)=>{
    let character = data.data.results[0];
    printData(character);
    printComicsCards(character);
    printEventsCards(character);
    printSeriesCards(character);
    moreDetails(character);
})