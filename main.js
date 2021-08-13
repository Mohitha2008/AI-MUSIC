var song="";
var leftwristX=0;
var leftwristY=0;
var rightwristX=0;
var rightwristY=0;

function preload(){
    song=loadSound("pp.mp3");
}


function setup(){
    canvas=createCanvas(600,600);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotposes);
}
function draw(){
    image(video,0,0,600,600);
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("poseNet is initialized");
}
function gotposes(results){
    if(results.length>0){
        console.log(results);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        console.log("leftwristX=  "+leftwristX+" leftwristY=  "+leftwristY+" rightwristtX=  "+rightwristX+" rightwristY=  "+rightwristY);
    }
}