const express = require("express");
const ejs = require("ejs");
const path = require("path")

class Server {
    constructor(port=14514){
        this.app = express();
        this.app.use(express.static(__dirname+""))
        this.app.set("views", path.join(__dirname));
        this.app.set("view engine", "ejs");
        this.app.get("/",(req,res)=>{
            // 可以获得请求后的参数
            // 示例：http://localhost:14514/?a=114514&b=1919810
            console.log(req.query)
            // { a: '114514', b: '1919810' }
        });
        this.app.listen(port,()=>{

        });
    }
}

if (require.main === module){
    let server = new Server();
};