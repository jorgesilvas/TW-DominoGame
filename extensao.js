window.onclick = function(event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//2º trabalho
var username,password,vart,x;
function login(){
  console.log("entra1");
  username=document.getElementById("nickname").value;
  console.log(username);
  password=document.getElementById("pass").value;
  register(username,password);
}

function registernew(){
  console.log("entra2");
  username=document.getElementById("newnickname").value;
  password=document.getElementById("newpass").value;
  register(username,password);
}


//alterei pró 2º trabalho
function register1ºtrabalho(){
  document.getElementById("registerModal").style.display = "block";
  document.body.style.overflowY = "hidden";
}
function regras(){
  document.getElementById("myModal").style.display = "block";
  document.body.style.overflowY = "hidden";
}
function closeSpan(elem){
  document.getElementById(elem).style.display = "none";
}
function offline(){
  document.getElementById("jogarOffline").style.display = "block";
  document.body.style.overflowY = "hidden";
}
function online(){
  document.getElementById("jogarOnline").style.display = "block";
  document.body.style.overflowY = "hidden";
}
function chosegameid(){
  document.getElementById("gameId").style.display = "block";
  document.body.style.overflowY = "hidden";
}
function surrender(){
  document.getElementById("surrenderModal").style.display = "block";
  document.body.style.overflowY = "hidden";
}

var monte = ['&#127025;','&#127026;','&#127027;','&#127028;','&#127029;','&#127030;','&#127031;','&#127033;','&#127034;','&#127035;','&#127036;','&#127037;','&#127038;','&#127041;','&#127042;','&#127043;','&#127044;','&#127045;','&#127049;','&#127050;','&#127051;','&#127052;','&#127057;','&#127058;','&#127059;','&#127065;','&#127066;','&#127073;'];
var flagmonte=0;
var adversario = [];
var nossojogo = [];
var extremos =[];
var visitadoplayer = [];
var visitadoadversario=[];
var jogo=[];
var tabuleiro = document.getElementById("divContenttext");
var fim;
var verificateste;


//faz o sorteio das maos
function inicio(){
  var x=document.getElementById("jogoAdversario");
  var newspan=document.createElement('span');
  var i;
  for(i=0;i < 7;i++){
    var a=monte[Math.floor(Math.random()*monte.length)];
    adversario[adversario.length] = a;
    for(j=0;j<monte.length;j++){
      if(a==monte[j]){
        monte.splice(j,1);
      }
    }
  }
  var z=document.getElementById("jogoPlayer");
  for(i = 0;i < 7;i++){
    var a=monte[Math.floor(Math.random()*monte.length)];
    nossojogo[nossojogo.length]=a;
    for(j=0;j<monte.length;j++){
      if(a==monte[j]){
        monte.splice(j,1);
      }
    }
  }
  displayhands();
  primeiratile();
}

function logicPlacement(x,y){
  var j,i;
  var tileesq = [];
  var tiledir = [];
  var tileExtremos = [] ;
  var valoresq;
  var valordir;
  var ambos;
  var flag = 0;
  tileExtremos[0] = x;
  tileExtremos[1] = y;
  var tileesq = tilenumbersE(0);
  var tiledir = tilenumbersE(1);
  valoresq = tileesq[0];
  valordir = tiledir[1];

  if(tileExtremos[0] == valoresq || tileExtremos[0] == valordir || tileExtremos[1] == valoresq || tileExtremos[1] == valordir ){
    if(tileExtremos[0]== valoresq || tileExtremos[1] == valoresq){
      ambos=1;
      if(tileExtremos[0]== valordir || tileExtremos[1] == valordir) ambos=2;
      if(ambos==2) flag=1;
    }
  }
  if(tileExtremos[0] == valoresq || tileExtremos[0] == valordir || tileExtremos[1] == valoresq || tileExtremos[1] == valordir ){
     if(tileExtremos[0] == valoresq || tileExtremos[1] == valoresq) {
        if(tileExtremos[0] == valoresq) flag=1;
        else if(tileExtremos[1] == valoresq) flag=1;
    }
    else if(tileExtremos[0] == valordir || tileExtremos[1] == valordir) {
        if(tileExtremos[0] == valordir) flag=1;
        if(tileExtremos[1] == valordir) flag=1;
     }
  }
  return flag;
}


//usada quando precisamos de ir ao monte.. verifica se a tile que sai da para colocar no jogo para posteriormente usando tambem logicPlacement bloquear o monte
function handHasMatch(){
  for(let piece of nossojogo){
    var arr = tilenumbersteste(piece), x,y;
    [x,y] = [arr[0],arr[1]];
    if(logicPlacement(x,y)==1) return true;
  }
  return false;
}


//distribui as maos
function displayhands(){
  var x=document.getElementById("jogoAdversario");
  var newspan=document.createElement('span');
  var i;
  if(x.innerHTML!=""){
    x.innerHTML="";
  }
  for(i=0;i < adversario.length;i++){
    x.innerHTML+="<span >"+ "       " + '&#127074;' +"<span>";
  }
  var z=document.getElementById("jogoPlayer");
  if(z.innerHTML!=""){
    z.innerHTML="";
  }
  for(i = 0;i < nossojogo.length;i++){
    var x = tilenumbers(i);
    z.innerHTML+="<span onclick='jogaplayer("+x[0]+","+x[1]+")'>"+ "       " +nossojogo[i]+"</span>";
  }
  adversario.sort();
  nossojogo.sort();
}


//para defenir quem joga a primeira tile
function primeiratile(){
  if(adversario[adversario.length-1]>nossojogo[nossojogo.length-1]){
    var a = adversario[adversario.length-1];
    jogo.push(a);
    adversario.splice(adversario.length-1,1);
    displayhands();
    extremos[0]=a;
    extremos[1]=a;
    imprimetiles();
    return;
  }
  if(adversario[adversario.length-1]<nossojogo[nossojogo.length-1]){
    var a = nossojogo[nossojogo.length-1];
    jogo.push(nossojogo[nossojogo.length-1]);
    nossojogo.splice(nossojogo.length-1,1);
    displayhands();
    extremos[0]=a;
    extremos[1]=a;
    imprimetiles();
    jogaadversario();
  }
}

//Conta pontos e determina vencedor
function contapontos(){
    var i;
    var j;
    var a=[];
    var n=[];
    var contA=0;
    var contAaux;
    var contN=0;
    var contNaux;
    for(i=0 ; i < adversario.length;i++){
      a=tilenumbersAd(i);
      contAaux = Number(a[0])+Number(a[1]);
      contA= Number(contA) + Number(contAaux);
    }
    for(j=0 ; j < nossojogo.length;j++){
      n=tilenumbers(j);
      contNaux = Number(n[0])+Number(n[1]);
      contN= Number(contN) + Number(contNaux);
    }


    if(contN > contA){
      return perdeu();
    }
    if(contN == contA){
      alert("EMPATOU");
    }
    else{
      return ganhou();
    }
    return;
}


//Retira os numeros das tiles relativas ao array do adversario
function tilenumbersAd(i){
    var tile = adversario[i];
    var i,j;
    for(i=0;i<7;i++)
      for(j=0;j<7;j++)
        if(tile == '&#'+(127025+i*7+j)+';') return new Array(i,j);
    return;
}


//Retira os numeros das tiles relativas ao array do nosso jogo
function tilenumbers(i){
  var tile = nossojogo[i];
  var i,j;
  for(i=0;i<7;i++)
    for(j=0;j<7;j++)
      if(tile == '&#'+(127025+i*7+j)+';') return new Array(i,j);
  return;
}

//Retira os numeros das tiles , aqui nao é dado um indice mas sim uma tiles
function tilenumbersteste(a){
  var tile = a;
  var i,j;
  for(i=0;i<7;i++)
    for(j=0;j<7;j++)
      if(tile == '&#'+(127025+i*7+j)+';') return new Array(i,j);
  return;
}


//Retira os numeroas das tiles dos Extremos do jogo
function tilenumbersE(i){
  var tile = extremos[i];
  var i,j;
  for(i=0;i<7;i++)
    for(j=0;j<7;j++)
      if(tile == '&#'+(127025+i*7+j)+';') return new Array(i,j);
  return;
}


function inversa(x,y){
  	return "&#"+(127025+y*7+x)+";" ;
}

function colocacode(x,y){
  return "&#"+(127025+x*7+y)+";" ;
}


//Funcao para imprimir as tiles no tabuleiro
function imprimetiles(){
  var i;
  if(tabuleiro.innerHTML!="") tabuleiro.innerHTML="";
  for(i=0; i< jogo.length;i++){
  	tabuleiro.innerHTML += "<span>"+ "" +jogo[i]+"</span>";
  }
}

function retiraPosjogada(tile){
	var i;
	for(i=0;i<nossojogo.length;i++){
		if(nossojogo[i]==tile){
			nossojogo.splice(i,1); return;
		}
	}
}

function retiraPosjogadaAd(tile){
  var i;
  for(i=0;i<adversario.length;i++){
    if(adversario[i]==tile){
      adversario.splice(i,1); return;
    }
  }
}


//Verifica se apos uma jogada , o jogo pode ja determinar um vencedor
function verifica(){
  if (nossojogo.length==0){
  	displayhands();
    return ganhou();
  }
  if(adversario.length==0){
  	displayhands();
    return perdeu();
  }

  else{
  	verificateste=1;

  }

}


// relativa a gestao do nosso jogo , tiles que temos em mao.
function jogaplayer(x,y){
  var j;
  var i;
  var tileesq = [];
  var tiledir = [];
  var tileExtremos = [] ;
  var valoresq;
  var valordir;
  var ambos;
  var tag;
  tag = 0;
  tileExtremos[0] = x;
  tileExtremos[1] = y;
  var tileesq = tilenumbersE(0);
  var tiledir = tilenumbersE(1);
  valoresq = tileesq[0];
  valordir = tiledir[1];
  verificateste=0;

  	if(tileExtremos[0] == valoresq || tileExtremos[0] == valordir || tileExtremos[1] == valoresq || tileExtremos[1] == valordir ){
    	if(tileExtremos[0]== valoresq || tileExtremos[1] == valoresq){
      		ambos=1;
      		if(tileExtremos[0]== valordir || tileExtremos[1] == valordir){
        		ambos=2;
      		}
      		if(ambos==2){
        		choice(x,y,valordir,valoresq );
        		return ;
     		}
    	}
	}

 	if(tileExtremos[0] == valoresq || tileExtremos[0] == valordir || tileExtremos[1] == valoresq || tileExtremos[1] == valordir ){
  	 	if(tileExtremos[0] == valoresq || tileExtremos[1] == valoresq) {
  			if(tileExtremos[0] == valoresq){
	  		    jogo.unshift(inversa(x,y));
	  		    retiraPosjogada(colocacode(x,y));
	  		    extremos[0]=inversa(x,y);
	          	imprimetiles();
	          	verifica();
	          	if(verificateste==1)
	          		jogaadversario();
          		return;
  			}
  			else if(tileExtremos[1] == valoresq){
	  		    jogo.unshift(colocacode(x,y));
	  		    retiraPosjogada(colocacode(x,y));
	  		    extremos[0]=colocacode(x,y);
	      	  	imprimetiles();
	          	verifica();
	      	  	if(verificateste==1)
	          		jogaadversario();
	      	  	return;
  			}
  		}
    	else if(tileExtremos[0] == valordir || tileExtremos[1] == valordir) {
	    	if(tileExtremos[0] == valordir){
	  		  	jogo.push(colocacode(x,y));
	  		  	retiraPosjogada(colocacode(x,y));
	  		  	extremos[1]=colocacode(x,y);
	      		imprimetiles();
	        	verifica();
	      		if(verificateste==1)
	          		jogaadversario();
	      		return;
	  		}
	  		if(tileExtremos[1] == valordir){
	  		    jogo.push(inversa(x,y));
	  		    retiraPosjogada(colocacode(x,y));
	  		    extremos[1]=inversa(x,y);
		      	imprimetiles();
		        verifica();
		      	if(verificateste==1)
	          		jogaadversario();
		      	return;
	  		}
  		}
  	}

  	else{
      document.getElementById("mnt").style.visibility = "visible";
  		if(monte.length == 0){
        if(fim==2){
          return contapontos();
        }
  			passar();
  		}
  	}
	displayhands();
}

function iraomonte(){
	if(monte.length == 0){
		alert("O monte encontra-se vazio!");
	}
  else{
    if(handHasMatch()){
      displayhands(); return;
    }
    var a=monte[Math.floor(Math.random()*monte.length)];
    var b =[];
    var x;
    var y;
    var flag;
    for(j=0;j<monte.length;j++){
      if(a==monte[j]){
        monte.splice(j,1);
      }
    }
    b= tilenumbersteste(a);
    x=b[0];
    y=b[1];
    if(logicPlacement(x,y)==1){
      document.getElementById("mnt").style.visibility = "visible";
      nossojogo.push(a);
      nossojogo.sort();
      displayhands();
    }
    else{
    	document.getElementById("mnt").style.visibility = "visible";
	    nossojogo.push(a);
	    nossojogo.sort();
	    displayhands();
    }
  }
}


// aqui gere o jogo do adversario
async function jogaadversario(){
  await sleep(500);
  var i;
  var vextresq;
  var vextrdir;
  var extresq = [];
  var extrdir = [];
  var tile = [];
  var tiledir;
  var tileesq;
  var a;
  var c;
  c=0;
  verificateste=0;

  for(i=adversario.length-1;i>=0;i--){
    extresq = tilenumbersE(0);
    extrdir = tilenumbersE(1);
    vextresq = extresq[0];
    vextrdir = extrdir[1];
    tile = tilenumbersAd(i);
    tileesq = tile[0];
    tiledir = tile[1];
    if(tileesq == vextresq || tileesq == vextrdir || tiledir == vextresq || tiledir == vextrdir ){
    	c=1;
      	if(tileesq== vextresq || tiledir == vextresq){
        	ambos=1;
        	if(tileesq== vextrdir || tiledir == vextrdir){
          		ambos=2;
        	}
        	if(ambos==2){
          		if(tiledir==vextresq){
            		jogo.unshift(colocacode(tileesq,tiledir));
		         	retiraPosjogadaAd(colocacode(tileesq,tiledir));
		         	extremos[0]=colocacode(tileesq,tiledir);
		           	imprimetiles();
            		verifica();
            		if(!handHasMatch())
            			document.getElementById("mnt").style.visibility = "visible";

           			displayhands();
	            	fim=0;
	           		return;
          		}
	          	if(tileesq == vextrdir){
		            jogo.push(colocacode(tileesq,tiledir));
		            retiraPosjogadaAd(colocacode(tileesq,tiledir));
		            extremos[1]=colocacode(tileesq,tiledir);
		            imprimetiles();
		            verifica();
	            	if(!handHasMatch())
	            		document.getElementById("mnt").style.visibility = "visible";
	            	displayhands();
		            fim=0;
		            return;
          		}
          	}
      	}
 	 }

    if(tileesq == vextresq || tiledir == vextresq || tileesq==vextrdir || tiledir == vextrdir ){
    	c=1;
      	if(tileesq == vextresq || tiledir == vextresq) {
     		if(tileesq == vextresq){
     		  	jogo.unshift(inversa(tileesq,tiledir));
	     		retiraPosjogadaAd(colocacode(tileesq,tiledir));
	     		extremos[0]=inversa(tileesq,tiledir);
        		imprimetiles();
         		verifica();
          		if(!handHasMatch())
          			document.getElementById("mnt").style.visibility = "visible";
        		displayhands();
          		fim=0;
        		return;
     		}
	   		else if(tiledir == vextresq){
	        	jogo.unshift(colocacode(tileesq,tiledir));
	     		retiraPosjogadaAd(colocacode(tileesq,tiledir));
	     		extremos[0]=colocacode(tileesq,tiledir);
	        	imprimetiles();
	          	verifica();
	          	if(!handHasMatch())
	          		document.getElementById("mnt").style.visibility = "visible";
	        	displayhands();
	          	fim=0;
	         	return;
      		}
   		}
    	if(tiledir == vextrdir || tileesq == vextrdir) {
      		if(tiledir == vextrdir){
		        jogo.push(inversa(tileesq,tiledir));
		        retiraPosjogadaAd(colocacode(tileesq,tiledir));
		        extremos[1]=inversa(tileesq,tiledir);
		        imprimetiles();
		        verifica();
		        if(!handHasMatch())
		        	document.getElementById("mnt").style.visibility = "visible";
		        displayhands();
		        fim=0;
		        return;
      		}
	      	else if(tileesq == vextrdir){
		        jogo.push(colocacode(tileesq,tiledir));
		        retiraPosjogadaAd(colocacode(tileesq,tiledir));
		        extremos[1]=colocacode(tileesq,tiledir);
		        imprimetiles();
		        verifica();
		        if(!handHasMatch())
		        	document.getElementById("mnt").style.visibility = "visible";
		        displayhands();
		        fim=0;
		        return;
      		}
    	}

  	}

	}

   	if(c==0){
   		if(monte.length == 0 && adversario.length == 0){
   			contapontos();
   		}

   		else if(monte.length == 0 && fim==2){
  			return contapontos();
  		}

    	else if(monte.length == 0){
    		if( monte.length==0 && nossojogo.length != 0)
  				alert("Adversário passou a sua vez!");
        	if(!handHasMatch()) document.getElementById("mnt").style.visibility = "visible";
  			return displayhands();
  		}

  		else{
	       var a=monte[Math.floor(Math.random()*monte.length)];
	       for(j=0;j<monte.length;j++){
	          if(a==monte[j]){
	             monte.splice(j,1);
	          }
	       }
	       adversario.push(a);
	       adversario.sort();
	       displayhands();
	       jogaadversario();
		}
  }
}

function classificacao(){
  document.getElementById("leaderModal").style.display = "block";
}

function ganhou(){
    document.getElementById("ganhoumodal").style.display = "block";
}
function perdeu(){
    document.getElementById("perdeumodal").style.display = "block";
}

// permite escolher o lado que queremos jogar
function choice(x,y,valordir,valoresq){
    document.getElementById("choicemodal").style.display = "block";
    document.getElementById("esc-esq").onclick = function (){
    closeSpan("choicemodal");
    if(x==valoresq){
        retiraPosjogada(colocacode(x,y));
        jogo.unshift(inversa(x,y));
        imprimetiles();
        verifica();
        if(verificateste==1)
    		jogaadversario();
        extremos[0]=inversa(x,y);
    }
    else{
      	retiraPosjogada(colocacode(x,y));
      	jogo.unshift(colocacode(x,y));
      	imprimetiles();
      	verifica();
      	if(verificateste==1)
    		jogaadversario();
      	extremos[0]=colocacode(x,y);
    }
    displayhands();
    }
    document.getElementById("esc-dir").onclick = function (){
      closeSpan("choicemodal");
      if(x==valordir){
        retiraPosjogada(colocacode(x,y));
        jogo.push(colocacode(x,y));
        imprimetiles();
        verifica();
        if(verificateste==1)
    		jogaadversario();
        extremos[1]=colocacode(x,y);
      }
      else{
        retiraPosjogada(colocacode(x,y));
        jogo.push(inversa(x,y));
        imprimetiles();
        verifica();
        if(verificateste==1)
    		jogaadversario();
        extremos[1]=inversa(x,y);
      }
      displayhands();

    }
}

function passar(){
	document.getElementById("passar").onclick = function (){
		fim=2;
		jogaadversario();  // o adversáriotambémpodepassar
	}
}

function sleep(ms){
  return new Promise(resolve=>setTimeout(resolve,ms));
}

function prejoin(){
  if(gameId != null){
    vart = document.getElementById("errors");
    vart.innerHTML = "Cant join another game without ending this one";
    return;
  }

  tmp = document.getElementById("first2Play");
  username=document.getElementById("nickname").value;
  password=document.getElementById("pass").value;
  groupId=document.getElementById("groupId").value;
  join(groupId,username,password);
}
