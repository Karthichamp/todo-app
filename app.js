const http = require('http');
const dotenv = require('dotenv');
const routes = require('./route');

const server = http.createServer((req,res)=>{
    dotenv.config();
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    routes.routing(req).then(response=> {
        if(response.statusCode!= undefined){
            res.statusCode = response.statusCode;
        }
        res.end(JSON.stringify(response));
});
}).listen(process.env.PORT||3000);

module.exports =  server;