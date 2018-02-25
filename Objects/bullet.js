
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

Bullet = function(param){
	
	var self = Entity(param);
	self.id = Math.random();
	self.dir= param.dir;
	self.owner = param.parent;
	self.speed =5;
	self.timer = 0;
	self.size=6;
	self.isDestroyed = false;
	self.type = param.type;
    self.game=param.game;
    self.map=param.map
	var super_update = self.update;

	if(self.dir==UP){
		self.x+=14;
		self.y-=5;
	}else if(self.dir==DOWN){
		self.x+=14;
		self.y+=5;
	}else if(self.dir==LEFT){
		self.x-=5;
		self.y+=14;
	}else if(self.dir==RIGHT){
		self.x+=5;
		self.y+=14;
	}
	self.update = function(){
		self.timer++;
		if(self.timer>100){
			//console.log('destory');
			self.isDestroyed = true;
		}
		self.updateposition();
		self.isDestroyed=bulletMapCollision(this,self.map);
	
		for(var i in Player.list){
			var p = Player.list[i];
			if(  self.getDistance(p) < 20 && self.owner !== p.username && self.game===p.game){
		        p.isDestroyed=true;
		        if(p.protectedTime===0){
			       p.protectedTime=50;
			       p.lives--;
			       if(p.lives==0){
			       	  for(var i in socket_list){
			       	  	  socket_list[i].emit('delete');
						   delete_everthing(self.game);
			       	  }
			       }
		        }
			    self.isDestroyed = true;			
			}
				
		}


		for(var i in Enemy.list){
					var e= Enemy.list[i];

					//console.log(self.getDistance(e)+" distance" );
					if(  self.getDistance(e) < 20 && self.owner !== e.name && self.game===e.game){
						console.log("destory "+e.name+ "  "+self.owner);
				         e.isDestroyed=true;
					     self.isDestroyed = true;
					      removePack.enemy.push(e.id);			
					}
						
		}


			if(!self.isDestroyed){
					for(var i in Bullet.list){
						 // console.log(Bullet.list[i].owner+"  bullet "+self.owner );
						 if(Bullet.list[i].owner==self.owner){
						 	  continue;
						 } 
						
						 if(CheckIntersect(Bullet.list[i],self,0)){
                             console.log("instersect" );
						 	 self.isDestroyed=true;
						 	 removePack.bullet.push(Bullet.list[i].id);
						 	 delete Bullet.list[i];
						 	 break;
						 }
						
					  }
			}
	}
	
	
	self.getInitPack = function(){
		return {
			id:self.id,
			x:self.x,
			y:self.y,
            dir:self.dir,
		    game:self.game,
		    speed:self.speed,
		    hit:self.hit 
		};
	}
	
	self.getUpdatePack = function(){
		//console.log(self.x+"  "+self.y);
		return {
			id:self.id,
			x:self.x,
			y:self.y,	
			dir:self.dir,
			game:self.game,
			speed:self.speed,
			hit:self.hit 			
		};
	}
	self.updateposition=function(){
		if(self.dir===UP){
			self.y-=self.speed;
		}else if(self.dir===DOWN){
            self.y+=self.speed;
		}else if(self.dir===LEFT){
			self.x-=self.speed;
		}else if(self.dir===RIGHT){
			self.x+=self.speed;
		}
	//	console.log(self.x+" update "+self.y+" self.dir"+  self.dir);
	}
	Bullet.list[self.id] = self;
	initPack.bullet.push(self.getInitPack());

	return self;
}
Bullet.list = {};

Bullet.update = function(){
	var pack = [];
	for(var i in Bullet.list){
		var bullet = Bullet.list[i];
		bullet.update();
		if(bullet.isDestroyed){
			delete Bullet.list[i];
			//console.log(bullet.id);
			removePack.bullet.push(bullet.id);
		} else
			pack.push(bullet.getUpdatePack());		
	}
	return pack;
}

Bullet.getAllInitPack = function(){
	var bullets = [];
	for(var i in Bullet.list)
		bullets.push(Bullet.list[i].getInitPack());
	return bullets;
}

mapchange={};

