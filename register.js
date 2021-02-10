

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

var registerData = {
    usuarios: []
};

var json;
var registerFile = path.resolve(__dirname, 'usuarios.json');

function fazRegister(request,response){
    let body = '';
    let query;
    var flag = true;
    request
    .on('data', (chunk) => { body += chunk;  })
    .on('end', () => {
        try {
            query = JSON.parse(body);
            fs.readFile(registerFile, 'utf8' ,function readFileCallback(err, data){
                if(err){
                    alert(err);
                }
                else{
                    registerData = JSON.parse(data);
                    registerData.usuarios.forEach(function(value){
                        if(value.nick == query.nick){
                            flag = false;
                            const hashPass = crypto
                            	.createHash('md5')
                            	.update(query.pass)
                            	.digest('hex');

                            if(value.pass == hashPass){
                                var answer = {};
                                response.writeHead(200, { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': '*' });
                                response.end(JSON.stringify(answer) + '\n\n');
                            }else{
                                var answer = {error: 'User registered with a different password'};
                                response.writeHead(401, { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': '*' });
                                response.end(JSON.stringify(answer) + '\n\n');
                            }
                        }
                    });
                    if(flag){
                        const hashPass = crypto
                        		.createHash('md5')
                        		.update(query.pass)
                      			.digest('hex');

                        registerData.usuarios.push({nick: query.nick, pass: hashPass});
                        json = JSON.stringify(registerData,null,4);
                        fs.writeFile(registerFile, json, 'utf8', (err) =>{
                            if(err) throw err;
                            var answer = {};
                            response.writeHead(200, { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': '*' });
                            response.end(JSON.stringify(answer) + '\n\n');
                        });
                    }
                }
            });
        }
        catch(err) {}
    })

    .on('error', (err) => { console.log(err.message); });
}

module.exports.fazRegister = fazRegister;
