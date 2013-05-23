//we have "createjs" available
//var canvas = document.getElementById('mainCanvas');
//var width_canvas = canvas.width;
//var height_canvas = canvas.height;
var width_canvas = 600;
var height_canvas = 600;

//visualization

var rs = new createjs.SpriteSheet({
    "animations":
    {
	"run": [0, 4]
    },
    "images": ["./graphics/rocket2.png"],
    "frames":
    {
	"height": 23,
	"width": 13,
	"regX": 0,
	"regY": 0,
	"count": 5
    }
});

var ss = new createjs.SpriteSheet({
    "animations":
    {
	"run": [0, 4]
    },
    "images": ["./graphics/sprites2.png"],
    "frames":
    {
	"height": 100,
	"width":87,
	"regX": 0,
	"regY": 0,
	"count": 5
    }
});

// dummy:
function get_fold(sequence, x) {
    var arrx = [];
    var arry = [];
    for (var a=0; a<sequence.length; a++) {
	arrx.push(a*44+25);
	arry.push(25);
	//console.log(arrx, arry, arrx.length);
    }
    return x?arrx.slice(0):arry.slice(0);
}

// help functions
function CLIPx(x, minx, maxx) {
    if (x<minx) return minx;
    if (x>maxx) return maxx;
    return x;
}

function CLIPy(y, miny, maxy) {
    if (y<miny) return miny;
    if (y>maxy) return maxy;
    return y;
}

function max(a, b) {
    if (a>b) return a;
    else return b;
}

function min(a, b) {
    if (a<b) return a;
    else return b;
}

function sgn(x) {
    if (x<0) return -1;
    else {
	if (x>0) return 1;
	else return 0;
    }
}

function abs(x) {
    if (x<0) return -x;
    else return x;
}

function inRange(a, b, c) {
    // is a in range <b,c>?
    if (a>=min(b,c) && a<=max(b,c)) return true;
    else return false;
}

rocketindex=0;
bonusindex=0;

function Rocket(g) {
    // ###### header
    //variables:
    var speed_y = -5;
    var width = 13;
    var height = 23;
    var x;
    var y;
    //	var sx;
    //	var sy;
    var index = rocketindex;
    rocketindex++;
    
    // empty shape 
    //	var rocketshape = 0;
    var rocketshape = new createjs.Container();
    //public variables:
    this.X = X;
    this.Y = Y;
    this.Index = Index;
    
    // functions:
    this.Init = Init;
    this.Tick = Tick;
    this.Kill = Kill;
    this.toString = toString;

    // ######  implementation
    function Init(xx, yy) {
	// this should be modified to draw actual
	x = xx;
	y = yy;

	rocketanime = new createjs.BitmapAnimation(rs);
	rocketshape.addChild(rocketanime); 
	rocketshape.x = x+45;
	rocketshape.y = y-30;
	rocketanime.gotoAndPlay("run");	
	g.AddToStage(rocketshape);
	//		var rectangle = new createjs.Graphics().beginFill("#0000ff").drawRect(xx, yy, width, height);
	//		shape = new createjs.Shape(rectangle);
	//		g.AddToStage(shape);
    }
    
    function toString() {
	return index.toString();
    }
    
    function X() {
	return x;
    }
    
    function Y() {
	return y;
    }
    
    function Index() {
	return index;
    }

    function Tick() {
	rocketshape.y += speed_y;
	y += speed_y;
	
	if (y < 0) {
	    return true;
	}
	
	return false; 
    }
    
    function Kill() {
	g.RemoveFromStage(rocketshape);
    }
}

