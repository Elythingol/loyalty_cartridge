'use strict';

var server = require('server');

function todoService() {
    var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
    var todoService =  LocalServiceRegistry.createService('Todo', {
        createRequest: function(service) {
            service.setAuthentication('NONE');
            service.setRequestMethod('GET');
            //service.setURL(‘https://jsonplaceholder.typicode.com/todos/1’);
        },
        parseResponse: function(service, client) {
            return JSON.parse(client.text);
        },
        filterLogMessage: function(msg) {
            return msg;
        }
    });
    const result = todoService.call();
    if(!result.isOk()) {
        return {
            err: result.getErrorMessage()
        }
    }
    return {
        response: todoService.getResponse()
    }
}


server.get('Show', function (req, res, next) {
    const {err, response} = todoService();
    if(err) {
        res.print(err);
    } else {
        res.json(response);
    }
    next();
});

module.exports = server.exports();
