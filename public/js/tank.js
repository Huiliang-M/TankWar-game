
var Tank = function(data){
	
	this.size = 32;
	this.dir = UP;
	this.speed = 1;
	this.frame = 0;
	this.hit = false; 
	this.isAI = false; 
	this.isShooting = false;
	this.bullet = null;
	this.shootRate = 0.6;
	this.isDestroyed = false;
	this.tempX = 0;
	this.tempY = 0;
};

PlayTank = function(context,data){
  	
  	var self = Tank(data);
  	this.win=true;
	this.ctx = context;
	this.isProtected = true;
	this.protectedTime = data.protectedTime;
	this.offsetX = 0;
	this.speed = 4;
	this.x=data.x;
	this.name=data.name;
	this.y=data.y;
	this.lives=data.lives;
    this.dir=data.dir;
    this.size=32;
    this.room=data.game;
    this.player_order=data.player_order;
	  console.log(this.x+" x "+ this.y+" y "+this.room+"  "+data.lives);
	this.draw = function(){
		this.hit = false;
	    this.ctx.fillText(this.name,this.x,this.y);
	    this.ctx.font = "20px Georgia";
	    this.ctx.fillStyle="blue";
		this.ctx.drawImage(RESOURCE_IMAGE,POS["player"][0]+this.offsetX+this.dir*this.size,POS["player"][1],this.size,this.size,this.x,this.y,this.size,this.size);
		if(this.protectedTime !==0){
			var temp = parseInt((500-this.protectedTime)/5)%2;
			this.ctx.drawImage(RESOURCE_IMAGE,POS["protected"][0],POS["protected"][1]+32*temp,32, 32,this.x,this.y,32, 32);
		}
		
	};
	
	
	return self;
};





var Enemy = function(context,data){
	this.ctx = context;
	this.size=32;
	this.speed = data.speed;
	this.isDestroyed=data.isDestroyed;
	this.x=data.x;
    this.y=data.y;
    this.id=data.id;
    this.room=data.room;
   // console.log(this.x+"  x y  enemy "+ this.y);
	this.draw = function(){
	//console.log(this.x+"  x y  "+ this.y);
	this.ctx.drawImage(RESOURCE_IMAGE,POS["enemy1"][0]+this.dir*this.size,POS["enemy1"][1],32,32,this.x,this.y,32,32);	
	};
	
};


