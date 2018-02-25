
var Bullet_local = function(context,data){
	//console.log("bullet local "+data.x);
	this.ctx = context;
	this.x = data.x;
	this.y = data.y;
	this.id=data.id;
	this.owner = data.parent; 
	this.type = data.type;
	this.dir = data.dir;
	this.speed = data.speed;
	this.room=data.room;
	this.size = 6;
	
	this.draw = function(){
	//	console.log(this.x+"  "+this.y);
		this.ctx.drawImage(RESOURCE_IMAGE,POS["bullet"][0]+this.dir*this.size,POS["bullet"][1],this.size,this.size,this.x,this.y,this.size,this.size);

	};

	Bullet_local.list[this.id]=this;
	return this;
};

Bullet_local.list={};