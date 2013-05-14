function add_spaceship(){
    var spritesheet = new createjs.SpriteSheet({
	"animations":{
	    "run": [0, 4]
	},
	"images": ["./graphics/sprites2.png"],
	"frames":{
	    "height": 100,
	    "width":87,
	    "regX": 0,
	    "regY": 0,
	    "count": 5
	}
    });
    spaceship = new createjs.Container();
    spaceship.x = 0
    spaceship.y = 200;		    
    prototype = new createjs.BitmapAnimation(spritesheet);
    prototype.x = 0
    prototype.y = 0;
    spaceship.addChild(prototype);		    
    prototype.gotoAndPlay("run");	
    stage.addChild(spaceship);
    return spaceship;
}

function add_rocket(){
    var spritesheet = new createjs.SpriteSheet({
	"animations":{
	    "shoot": [0, 3]
	},
	"images": ["./graphics/rocket.png"],
	"frames":{
	    "height": 46,
	    "width":100,
	    "regX": 0,
	    "regY": 0,
	    "count": 4
	}
    });
    rocket = new createjs.Container();
    rocket.x = 0
    rocket.y = 100;		    
    rocket_animation = new createjs.BitmapAnimation(spritesheet);
    rocket_animation.x = 0
    rocket_animation.y = 0;
    rocket.addChild(rocket_animation);		    
    rocket_animation.gotoAndPlay("shoot");	
    stage.addChild(rocket);
    return rocket;
}
