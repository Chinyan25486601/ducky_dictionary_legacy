let star_lighted = document.getElementById("star_lighted");
let star_unlighted = document.getElementById("star_unlighted");
let isLighted = false;
let setStarFunc = function(isLighted){
    return (e)=>{
        if(isLighted){
            star_unlighted.style.display="none";
            star_lighted.style.display="block";
        } else {
            star_lighted.style.display="none";
            star_unlighted.style.display="block"
        }
    }
}
setStarFunc(false)();
let addFavourite = function(e=null){
    fetch(now_url+"/add_favourite?id="+nowWordId.toString())
        .then(response=>{
            return response.json()
        }).then(json=>{
            if(json.status==0){
                setStarFunc(true)();
            }
        })
};
let removeFavourite = function(e=null){
    fetch(now_url+"/remove_favourite?id="+nowWordId.toString())
        .then(response=>{
            return response.json()
        }).then(json=>{
            if(json.status==0){
                setStarFunc(false)();
            }
        })
};
star_lighted.addEventListener("click",removeFavourite)
star_unlighted.addEventListener("click",addFavourite)