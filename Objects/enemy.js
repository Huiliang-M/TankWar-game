
var ememy_hashmap=new Map();
 Enemy = function(data){
	
	this.x=data.x;
	this.y=data.y
	this.id=data.id;
	this.isDestroyed=false;
	this.game=data.game;
	console.log(this.game+" game");
	this.name="enemy";
	this.speed=1;
	this.frame=0;
	this.size=32;
	this.dir = parseInt(Math.random()*4);
	this.isDestroyed=false;
    this.map={};
    this.map.offsetX = 32; //x offset
	this.map.offsetY = 16;//y offset
	this.map.mapWidth = 416;
	this.map.mapHeight = 416;
	this.map.wTileCount = 26; //tiles count for width
	this.map.HTileCount = 26;//tiles count for height
	this.map.tileSize = 16;	
	this.map.homeSize = 32; 
	this.map.array=[
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

  if(ememy_hashmap.get(this.game)!==undefined){
  	    var number =ememy_hashmap.get(this.game)+1;
        ememy_hashmap.set(this.game,number);    
  }
  ememy_hashmap.set(this.game,1);    

    this.update=function(){
    
    	if(this.frame % 300 == 0){
              this.shootBullet(this);
    	}
    	this.tempX = this.x;
		this.tempY = this.y;
		this.frame ++;
		if(playerMapCollision(this,this.map)){
				this.hit = true;
		}
        if(this.frame % 200 == 0 || this.hit){
        	
			while(this.dir!==(this.tmp_dir=parseInt(Math.random()*4))){
				this.dir = this.tmp_dir;//随机一个方向
			}
				this.hit = false;
				this.frame = 0;
	    }
      	if(this.dir == UP){
			this.tempY -= this.speed;
		}else if(this.dir == DOWN){
			this.tempY += this.speed;
		}else if(this.dir == RIGHT){
			this.tempX += this.speed;
		}else if(this.dir == LEFT){
			this.tempX -= this.speed;
		}

		this.isHit();
		if(!this.hit){
			this.x = this.tempX;
			this.y = this.tempY;
		}
    }


   this.shootBullet = function(){
		Bullet({
			parent:this.name,
			dir:this.dir,
			x:this.x,
			y:this.y,
			game:this.game,
			map:this.map,
		});
	}
	
	this.isHit = function(){
		    // console.log(this.x+"  "+this.y);
			if(this.dir == LEFT){
				if(this.x <= this.map.offsetX){
					this.x = this.map.offsetX;
					this.hit = true;
				}
			}else if(this.dir == RIGHT){
				if(this.x >= this.map.offsetX + this.map.mapWidth - this.size){
					this.x = this.map.offsetX + this.map.mapWidth - this.size;
					this.hit = true;
				}
			}else if(this.dir == UP ){
				if(this.y <= this.map.offsetY){
					this.y = this.map.offsetY;
					this.hit = true;
				}
			}else if(this.dir == DOWN){
				if(this.y >= this.map.offsetY + this.map.mapHeight - this.size){
					this.y = this.map.offsetY + this.map.mapHeight - this.size;
					this.hit = true;
				}
			}
		};
    this.getUpdatePack = function(){
		// console.log(this.game+" game");
		return {
			id:this.id,
			x:this.x,
			y:this.y,
			dir:this.dir,
			game:this.game,
			isDestroyed:this.isDestoyed
		}	
	}
	
	this.getInitPack = function(){
		return {
			id:this.id,
			x:this.x,
			y:this.y,
			dir:this.dir,
			game:this.game,
			speed:this.speed,
			isDestroyed:this.isDestoyed
		}	
	}
	    Enemy.list[this.id] = this;
	    initPack.enemy.push(this.getInitPack());
        console.log(initPack.enemy.length+" enemy length");
	    return this;
};
Enemy.list={};
Enemy.getAllInitPack = function(){
	var Enemies = [];
	for(var i in Enemy.list)
		Enemies.push(Enemy.list[i].getInitPack());
	return Enemies;
}


Enemy.update = function(){
	var pack = [];
	for(var i in Enemy.list){
		var enemy = Enemy.list[i];
		enemy.update();
		if(enemy.isDestroyed){
			delete Enemy.list[i];
			console.log("enemy");
			removePack.enemy.push(enemy.id);
		} else	
		pack.push(enemy.getUpdatePack());		
	}
	return pack;
}


function playerMapCollision(tank,mapobj){

	var tileNum = 0;
	var rowIndex = 0;
	var colIndex = 0;
	var overlap = 3;
	 //console.log(tank.x+"  "+tank.y);

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