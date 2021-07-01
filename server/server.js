const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const { query } = require("express");

class dictServer {
    constructor(port=14514){
        this.word_bank=[];
        this.word_bank.length = 0;
        this.load_wordbank();
        this.app = express();
        this.app.use(express.static(__dirname+""))
        this.app.set("views", path.join(__dirname));
        this.app.set("view engine", "ejs");
        this.app.get("/",(req,res)=>{
            res.render("wordPage",{wordId:"-1"})
        });
        this.app.get("/word_page",(req,res)=>{
            let q = req.query;
            if(q.hasOwnProperty("id")){
                res.render("wordPage",{wordId:q.id});
            }
        })
        this.app.get("/word_data",(req,res)=>{
            let q = req.query;
            if(q.hasOwnProperty("id")){
                res.send(this.word_bank[q.id])
            }
        });
        this.app.get("/word_bank_data",(req,res)=>{
            let q = req.query;
            // TODO:删除掉||true
            if(q.hasOwnProperty("name") || true){
                // do sth
                if(q.name=="zk_words" || true){
                    res.send({
                        name: "zk_words",
                        word_count: this.word_count
                    });
                    console.log("hah")
                }
            }
        });
        this.app.listen(port,()=>{

        });
        console.log("Server listening at port "+port.toString())
    };
    load_wordbank(){
        fs.readFile(__dirname+"\\..\\dict_source\\zk_words.json","utf-8",(err,data)=>{
            this.word_bank = JSON.parse(data);
            this.word_count = this.word_bank.length;
            console.log("Successfully loaded zk_words.json");
            console.log("word_count: "+this.word_count);
        });
    };
}

if (require.main === module){
    let server = new dictServer();
}

module.exports = {
    dictServer: dictServer
}