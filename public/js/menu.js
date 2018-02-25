
var Menu = function(context){
	this.ctx = context;
	this.x = 0;
	this.y = 0;
	this.playNum = 1;
	this.draw = function(){
		this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);   
		this.ctx.save(); 
		this.ctx.drawImage(MENU_IMAGE, this.x, this.y);
		this.ctx.restore();
	};

};