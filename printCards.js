const exploreMore = document.getElementById("exploreMore");


// function to print cards with buttons for fav and view more information
function printHeroCards(link,cardsHolder,path){
    fetch(link)
    .then((res)=>{
        return res.json()
    }).then((data)=>{
        let fetchItems = data.data.results;
        if(fetchItems.length == 0){
            cardsHolder.innerHTML = '<h1 class="warn">No Items Found</h1>';
            return;
        }
        fetchItems.forEach((item)=>{
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                    <div class="top">
                        <img src="${item.thumbnail.path}.${item.thumbnail.extension}">
                        <div class="content-wrapper">
                            <p class="name">${item.name}</p>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="content-holder">
                            <div class="left">
                                <p class="text">Comics: <span id="comics">${item.comics.available}</span></p>
                                <p class="text">Events: <span id="events">${item.events.available}</span></p>
                            </div>
                            <div class="right">
                                <p class="text">Series: <span id="series">${item.series.available}</span></p>
                                <p class="text">Stories: <span id="stories">${item.stories.available}</span></p>
                            </div>
                        </div>
                        <div id="btn-holder">
                            <a href="${path}/singleHero.html?id=${item.id}"><button class="view-more">View More Details</button></a>
                            <button class="view-more" id="fav-btn" data-id=${item.id}>${favroties.includes(item.id.toString())?"Remove from Favourites":"Add to Favourites"}</button>
                        </div>
                    </div>
                                `
            cardsHolder.appendChild(card);
            
        })
        
        if(exploreMore != null){
            exploreMore.innerHTML = "Explore More"
        }
    })
    
}
//function to print cards without buttons for fav and view more information
function printNoButtonsCards(link,cardsHolder){
    fetch(link)
    .then((res)=>{
       
        return res.json()
    })
    .then((data)=>{
        let fetchedItems = data.data.results;
      
        fetchedItems.forEach((item)=>{
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
            <div class="top">
                        <img src="${item.thumbnail.path}.${item.thumbnail.extension}">
                        <div class="content-wrapper">
                        <p class="name">${item.title}</p>
                        
                        </div>
                    </div>
                    <div class="bottom">
                    <div class="content-holder">
                    <div class="left">
                        <p class="text">Characters: <span id="characters">${item.characters.available}</span></p>
                    </div>
                    <div class="right">
                    <p class="text">Creators: <span id="creators">${item.creators.available}</span></p>

                    </div>
                </div>
                    </div>
                                `
            cardsHolder.appendChild(card);
            
        })
    })
}
