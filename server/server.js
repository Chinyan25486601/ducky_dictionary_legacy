const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const { query } = require("express");

class dictServer {
    constructor(port=14514){
        this.word_bank=[];
        this.word_bank_data = {name:null,word_count:0};
        this.load_wordbank("zk_words");
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
            };
            if(q.hasOwnProperty("word")){
                let status = false;
                this.word_bank.forEach(data=>{
                    if(data.word==q.word){
                        res.send(data);
                        status = true;
                    }
                });
                if(status==false){
                    res.send({id: -1});
                }
            }
        });
        this.app.get("/word_bank_data",(req,res)=>{
            res.send(this.word_bank_data);
        });
        this.app.get("/change_word_bank",(req,res)=>{
            let q = req.query;
            if(q.hasOwnProperty("name")){
                if(q.name=="zk_words"){
                    this.load_wordbank("zk_words");
                    res.send({status:0})
                } else if(q.name=="gk_words"){
                    this.load_wordbank("gk_words");
                    res.send({status:0})
                } else {
                    res.send({status:1})
                }
            }
        });
        this.app.listen(port,()=>{

        });
        console.log("Server listening at port "+port.toString())
    };
    load_wordbank(bankname){
        this.word_bank=[];
        this.word_bank_data = {name:null,word_count:0};
        if(bankname==="zk_words"){
            fs.readFile(__dirname+"\\..\\dict_source\\zk_words.json","utf-8",(err,data)=>{
                this.word_bank = JSON.parse(data);
                this.word_bank_data.word_count = this.word_bank.length;
                console.log("Successfully loaded zk_words.json");
                console.log("word_count: "+this.word_bank_data.word_count);
            });
            this.word_bank_data.name = bankname;
        }else if(bankname==="gk_words"){
            fs.readFile(__dirname+"\\..\\dict_source\\gk_words.json","utf-8",(err,data)=>{
                this.word_bank = JSON.parse(data);
                this.word_bank_data.word_count = this.word_bank.length;
                console.log("Successfully loaded gk_words.json");
                console.log("word_count: "+this.word_bank_data.word_count);
            });
            this.word_bank_data.name = bankname;
        }
    };
}

if (require.main === module){
    let server = new dictServer();
}

module.exports = {
    dictServer: dictServer
}