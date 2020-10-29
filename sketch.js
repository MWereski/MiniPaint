var canv;
var saveButton, clearButton;
var brushSizeSlider;

let pg, lupePg;

var brushSizeVal = 2;
var brushSizeLabel;

var hexLabel, saturationLabel, valLabel;
var hexIn, satIn, valIn;

var fileNameIn;

var tempImg, tempImg2;

var pencilButton;
var squareButton;
var slashButton;
var backSlashButton;
var sprayButton;
var lineButton;
var rubberButton;

var howManyPoints = 2;

var toolNumber = 0;

var lupaCB;

var sat = 75, val = 100;

var lupeOn = false;
var zoomed = false;

var p1bool = false;

var fileNameVal = "noName";

var p1;

var smallButton, mediumButton, bigButton;

var mx, my;
var imw, imh;

var canvW = 400, canvH = 400;

function windowResized(){
	canv.position(windowWidth/2-width/2, windowHeight/2-height/2+20, 'static');
}

function setup() {
	canv = createCanvas(canvW, canvH);
	
	pg = createGraphics(canvW, canvH-30);
	
	canv.position(windowWidth/2-width/2, windowHeight/2-height/2+20, 'static');
  
	background(255);
	pg.background(255);
	colorMode(HSB);
	pg.colorMode(HSB);
	
	// Buttons
	
	saveButton = select("#saveButton");
	saveButton.mousePressed(saveCanvasAsJPG);
	
	clearButton = select("#clearButton");
	clearButton.mousePressed(clearCanvas);
	
	pencilButton = select("#pencilButton");
	pencilButton.mousePressed(pencilButtonFunc);
	
	squareButton = select("#squareButton");
	squareButton.mousePressed(squareButtonFunc);
	
	slashButton = select("#slashButton");
	slashButton.mousePressed(slashButtonFunc);
	
	backSlashButton = select("#backSlashButton");
	backSlashButton.mousePressed(backSlashButtonFunc);
	
	sprayButton = select("#sprayButton");
	sprayButton.mousePressed(sprayButtonFunc);
	
	lineButton = select("#lineButton");
	lineButton.mousePressed(lineButtonFunc);
	
	smallButton = select("#smallButton");
	smallButton.mousePressed(smallButtonFunc);
	
	mediumButton = select("#mediumButton");
	mediumButton.mousePressed(mediumButtonFunc);
	
	bigButton = select("#bigButton");
	bigButton.mousePressed(bigButtonFunc);
	
	rubberButton = select("#rubberButton");
	rubberButton.mousePressed(rubberButtonFunc);
	
	//sliders

	brushSizeSlider = select('#brushSize');
	brushSizeSlider.mouseClicked(getBrushSize);
	brushSizeSlider.mouseMoved(getBrushSize);
	
	//inputs
	
	hexIn = select('#hexIn');
	hexIn.changed(setHexIn);
	
	satIn = select('#satIn');
	satIn.changed(setSatIn);
	
	valIn = select('#valIn');
	valIn.changed(setValIn);
	
	fileNameIn = select('#fileName');
	fileNameIn.input(setFileName);
	
	//labels
	
	brushSizeLabel = select('#brushSizeLabel');
	
	//HSV
	
	hexLabel = select('#HEX');
	saturationLabel = select('#SATURATION');
	valLabel = select('#VALUE');
	
	hexLabel.html("Hex: " + int(0));
	hexIn.value(int(0));
	 
	saturationLabel.html("Saturation: " + int(75) + "%");
	satIn.value(int(sat));
	
	valLabel.html("Value: " + int(100) + "%");
	valIn.value(int(val));
	

	//Checkbox
	
	lupaCB = select('#lupa');
	lupaCB.changed(lupaCBChange);
	
	c = 170;
	
}