function Bonus(g) {
    // ###### header
    //variables:
    var speed_y = 5;
    var width = 3;
    var x;
    var y;
    var height = 5;
    var index = bonusindex;
    bonusindex++; // just for debug
    
    // empty shape 
    var shape = 0;
    
    //public variables:
    this.X = X;
    this.Y = Y;
    this.Index = Index;
    
    // functions:
    this.Init = Init;
    this.Tick = Tick;
    this.Kill = Kill;
    this.toString = toString;

    // ######  implementation
    function Init(xx, yy) {
	// this should be modified to draw actual
	x = xx;
	y = yy;
	var rectangle = new createjs.Graphics().beginFill("#00ffff").drawRect(xx, yy, width, height);
	shape = new createjs.Shape(rectangle);
	g.AddToStage(shape);
    }
    
    function toString() {
	return index.toString();
    }
    
    function X() {
	return x;
    }
    
    function Y() {
	return y;
    }
    
    function Index() {
	return index;
    }

    function Tick() {
	shape.y += speed_y;
	y += speed_y;
	
	if (y > height_canvas) {
	    return true;
	}
	
	return false; 
    }
    
    function Kill() {
	g.RemoveFromStage(shape);
    }
}

function Cannon(g) {
    // ###### header
    //variables:
    var speed_x = 5;
    var speed_y = 3;
    var rockets = 1;
    var shot = rockets.length;
    var key_left = false;
    var key_right = false;
    var key_up = false;
    var key_down = false;
    var width = 87;
    var height = 100;
    var x;
    var y;

    // empty shape 
    //	var shape = 0;
    var ship = new createjs.Container();	
    // functions:
    this.Init = Init;
    this.Tick = Tick;
    this.KeyPressed = KeyPressed;
    this.KeyReleased = KeyReleased;
    this.Shoot = Shoot;
    this.HitBy = HitBy;
    this.width = width;
    this.height = height;

    // ######  implementation
    function Init() {
	// this should be modified to draw actual RNA
	
	anime = new createjs.BitmapAnimation(ss);
	ship.addChild(anime); 
	//spaceship = new createjs.BitmapAnimation(ss);
	ship.x = 250;
	ship.y = 500;
	anime.gotoAndPlay("run");	
	//		stage.addChild(ship);

	/*		var rectangle = new createjs.Graphics().beginFill("#ff0000").drawRect(0, height_canvas-height, width, height);
			shape = new createjs.Shape(rectangle);
			x = shape.x;
			y = height_canvas-height;
	*/
	g.AddToStage(ship);
	// Make mouse moveable 
	//    cannon.onPress= function(evt){
	ship.onPress = function(evt){
	    var offset = {x:evt.target.x-evt.stageX, y:evt.target.y-evt.stageY};
	    evt.onMouseMove = function(ev){
		ev.target.x = ev.stageX+offset.x;
		ev.target.y = ev.stageY+offset.y;
	    }
	}
    }
    
    //function Width() { return width; }
    //function Height() { return height; }

    function Tick() {
	if (key_left && !key_right) {
	    ship.x -= speed_x;
	}
	if (key_right && !key_left) {
	    ship.x += speed_x;
	}
	if (key_up && !key_down) {
	    ship.y -= speed_y;
	}
	if (key_down && !key_up) {
	    ship.y += speed_y;
	}
	ship.x = CLIPx(ship.x, 0, width_canvas-width);
	x = ship.x
	ship.y = CLIPy(ship.y, 0,height_canvas-height);
	y = ship.y;
    }

    function KeyPressed(e) {
	switch (e.keyCode) {
	    // 3 cases: left, right, shoot
	case 37: key_left = true; break;
	case 38: key_up = true; break;
	case 39: key_right = true; break;
	case 40: key_down = true; break;
	    //			case 32: Shoot(shot);

	}
	return 0;
    }

    function KeyReleased(e) {
	switch (e.keyCode) {
	    // 2 cases: left, right
	case 37: key_left = false; break;
	case 38: key_up = false; break;
	case 39: key_right = false; break;
	case 40: key_down = false; break;
	}
	return 0;
    }

    function Shoot(shots) {
	// create Rocket
	if (shots <= rockets){
	    createjs.Sound.play("rockety", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 0.2);			
	    rocket = new Rocket(g);
	    rocket.Init(ship.x,ship.y);	
	    g.AddRocket(rocket);	
	    //			shots++;
	}
    }
    
    function HitBy(bonus) {
	// test if bonus has hit the cannon
	//TODO
	//	console.log(bonus.X(), x, x+width, bonus.Y(), y, y+height);
	if (inRange(bonus.X(), x, x+width) && inRange(bonus.Y(), y, y+height)) {
	    // yeah, we have the bonus!!!
	    return true;
	}
	
	return false;
    }
}

