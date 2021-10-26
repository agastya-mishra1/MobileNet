prediction_1="";
prediction_2="";

Webcam.set({
width:350,
height:350,
image_format:"png",
png_quality:100
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snap(){
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML='<img id="capture" src="'+data_uri+'">';
});
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iZAxH0DDq/model.json',modelLoaded);

function modelLoaded(){
console.log("Model is Loaded");
}
function speak(){
var synth=window.speechSynthesis;
data_1=" The first prediction is "+prediction_1;
data_2=" and The second prediction is "+prediction_2;
var utter=new SpeechSynthesisUtterance(data_1 + data_2);
synth.speak(utter);
} 

function check(){
img = document.getElementById("capture");
classifier.classify(img,gotResult);
}

function gotResult(error,results){
if(error){
console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_emotion1").innerHTML=results[0].label;
    document.getElementById("result_emotion2").innerHTML=results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();
    if(prediction_1=="happy"){
        document.getElementById("result_emoji1").innerHTML="&#128522;";
    }
    if(prediction_1=="sad"){
        document.getElementById("result_emoji1").innerHTML="&#128532;";
    }
    if(prediction_1=="angry"){
        document.getElementById("result_emoji1").innerHTML="&#128548;";
    }
   
    if(prediction_2=="happy"){
        document.getElementById("result_emoji2").innerHTML="&#128522;";
    }
    if(prediction_2=="sad"){
        document.getElementById("result_emoji2").innerHTML="&#128532;";
    }
    if(prediction_2=="angry"){
        document.getElementById("result_emoji2").innerHTML="&#128548;";
    }

}
}
