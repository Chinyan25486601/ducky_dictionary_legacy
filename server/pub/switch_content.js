let contentStatus = {
    word_page: 0,
    search_page: 1,
    setting_page: 2
};
let nowStatus = contentStatus.search_page;

let word_page = document.getElementById("word_page");
let search_page = document.getElementById("search_page");
let setting_page = document.getElementById("setting_page");

let switchContent = function (destination) {
    // and so on...
    if(nowStatus==contentStatus.word_page){
        word_page.style.display = "none";
    } else if (nowStatus==contentStatus.search_page) {
        search_page.style.display = "none";
    } else if (nowStatus==contentStatus.setting_page) {
        setting_page.style.display = "none"
    };
    if(destination==contentStatus.word_page){
        word_page.style.display = "block";
        nowStatus = contentStatus.word_page;
    } else if (destination==contentStatus.search_page) {
        search_page.style.display = "flex";
        nowStatus = contentStatus.search_page;
    } else if (destination==contentStatus.setting_page) {
        setting_page.style.display = "block";
        nowStatus = contentStatus.setting_page;
    };
};
switchContent(contentStatus.word_page);

document.getElementById("switch_content_search_page").addEventListener("click", event=>{
    switchContent(contentStatus.search_page);
});

document.getElementById("settings").addEventListener("click",event=>{
    switchContent(contentStatus.setting_page)
})

console.log("switch_content.js loaded successfully.")