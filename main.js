Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5.version',ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1ldU4yzcA/model.json",modelLoaded);

function modelLoaded(){
    console.log("model is Loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The  Prediction is " + prediction_1;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1);
    utterThis.rate=0.5;
    synth.speak(utterThis);
}

function  check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img,gotresult);
}

function gotresult(error,result)
{
if (error){
    console.log(error);
}else{
    console.log(result);
        document.getElementById("result_gesture_name").innerHTML = result[0].label;
        prediction_1 = result[0].label;
    speak();
    if(result[0].label=="Amazing")
    {
        document.getElementById("result_emoji").innerHTML="&#128076;";
    }
    if(result[0].label=="best")
    {
        document.getElementById("result_emoji").innerHTML="&#128077; ";
    }
    if(result[0].label=="Clap")
    {
        document.getElementById("result_emoji").innerHTML="&#128079;";
    }
    if(result[0].label=="Victory")
    {
        document.getElementById("result_emoji").innerHTML="&#129304;";
    }
}
}
