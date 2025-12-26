const socket = io("http://localhost:3000");

const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

let localStream;
let peerConnection;
let role;

const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    localStream = stream;
    localVideo.srcObject = stream;

    peerConnection = new RTCPeerConnection(config);

    stream.getTracks().forEach(track =>
      peerConnection.addTrack(track, stream)
    );

    peerConnection.ontrack = e => {
      remoteVideo.srcObject = e.streams[0];
    };

    peerConnection.onicecandidate = e => {
      if (e.candidate) socket.emit("ice-candidate", e.candidate);
    };

    socket.emit("ready"); // 👈 VERY IMPORTANT
  });

// Receive role
socket.on("role", r => role = r);

// When both ready → only caller creates offer
socket.on("both-ready", async () => {
  if (role === "caller") {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("offer", offer);
  }
});

// Offer
socket.on("offer", async offer => {
  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.emit("answer", answer);
});

// Answer
socket.on("answer", async answer => {
  await peerConnection.setRemoteDescription(answer);
});

// ICE
socket.on("ice-candidate", async candidate => {
  await peerConnection.addIceCandidate(candidate);
});
// ===== MUTE & CAMERA CONTROLS =====
const muteBtn = document.getElementById("muteBtn");
const cameraBtn = document.getElementById("cameraBtn");

let isMuted = false;
let isCameraOff = false;

muteBtn?.addEventListener("click", () => {
  if (!localStream) return;

  localStream.getAudioTracks().forEach(track => {
    track.enabled = isMuted;
  });

  isMuted = !isMuted;
  muteBtn.innerText = isMuted ? "🔇 Unmute" : "🎤 Mute";
});

cameraBtn?.addEventListener("click", () => {
  if (!localStream) return;

  localStream.getVideoTracks().forEach(track => {
    track.enabled = isCameraOff;
  });

  isCameraOff = !isCameraOff;
  cameraBtn.innerText = isCameraOff ? "📷 Camera On" : "📷 Camera Off";
});
// ===== SPEECH TO TEXT =====
// ===== STABLE SPEECH TO TEXT =====
const transcriptDiv = document.getElementById("transcript");
const startBtn = document.getElementById("startTranscriptBtn");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;
let finalTranscript = "";

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = event => {
    let interim = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const text = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalTranscript += text + " ";
      } else {
        interim += text;
      }
    }

    transcriptDiv.innerText = finalTranscript + interim;
  };

  // 🔥 THIS IS THE KEY FIX
  recognition.onend = () => {
    console.log("Speech recognition stopped, restarting...");
    recognition.start();
  };

  recognition.onerror = e => {
    console.error("Speech error:", e);
  };

  startBtn.onclick = () => {
    recognition.start();
    startBtn.disabled = true;
    startBtn.innerText = "🎙 Transcribing...";
  };

} else {
  transcriptDiv.innerText = "Speech Recognition not supported in this browser";
}
