
var ctx;
var wallCtx;
var tankCtx;
var menu = null;
var map = null;
var keys = [];
 gameState = GAME_STATE_START;
var isGameOver = false;
var overX = 176;
var overY = 384;
var formfocus=true;
var conti=false;
$(document).ready(function(){	
	initScreen();
	initObject();	
	setInterval(gameLoop,40);
});


  
function getfocus() {
    conti=true;
   // console.log(conti+" getfocus");
    document.getElementById("chat-input").blur();
    document.getElementById("canvasDiv").focus();
}

function  unfocus() {
      conti=false;
     // console.log(conti+"  getfocuse");
      document.getElementById("chat-input").focus();
      document.getElementById("canvasDiv").blur();
    
}


function initScreen(){
	var canvas = $("#stageCanvas");
	ctx = canvas[0].getContext("2d");
	canvas.attr({"width":SCREEN_WIDTH});
	canvas.attr({"height":SCREEN_HEIGHT});
	wallCtx = $("#wallCanvas")[0].getContext("2d");
	grassCtx = $("#grassCanvas")[0].getContext("2d");
	$("#wallCanvas").attr({"width":SCREEN_WIDTH});
	$("#wallCanvas").attr({"height":SCREEN_HEIGHT});
	$("#grassCanvas").attr({"width":SCREEN_WIDTH});
	$("#grassCanvas").attr({"height":SCREEN_HEIGHT});
	tankCtx = $("#tankCanvas")[0].getContext("2d");
	$("#tankCanvas").attr({"width":SCREEN_WIDTH});
	$("#tankCanvas").attr({"height":SCREEN_HEIGHT});
	overCtx = $("#overCanvas")[0].getContext("2d");
	$("#overCanvas").attr({"width":SCREEN_WIDTH});
	$("#overCanvas").attr({"height":SCREEN_HEIGHT});
	$("#canvasDiv").css({"width":SCREEN_WIDTH});
	$("#canvasDiv").css({"height":SCREEN_HEIGHT});
	$("#canvasDiv").css({"background-color":"#000000"});	
}

function initObject(){
	ctx.clearRect(0,0,512,448);
	menu = new Menu(ctx);
	map = new Map(wallCtx,grassCtx);
	appearEnemy = 0; 
	enemyArray = [];
	keys = [];
	isGameOver = false;
	overX = 176;
	overY = 384;
	overCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	emenyStopTime = 0;
}



function drawBullet(){
    for(var i in bullets){
      if(bullets[i]===undefined) continue;
        bullets[i].draw();
      }
}
socket.on('game_over',function(data){
    gameState=data.GAME_STATE_OVER;
});
function gameLoop(){
	//console.log(gameState+" state");
	switch(gameState){
	case GAME_STATE_MENU:
		menu.draw();
		break;
	case GAME_STATE_START:
		drawAll();
		break;
	case GAME_STATE_OVER:
		gameOver();
		break;
	}
}

$(document).keydown(function(e){
	switch(gameState){
	case GAME_STATE_START:
		if(!keys.contain(e.keyCode)){
			keys.push(e.keyCode);
		}
		
		break;
	}
});




$(document).keyup(function(e){
	keys.remove(e.keyCode);

		if(e.keyCode === 68){	//d
			socket.emit('keyPress',{inputId:'right',state:false,dir:'right'});
		}
		else if(e.keyCode === 83)	//s
			socket.emit('keyPress',{inputId:'down',state:false,dir:'down'});
		else if(e.keyCode === 65) //a
			socket.emit('keyPress',{inputId:'left',state:false,dir:'left'});
		else if(e.keyCode === 87) // w
			socket.emit('keyPress',{inputId:'up',state:false,dir:'up'});
		else if(e.keyCode === 74) // j
			socket.emit('keyPress',{inputId:'shoot',state:false});
	
});

function initMap(){
	map.draw();
}
function keyEvent(){
	if(keys.contain(keyboard.W)){
	    socket.emit('keyPress',{inputId:'up',state:true,dir:"up"});			
	}else if(keys.contain(keyboard.S)){
		socket.emit('keyPress',{inputId:'down',state:true,dir:"down"});
	}else if(keys.contain(keyboard.A)){
		socket.emit('keyPress',{inputId:'left',state:true,dir:"left"});
	}else if(keys.contain(keyboard.D)){
	    socket.emit('keyPress',{inputId:'right',state:true,dir:"right"});
	}else if(keys.contain(keyboard.J)){
	    socket.emit('keyPress',{inputId:'shoot',state:true});
	}

			
}




function drawAll(){
	map.draw();
	tankCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	var which=1;
	for(var i in players){
		if(players[i].lives>0){
		players[i].draw();
		map.drawLives(players[i].lives,which);
	  }
	  which++;
	}

	drawEnemyTanks();
	drawBullet();
	if(conti==true){
		keyEvent();
    }
	
	
}




function gameOver(){
	overCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	tankCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	players={};
    bullets={};
    enemies={};
	gameState=GAME_STATE_START;
    map.map=[
    [0,0,0,0,0,0,0,0,0,0,0,1,9,8,1,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,1,8,8,1,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,2,2,2,2,2,2,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,2,2,2,2,2,2,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[2,2,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,2,2],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,2,2,2,2,2,2,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,2,2,2,2,2,2,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,1,1,0,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,1,9,8,1,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,1,8,8,1,0,0,0,0,0,0,0,0,0,0,0],
	];
	
	
    console.log('ageme over');


}

function drawEnemyTanks(){
	
		for(var i in enemies){
			var enemyObj = enemies[i];
			//console.log(enemyObj.isDestroyed+" enemy");
			if(enemyObj.isDestroyed){
				delete enemies[i];
				i--;
			}else{
				enemyObj.draw();
			}
		}
	
	
}