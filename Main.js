camera = document.getElementById("hed")

Webcam.attach("#hed")

Webcam.set({
    width:350,
    height:300,
    img_format:"png",
    png_quality:90
    })

function capture() {
    Webcam.snap(function(data_uri){
        document.getElementById("output").innerHTML = '<img id="selfie_image" src="'+data_uri+'"/>';
    })
}

console.log(ml5.version, "ml5.version")
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/jpBMunovA/model.json", loading)

function loading() {
    console.log("Model loading!")
}

function check(){
    var img = document.getElementById("selfie_image");
    classifier.classify(img, getresult);
}

function getresult(error, results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        var synth = window.speechSynthesis;
        Speak_data = "this is"+results[0].label
        var utter_this = new SpeechSynthesisUtterance(Speak_data)
        synth.speak(utter_this)
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.tofixed(3);
    }
}
