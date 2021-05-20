const express = require("express");
const ejs = require("ejs");
const path = require("path")

class dictServer {
    constructor(port=14514){
        this.app = express();
        this.app.use(express.static(__dirname+""))
        this.app.set("views", path.join(__dirname));
        this.app.set("view engine", "ejs");
        this.app.get("/",(req,res)=>{
            res.render("wordPage",{})
        });
        this.app.listen(port,()=>{

        });
    }
}

if (require.main === module){
    let server = new dictServer();
}

module.exports = {
    dictServer: dictServer
}