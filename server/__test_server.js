"use strict"

const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const { query } = require("express");

class Server {
    constructor(port=14514){
        const raw_wordbank = fs.readFileSync(__dirname+"\\..\\dict_source\\zk_words_example.json","utf-8");
        const data = JSON.parse(raw_wordbank);
        console.log(data[0])

        this.app = express();
        this.app.use(express.static(__dirname+""))
        this.app.set("views", path.join(__dirname));
        this.app.set("view engine", "ejs");
        this.app.get("/word_data",(req,res)=>{
            // 可以获得请求后的参数
            // 示例：http://localhost:14514/?a=114514&b=1919810
            let query=req.query;
            console.log(query);
            // { a: '114514', b: '1919810' }
            if(query.hasOwnProperty("id")){
                console.log(data[query.id]);
                res.send(data[query.id]);
            } else {
                res.send({})
            }
            // 浏览器端：
            // fetch('http://localhost:14514/word_data?id=5')
            // .then(function(response) {
            //     return response.json();
            // })
            // .then(function(myJson) {
            //     console.log(myJson);
            // });
        });
        this.app.listen(port,()=>{

        });
    }
}

if (require.main === module){
    let server = new Server();
};