function RNA(g) {
    // ###### header
    // variables:
    var x = 0;
    var y = 0;
    var width = 10;
    var height = 10;
    var widthnt = 10;
    var heightnt = 10;
    var radiusnt = 25;
    var speed_x = 5;
    var speed_y = 5;
    var hitter = 0;

    // sequence
    var sequence = "";
    var nts = [];

    //    var posx = [];
    //    var posy = [];

    // empty shape 
    var shape = 0;
    
    // functions:
    this.Init = Init;
    this.Tick = Tick;
    this.HitBy = HitBy;
    this.ChangePos = ChangePos;
//    this.ChangeSeq = ChangeSeq;
    
    function Init(seq, posx, posy) {
	sequence = seq.toUpperCase();		
	x = posx[0];
	y = posy[0];
	var mx=posx[0], my=posy[0];
	for (var i=0; i<sequence.length; i++) {
	    x=min(x, posx[i]);
	    y=min(y, posy[i]);
	    mx=max(mx, posx[i]);
	    my=max(my, posy[i]);
	    //console.log(posx[i], posy[i]);
	    var nt = new Nucleotide(g);
	    nt.Init(seq[i], posx[i], posy[i], radiusnt);
	    nts.push(nt);
	}
	width = mx-x+2*radiusnt;
	height = my-y+2*radiusnt;
	x-=radiusnt;
	y-=radiusnt;
	// redraw
	//g.RemoveFromStage(shape);
    }

    function ChangePos(positionx, positiony) {
	
	//console.log(positionx, positiony);

	// first assure same middle of bounding box:
	var left = positionx[i];
	var top = positiony[i];
	var mx=positionx[0], my=positiony[0];
	for (var i=0; i<positionx.length; i++) {
	    left=min(left, positionx[i]);
	    top=min(top, positiony[i]);
	    mx=max(mx, positionx[i]);
	    my=max(my, positiony[i]);
	}
	// difference between (middle before) and (after)
	var dx = (x+width/2) - ((left+mx)/2);
	var dy = (y+height/2) - ((top+my)/2);
	for (var i=0; i<positionx.length; i++) {
	    positionx[i]+=dx;
	    positiony[i]+=dy;
	}

	//console.log(positionx, positiony, dx, dy);
	//console.log(x, y, width, height);

	// then change bounding box - can be better!!!
	x = left-radiusnt+dx;
	y = top-radiusnt+dy;
	width = mx-left+2*radiusnt;
	height = my-top+2*radiusnt;

	//console.log(x, y, width, height);

	// then redistribute the subcoordinates to nucleotides
	for (var i=0; i<positionx.length; i++) {
	    nts[i].GoTo(positionx[i], positiony[i]);
	}
    }

    function Tick() {
	x += speed_x;
	//console.log(shape.x);
	var moved = false;
	if (x >= width_canvas-width || x <= 0) {
	    
	    speed_x = -speed_x;
	    y += speed_y;
	    moved = true;
	}

	for (var i=0; i<nts.length; i++) {
	    nts[i].Tick(speed_x, moved?speed_y:0);
	}

	x = CLIPx(x, 0, width_canvas-width);

	//console.log(width_canvas-width);
	if (y > height_canvas-g.cannon.height) {
//	    alert("You have been eaten by a hungry RNA!!!");
	    g.Stop("You have been eaten by a hungry RNA!!!");
	}
    }
    
    function HitBy(rocket) {
	// test if rocket has hit the rna
	//TODO
	//console.log(rocket.X(), x, x+width, rocket.Y(), y, y+height);
	
	
	if (inRange(rocket.X(), x, x+width) && inRange(rocket.Y(), y, y+height)) {
	    //console.log(rocket.X(), x, x+width, rocket.Y(), y, y+height);
	    //			hitter++;
	    var hit = false;
	    for (var i=0; i<nts.length; i++) {
		if (nts[i].HitBy(rocket))  {
		    // maybe generate bonus
		    if (Math.floor(Math.random()*10) >= 5) {
			bonus = new Bonus(g);
			bonus.Init(rocket.X(), rocket.Y());	
			g.AddBonus(bonus);	
		    }

		    // remove it
		    nts[i].Kill();
		    nts.splice(i, 1);
		    
		    // here we should call some refolding function
		    sequence = sequence.slice(0, i) + sequence.slice(i+1, sequence.length);
		    if(sequence.length){
		    //console.log("2", sequence);
			var px = get_fold(sequence, true);
			var py = get_fold(sequence, false);

		    // now set the folded stuff
			console.log(px, py);
			ChangePos(px, py);
		    
		    //console.log(sequence);
			return true;
		    }
		    else{
			g.Stop("You won!");
		    }
		}
	    }	     
	}
	return false;
    }

    /* OLD VERSION    
    // ###### implementation	
    function ChangeSeq(seq, positionx, positiony) {
    sequence = seq.toUpperCase();
    posx = positionx;
    posy = positiony;
    x = posx[0];
    y = posy[0];
    var mx=posx[0], my=posy[0];
    for (var i=0; i<sequence.length; i++) {
    x=min(x, posx[i]);
    y=min(y, posy[i]);
    mx=max(x, posx[i]);
    my=max(y, posy[i]);
    }
    width = mx-x+widthnt;
    height = my-y+heightnt;
    // redraw
    g.RemoveFromStage(shape);
    ReDraw(sequence);
    }

    function Init(seq, positionx, positiony) {
    sequence = seq;
    ChangeSeq(seq, positionx, positiony);
    //ReDraw();
    }
    function ReDraw(seq) {
    //This is used to redraw the RNA after hit by rocket
    shape = new createjs.Text(sequence, "20px Arial", "#0F0");
    shape.x = 0;
    shape.y = 0;
    width = sequence.length*12;
    height = 10;
    g.AddToStage(shape);
    }

    function Tick() {
    shape.x += speed_x;
    //console.log(shape.x);
    if (shape.x >= width_canvas-width || shape.x <= 0) {
    speed_x = -speed_x;
    shape.y += speed_y;
    }
    shape.x = CLIPx(shape.x, 0, width_canvas-width);
    x = shape.x;
    y = shape.y;
    //console.log(width_canvas-width);
    if (shape.y > height_canvas-g.cannon.height || shape.length == 0) {
    //	    alert("You have been eaten by a hungry RNA!!!");
    g.Stop("You have been eaten by a hungry RNA!!!");
    }
    }
    
    function HitBy(rocket) {
    // test if rocket has hit the rna
    //TODO
    //console.log(rocket.X(), x, x+width, rocket.Y(), y, y+height);
    if (inRange(rocket.X(), x, x+width) && inRange(rocket.Y(), y, y+height)) {
    //			hitter++;
    var newseq = sequence.substring(0, sequence.length-1);
    // generate bonus maybe?
    if (Math.floor(Math.random()*10) >= 5) {
    bonus = new Bonus(g);
    bonus.Init(rocket.X(), rocket.Y());	
    g.AddBonus(bonus);	
    }
    if(newseq.length){
    Init(newseq,rocket.X(),rocket.Y());
    return true;    
    }
    else{
    g.Stop("You won!");
    }
    }
    return false;
    }
    */
}

