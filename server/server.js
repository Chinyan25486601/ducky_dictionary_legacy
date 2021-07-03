const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const { query } = require("express");

class dictServer {
    constructor(port=14514){
        this.word_bank_file = {
            zk_words: __dirname+"\\..\\dict_source\\zk_words.json",
            gk_words: __dirname+"\\..\\dict_source\\gk_words.json"
        }
        this.word_bank=[];
        this.word_bank_data = {name:null,word_count:0};
        this.language = "en";
        this.load_wordbank("zk_words");
        this.favourites_file = __dirname+"\\favourites.json";
        this.favourites = []
        this.favourites_temp = []
        this.load_favourites();
        this.app = express();
        this.app.use(express.static(__dirname+""))
        this.app.set("views", path.join(__dirname));
        this.app.set("view engine", "ejs");
        this.app.get("/",(req,res)=>{
            // res.render("wordPage",{wordId:"-1"})
            res.render("wordPage")
        });
        // this.app.get("/word_page",(req,res)=>{
        //     let q = req.query;
        //     if(q.hasOwnProperty("id")){
        //         res.render("wordPage",{wordId:q.id});
        //     }
        // })
        this.app.get("/word_data",(req,res)=>{
            let q = req.query;
            if(q.hasOwnProperty("id")){
                let ret = this.word_bank[q.id];
                if(this.favourites.indexOf(ret.id)!=-1){
                    ret.favourite=true;
                } else {
                    ret.favourite=false;
                }
                res.send(ret)
            };
            if(q.hasOwnProperty("word")){
                let status = false;
                let return_data = []
                let ret = {};
                if(this.language=="en"){
                    if(q.word=="are" || q.word=="were"){
                        q.word="be";
                    }
                }
                this.word_bank.forEach(data=>{
                    if(data.word==q.word){
                        ret=data;
                        status = true;
                    } else {
                        data.exchange.forEach(exchange=>{
                            if(exchange[1]==q.word){
                                ret=data;
                                status = true;
                            }
                        });
                    };
                });
                if(status==true){
                    if(this.favourites.indexOf(ret.id)!=-1){
                        ret.favourite=true;
                    } else {
                        ret.favourite=false;
                    }
                    res.send(ret);
                } else {
                    res.send({id: -1, words: return_data});
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
        this.app.get("/add_favourite",(req,res)=>{
            let q = req.query;
            if(q.hasOwnProperty("id")){
                if(this.favourites.indexOf(Number(q.id))!=-1 || this.favourites_temp.indexOf(Number(q.id))!=-1){
                    res.send({status:0});
                    return;
                }
                this.favourites_temp.push(Number(q.id));
                console.log(this.favourites);
                console.log(this.favourites_temp);
                res.send({status:0});
                this.flush_favourites();
            }
        });
        this.app.get("/remove_favourite",(req,res)=>{
            let q = req.query;
            if(q.hasOwnProperty("id")){
                let favourites_temp_index = this.favourites_temp.indexOf(Number(q.id));
                let favourite_index = this.favourites.indexOf(Number(q.id));
                this.favourites_temp.splice();
                console.log(this.favourites);
                console.log(this.favourites_temp);
                res.send({status:0});
            }
        })
        this.app.listen(port,()=>{

        });
        console.log("Server listening at port "+port.toString())
    };
    load_wordbank(bankname){
        this.word_bank=[];
        this.word_bank_data = {name:null,word_count:0};
        if(bankname==="zk_words"){
            fs.readFile(this.word_bank_file.zk_words,"utf-8",(err,data)=>{
                this.word_bank = JSON.parse(data);
                this.word_bank_data.word_count = this.word_bank.length;
                console.log("Successfully loaded zk_words.json");
                console.log("word_count: "+this.word_bank_data.word_count);
            });
            this.word_bank_data.name = bankname;
        }else if(bankname==="gk_words"){
            fs.readFile(this.word_bank_file.gk_words,"utf-8",(err,data)=>{
                this.word_bank = JSON.parse(data);
                this.word_bank_data.word_count = this.word_bank.length;
                console.log("Successfully loaded gk_words.json");
                console.log("word_count: "+this.word_bank_data.word_count);
            });
            this.word_bank_data.name = bankname;
        }
    };
    load_favourites(){
        let f = fs.openSync(this.favourites_file, "a");     // 如果文件不存在则创建文件
        fs.readFile(this.favourites_file,"utf-8",(err,data)=>{
            if(data.toString()==""){
                this.favourites=[];
                return;
            };
            this.favourites = JSON.parse(data);
        });
    };
    flush_favourites(){
        this.favourites_temp.forEach(f=>{
            this.favourites.push(f)
        })
        this.favourites_temp=[]
        console.log(this.favourites);
        fs.writeFile(this.favourites_file, JSON.stringify(this.favourites), (err,written,str)=>{});
    };
}

if (require.main === module){
    let server = new dictServer();
}

module.exports = {
    dictServer: dictServer
}