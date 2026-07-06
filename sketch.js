// ===============================
// TailorPro - sketch.js
// Canvas Drawing for Neck Sketches
// ===============================

const canvas = document.getElementById("canvas");

if (canvas) {
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    let drawing = false;
    let history = [];

    const colorPicker = document.getElementById("brushColor");
    const brushSize = document.getElementById("brushSize");

    // ---------- Restore Saved Sketch ----------
    const saved = localStorage.getItem("neckSketch");
    if (saved) {
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
        img.src = saved;
    }

    // ---------- Save History ----------
    function saveHistory() {
        history.push(canvas.toDataURL());
        if (history.length > 30) {
            history.shift();
        }
    }

    // ---------- Get Position ----------
    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        if (e.touches) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        }
        return {
            x: e.offsetX,
            y: e.offsetY
        };
    }

    // ---------- Start Drawing ----------
    function start(e) {
        drawing = true;
        saveHistory();
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    // ---------- Draw ----------
    function draw(e) {
        if (!drawing) return;
        e.preventDefault();

        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = brushSize.value;

        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    // ---------- Stop Drawing ----------
    function stop() {
        drawing = false;
        ctx.closePath();
    }

    // ---------- Mouse Events ----------
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stop);
    canvas.addEventListener("mouseleave", stop);

    // ---------- Touch Events ----------
    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stop);

    // ---------- Undo ----------
    document.getElementById("undoCanvas").onclick = function () {
        if (history.length === 0) return;
        const img = new Image();
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = history.pop();
    };

    // ---------- Clear ----------
    document.getElementById("clearCanvas").onclick = function () {
        saveHistory();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // ---------- Save Sketch ----------
    document.getElementById("saveSketch").onclick = function () {
        localStorage.setItem("neckSketch", canvas.toDataURL());
        alert("Sketch Saved");
    };

    // ---------- Download as PNG ----------
    document.getElementById("downloadSketch").onclick = function () {
        const a = document.createElement("a");
        a.download = "neck-sketch.png";
        a.href = canvas.toDataURL("image/png");
        a.click();
    };
}