function draw() {
	
	strokeWeight(0);	
	image(pg, 0, 0);
	pg.strokeWeight(brushSizeVal);
	if(mouseIsPressed){
		//stroke(c,75,100)
		if(lupeOn==false && mouseX > 0 && mouseX < canvW && mouseY > 0 && mouseY < canvH-30){
			switch(toolNumber){
				case 0:
					pg.fill(c,sat,val);
					pg.stroke(c,sat,val);
					pg.line(mouseX,mouseY,pmouseX,pmouseY);
					break;
				case 1:
					pg.fill(c,sat,val);
					pg.stroke(c,sat,val);
					pg.rect(mouseX-(brushSizeVal*10)/2,mouseY-(brushSizeVal*5)/2,brushSizeVal*10,brushSizeVal*5);
					break;
					
				case 2:

					pg.stroke(c,sat,val);
					pg.strokeWeight(2);
					pg.line(mouseX-(brushSizeVal*2), mouseY+(brushSizeVal*2), mouseX+(brushSizeVal*2), mouseY-(brushSizeVal*2));
					break;
				case 3:

					pg.stroke(c,sat,val);
					pg.strokeWeight(2);
					pg.line(mouseX-(brushSizeVal*2), mouseY-(brushSizeVal*2), mouseX+(brushSizeVal*2), mouseY+(brushSizeVal*2));
					break;
				case 4:

					if(mouseX > 0 && mouseX < canvW && mouseY > 0 && mouseY < canvH-30){

						pg.strokeWeight(2);
						
						howManyPoints = map(brushSizeVal, 1, 36, 1, 10);
						
						for(var i = 0; i < howManyPoints; i++){
							pg.point(random(mouseX, mouseX + brushSizeVal*3)-brushSizeVal, random(mouseY, mouseY + brushSizeVal*3)-brushSizeVal);
						}
					}
					break;
				case 5:

					pg.stroke(c,sat,val);

					break;
				case 6:

					pg.stroke(c,0,val);
					pg.stroke(c,0,val);
					pg.line(mouseX,mouseY,pmouseX,pmouseY);
					break;
				default:
					pg.line(mouseX,mouseY,pmouseX,pmouseY);
			}
		}
	}

		for (var x = 0;x<360;x = x + 1){
			translate(width/2-180, 0);
			fill(x/360 * 360, 100, 100);
			rect(x, height - 30, 10,30)
			translate(-(width/2-180), 0);
  	}
	
	if(lupeOn==true){

		image(lupePg, 0, 0);
	}
}
function mousePressed(){ 

	if(lupeOn==true && mouseX > 0 && mouseX < canvW && mouseY > 0 && mouseY < canvH-30 && zoomed == false){
		zoomed = true;
			if(mouseY > 320){	
				if(mouseX > 500){
					tempImg = createGraphics(pg.width, pg.height);
					tempImg.image(pg, 0, 0);
					mx = mouseX-100;
					my = mouseY-50;
					imw = 200-(mouseX-pg.width + 100);
					imh = 100-(mouseY-pg.height + 50);
					pg.copy(pg, mouseX-100, mouseY-50, 200-(mouseX-pg.width + 100), 100-(mouseY-pg.height + 50), 0, 0, pg.width, pg.height);

				}else if(mouseX < 100){
					tempImg = createGraphics(pg.width, pg.height);
					tempImg.image(pg, 0, 0);
					mx = mouseX-100 +( 100 - mouseX);
					my = mouseY-50;
					imw = 200-( 100 - mouseX);
					imh = 100-(mouseY-pg.height + 50);
					pg.copy(pg, mouseX-100 +( 100 - mouseX), mouseY-50, 200-( 100 - mouseX), 100-(mouseY-pg.height + 50), 0, 0, pg.width, pg.height);

				}else{
					tempImg = createGraphics(pg.width, pg.height);
					tempImg.image(pg, 0, 0);
					mx = mouseX-100
					my = mouseY-50;
					imw = 200;
					imh = 100-(mouseY-pg.height + 50);
					pg.copy(pg, mouseX-100, mouseY-50, 200, 100-(mouseY-pg.height + 50), 0, 0, pg.width, pg.height);

				}
			}else if(mouseY < 50){
				if(mouseX > 500){
					tempImg = createGraphics(pg.width, pg.height);
					tempImg.image(pg, 0, 0);
					mx = mouseX-100;
					my = mouseY-50 + ( 50 - mouseY);
					imw = 200-(mouseX-pg.width + 100);
					imh = 100-( 50 - mouseY);
					pg.copy(pg, mouseX-100, mouseY-50 + ( 50 - mouseY), 200-(mouseX-pg.width + 100), 100-( 50 - mouseY), 0, 0, pg.width, pg.height);

				}else if(mouseX < 100){
					tempImg = createGraphics(pg.width, pg.height);
					tempImg.image(pg, 0, 0);
					mx =  mouseX-100+( 100 - mouseX);
					my = mouseY-50 + ( 50 - mouseY);
					imw = 200-( 100 - mouseX);
					imh = 100-( 50 - mouseY);
					pg.copy(pg, mouseX-100+( 100 - mouseX), mouseY-50 + ( 50 - mouseY), 200-( 100 - mouseX), 100-( 50 - mouseY), 0, 0, pg.width, pg.height);

				}else{
					tempImg = createGraphics(pg.width, pg.height);
					tempImg.image(pg, 0, 0);
					mx =  mouseX-100;
					my = mouseY-50 + ( 50 - mouseY);
					imw = 200;
					imh =  100-( 50 - mouseY);
					pg.copy(pg, mouseX-100, mouseY-50 + ( 50 - mouseY), 200, 100-( 50 - mouseY), 0, 0, pg.width, pg.height);

				}
			}else{
				if(mouseX > 500){
					tempImg = createGraphics(pg.width, pg.height);
					tempImg.image(pg, 0, 0);
					mx =  mouseX-100;
					my = mouseY-50;
					imw = 200-(mouseX-pg.width + 100);
					imh =  100;
					pg.copy(pg, mouseX-100, mouseY-50, 200-(mouseX-pg.width + 100), 100, 0, 0, pg.width, pg.height);

				}else if(mouseX < 100){
					tempImg = createGraphics(pg.width, pg.height);
					tempImg.image(pg, 0, 0);
					mx =  mouseX-100+( 100 - mouseX);
					my = mouseY-50;
					imw =  200-( 100 - mouseX);
					imh =  100;
					pg.copy(pg, mouseX-100+( 100 - mouseX), mouseY-50, 200-( 100 - mouseX), 100, 0, 0, pg.width, pg.height);

				}else{
					tempImg = createGraphics(pg.width, pg.height);
					tempImg.image(pg, 0, 0);
					mx =  mouseX-100;
					my = mouseY-50;
					imw =  200;
					imh =  100;
					pg.copy(pg, mouseX-100, mouseY-50, 200, 100, 0, 0, pg.width, pg.height);

				}
				
			}
			lupePg.clear();
			lupePg.noFill();
			lupePg.stroke(255);
			lupePg.strokeWeight(3);
			lupePg.line(mouseX-12, mouseY-20, mouseX+12, mouseY-20);
			
			lupePg.stroke(0);
			lupePg.strokeWeight(2);
			lupePg.line(mouseX-10, mouseY-20, mouseX+10, mouseY-20);

			
			
		}else if(lupeOn==true && mouseX > 0 && mouseX < canvW && mouseY > 0 && mouseY < canvH-30 && zoomed == true){
				zoomed = false;
				tempImg.copy(pg, 0, 0, canvW, canvH-30, mx, my, imw, imh);

				pg = createGraphics(tempImg.width, tempImg.height);
				pg.colorMode(HSB);
				pg.image(tempImg, 0, 0);
				
				lupePg.clear();
				lupePg.noFill();
				lupePg.stroke(255);
				lupePg.strokeWeight(3);
				lupePg.line(mouseX-12, mouseY-20, mouseX+12, mouseY-20);
				lupePg.line(mouseX, mouseY-32, mouseX, mouseY-8);
				
				lupePg.stroke(0);
				lupePg.strokeWeight(2);
				lupePg.line(mouseX-10, mouseY-20, mouseX+10, mouseY-20);
				lupePg.line(mouseX, mouseY-30, mouseX, mouseY-10);
				lupePg.strokeWeight(1);
				lupePg.rect(mouseX-100, mouseY-50, 200, 100);
		}
		else{
			if((mouseX > width/2-180) && (mouseX < width/2+180) && (mouseY > height - 30) && (mouseY < height)){
			  c = map(mouseX,width/2-180,width/2+180,0,360)
			  pg.stroke(c,sat,val);
			  hexLabel.html("Hex: " + int(c));	
			  hexIn.value(int(c));
			  
			  saturationLabel.html("Saturation: " + int(sat) + "%");
			  satIn.value(int(sat));
			  
			  valLabel.html("Value: " + int(val) + "%");
			  valIn.value(int(val));
			}
		}
		
		if(lupeOn==false && mouseX > 0 && mouseX < canvW && mouseY > 0 && mouseY < canvH-30 && toolNumber==5){
			if(p1bool == false){
				p1 = createVector(mouseX, mouseY);
				p1bool = true;
			}else{
				pg.line(p1.x, p1.y, mouseX, mouseY);
				p1bool = false;
			}
			
		}
}

