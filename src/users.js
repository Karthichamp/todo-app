const fs = require('fs');
const jwt = require('jsonwebtoken');
const userDataFile = './data/users.json';

let data = fs.readFileSync(userDataFile);
let users = JSON.parse(data) ;

function authenticate(request){
    var token;
    var response={};
    users.filter((user)=>{
        if(user.username==request.username && user.password==request.password){
            console.log("User is authenticated");
            token=generateJWTToken(user);
            response['statusCode']=200;
            response['token']=token;
        }
        else{
            response['statusCode']=401;
            response['msg']="Invalid user credentials"
        }
    });
    return response;
}

function generateJWTToken(user){
    return jwt.sign({username:user.username}, process.env.TOKEN_SECRET, { expiresIn: '300s' });
}

module.exports = {
    authenticate
}