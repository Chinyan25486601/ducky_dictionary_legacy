let now_url = window.location.protocol+"//"+window.location.host;
let search = document.getElementById("search");
let search_icon = document.getElementById("search_icon");
let search_big = document.getElementById("search_big");
let search_icon_big = document.getElementById("search_icon_big");
let last_word = document.getElementById("last_word");
let next_word = document.getElementById("next_word");
let random_word = document.getElementById("random_word");
let settings = document.getElementById("settings")
let search_content_temp = "";
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
    ["art.","article"],
    ["art","article"],
    ["num.","number"],
    ["num","number"],
    ["n.","noun"],
    ["v.","verb"],
    ["vi.","verb"],
    ["aux.","verb"],
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
    ["s","adjective"]
]
let nowWordId = 0;
let word_bank_data = {name:null,word_count:0};

let getWordBankData = function(){
    fetch(now_url+"/word_bank_data")
        .then(response=>{
            return response.json()
        })
        .then(myJson=>{
            word_bank_data = myJson;
            console.log(word_bank_data)
        })
}

getWordBankData();

let installWordData = function(word_data){
    setStarFunc(false)();
    document.querySelector(".word_id").innerText=word_data.id.toString();
    document.querySelector(".word_title").innerText=word_data.word;
    let IPA = document.querySelector(".IPA");
    if(word_data.phonetic==""){
        IPA.style.display="none"
    } else {
        IPA.style.display="inherit"
        IPA.innerHTML=word_data.phonetic;
    }
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
            meaning_description.innerText = meaning_id.toString()+". "+t[1]
            meaning.appendChild(meaningType);
            meaning.appendChild(meaning_description);
            meanings.appendChild(meaning);
            meaning_id+=1;
        }
    });
    nowWordId=word_data.id;
    console.log(word_data);
    if(word_data.favourite==true){
        setStarFunc(true)()
    } else {
        setStarFunc(false)()
    }
    switchContent(contentStatus.word_page);
}

let getandInstallWordDataById = function(id){
    fetch(now_url+"/word_data?id="+id.toString())
        .then(response=>{
            return response.json()
        })
        .then(myJson=>{
            installWordData(myJson);
        });
}

let getandInstallWordDataByWord = function(word){
    fetch(now_url+"/word_data?word="+word)
        .then(response=>{
            return response.json()
        })
        .then(myJson=>{
            if(myJson.id==-1){
                return;
            }
            console.log(myJson);
            installWordData(myJson);
        });
}

let findWord = function (query="-1") {
    // switchContent(contentStatus.search_page);
    search_big.innerText = search_content_temp;

    if(query=="-1") query=search_big.innerText;
    if(query.trim()=="") return;

    let number_patt = /^[#,]\d{1,}$/;
    let number_patt_result = number_patt.exec(query);
    if(number_patt_result!=null){
        getandInstallWordDataById(Number(number_patt_result[0].slice(1)));
    } else {
        getandInstallWordDataByWord(query);
    }
};

let wordForward = function(direction=true){
    if(nowWordId==0 && direction==false) return;
    // True=>+1 False=> -1
    let delta = Number(direction)*2-1;
    getandInstallWordDataById(delta+nowWordId);
}

let getRandomWord = function(event=null){
    getandInstallWordDataById(Math.floor(Math.random() * word_bank_data.word_count));
}

search.addEventListener("keydown", event=>{
    search.innerText.replaceAll("\n","");
    if(event.keyCode=="13"){
        event.preventDefault();
        search_content_temp = search.innerText;
        // console.log(search_content_temp);
        findWord(search_content_temp);
        search.innerHTML="";
    }else if(event.keyCode=="39"){
        wordForward();
    }else if(event.keyCode=="37"){
        wordForward(false)
    }
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

random_word.addEventListener("click",getRandomWord)

last_word.addEventListener("click",event=>(wordForward(false)));
next_word.addEventListener("click",event=>(wordForward()));

// let query = (document.querySelector("#wordId").innerHTML);
// console.log(query);
// if(query!=-1){
//     findWord(query)
// } else {
//     getandInstallWordDataById(1);
// }
getandInstallWordDataById(1);