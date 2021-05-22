let videoElem = document.querySelector("video"); // will only be available by autoplay or control
let videoRecorder = document.querySelector("#record-video");
let recordState = false;
let captureBtn = document.querySelector("#capture");

// let audioElem = document.querySelector("audio");

// permissions
let constraints = {
    video:true,
    // audio: {
    //     echoCancellationType: 'system',
    //     echoCancellation: true,
    //     noiseSuppression: true,
    // }
    audio: true,
}

let mediaRecorder;
// will store recorded video
let buffer = [];
// navigator has info abt browser
// The Navigator.mediaDevices read-only property returns a MediaDevices object, which provides access to connected media input devices like cameras and microphones, as well as screen sharing.
navigator.mediaDevices
// getUserMedia => With the user's permission through a prompt, turns on a camera and/or a microphone on the system and provides a MediaStream containing a video track and/or an audio track with the input.
.getUserMedia(constraints) 
    .then(function (mediaStream) {
        //feed ui
        videoElem.srcObject = mediaStream; // a MediaStream containing a video track and/or an audio track with the input.
        mediaRecorder = new MediaRecorder(mediaStream); // Creates a new MediaRecorder object, given a MediaStream to record
        
        // triggers on mediaRecorder.start()
        mediaRecorder.addEventListener("dataavailable",function(e){
            buffer.push(e.data);
        })
        // triggers on mediaRecorder.stop()
        mediaRecorder.addEventListener("stop", function (e) {
            // convert data to blob
            const blob = new Blob(buffer, { type: 'video/mp4' }); // converts data to file of this type
            const url = window.URL.createObjectURL(blob); // creates file to url
            // download btn
            let a = document.createElement("a");
            // download
            a.download = "file.mp4"; // downloads in this file
            a.href = url; // url contains data
            a.click();
            buffer = [];
        })
}).catch(function(err){
    console.log(err);
})
// var echoCancellation = navigator.MediaTrackSetting.echoCancellation;
videoRecorder.addEventListener("click",function(e){
    if(!mediaRecorder){ 
        alert("first allow permissions");
        return;
    }
    if(recordState==false){
        mediaRecorder.start() // automatically triggers dataavailable event
        recordState = true;
        videoRecorder.setAttribute("class","fas fa-stop-circle record-btn")
    }else{
        mediaRecorder.stop(); // automatically trigger stop event
        recordState = false;
        videoRecorder.setAttribute("class","fas fa-video record-btn")
        
    }
});

// create canvas of size of videoFrame
// draw frame
// 
captureBtn.addEventListener("click", function (e) {
    let canvas = document.createElement("canvas");
    canvas.width = videoElem.videoWidth;
    canvas.height = videoElem.videoHeight;
    let tool = canvas.getContext("2d");
    tool.drawImage(videoElem, 0, 0);
    let link = canvas.toDataURL(); // converts to link 
    let a = document.createElement("a");
    a.href = link;
    a.download = "file.png";
    a.click();
    a.remove();
    canvas.remove();
})