function bulletMapCollision(bullet,mapobj){
	var tileNum = 0;
	var rowIndex = 0;
	var colIndex = 0;
	var result = false;
	
	// console.log(bullet.x+"  b");
	// console.log(bullet.game+" row");
	if(bullet.dir == UP){
		rowIndex = parseInt((bullet.y - mapobj.offsetY)/mapobj.tileSize);
		colIndex = parseInt((bullet.x - mapobj.offsetX)/mapobj.tileSize);
	}else if(bullet.dir == DOWN){
		rowIndex = parseInt((bullet.y - mapobj.offsetY + bullet.size)/mapobj.tileSize);
		colIndex = parseInt((bullet.x - mapobj.offsetX)/mapobj.tileSize);
	}else if(bullet.dir == LEFT){
		rowIndex = parseInt((bullet.y - mapobj.offsetY)/mapobj.tileSize);
		colIndex = parseInt((bullet.x - mapobj.offsetX)/mapobj.tileSize);
	}else if(bullet.dir == RIGHT){
		rowIndex = parseInt((bullet.y - mapobj.offsetY)/mapobj.tileSize);
	
		colIndex = parseInt((bullet.x - mapobj.offsetX + bullet.size)/mapobj.tileSize);
	}
	if(rowIndex >= mapobj.HTileCount || rowIndex < 0 || colIndex >= mapobj.wTileCount || colIndex < 0){
		return true;
	}
	
	if(bullet.dir == UP || bullet.dir == DOWN){
		var tempWidth = parseInt(bullet.x -mapobj.offsetX - (colIndex)*mapobj.tileSize + bullet.size);
		if(tempWidth % mapobj.tileSize == 0 ){
			tileNum = parseInt(tempWidth/mapobj.tileSize);
		}else{
			tileNum = parseInt(tempWidth/mapobj.tileSize) + 1;
		}
		for(var i=0;i<tileNum && colIndex+i < mapobj.wTileCount ;i++){
			var mapContent = mapobj.array[rowIndex][colIndex+i];
			if(mapContent == WALL || mapContent == GRID || mapContent == HOME || mapContent == ANOTHREHOME){
				result = true;
				bullet.isDestroyed=true;
				if(mapContent == WALL){
						   // console.log(rowIndex+" up down "+colIndex+i);
				   for(var k in Player.list){
				   	// console.log(Player.list[k].game+" up down "+Player.list[k].game);
					   	 if(Player.list[k].game==Player.list[k].game){
						    Player.list[k].map.array[rowIndex][colIndex+i]=0;
						 }
			     	}
					for(var j in socket_list){
						//console.log(j+"  j");
					    socket_list[j].emit('mapChangeIndex',{x:rowIndex,y:colIndex+i,game:bullet.game});
					}
				}else if(mapContent == GRID){
					 console.log("grid");
				
				}else{
					 	for(var j in socket_list){
							//console.log(j+"  j");
						    socket_list[j].emit('game_over',{GAME_STATE_OVER:2,game:bullet.game});
						    delete_everthing(bullet.game);
					    }
					break;
				}
			}
		}
	}else{
		var tempHeight = parseInt(bullet.y - mapobj.offsetY - (rowIndex)*mapobj.tileSize + bullet.size);
		if(tempHeight % mapobj.tileSize == 0 ){
			tileNum = parseInt(tempHeight/mapobj.tileSize);
		}else{
			tileNum = parseInt(tempHeight/mapobj.tileSize) + 1;
		}
		
		for(var i=0;i<tileNum && rowIndex+i < mapobj.HTileCount;i++){
			var mapContent = mapobj.array[rowIndex+i][colIndex];
			if(mapContent == WALL || mapContent == GRID || mapContent == HOME || mapContent == ANOTHREHOME){
				bullet.isDestroyed=true;
				result = true;
				if(mapContent == WALL){
					// console.log(rowIndex+i+" row "+colIndex);
					
					for(var k in Player.list){
				   	 //console.log(Player.list[k].game+" up down "+Player.list[k].game);
					   	 if(Player.list[k].game==Player.list[k].game){
						  Player.list[k].map.array[rowIndex+i][colIndex]=0;
						 }
			     	}
				    for(var j in socket_list){
				    	//console.log(j+"  j");
					    socket_list[j].emit('mapChangeIndex',{x:rowIndex+i,y:colIndex,game:bullet.game});
					}
				}else if(mapContent == GRID){
					 console.log("grid");
				}else{
				        for(var j in socket_list){
						//	console.log(j+"  j");
						    socket_list[j].emit('game_over',{GAME_STATE_OVER:2,game:bullet.game});
						    delete_everthing(bullet.game);
						  
					    }
					    break;
				}
			}
		}
	}
	return result;
}


function CheckIntersect(object1, object2, overlap)
{
	
	A1 = object1.x + overlap;
	B1 = object1.x + object1.size - overlap;
	C1 = object1.y + overlap;
	D1 = object1.y + object1.size - overlap;
 
	A2 = object2.x + overlap;
	B2 = object2.x + object2.size - overlap;
	C2 = object2.y + overlap;
	D2 = object2.y + object2.size - overlap;
 
	
	if(A1 >= A2 && A1 <= B2
	   || B1 >= A2 && B1 <= B2)
	{
	
		if(C1 >= C2 && C1 <= D2 || D1 >= C2 && D1 <= D2)
		{
			return true;
		}
	}
	return false;
}


 function delete_everthing(game){
      for(var i in Player.list){
               if(Player.list[i].game==game){
                    delete Player.list[i];
                }
            }  

           for(var k in Enemy.list){
              if(Enemy.list[k].game==game){
                delete Enemy.list[k];
              }
           }
               
            for(var f in Bullet.list){
              if(Bullet.list[f].game==game){
                delete Bullet.list[f];
              }
           }

 }


