const urlinicial = "http://twserver.alunos.dcc.fc.up.pt:8116/";
//const urlinicial = "http://localhost:8116/"
let gameId=null;
var vart,flag=0;
var maoplayer;
var nicktmp;
var passtmp;
var turn;
var tabuleiro2 = document.getElementById("divContenttextonline");
var maoadversario=document.getElementById("jogoAdversarioOnline");
var monte = document.getElementById("mnt2");
var inputData;
var vt = [];
var tamanhoUp;
var terminais=[];
var pecasmnt;
var evtSource;
var x=0;
var rows;
var columns;






function register(nick,pass){
  const url = urlinicial + "register";
  inputData= {"nick": nick, "pass": pass};
  postData(url,inputData)
  .then(data => {
    console.log(JSON.stringify(data));
    if( data.error != undefined){
      alert(data.error);

    }
    else{
      x=document.getElementById("shownick2");
      document.getElementById("shownick").style.visibility = "visible";
      x.innerHTML = username;
    }
  })
  .catch(console.log);
}


function postData(url, data = {}){
  return fetch(url, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .catch(console.log);
}

function join(groupId,nick,pass){ //join


  const url=urlinicial + "join";
  inputData = {"group": groupId, "nick": nick, "pass": pass};
  postData(url, inputData)
  .then(data => {
    console.log("Join function answer: " + JSON.stringify(data));
    if(data.error != undefined)
    {
      alert(data.error);

    }
    else {
      gameId=data.game;
      nicktmp=nick;
      passtmp=pass;
      maoplayer=data.hand;
      update(nick, data.game);
    }
    })
  .catch(console.log);
}

function playerhandonline(maoplayer){
  var tiles=[];
  var mao=document.getElementById("jogoPlayerOnline");
  var length=0;
  var lengtharray=maoplayer.length;
  for(var flag in maoplayer){
    if(maoplayer.hasOwnProperty(flag)){
      length++;
    }
  }
  var newspan=document.createElement('span');
  if(mao.innerHTML != ""){
    mao.innerHTML="  ";
  }
  tiles=convertepeca(maoplayer);
  var tiles2=[];
  tiles2 = maoplayer;
  for(var i=0;i<lengtharray;i++){
    mao.innerHTML += "<span onclick='jogaonline("+tiles2[i]+")'>"+"&#"+tiles[i]+";"+"     "+"</span>";
  }
}


function jogaonline(a1,a2){
  var tilesnew = [a1,a2];
  notify(tilesnew);
}

function convertepeca(maoplayer){
  var i;
  var y=[];
  var tamanho;
  tamanho=maoplayer.length;
  for(i=0;i<tamanho;i++){
    y[i]=127025+maoplayer[i][1]*7+maoplayer[i][0];
  }
  return y;
}

function convertepecatabuleiro(array){
  y=127025+array[0]*7+array[1];
  return y;
}

document.getElementById("leave2").onclick= function leave(){
  const url = urlinicial + "leave";
  inputData = {"nick": nicktmp, "pass": passtmp, "game": gameId};
  postData(url, inputData)
  .then(data => {
    console.log("Leave function answer: " + JSON.stringify(data));
    if(data.error != undefined)
    {
      alert(data.error);

    }
    evtSource.close();
  })
  .catch(console.log);
}


document.getElementById("passarvezonline").onclick= function(){
  if(pecasmnt==0){
    for(var i=0;i<maoplayer.length;i++){
    if(maoplayer[i][0]==terminais[0] || maoplayer[i][0]==terminais[1] || maoplayer[i][1]==terminais[0] || maoplayer[i][1]==terminais[1]){     //VAI VER SE HÁ PEÇAS QUE ENCAIXAM
      return;
      }
    }
      notify(undefined,undefined,"skip");
  }

  else{
    alert("ainda existem peças no monte");
  }
}



function notify(piece,side,skip){
  const url = urlinicial + "notify";

  if(side != undefined){
     inputData = {"nick": nicktmp, "pass": passtmp, "game": gameId, "piece": piece, "side": side};
  }
  else if(skip!=undefined){
    inputData = {"nick": nicktmp, "pass": passtmp, "game": gameId, "skip": skip};

  }
  else{
     inputData = {"nick": nicktmp, "pass": passtmp, "game": gameId, "piece": piece};
  }
  postData(url, inputData)
  .then(data => {
    console.log("Notify function answer: " + JSON.stringify(data));
    if(data.error != undefined)
    {
      alert(data.error);

    }
    else if(piece==null){
      maoplayer.push(data.piece);
      playerhandonline(maoplayer);
    }
    else if(data.side != undefined){
        lado(piece);
        removetile(piece);
    }
    else{removetile(piece);}
  })
  .catch(console.log);
}


function iraomonteonline(maoplayer){
  var flag=0;

  for(var i=0;i<maoplayer.length;i++){
    if(maoplayer[i][0]==terminais[0] || maoplayer[i][0]==terminais[1] || maoplayer[i][1]==terminais[0] || maoplayer[i][1]==terminais[1]){     //VAI VER SE HÁ PEÇAS QUE ENCAIXAM
    alert("Tem uma peça que pode jogar");
    flag=1;
    }
  }
  if(flag==0){
    piece=null;
    notify(piece);
  }
}



document.getElementById("ranking").onclick=function ranking() {
  document.getElementById("leaderModal").style.display = "block";
  var temp=document.getElementById("ranking2");
  const url = urlinicial + "ranking";
  const inputData = {"size": {"rows": rows, "columns": columns} };
  postData(url, inputData)
  .then(data => {
    console.log(JSON.stringify(data));


    if(data.error != undefined)
    {
      alert(data.error);

    }
    else {
      tmp=document.getElementById("rankingboard");
      if(tmp.innerHTML != ""){
        tmp.innerHTML="";
      }
      console.log(data.ranking);
      let size=0;
      if(data.ranking.length>=10)size=10;
      else size=data.ranking.length;
      for(var i=0;i<size;i++){
        for (var i in data.ranking) {
          var tr = document.createElement('tr');
          var td = document.createElement('td');
          td.setAttribute("class","centerTextInTable");
          td.innerHTML = data.ranking[i].nick;
          tr.appendChild(td);
          td = document.createElement('td');
          td.setAttribute("class","centerTextInTable");
          td.innerHTML = data.ranking[i].victories;
          tr.appendChild(td);
          td = document.createElement('td');
          td.setAttribute("class","centerTextInTable");
          td.innerHTML = data.ranking[i].games;
          tr.appendChild(td);
          tmp.appendChild(tr);
      }
    }
  }
})
  .catch(console.log);
}


function imprimeadversario(vt,tamanhoUp){
  if(maoadversario.innerHTML != ""){
    maoadversario.innerHTML="";
  }
  if(vt[0]===tamanhoUp){
    for(var  i=0;i<vt[1];i++){
      maoadversario.innerHTML += "<span>"+'&#127074;'+"     "+"</span>";
    }
  }
  else if(vt[1]===tamanhoUp){
    for(var  i=0;i<vt[0];i++){
      maoadversario.innerHTML += "<span>"+'&#127074;'+"     "+"</span>";
    }
  }
}

function printtabuleiro2(array){
    var arraytmp=[];
  if(tabuleiro2.innerHTML != ""){
    tabuleiro2.innerHTML="";
  }

  for(var j=0;j<array.length;j++){
    arraytmp[j]=convertepecatabuleiro(array[j]);
  }
  for(var i=0;i<array.length;i++){
    tabuleiro2.innerHTML += "<span>"+ ""+"&#"+arraytmp[i]+";"+"</span>";
  }
}

  function removetile(piece){
    for(var i=0;i<maoplayer.length;i++){
      if((maoplayer[i][0]==piece[0] && maoplayer[i][1]==piece[1]) || (maoplayer[i][0]==piece[1] && maoplayer[i][1]==piece[0])){
        maoplayer.splice(i,1);
        tamanhoUp--;
        playerhandonline(maoplayer);
        imprimeadversario(vt,tamanhoUp);
      }
    }
  }

function lado(piece){
  document.getElementById("choicemodal").style.display = "block";

  document.getElementById("esc-esq").onclick = function (){
    var esquerda;
    esquerda="start";
    notify(piece,esquerda);
    closeSpan("choicemodal");

  }
  document.getElementById("esc-dir").onclick = function (){
    var direita;
    direita="end";
    notify(piece,direita);
    closeSpan("choicemodal");

  }
}


function update(nick,gameId){
  const url = urlinicial + "update?nick=" + nick + "&game=" + gameId;
  evtSource = new EventSource(url);
  evtSource.onmessage = function(e){

    var tamanhoarray=0;
    console.log("update function answer: " + JSON.stringify(e.data));
    var tmp = JSON.parse(e.data);

    if(tmp.turn != undefined){
      var tmp2 = tmp.board;
      pecasmnt=tmp2["stock"];
      turn = tmp.turn;
      printtabuleiro2(tmp2.line);
      vt = Object.values(tmp2["count"]);
      tamanhoUp=maoplayer.length;
      imprimeadversario(vt,tamanhoUp);
      playerhandonline(maoplayer);
      printtabuleiro2(tmp2.line);

      if(tmp2["line"]!=""){
        terminais[0]=Object.values(tmp2["line"]) [0] [0];
        terminais[1]=Object.values(tmp2["line"]) [(tmp2.line.length)-1] [1];
      }
    }


    if(tmp["winner"] != null){
    if(tmp["winner"] == nicktmp){
      document.getElementById("ganhoumodal").style.display = "block";
      gameId = null;
      evtSource.close();
    }
    else if(tmp["winner"] != nicktmp){
      document.getElementById("perdeumodal").style.display = "block";
      gameId = null;
      evtSource.close();
      }
    }
  }
}