function mouseMoved(){
	if(lupeOn){
	    lupePg.clear();
		lupePg.noFill();
		if(zoomed==false){
			lupePg.stroke(255);
			lupePg.strokeWeight(3);
			lupePg.line(mouseX-12, mouseY-20, mouseX+12, mouseY-20);
			lupePg.line(mouseX, mouseY-32, mouseX, mouseY-8);
			
			lupePg.stroke(0);
			lupePg.strokeWeight(2);
			lupePg.line(mouseX-10, mouseY-20, mouseX+10, mouseY-20);
			lupePg.line(mouseX, mouseY-30, mouseX, mouseY-10);
			lupePg.strokeWeight(1);
			lupePg.rect(mouseX-100, mouseY-50, 200, 100);

		}else{
			lupePg.stroke(255);
			lupePg.strokeWeight(3);
			lupePg.line(mouseX-12, mouseY-20, mouseX+12, mouseY-20);
			
			lupePg.stroke(0);
			lupePg.strokeWeight(2);
			lupePg.line(mouseX-10, mouseY-20, mouseX+10, mouseY-20);

		}
	}
}

function saveCanvasAsJPG(){
	saveCanvas(pg, fileNameVal, 'jpg');
}

function clearCanvas(){
	clear();
    background(255);
	pg.clear();
	pg.background(255);
}
function getBrushSize(){
	brushSizeVal = brushSizeSlider.value();
	brushSizeLabel.html("Size: " + brushSizeVal);
}

