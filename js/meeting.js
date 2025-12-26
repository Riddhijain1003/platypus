alert("Meeting JS loaded");

const localVideo = document.getElementById("localVideo");
const muteBtn = document.getElementById("muteBtn");
const cameraBtn = document.getElementById("cameraBtn");

let localStream;
let isMuted = false;
let isCameraOff = false;

// Get camera + mic
if (localVideo) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      localStream = stream;
      localVideo.srcObject = stream;
    })
    .catch(err => {
      alert("Camera error: " + err.message);
    });
}

// MUTE / UNMUTE
if (muteBtn) {
  muteBtn.addEventListener("click", () => {
    if (!localStream) return;

    localStream.getAudioTracks().forEach(track => {
      track.enabled = isMuted;
    });

    isMuted = !isMuted;
    muteBtn.innerText = isMuted ? "🔇 Unmute" : "🎤 Mute";
  });
}

// CAMERA ON / OFF
if (cameraBtn) {
  cameraBtn.addEventListener("click", () => {
    if (!localStream) return;

    localStream.getVideoTracks().forEach(track => {
      track.enabled = isCameraOff;
    });

    isCameraOff = !isCameraOff;
    cameraBtn.innerText = isCameraOff ? "📷 Camera On" : "📷 Camera Off";
  });
}
