
UP = 0;
DOWN = 1;
LEFT = 2;
RIGHT = 3;
WALL = 1;
GRID = 2;
GRASS = 3;
WATER = 4;
ICE = 5;
HOME = 9;
ANOTHREHOME = 8;
socket_list=[];
var myMap = new Map();
Player = function(param){
	var self = Entity(param);
	self.number = "" + Math.floor(10 * Math.random());
	self.player_order=0;
	self.home_destryed=false;
	self.username = param.username;
	self.pressingRight = false;
	self.pressingLeft = false;
	self.pressingUp = false;
	self.pressingDown = false;
	self.pressingAttack = false;
	self.maxSpd = 2;
	self.lives=3;
	self.isDestroyed=false;
	self.x=129+32;
	self.y=385+16;
	self.dir=UP;
	self.game=param.game;
	self.size=32;
	self.hit=false;
	self.shoot_time=8;
	self.map={};
    self.map.offsetX = 32; //x offset
	self.map.offsetY = 16;//y offset
	self.map.mapWidth = 416;
	self.map.mapHeight = 416;
	self.map.wTileCount = 26; //tiles count for width
	self.map.HTileCount = 26;//tiles count for height
	self.map.tileSize = 16;	
	self.map.homeSize = 32; 
	self.protectedTime=50;
	self.map.array=[
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
 
 // console.log(myMap.get(self.game)+" my map");     
	if(myMap.get(self.game)!==undefined){
              self.x=129+160;
              self.y=32;
              self.dir=DOWN;
         myMap.delete(self.game);

	}else{
		myMap.set(self.game,self.username);
	}
	//console.log(self.x+"  "+self.y);
	self.origin_x=self.x;
	self.origin_y=self.y;
	

	var super_update = self.update;

	self.update = function(){
		if(self.protectedTime!==0){
		  self.protectedTime--;
        }
		self.updateposition();
        if(self.shoot_time<8){
		   self.shoot_time++;
	    }
		if(self.pressingAttack&&self.shoot_time==8){
			self.shootBullet(self);
			self.shoot_time=0;
		}
		if(self.isDestroyed==true){
			self.x=self.origin_x;
			self.y=self.origin_y;
			self.isDestroyed=false;
		}
	}

  self.isHit = function(){
	    // console.log(self.x+"  "+self.y);
		if(self.dir == LEFT){
			if(self.x <= self.map.offsetX){
				self.x = self.map.offsetX;
				self.hit = true;
			}
		}else if(self.dir == RIGHT){
			if(self.x >= self.map.offsetX + self.map.mapWidth - self.size){
				self.x = self.map.offsetX + self.map.mapWidth - self.size;
				self.hit = true;
			}
		}else if(self.dir == UP ){
			if(self.y <= self.map.offsetY){
				self.y = self.map.offsetY;
				self.hit = true;
			}
		}else if(self.dir == DOWN){
			if(self.y >= self.map.offsetY + self.map.mapHeight - self.size){
				self.y = self.map.offsetY + self.map.mapHeight - self.size;
				self.hit = true;
			}
		}
	};
	
	self.updateposition=function(){
		self.hit = false;
		this.isHit();
		if(playerMapCollision(this,self.map)){
				this.hit = true;
		}
		if(!self.hit){
			if(self.pressingUp){
				self.y-=self.maxSpd;
			}else if(self.pressingDown){
	            self.y+=self.maxSpd;
			}else if(self.pressingLeft){
				self.x-=self.maxSpd;
			}else if(self.pressingRight){
				self.x+=self.maxSpd;
			}
	    }
	}
	self.shootBullet = function(){
		Bullet({
			parent:self.username,
			dir:self.dir,
			x:self.x,
			y:self.y,
			game:self.game,
			map:self.map,
		});
	}
	
	
	
	self.getInitPack = function(){
		return {
			id:self.id,
			x:self.x,
			y:self.y,	
			lives:self.lives,
			dir:self.dir,
			game:self.game,
			name:self.username,
			player_order:self.player_order,
			home_destroyed:self.home_destroyed,
			protectedTime:self.protectedTime
		};		
	}
	self.getUpdatePack = function(){
		// console.log(self.game+" game");
		return {
			id:self.id,
			x:self.x,
			y:self.y,
			lives:self.lives,
			dir:self.dir,
			game:self.game,	
			name:self.username,
			player_order:self.player_order,
			home_destroyed:self.home_destroyed,
			protectedTime:self.protectedTime
		}	
	}
	
	Player.list[self.id] = self;
	
	initPack.player.push(self.getInitPack());
	return self;
}
Player.list = {};

Player.onConnect = function(socket,username,game){
 // console.log(game+" game name");
	var player = Player({
		username:username,
		id:socket.id,
		socket:socket,
		game:game,
	});

	socket_list.push(socket);
	socket.on('keyPress',function(data){
		//console.log('keyPress');
		if(data.inputId === 'left'){
            player.dir=LEFT;
			player.pressingLeft = data.state;
		}
		else if(data.inputId === 'right'){
			  player.dir=RIGHT;
			player.pressingRight = data.state;
		}
		else if(data.inputId === 'up'){
			  player.dir=UP;
			player.pressingUp = data.state;
		}
		else if(data.inputId === 'down'){
			  player.dir=DOWN;
			player.pressingDown = data.state;
		}
		else if(data.inputId === 'shoot'){
		
			player.pressingAttack = data.state;
		}
		
	});
		
	socket.emit('init',{
		player:Player.getAllInitPack(),
		bullet:Bullet.getAllInitPack(),
		enemy:Enemy.getAllInitPack()
	});
}

Player.getAllInitPack = function(){
	var players = [];
	for(var i in Player.list)
		players.push(Player.list[i].getInitPack());
	return players;
}

Player.onDisconnect = function(socket){
	console.log("delete "+socket.id);
	delete Player.list[socket.id];
	removePack.player.push(socket.id);
}
Player.update = function(){
	var pack = [];
	for(var i in Player.list){
		var player = Player.list[i];
		player.update();
		pack.push(player.getUpdatePack());		
	}
	return pack;
}

function playerMapCollision(tank,mapobj){
	
	var tileNum = 0;
	var rowIndex = 0;
	var colIndex = 0;
	var overlap = 3;
	
	if(tank.dir == UP){
		rowIndex = parseInt((tank.y+ overlap  - mapobj.offsetY)/mapobj.tileSize);
		colIndex = parseInt((tank.x + overlap- mapobj.offsetX)/mapobj.tileSize);
	}else if(tank.dir == DOWN){
		
		rowIndex = parseInt((tank.y - overlap - mapobj.offsetY + tank.size)/mapobj.tileSize);
		colIndex = parseInt((tank.x + overlap- mapobj.offsetX)/mapobj.tileSize);
	}else if(tank.dir == LEFT){
		rowIndex = parseInt((tank.y + overlap- mapobj.offsetY)/mapobj.tileSize);
		colIndex = parseInt((tank.x + overlap - mapobj.offsetX)/mapobj.tileSize);
	}else if(tank.dir == RIGHT){
		rowIndex = parseInt((tank.y + overlap- mapobj.offsetY)/mapobj.tileSize);
	
		colIndex = parseInt((tank.x - overlap - mapobj.offsetX + tank.size)/mapobj.tileSize);
	}
	if(rowIndex >= mapobj.HTileCount || rowIndex < 0 || colIndex >= mapobj.wTileCount || colIndex < 0){
		return true;
	}
	if(tank.dir == UP || tank.dir == DOWN){

		var tempWidth = parseInt(tank.x - mapobj.offsetX - (colIndex)*mapobj.tileSize + tank.size - overlap);//去除重叠部分
		if(tempWidth % mapobj.tileSize == 0 ){
			tileNum = parseInt(tempWidth/mapobj.tileSize);
		}else{
			tileNum = parseInt(tempWidth/mapobj.tileSize) + 1;
		}
		for(var i=0;i<tileNum && colIndex+i < mapobj.wTileCount ;i++){
			var mapContent = mapobj.array[rowIndex][colIndex+i];
			if(mapContent == WALL || mapContent == GRID || mapContent == WATER || mapContent == HOME || mapContent == ANOTHREHOME){
				if(tank.dir == UP){
					tank.y = mapobj.offsetY + rowIndex * mapobj.tileSize + mapobj.tileSize - overlap;
				}else if(tank.dir == DOWN){
					tank.y = mapobj.offsetY + rowIndex * mapobj.tileSize - tank.size + overlap;
				}
				return true;
			}
		}
	}else{
		var tempHeight = parseInt(tank.y - mapobj.offsetY - (rowIndex)*mapobj.tileSize + tank.size - overlap);//去除重叠部分
		if(tempHeight % mapobj.tileSize == 0 ){
			tileNum = parseInt(tempHeight/mapobj.tileSize);
		}else{
			tileNum = parseInt(tempHeight/mapobj.tileSize) + 1;
		}
		for(var i=0;i<tileNum && rowIndex+i < mapobj.HTileCount;i++){
			var mapContent = mapobj.array[rowIndex+i][colIndex];
			if(mapContent == WALL || mapContent == GRID || mapContent == WATER || mapContent == HOME || mapContent == ANOTHREHOME){
				if(tank.dir == LEFT){
					tank.x = mapobj.offsetX + colIndex * mapobj.tileSize + mapobj.tileSize - overlap;
				}else if(tank.dir == RIGHT){
					tank.x = mapobj.offsetX + colIndex * mapobj.tileSize - tank.size + overlap;
				}
				return true;
			}
		}
	}
	return false;
}