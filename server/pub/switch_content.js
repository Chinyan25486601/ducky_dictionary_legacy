let contentStatus = {
    word_page: 0,
    search_page: 1
};
let nowStatus = contentStatus.search_page;

let word_page = document.getElementById("word_page");
let search_page = document.getElementById("search_page");

let switchContent = function (destination) {
    // and so on...
    if(nowStatus==contentStatus.word_page){
        word_page.style.display = "none";
    } else if (nowStatus==contentStatus.search_page) {
        search_page.style.display = "none";
    };
    if(destination==contentStatus.word_page){
        word_page.style.display = "block";
        nowStatus = contentStatus.word_page;
    } else if (destination==contentStatus.search_page) {
        search_page.style.display = "flex";
        nowStatus = contentStatus.search_page;
    };
};
switchContent(contentStatus.search_page);

let switch_content_word_page = document.getElementById("switch_content_word_page");
switch_content_word_page.addEventListener("click", event=>{
    switchContent(contentStatus.word_page);
});
let switch_content_search_page = document.getElementById("switch_content_search_page");
switch_content_search_page.addEventListener("click", event=>{
    switchContent(contentStatus.search_page);
});