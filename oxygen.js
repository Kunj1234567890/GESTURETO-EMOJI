 // https://teachablemachine.withgoogle.com/models/OlGnYTcYS/model.json
 prediction_1 = "";
prediction_2 = "";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
})
camera = document.getElementById("camera");
Webcam.attach('#camera');
function TakeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_img" src="'+data_uri+'" >'
    })
}
console.log('ml5 version' , ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/OlGnYTcYS/model.json',modelloaded)
function modelloaded(){
    console.log('  model is ready')
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "The second prediction is " + prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterthis);
}      
function check(){
img = document.getElementById('capture_img'); 
classifier.classify(img , gotresults);

}
function gotresults(error,results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById('result_gesture_name').innerHTML = results[0].label;
        document.getElementById('result_gesture_name2').innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (results[0].label == "good job"){
            document.getElementById('update_emoji').innerHTML = "&#128076;"
        }
        if (results[0].label == "victory"){
            document.getElementById('update_emoji').innerHTML = "&#9996;"
        }
        if (results[0].label == "awesome"){
            document.getElementById('update_emoji').innerHTML = "&#128077;"
        }
        if (results[1].label == "good job"){
            document.getElementById('update_emoji').innerHTML = "&#128076;"
        }
        if (results[1].label == "victory"){
            document.getElementById('update_emoji').innerHTML = "&#9996;"
        }
        if (results[1].label == "awesome"){
            document.getElementById('update_emoji').innerHTML = "&#128077;"
        }
    }

}