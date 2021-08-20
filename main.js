var song1="";
var song2="";
var song1_status="";
var song2_status="";
var leftwristX=0;
var leftwristY=0;
var rightwristX=0;
var rightwristY=0;
var scoreLeftwrist="";
var scoreRightwrist="";

function preload(){
    song1=loadSound("pp.mp3");
    song2=loadSound("hp.mp3");
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
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("#ff0000");
    stroke("#ff0000");
    if(scoreLeftwrist>0.2){
        circle(leftwristX,leftwristY,20);
        song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("name").innerHTML="Playing- Harry Potter Theme Song";
        }
        
    }
    if(scoreRightwrist>0.2){
        circle(rightwristX,rightwristY,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("name").innerHTML="Playing- Pink Panther Theme Song";
        }
        
    }
}

function modelLoaded(){
    console.log("poseNet is initialized");
}
function gotposes(results){
    if(results.length>0){
        console.log(results);
        scoreRightwrist=results[0].pose.keypoints[10].score;
        scoreLeftwrist=results[0].pose.keypoints[9].score;
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        console.log("leftwristX=  "+leftwristX+" leftwristY=  "+leftwristY+" rightwristtX=  "+rightwristX+" rightwristY=  "+rightwristY);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}