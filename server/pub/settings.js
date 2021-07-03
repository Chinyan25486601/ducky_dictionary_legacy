let zk_words = document.getElementById("zk_words");
let gk_words = document.getElementById("gk_words");
let word_bank_sources = [zk_words,gk_words]
let change_word_bank_source = function(word_bank_name){
    return fetch(now_url+"/change_word_bank?name="+word_bank_name)
        .then(response=>{
            return response.json()
        })
        .then(json=>{
            let status = json.status;
            if(json.status==0){
                getWordBankData();
            }
            return status
        })
}
let init_word_bank_source_select = function(){
    zk_words.addEventListener("click",event=>{
        if(word_bank_data.name=="zk_words") return;
        change_word_bank_source("zk_words").then(json=>{
            word_bank_sources.forEach(e=>{
                e.classList.remove("selected")
            })
            zk_words.classList.add("selected");
        })
    });
    gk_words.addEventListener("click",event=>{
        if(word_bank_data.name=="gk_words") return;
        change_word_bank_source("gk_words").then(json=>{
            word_bank_sources.forEach(e=>{
                e.classList.remove("selected")
            })
            gk_words.classList.add("selected");
        })
    });
    change_word_bank_source("zk_words").then(json=>{
        word_bank_sources.forEach(e=>{
            e.classList.remove("selected")
        })
        zk_words.classList.add("selected");
    });
};
init_word_bank_source_select()