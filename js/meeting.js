// ===== SOCKET =====
const socket = io("http://localhost:3000");

// ===== DOM =====
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

// ===== WEBRTC =====
let localStream;
let peerConnection;

const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

// ===== ACTIVE SPEAKER STATE =====
let localSpeaking = false;
let localTimeout;
let remoteSpeaking = false;
let remoteTimeout;

// ===== HELPER FUNCTIONS =====
function updateLocalSpeaker(isSpeaking) {
  const selfView = document.querySelector(".self-view");

  if (isSpeaking && !localSpeaking) {
    selfView?.classList.add("active");
    localSpeaking = true;
  }

  if (!isSpeaking && localSpeaking) {
    clearTimeout(localTimeout);
    localTimeout = setTimeout(() => {
      selfView?.classList.remove("active");
      localSpeaking = false;
    }, 300);
  }
}

function updateRemoteSpeaker(isSpeaking) {
  const activeSpeaker = document.querySelector(".active-speaker");

  if (isSpeaking && !remoteSpeaking) {
    activeSpeaker?.classList.add("active");
    remoteSpeaking = true;
  }

  if (!isSpeaking && remoteSpeaking) {
    clearTimeout(remoteTimeout);
    remoteTimeout = setTimeout(() => {
      activeSpeaker?.classList.remove("active");
      remoteSpeaking = false;
    }, 300);
  }
}

// ===== GET USER MEDIA =====
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    console.log("GOT LOCAL STREAM");

    localStream = stream;
    localVideo.srcObject = stream;
    localVideo.muted = true;
    localVideo.play().catch(() => {});

    // ===== LOCAL ACTIVE SPEAKER DETECTION =====
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);

    microphone.connect(analyser);
    analyser.fftSize = 512;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function detectSpeech() {
      analyser.getByteFrequencyData(dataArray);
      const volume =
        dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

      updateLocalSpeaker(volume > 25);
      requestAnimationFrame(detectSpeech);
    }

    detectSpeech();

    // ===== PEER CONNECTION =====
    peerConnection = new RTCPeerConnection(config);

    stream.getTracks().forEach(track =>
      peerConnection.addTrack(track, stream)
    );

    peerConnection.ontrack = e => {
      console.log("REMOTE STREAM RECEIVED");

      const remoteStream = e.streams[0];
      remoteVideo.srcObject = remoteStream;
      remoteVideo.play().catch(() => {});

      // ===== REMOTE ACTIVE SPEAKER DETECTION =====
      const remoteAudioContext = new AudioContext();
      const remoteAnalyser = remoteAudioContext.createAnalyser();
      const remoteSource =
        remoteAudioContext.createMediaStreamSource(remoteStream);

      remoteSource.connect(remoteAnalyser);
      remoteAnalyser.fftSize = 512;

      const remoteData =
        new Uint8Array(remoteAnalyser.frequencyBinCount);

      function detectRemoteSpeech() {
        remoteAnalyser.getByteFrequencyData(remoteData);
        const volume =
          remoteData.reduce((a, b) => a + b, 0) / remoteData.length;

        updateRemoteSpeaker(volume > 25);
        requestAnimationFrame(detectRemoteSpeech);
      }

      detectRemoteSpeech();
    };

    peerConnection.onicecandidate = e => {
      if (e.candidate) {
        socket.emit("ice-candidate", e.candidate);
      }
    };

    socket.emit("ready");
  })
  .catch(err => {
    console.error("getUserMedia ERROR:", err);
  });

// ===== SOCKET SIGNALING =====
socket.on("ready", async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit("offer", offer);
});

socket.on("offer", async offer => {
  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.emit("answer", answer);
});

socket.on("answer", async answer => {
  await peerConnection.setRemoteDescription(answer);
});

socket.on("ice-candidate", async candidate => {
  try {
    await peerConnection.addIceCandidate(candidate);
  } catch (e) {
    console.error("ICE ERROR", e);
  }
});
