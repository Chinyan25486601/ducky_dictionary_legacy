const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const { query } = require("express");

class dictServer {
    constructor(port=14514){
        this.word_bank=[];
        this.load_wordbank();
        this.app = express();
        this.app.use(express.static(__dirname+""))
        this.app.set("views", path.join(__dirname));
        this.app.set("view engine", "ejs");
        this.app.get("/",(req,res)=>{
            res.render("wordPage",{})
        });
        this.app.get("/word_data",(req,res)=>{
            let q = req.query;
            console.log(q);
            if(q.hasOwnProperty("id")){
                console.log(q.id);
                res.send(this.word_bank[q.id])
            }
        });
        this.app.listen(port,()=>{

        });
    };
    load_wordbank(){
        fs.readFile(__dirname+"\\..\\dict_source\\zk_words.json","utf-8",(err,data)=>{
            this.word_bank = JSON.parse(data);
            console.log("Successfully loaded zk_words.json")
        });
    };
}

if (require.main === module){
    let server = new dictServer();
}

module.exports = {
    dictServer: dictServer
}