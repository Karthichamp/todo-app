let url = require('url');
const todo = require('./src/todos');
const userAuthenticate = require('./src/users');
const auth = require('./src/auth');

var routing = (req) => {
    return new Promise(function (resolve, reject) {
        let urlValue;
        if (req !== undefined) {
            urlValue = url.parse(req.url, true);
        }
        if (urlValue.pathname === '/authenticate' && req.method === 'POST') {
            req.on('data', data => {
                resolve(userAuthenticate.authenticate(JSON.parse(data)))
            });
        }
        else {
            var authStatus = auth.verifyToken(req);
            console.log("authStatus:", authStatus);
            if (authStatus.statusCode !== 401) {
                if (urlValue.pathname === '/' && req.method === 'GET') {
                    resolve(todo.getAllTodos());
                }
                if (urlValue.pathname === '/todo' && req.method === 'GET') {
                    resolve(todo.getTodo(urlValue.query.id));
                }
                if (urlValue.pathname === '/create' && req.method === 'POST') {
                    req.on('data', data => {
                        resolve(todo.createTodo(JSON.parse(data)))
                    });
                }
                if (urlValue.pathname === '/todo' && req.method === 'PUT') {
                    req.on('data', data => {
                        resolve(todo.updateTodo(JSON.parse(data), urlValue.query.id))
                    });
                }
                if (urlValue.pathname === '/todo' && req.method === 'DELETE') {
                    resolve(todo.deleteTodo(urlValue.query.id));
                }
            }
            else {
                resolve(authStatus);
            }
        }
    });
}

module.exports = {
    routing
};