function setHexIn(){
	if(hexIn.value() > 360) hexIn.value(360);
	if(hexIn.value() < 0) hexIn.value(0);
	
	c = hexIn.value();
	hexLabel.html("Hex: " + int(c));			
	pg.stroke(c,sat,val);
}

function setSatIn(){
	if(satIn.value() > 100) satIn.value(100);
	if(satIn.value() < 0) satIn.value(0);
	
	sat = satIn.value();
	saturationLabel.html("Saturation: " + int(sat) + "%");	
	pg.stroke(c,sat,val);
}

function setValIn(){
	if(valIn.value() > 100) valIn.value(100);
	if(valIn.value() < 0) valIn.value(0);
	
	console.log("a");
	
	val = valIn.value();
	valLabel.html("Value: " + int(val) + "%");	
	pg.stroke(c,sat,val);
}

function lupaCBChange(){
	lupeOn = !lupeOn;
	if(lupeOn==true){
		lupePg = createGraphics(canvW, canvH-30);
	}
}
function pencilButtonFunc(){
	toolNumber = 0;
}
function squareButtonFunc(){
	toolNumber = 1;
}
function slashButtonFunc(){
	toolNumber = 2;
}
function backSlashButtonFunc(){
	toolNumber = 3;
}
function sprayButtonFunc(){
	toolNumber = 4;
}
function lineButtonFunc(){
	toolNumber = 5;
}
function rubberButtonFunc(){
	toolNumber = 6;
}
function smallButtonFunc(){
	canvW = 400;
	canvH = 400;
	resizeCanvas(canvW, canvH);
	canv.position(windowWidth/2-width/2, windowHeight/2-height/2+20, 'static');
	
	var newPG = createGraphics(canvW, canvH-30);
	newPG.background(255);
    newPG.image(pg, 0, 0, pg.width, pg.height);
    pg = newPG;
	pg.colorMode(HSB);

	pg.strokeWeight(brushSizeVal);
	
}
function mediumButtonFunc(){
	canvW = 800;
	canvH = 600;
	resizeCanvas(canvW, canvH);
	canv.position(windowWidth/2-width/2, windowHeight/2-height/2+20, 'static');
	
	var newPG = createGraphics(canvW, canvH-30);
	newPG.background(255);
    newPG.image(pg, 0, 0, pg.width, pg.height);
    pg = newPG;
	pg.colorMode(HSB);
	pg.strokeWeight(brushSizeVal);
}
function bigButtonFunc(){
	canvW = 1000;
	canvH = 800;
	resizeCanvas(canvW, canvH);
	canv.position(windowWidth/2-width/2, windowHeight/2-height/2+20, 'static');
	
	var newPG = createGraphics(canvW, canvH-30);
	newPG.background(255);
    newPG.image(pg, 0, 0, pg.width, pg.height);
    pg = newPG;
	pg.colorMode(HSB);
	pg.strokeWeight(brushSizeVal);
}
function setFileName(){
	fileNameVal = fileNameIn.value();
}