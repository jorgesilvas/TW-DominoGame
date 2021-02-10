const http = require('http');
const register = require('./register');
const ranking = require('./ranking');
const path = require('path');
const url = require('url');

var game = [];
const servidor = http.createServer(function(request, response){
	const parsedUrl = url.parse(request.url,true);
    const pathName = parsedUrl.pathname;

    switch(request.method){
        case 'POST':
            switch(pathName){
                case '/register':
                    register.fazRegister(request,response);
                    break;
                case '/ranking':
                    ranking.fazRanking(request,response);
                    break;
                default:
                    answer = 'Erro';
            }
    }

});

servidor.listen(8116);