nuclnum = 0;
function Nucleotide(g) {
    // ###### header
    // variables:
    var radius = 10;
    var gotox = 0;
    var gotoy = 0;
    var speed = 1;

    // just debug
    var number = nuclnum;
    nuclnum++;

    // sequence
    var char = "";

    // empty shape 
    var shape = new createjs.Container();	
    
    // functions:
    this.Init = Init;
    this.Tick = Tick;
    this.HitBy = HitBy;
    this.Kill = Kill;
    this.GoTo = GoTo;
    
    // ###### implementation	
    function Init(char_init, x, y, rad) {
	char = char_init.toLowerCase();
	radius = rad;
	// draw
	
	var image = new createjs.Bitmap("./graphics/"+char+".svg");
	shape.addChild(image);
	shape.x = x-radius;
	shape.y = y-radius;
	//console.log(shape.x, shape.y);
	g.AddToStage(shape);
    }
    
    function Kill() {
	g.RemoveFromStage(shape);
    }
    
    function GoTo(x, y) {
	gotox = (x-radius) - shape.x;
	gotoy = (y-radius) - shape.y;
    }

    function Tick(speed_x, speed_y) {
	//console.log("nucl.tick");
	var tmpx = 0;
	if (gotox!=0) {
	    if (abs(gotox)>speed) {
		tmpx = sgn(gotox)*speed;
		gotox -= tmpx;		
		//console.log(number, gotox, tmpx);
	    } else {
		tmpx = gotox;
		gotox = 0;
	    }
 	}
 	var tmpy = 0;
	if (gotoy!=0) {
	    if (abs(gotoy)>speed) {
		tmpy = sgn(gotoy)*speed;
		gotoy -= tmpy;		
	    } else {
		tmpy = gotoy;
		gotoy = 0;
	    }
 	}
 	//console.log("nucl.tick", tmpx, tmpy);
	shape.x += speed_x + tmpx;
	shape.y += speed_y + tmpy;
    }
    
    function HitBy(rocket) {
	// test if rocket has hit this nucleodtide
	// test the circle:
	var dx = shape.x + radius - rocket.X();
	var dy = shape.y + radius - rocket.Y();
	if (dx*dx + dy*dy <= radius*radius) {
	    return true;
	}		
	
	return false;
    }
}

