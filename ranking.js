

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

var json;


function fazRanking(request,response){
    let body = '';
    let query;
    var file= "./ranking.json";
    request
    .on('data', (chunk) => { body += chunk;  })
    .on('end', () => {
        try {
          var dic = {jorge:{victories:40,games:70} , angelo:{victories:10,games:100}};
          fs.stat(file, function (erro){
            if(erro)
              fs.writeFile(file, JSON.stringify(dic), "utf8",(error)=>{if(error) throw error;});

             fs.readFile(file, 'utf8', function readFileCallback(err, data){
                  if (err){
                      console.log(err);
                  } else {
                      try {
                        var rankData = JSON.parse(data);
                        var newA = new Array() ;
                        for(let user in rankData){
                          newA.push({
                            "nick":user,"victories":rankData[user]["victories"],"games":rankData[user]["games"]
                          });
                        }
                          newA.sort((a,b)=>(a.victories>b.victories) ? -1 :
                              (a.victories==b.victories) ? (
                                (a.games<b.games) ? -1 :
                                (a.games==b.games) ? 0:1
                              ) :1);

                        response.writeHead(200, { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': '*' });
                        response.write(JSON.stringify({ranking:newA}));
                        response.end("\n\n");
                      }
                    catch(err){  }
                  }
              });
          });
        }
        catch(err) { /* erros de JSON */ }
    })
    .on('error', (err) => { console.log(err.message); });
}

module.exports.fazRanking = fazRanking;
