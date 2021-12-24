img = "";
status = "" ;
objects=[];
objectDetector="";
//dumy commit to change SHA256 file hash
function preload(){
    img = loadImage('dog-cat.jpg');
}
function setup() { 
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    objectDetector=ml5.objectDetector('cocossd',modelLoaded); 
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}
function draw(){
    image(video,0,0,380,380);//cover the canvas with image
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detector(video,gotResult);
        for(i=0;i<objects.length;i++){
           document.getElementById("status").innerHTML="status: object Detected";
           document.getElementById("number_of_objects").innerHTML='number of objects detected are:'+objects.length;
           fill(r,g,b);
           percent=floor(objects[i].confidence*100);
           text(object[i].label+" " + percent + "%",objects[i].x,objects[i].y);
           noFill();
           stroke(r,g,b);
           rect(objects[i].x,object[i].y,objects[i].width,objects[i].height); 
        }
    }
}
function modelLoaded(){
    console.log("Coco has arrived.Bus 165 with SS is running 30 minutes late! D is still asleep and may not arrive at all ! ");
    status=true;
    objectDetector.detect(video,gotResult);
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