function Game(seq) {
    // ###### header
    // variables:
    // objects inside game
    var cannon = new Cannon(this);
    var rna = new RNA(this);
    var rockets = [];
    var rockets_ok = [];
    var rockets_num = 0;
    var bonuses = [];
    var bonuses_ok = [];
    var bonuses_num = 0;
    var paused = false;
    var canvas = document.getElementById('mainCanvas');
    var loadingInterval = 0;
    // create whole stage (maybe get from before)
    var stage = new createjs.Stage($("#mainCanvas").get(0));
    var tickercount = 0; //used for fadeout of textfield
    stage.mouseMoveOutside = true; 	
    
    // functions:
    this.Init = Init;
    this.Tick = Tick;
    this.Pause = Pause;
    this.Stop = Stop;
    this.Start = Start;
    this.RemoveFromStage = RemoveFromStage;
    this.AddRocket = AddRocket;
    this.AddBonus = AddBonus;
    this.RemRocket = RemRocket;
    this.RemBonus = RemBonus;
    this.AddToStage = AddToStage;
    this.KeyPressed = KeyPressed;
    this.KeyReleased = KeyReleased;
    this.onClick = onClick;
    this.Print = Print;
    //	this.onPress = onPress;
    this.cannon = cannon;
    this.rna = rna;
    this.add_canvas_background = add_canvas_background;
    // ###### implementation	

    clearInterval(loadingInterval);

    var messageField = new createjs.Text("Loading", "bold 24px Arial", "#C0C0C0");
    messageField.maxWidth = 1000;
    messageField.textAlign = "center";
    messageField.x = canvas.width / 2;
    messageField.y = canvas.height / 2;
    stage.addChild(messageField);
    stage.update(); 
    
    var scoreField = new createjs.Text("0", "bold 12px Arial", "#FFFFFF");
    scoreField.textAlign = "right";
    scoreField.x = canvas.width - 10;
    scoreField.y = 22;
    scoreField.maxWidth = 1000;
    
    function Pause() {
	if (!paused) {
	    // ticker paused
	    createjs.Ticker.removeEventListener("tick", Tick);
	    paused = true;
	} else {
	    //ticker unpaused
	    createjs.Ticker.setInterval(100);
	    createjs.Ticker.addEventListener("tick", Tick);
	    paused = false;
	}
    }

    function add_canvas_background(){
    	background1 = new createjs.Container();
	background1.name="background";
    	background1.x = 0;
    	background1.y = -600;		    
    	var background_image1 = new createjs.Bitmap("./graphics/background_canvas.png");
    	background1.addChild(background_image1);		    	
    	stage.addChild(background1);
    	background2 = new createjs.Container();
    	background2.name="background2";
    	background2.x = 0;
    	background2.y = -600;		    
    	var background_image2 = new createjs.Bitmap("./graphics/background_canvas2.png");
    	background2.addChild(background_image2);		    	
    	stage.addChild(background2);
    	background3 = new createjs.Container();
    	background3.name="background3";
    	background3.x = 0;
    	background3.y = -600;		    
    	var background_image3 = new createjs.Bitmap("./graphics/background_canvas3.png");
    	background3.addChild(background_image3);		    	
    	stage.addChild(background3);
    }
    
    function Init() {
	var assetsPath = "assets/";
        manifest = [
            {id:"play", src:assetsPath+"Game-Spawn.mp3|" +assetsPath+"Game-Spawn.ogg"},
	    //            {id:"break", src:assetsPath+"Game-Break.mp3|" +assetsPath+"Game-Break.ogg", data:6},
	    //            {id:"death", src:assetsPath+"Game-Death.mp3|" +assetsPath+"Game-Death.ogg"},
            {id:"rockety", src:assetsPath+"Game-Shoot.mp3|" +assetsPath+"Game-Shoot.ogg", data:6},
	    //            {id:"music", src:assetsPath+"18-machinae_supremacy-lord_krutors_dominion.mp3|" +assetsPath+"18-machinae_supremacy-lord_krutors_dominion.ogg"}
        ];

	preload = new createjs.LoadQueue();
	preload.installPlugin(createjs.Sound);
	preload.addEventListener("complete", doneLoading);
	preload.addEventListener("progress", updateLoading);
	preload.loadManifest(manifest);

	function updateLoading(event) {
	    var progress = event ? event.progress+0.5|0 : 0;
	    messageField.text = "Loading " + progress + "%";
	    stage.update();
	}
	
	function doneLoading() {
	    //	    stage.removeChild(messageField);
	    //	    stage.update();
	    //
	    messageField.text = "Prepare for InvadRNA";
	    //		    stage.addChild(messageField);
	    stage.update(); //update the stage to show text
	    //awsomemusic
	    createjs.Sound.play("play", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.4);			
	    // start the music
	    // Init()
	    // watchRestart();
	} 
	// preload.removeEventListener("complete");

	Start();
	
    }

    function Tick() {
	tickercount++;
	if (tickercount == 20){
	    stage.removeChild(messageField);
	    stage.update();
	}

	// send ticks to children
	cannon.Tick();
	rna.Tick();
	
	// rna hit by rockets?
	for (var i=0; i<rockets.length; i++) {
	    if (!rockets_ok[i]) continue;
	    to_del = rockets[i].Tick();
	    if (!to_del) {
		to_del = rna.HitBy(rockets[i]);
		//console.log(rockets[i].X(),to_del);
	    }
	    if (to_del) {
		//console.log(rockets.length);
		rockets[i].Kill();
		rockets_ok[i] = false;
		rockets_num ++;	
		//console.log(rockets.length);
	    }
	    RemRocket();
	}
	// canon hit by bonuses?
	for (var i=0; i<bonuses.length; i++) {
	    if (!bonuses_ok[i]) continue;
	    to_del = bonuses[i].Tick();
	    if (!to_del) {
		to_del = cannon.HitBy(bonuses[i]);
		//console.log(bonuses[i].X(),to_del);
	    }
	    if (to_del) {
		//console.log(bonuses.length);
		bonuses[i].Kill();
		bonuses_ok[i] = false;
		bonuses_num ++;	
		//console.log(bonuses.length);
	    }
	    RemBonus();
	}
	
	
	// do other things

	// update canvas		
	var background1=stage.getChildByName("background");
	var background2=stage.getChildByName("background2");
  	var background3=stage.getChildByName("background3");
  	if(background1.y > 600){
	    background1.y = -1200;
  	}
  	if(background2.y > 600){
     	    background2.y = -1200;
  	}
  	if(background3.y > 600){
     	    background3.y = -1200;
  	}
  	background1.y +=2;
  	background2.y +=9;	
  	background3.y +=14;	
	stage.update();
    }

    function AddRocket(rocket) {
	//console.log(rocket.Index(), rocket.index, rocket.toString());
	rockets.push(rocket);
	rockets_ok.push(true);
	//console.log(rockets.toString());
	//console.log(rockets_ok.toString());
    }
    
    function AddBonus(bonus) {
	bonuses.push(bonus);
	bonuses_ok.push(true);
    }
    
    function RemRocket() {
	// remove occurs only each 10 rockets
	if (rockets_num > 1) {
	    //console.log("remrockets");
	    var removed = 0;
	    // resort the array
	    //console.log(rockets.toString());
	    for (var i=0; i<rockets.length; i++) {
		if (!rockets_ok[i]) removed++;
		else if (removed>0) {
		    rockets[i-removed]=rockets[i];
		    rockets_ok[i-removed]=true;
		}
	    }
	    rockets.splice(rockets.length-removed, removed);
	    rockets_ok.splice(rockets_ok.length-removed, removed);
	    //console.log(rockets.toString());
	    rockets_num = 0;
	}
    }

    function RemBonus() {
	// remove occurs only each 10 bonuses
	if (bonuses_num > 1) {
	    //console.log("remrockets");
	    var removed = 0;
	    // resort the array
	    //console.log(bonuses.toString());
	    for (var i=0; i<bonuses.length; i++) {
		if (!bonuses_ok[i]) removed++;
		else if (removed>0) {
		    bonuses[i-removed]=bonuses[i];
		    bonuses_ok[i-removed]=true;
		}
	    }
	    bonuses.splice(bonuses.length-removed, removed);
	    bonuses_ok.splice(bonuses_ok.length-removed, removed);
	    //console.log(bonuses.toString());
	    bonuses_num = 0;
	}
    }

    function AddToStage(drawable) {
	stage.addChild(drawable);
    }
    
    function RemoveFromStage(drawable) {
	//console.log(drawable);
	stage.removeChild(drawable);
    }

    function KeyPressed(e) {
	switch (e.keyCode) {
	    // first result some functional keys (for example Pause or smth...)
	case 19:
	case 80: Pause(); break;
	case 32: cannon.Shoot(rockets.length); break;
	    // then send rest to Cannon
	default: 
	    cannon.KeyPressed(e);
	    break;
	}
	
    }

    function KeyReleased(e) {
	// just send them to cannon
	cannon.KeyReleased(e);
    }

    function onClick(){
	//    if (i < rocketnumber){shoot(); i++;} fly=true;
	//		shoot(); fly=true;
	cannon.Shoot(rockets.length);
    }

    /*	function onPress(){
    // this lets our drag continue to track the mouse even when it leaves the canvas:
    // play with commenting this out to see the difference.
    stage.mouseMoveOutside = true; 
    //		cannon.onPress(evt);
    }
    */
    function Start() {

	// draw background:
	var canvas_background=add_canvas_background();
	
	// initalize objects:
	cannon.Init();
	
	// somehow get the positions for nucleotides (x, y) into posx, posy: //TODO
	var posx = [];
	var posy = [];

	posx = get_fold(seq, true);
	posy = get_fold(seq, false);

	rna.Init(seq, posx, posy);
	
	// draw them!
	stage.update();

	//ticker
	createjs.Ticker.setInterval(100);
	createjs.Ticker.addEventListener("tick", Tick);
	
	// listeners to key press/release
	window.addEventListener('keydown', KeyPressed, true);
	window.addEventListener('keyup', KeyReleased, true);
	window.addEventListener('click', onClick, true);
    };

    function Stop(msg) {
	// opposite of Start()
	//	alert("GameOver");
	stage.removeAllChildren();
	stage.clear();
	stage.update;

	messageField.text = "GameOver\n" + msg + "\nInsert coin to restart!";
	//	var text = "GameOver, " + msg + ", insert coin to restart!";
	//	messageField.text = "text";

	//	messageField.text = "GameOver, insert coin to restart!";
	stage.addChild(messageField);
	stage.update();

	createjs.Ticker.removeEventListener("tick", Tick);
	window.removeEventListener('keydown', KeyPressed);
	window.removeEventListener('keyup', KeyReleased);
    }

    function Print(arr) {
	//	var printer = document.getElementById('printHere');
	//	$("#printHere span").html("HALLO!!!");
	var printer = [];
	printer.push(arr);
	//	$("#printHere span").html(arr);
	for (var i=0; i<printer.length; i++) {
	    $("#printHere span").text(printer[i]);
	}
    }
}
