const fs = require('fs');
const dataFile = './data/todos.json';

let data = fs.readFileSync(dataFile);
let todos = JSON.parse(data) ;

let lastId = todos.length === 0 ? 0 : todos[todos.length-1].id;

function getAllTodos(){
    data = fs.readFileSync(dataFile);
    todos = JSON.parse(data);
    if(todos.length === 0){
        todos['statusCode']=401;
    }
    else{
        todos['statusCode']=200;
    }
    return todos;
}

function getTodo(id){
    var response=todos.filter((todo)=>{
        return todo.id==id;
    });
    if(response.length==0){
        response={};
        response['statusCode']=404;
        response['msg']="Todo not found";
    }
    else{
        response['statusCode']=200;
    }
    return response;
}

function createTodo(request){
    var response={};
    request['id']=lastId+1;
    todos.push(request);
    return new Promise(function(resolve,reject){fs.writeFile(dataFile,JSON.stringify(todos),(err)=>{
        if(err){
            response['statusCode']=400;
            response['msg']="Todo is not saved properly"
            reject(response);
        }
        else{
            response['statusCode']=200;
            response['msg']="Todo is saved successfully"
            resolve(response);
        }
    });});
}

function updateTodo(request,id){
    var response={};
    var todo=todos.find((todo)=>{
        if(todo.id==id){
            if(request.todoTitle!==undefined){
                todo.todoTitle=request.todoTitle;
            }
            if(request.description!==undefined){
                todo.description=request.description;
            }
            return todo.id;
        }
    });
    if(todo!== undefined){
        return new Promise(function(resolve,reject){fs.writeFile(dataFile,JSON.stringify(todos),(err)=>{
            if(err){
                response['statusCode']=400;
                response['msg']="Todo is not updated properly"
                reject(response);
            }
            else{
                response['statusCode']=200;
                response['msg']="Todo is updated successfully"
                resolve(response);
            }
        });});
    }
    else{
        response['statusCode']=404;
        response['msg']="Todo not found";
        return response;
    }
}

function deleteTodo(id){
    var response={};
    var index = todos.findIndex((todo)=>{
        return todo.id==id;
    });
    console.log('index:',index)
    if(index!=-1){
        todos.splice(index,1);
        return new Promise(function(resolve,reject){fs.writeFile(dataFile,JSON.stringify(todos),(err)=>{
            if(err){
                response['statusCode']=400;
                response['msg']="Todo is not deleted properly"
                reject(response);
            }
            else{
                response['statusCode']=200;
                response['msg']="Todo is deleted successfully"
                resolve(response);
            }
        });});
    }
    else{
        response['statusCode']=404;
        response['msg']="Todo not found";
        return response;
    }
}

module.exports = {
    createTodo,
    getAllTodos,
    getTodo,
    updateTodo,
    deleteTodo
}