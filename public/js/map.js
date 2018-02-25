


var Map = function(wCtx,gCtx){
	this.level = 1;
	this.wallCtx = wCtx;
	this.grassCtx = gCtx;
	this.offsetX = 32; //x offset
	this.offsetY = 16;//y offset
	this.wTileCount = 26; //tiles count for width
	this.HTileCount = 26;//tiles count for height
	this.tileSize = 16;	
	this.homeSize = 32; 
	this.num = new Num(this.wallCtx);
	this.mapWidth = 416;
	this.mapHeight = 416;
	
this.map = 
[
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
	this.draw = function(){
		this.wallCtx.fillStyle = "#7f7f7f";
		this.wallCtx.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
		this.wallCtx.fillStyle = "#000";
		this.wallCtx.fillRect(this.offsetX,this.offsetY,this.mapWidth,this.mapHeight);//主游戏区

		this.grassCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
		
		for(var i=0;i<this.HTileCount;i++){
			for(var j=0;j<this.wTileCount;j++){
				if(this.map[i][j] == WALL || this.map[i][j] == GRID || this.map[i][j] == WATER || this.map[i][j] == ICE){
					this.wallCtx.drawImage(RESOURCE_IMAGE,this.tileSize*(this.map[i][j]-1) + POS["map"][0], POS["map"][1],this.tileSize,this.tileSize,j*this.tileSize + this.offsetX, i*this.tileSize + this.offsetY,this.tileSize,this.tileSize) ;
				}else if(this.map[i][j] == GRASS){
					this.grassCtx.drawImage(RESOURCE_IMAGE,this.tileSize*(this.map[i][j]-1) + POS["map"][0], POS["map"][1],this.tileSize,this.tileSize,j*this.tileSize + this.offsetX, i*this.tileSize + this.offsetY,this.tileSize,this.tileSize);
				}else if(this.map[i][j] == HOME){
					this.wallCtx.drawImage(RESOURCE_IMAGE,POS["home"][0], POS["home"][1], this.homeSize, this.homeSize, j*this.tileSize + this.offsetX, i*this.tileSize + this.offsetY, this.homeSize, this.homeSize) ;
				}
			}
		}
		this.drawNoChange();
	
	};
	

	this.drawNoChange = function(){
		this.wallCtx.drawImage(RESOURCE_IMAGE, POS["score"][0], POS["score"][1], 30, 32, 464, 256, 30, 32);//player1
		
		this.wallCtx.drawImage(RESOURCE_IMAGE, 30 + POS["score"][0], POS["score"][1], 30, 32, 464, 304, 30, 32);//player2
	
		this.wallCtx.drawImage(RESOURCE_IMAGE, 60 + POS["score"][0], POS["score"][1], 30, 32, 464, 352, 32, 30);//画旗帜
	};
	
	this.drawLives = function(lives,which){
		console.log("draw lives");
		var x = 482;
		var y = 272;
		if(which == 2){
			y = 320;
		}
		this.wallCtx.fillStyle = "#7f7f7f";
		this.wallCtx.fillRect(x,y,this.num.size,this.num.size);
		this.num.draw(lives,x,y);
	};
	
	
	this.homeHit = function(){
		this.wallCtx.drawImage(RESOURCE_IMAGE,POS["home"][0]+this.homeSize, POS["home"][1], this.homeSize, this.homeSize, 12*this.tileSize + this.offsetX, 24*this.tileSize + this.offsetY, this.homeSize, this.homeSize) ;
	};
};