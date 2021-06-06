const jwt = require('jsonwebtoken');

function verifyToken(req, res) {
    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader && authorizationHeader.split(' ')[1]

    if (token == null) {
        var response = {};
        response.statusCode = 401;
        response.msg = "Authorization token not found";
        return response;
    } else {
        var response = {};
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            
            if (err) {
                response.statusCode = 401;
                response.msg = "Invalid Authorization token!!!";
            }
            else {
                console.log("No error ")
                req.user = user;
                response.statusCode = 200;
                response.msg = "Successfully Authenticated!!!";
                response.user = user;
            }
        });
        return response;
    }
}
module.exports = { verifyToken }