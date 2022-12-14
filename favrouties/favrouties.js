const cardsHolder = document.querySelector(".cards-holder");
console.log(favroties.length)
if(favroties.length == 0){
    cardsHolder.innerHTML = '<h1 class="warn">No Items Found</h1>';
}else{
    // print card for every hero in favroties
    favroties.forEach((id)=>{
        let link = `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=efd40fdc0f2ca4ad805f7b3e8693d6d9&hash=81f598233e5700c2f031daf0f0328f57`;
        printHeroCards(link,cardsHolder,"../singleHero");
    })
}
