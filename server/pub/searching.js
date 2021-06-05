let now_url = window.location.protocol+"//"+window.location.host;
let search = document.getElementById("search");
let search_icon = document.getElementById("search_icon");
let search_big = document.getElementById("search_big");
let search_icon_big = document.getElementById("search_icon_big");
let search_content_temp = "";
let word_data = {};
let exchange_table = [
    ["p","Past Tense"],
    ["d","Past Participle"],
    ["i","Present Participle"],
    ["3","Present (Third Person Singular)"],
    ["r","Comparative"],
    ["t","Superlative"],
    ["s","Plural"],
    ["0","Lemma"]
];
let meaning_type_class_table = [
    ["n.","noun"],
    ["v.","verb"],
    ["vi.","verb"],
    ["vt.","verb_transitive"],
    ["adj.","adjective"],
    ["a.","adjective"],
    ["adv.","adverb"],
    ["prep.","preposition"],
    ["conj.","conjunction"],
    ["r.","adverb"],
    ["s.","adjective"],
    ["n","noun"],
    ["v","verb"],
    ["vi","verb"],
    ["vt","verb_transitive"],
    ["adj","adjective"],
    ["a","adjective"],
    ["adv","adverb"],
    ["prep","preposition"],
    ["conj","conjunction"],
    ["r","adverb"],
    ["s","adjective"],
]


var findWord = function (query="-1") {
    // switchContent(contentStatus.search_page);
    search_big.innerText = search_content_temp;
    //TODO:添加搜索处理机制
    //TODO:删除下面的占位置用的设施

    // TODO:删除下面的测试用代码添加真正的搜索处理
    if(query=="-1") query=search_big.innerText;
    fetch(now_url+"/word_data?id="+query)
        .then(response=>{
            return response.json()
        })
        .then(myJson=>{
            word_data=myJson;
            document.querySelector(".word_id").innerText=word_data.id.toString();
            document.querySelector(".word_title").innerText=word_data.word;
            document.querySelector(".IPA").innerText=word_data.phonetic;
            let derivatives = document.querySelector(".derivatives");
            derivatives.innerHTML="";
            word_data.exchange.forEach(e=>{
                if((e[0]!="1") && (e[0]!="") && (e[1]!=undefined) && (e[0]!="f")) {
                    try{exchange_table.forEach(t=>{
                        let e0 = e[0];
                        e[0]=e[0].replace(t[0],t[1]);
                        if(e0!=e[0]){
                            throw new Error("break");
                        }
                    });}catch(e){
                        if (e.message !== "break") throw e;
                    }
                    let derivative_type = document.createElement("span");
                    derivative_type.classList.add("derivative_type");
                    derivative_type.innerText=e[0];
                    let derivative_word = document.createElement("a");
                    derivative_word.classList.add("derivative_word");
                    derivative_word.innerText=e[1];
                    let derivative = document.createElement("div");
                    derivative.classList.add("derivative");
                    derivative.appendChild(derivative_type);
                    derivative.appendChild(derivative_word);
                    derivatives.appendChild(derivative);
                };
            });
            let lastType = ""
            let meanings = document.querySelector(".meanings");
            meanings.innerHTML="";
            let meaning_id = 1;
            word_data.translation.forEach(t=>{
                if(true){
                    let meaning = document.createElement("div");
                    let meaningType = document.createElement("span");
                    let meaning_description = document.createElement("span");
                    let meaning_t = "";
                    try{meaning_type_class_table.forEach(m=>{
                        let t0 = t[0];
                        meaning_t=t[0].replace(m[0],m[1]);
                        if(t0!=meaning_t){
                            throw new Error("break");
                        }
                    });}catch(e){
                        if (e.message !== "break") throw e;
                    };
                    
                    if(meaning_t!="") {
                        meaningType.classList.add(meaning_t);
                        meaningType.classList.add("meaning_type");
                    }else{
                        meaningType.classList.add("hidden");
                    }
                    meaningType.innerText = t[0];
                    if(t[0]==lastType) {
                        meaningType.classList.add("hidden")
                    } else {
                        meaning.style.marginTop="5px";
                        lastType=t[0];
                        meaning_description.classList.add("strong");
                    };
                    
                    meaning_description.classList.add("meaning_description");
                    meaning_description.innerText = meaning_id.toString()+". "+t[1];

                    meaning.appendChild(meaningType);
                    meaning.appendChild(meaning_description);
                    meanings.appendChild(meaning);
                    meaning_id+=1;
                }
            })
            switchContent(contentStatus.word_page);
        });
};

search.addEventListener("keydown", event=>{
    search.innerText.replaceAll("\n","");
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
    search_big.innerText.replaceAll("\n","");
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


let wordId = (document.querySelector("#wordId").innerHTML);
console.log(wordId);
if(wordId!=-1){
    findWord(wordId)
}