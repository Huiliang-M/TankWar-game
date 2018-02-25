require('./bullet.js');
require('./player.js');
require('./enemy.js')
initPack = {player:[],bullet:[],enemy:[]};
removePack = {player:[],bullet:[],enemy:[]};



Entity = function(param){
	var self = {
		x:169,
		y:256,
		spdX:0,
		spdY:0,
		id:"",
		game:"",
	}
	if(param){
		if(param.x)
			self.x = param.x;
		if(param.y)
			self.y = param.y;
		if(param.id)
			self.id = param.id;		
	}
	
	self.update = function(){
		self.updatePosition();
	}
	self.updatePosition = function(){
		self.x += self.spdX;
		self.y += self.spdY;
	}
	self.getDistance = function(pt){
		return Math.sqrt(Math.pow(self.x-pt.x,2) + Math.pow(self.y-pt.y,2));
	}
	return self;
}
Entity.getFrameUpdateData = function(){
	 // console.log("enemy  update"+initPack.enemy.length);
	var pack = {
		initPack:{
			player:initPack.player,
			bullet:initPack.bullet,
			enemy:initPack.enemy
		},
		removePack:{
			player:removePack.player,
			bullet:removePack.bullet,
			enemy:removePack.enemy
		},
		updatePack:{
			player:Player.update(),
			bullet:Bullet.update(),
			enemy:Enemy.update()
		}
	};
	initPack.player = [];
	initPack.bullet = [];
	initPack.enemy = [];
	removePack.player = [];
	removePack.bullet = [];
	removePack.enemy = [];
	return pack;
}


