// ===============================
// TailorPro - app.js
// Tailor Management Application
// ===============================

// ---------- Navigation ----------
const menuItems = document.querySelectorAll(".menu li");
const pages = document.querySelectorAll(".page");

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuItems.forEach(i => i.classList.remove("active"));
        pages.forEach(p => p.classList.remove("active"));

        item.classList.add("active");

        const page = document.getElementById(item.dataset.page);
        if (page) {
            page.classList.add("active");
        }
    });
});

// ---------- Local Storage ----------
let customers = JSON.parse(localStorage.getItem("customers")) || [];

// ---------- Elements ----------
const saveBtn = document.getElementById("saveOrder");
const customerList = document.getElementById("customerList");
const searchBox = document.getElementById("searchCustomer");
const amountInput = document.getElementById("amount");
const statusSelect = document.getElementById("status");
const notesArea = document.getElementById("notesArea");
const photoInput = document.getElementById("photoInput");
const gallery = document.getElementById("gallery");
const recordBtn = document.getElementById("recordBtn");
const recordings = document.getElementById("recordings");

// ---------- Dashboard ----------
function updateDashboard() {
    document.getElementById("customerCount").innerText = customers.length;
    document.getElementById("orderCount").innerText = customers.length;

    let revenue = 0;
    customers.forEach(c => {
        revenue += Number(c.amount || 0);
    });

    document.getElementById("revenue").innerText = "₹" + revenue;
}

// ---------- Save Order ----------
if (saveBtn) {
    saveBtn.onclick = function () {
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const dress = document.getElementById("dress").value;
        const delivery = document.getElementById("delivery").value;

        if (name === "") {
            alert("Customer Name Required");
            return;
        }

        const customer = {
            id: Date.now(),
            name: name,
            phone: phone,
            dress: dress,
            delivery: delivery,
            amount: 0,
            status: "Pending"
        };

        customers.push(customer);
        localStorage.setItem("customers", JSON.stringify(customers));

        renderCustomers();
        updateDashboard();
        alert("Order Saved");

        // Clear form
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("dress").value = "";
        document.getElementById("delivery").value = "";
    };
}

// ---------- Render Customer List ----------
function renderCustomers(list = customers) {
    if (!customerList) return;

    customerList.innerHTML = "";

    if (list.length === 0) {
        customerList.innerHTML = "<p>No Customers</p>";
        return;
    }

    list.forEach(c => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <h2>${c.name}</h2>
            <p>📞 ${c.phone}</p>
            <p>👗 ${c.dress}</p>
            <p>📅 ${c.delivery}</p>
            <p class="status ${c.status}">${c.status}</p>
            <p>₹ ${c.amount}</p>
            <button onclick="editCustomer(${c.id})">Edit</button>
            <button onclick="deleteCustomer(${c.id})">Delete</button>
            <button onclick="downloadInvoice(${c.id})">Download PDF</button>
        `;
        customerList.appendChild(div);
    });
}

// ---------- Edit Customer ----------
function editCustomer(id) {
    const c = customers.find(x => x.id === id);
    if (!c) return;

    document.getElementById("name").value = c.name;
    document.getElementById("phone").value = c.phone;
    document.getElementById("dress").value = c.dress;
    document.getElementById("delivery").value = c.delivery;
    document.getElementById("amount").value = c.amount;
    document.getElementById("status").value = c.status;

    customers = customers.filter(x => x.id !== id);
    localStorage.setItem("customers", JSON.stringify(customers));

    renderCustomers();
    updateDashboard();

    // Switch to new-order page
    document.querySelectorAll(".menu li")[2].click();
}

// ---------- Delete Customer ----------
function deleteCustomer(id) {
    if (!confirm("Delete Customer?")) return;

    customers = customers.filter(c => c.id !== id);
    localStorage.setItem("customers", JSON.stringify(customers));

    renderCustomers();
    updateDashboard();
}

// ---------- Search ----------
if (searchBox) {
    searchBox.onkeyup = function () {
        const key = this.value.toLowerCase();
        const filtered = customers.filter(c =>
            c.name.toLowerCase().includes(key) || c.phone.includes(key)
        );
        renderCustomers(filtered);
    };
}

// ---------- Update Amount ----------
if (amountInput) {
    amountInput.onchange = function () {
        if (customers.length === 0) return;
        customers[customers.length - 1].amount = this.value;
        customers[customers.length - 1].status = statusSelect.value;
        localStorage.setItem("customers", JSON.stringify(customers));
        updateDashboard();
        renderCustomers();
    };
}

if (statusSelect) {
    statusSelect.onchange = function () {
        if (customers.length === 0) return;
        customers[customers.length - 1].status = this.value;
        localStorage.setItem("customers", JSON.stringify(customers));
        updateDashboard();
        renderCustomers();
    };
}

// ---------- Auto Save Notes ----------
if (notesArea) {
    notesArea.value = localStorage.getItem("notes") || "";
    notesArea.oninput = function () {
        localStorage.setItem("notes", this.value);
    };
}

const saveNoteBtn = document.getElementById("saveNote");
if (saveNoteBtn) {
    saveNoteBtn.onclick = function () {
        localStorage.setItem("notes", notesArea.value);
        alert("Notes Saved");
    };
}

// ---------- Photo Preview ----------
if (photoInput) {
    photoInput.onchange = function () {
        gallery.innerHTML = "";
        [...this.files].forEach(file => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.className = "preview";
                gallery.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    };
}

// ---------- Download Invoice as PDF ----------
function downloadInvoice(id) {
    const c = customers.find(x => x.id === id);
    if (!c) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("ANAM FASHION", 20, 20);

    doc.setFontSize(12);
    doc.text("Tailoring Invoice", 20, 35);
    doc.line(20, 40, 190, 40);

    doc.text("Customer : " + c.name, 20, 55);
    doc.text("Phone : " + c.phone, 20, 65);
    doc.text("Dress : " + c.dress, 20, 75);
    doc.text("Delivery : " + c.delivery, 20, 85);
    doc.text("Status : " + c.status, 20, 95);
    doc.text("Amount : Rs. " + c.amount, 20, 105);

    doc.line(20, 115, 190, 115);
    doc.text("Thank You For Choosing ANAM FASHION", 20, 130);

    doc.save(c.name + "-Invoice.pdf");
}

// ---------- Dark Mode ----------
const darkBtn = document.createElement("button");
darkBtn.innerText = "🌙 Dark";
darkBtn.style.position = "fixed";
darkBtn.style.right = "20px";
darkBtn.style.bottom = "20px";
darkBtn.style.zIndex = "1000";
document.body.appendChild(darkBtn);

darkBtn.onclick = function () {
    document.body.classList.toggle("dark");
    localStorage.setItem("dark", document.body.classList.contains("dark"));
};

if (localStorage.getItem("dark") === "true") {
    document.body.classList.add("dark");
}

// ---------- Notifications ----------
if (Notification.permission !== "granted" && Notification.permission !== "denied") {
    Notification.requestPermission();
}

function notify(msg) {
    if (Notification.permission === "granted") {
        new Notification("TailorPro", { body: msg });
    }
}

// ---------- Service Worker Registration ----------
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(err => {
        console.log("Service Worker registration failed: ", err);
    });
}

// ---------- Initialize ----------
renderCustomers();
updateDashboard();