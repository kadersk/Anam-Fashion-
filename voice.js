// ===============================
// TailorPro - voice.js
// Voice Recording Features
// ===============================

const recordBtn = document.getElementById("recordBtn");
const recordings = document.getElementById("recordings");

if (recordBtn && recordings) {
    let mediaRecorder = null;
    let audioChunks = [];
    let isRecording = false;

    recordBtn.addEventListener("click", async () => {
        if (!isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true
                });

                audioChunks = [];
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        audioChunks.push(e.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(audioChunks, {
                        type: "audio/webm"
                    });

                    const url = URL.createObjectURL(blob);

                    const card = document.createElement("div");
                    card.className = "card";

                    const audio = document.createElement("audio");
                    audio.controls = true;
                    audio.src = url;

                    const download = document.createElement("button");
                    download.textContent = "⬇ Download";

                    download.onclick = () => {
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `voice-${Date.now()}.webm`;
                        a.click();
                    };

                    const del = document.createElement("button");
                    del.textContent = "🗑 Delete";
                    del.style.marginLeft = "10px";

                    del.onclick = () => {
                        URL.revokeObjectURL(url);
                        card.remove();
                    };

                    card.appendChild(audio);
                    card.appendChild(document.createElement("br"));
                    card.appendChild(download);
                    card.appendChild(del);

                    recordings.prepend(card);
                };

                mediaRecorder.start();
                isRecording = true;
                recordBtn.textContent = "⏹ Stop Recording";

            } catch (err) {
                alert("Microphone permission denied.");
                console.error(err);
            }

        } else {
            mediaRecorder.stop();
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
            isRecording = false;
            recordBtn.textContent = "🎤 Start Recording";
        }
    });
}