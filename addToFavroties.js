document.addEventListener("click",handleClickforFav);

// get favroties from local Storage
var favroties = [];
var favJSON = localStorage.getItem("favroties");
if(favJSON != null){
    favroties = JSON.parse(favJSON);
}
function handleClickforFav(e){
    
    if(e.target.id == "fav-btn"){
        addtoFav(e.target);
    }
}

// function to add or remove a hero form favroties
function addtoFav(favBtn){
        console.log(favBtn);
        let id = favBtn.dataset.id;
        console.log(id);
        if(favroties.includes(id)){
            let newfavs = favroties.filter((f)=>{
                return f != id;
            })
            favBtn.innerHTML = "Add to Favourites"
            favroties = newfavs;
        }else{
            favroties.push(id);
            favBtn.innerHTML = "Remove from Favourites"
        }    
        console.log(favroties)
        localStorage.setItem("favroties",JSON.stringify(favroties));
    
}

