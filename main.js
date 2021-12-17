img = "";
status = "" ;
objects=[];
//dumy commit to change SHA256 file hash
function preload(){
    img = loadImage('dog-cat.jpg');
}
function setup() { 
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded); 
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}
function draw(){
    image(img,0,0,640,420);//cover the canvas with image
    if(status!=""){
        for(i=0;i<objects.length;i++){
           document.getElementById("status").innerHTML="status: object Detected";
           fill("#FF0000");
           percent=floor(objects[i].confidence*100);
           text(object[i].label+" " + percent + "%",objects[i].x,objects[i].y);
           noFill();
           stroke("#FF0000");
           rect(objects[i].x,object[i].y,objects[i].width,objects[i].height); 
        }
    }
}
function modelLoaded(){
    console.log("Coco has arrived.Bus 165 with SS is running 30 minutes late! D is still asleep and may not arrive at all ! ");
    status=true;
    objectDetector.detect('img',gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
