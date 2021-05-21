let search = document.getElementById("search");
let search_icon = document.getElementById("search_icon");
let search_big = document.getElementById("search_big");
let search_icon_big = document.getElementById("search_icon_big");
let search_content_temp = "";

let findWord = function (query) {
    switchContent(contentStatus.search_page);
    search_big.innerText = search_content_temp;
    //TODO:添加搜索处理机制
    //TODO:删除下面的占位置用的设施

};

search.addEventListener("keydown", event=>{
    if(event.keyCode=="13"){
        event.preventDefault();
        search_content_temp = search.innerText;
        console.log(search_content_temp);
        findWord(search_content_temp);
        search.innerHTML="";
    };
});

search_icon.addEventListener("click", event=>{
    search_content_temp = search.innerText;
    findWord(search_content_temp);
    console.log(search_content_temp);
    search.innerHTML="";
});

search_big.addEventListener("keydown", event=>{
    if(event.keyCode=="13"){
        event.preventDefault();
        search_content_temp = search_big.innerText;
        console.log(search_content_temp);
        findWord(search_content_temp);
    };
});

search_icon_big.addEventListener("click", event=>{
    search_content_temp = search_big.innerText;
    console.log(search_content_temp);
    findWord(search_content_temp);
});