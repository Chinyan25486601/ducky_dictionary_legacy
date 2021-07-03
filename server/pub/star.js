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
star_lighted.addEventListener("click",setStarFunc(false))
star_unlighted.addEventListener("click",setStarFunc(true))