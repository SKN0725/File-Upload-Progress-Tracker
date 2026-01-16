const browseBtn = document.getElementById("btn1");
const fileInput = document.getElementById("fileInput");
const box3 = document.getElementById("box3");

browseBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    box3.innerHTML = ""; // clear default content
    box3.style.display = "block";
    uploadFiles(fileInput.files);
});

function uploadFiles(files) {
    Array.from(files).forEach(file => {
        createUploadCard(file);
    });
}

function createUploadCard(file) {
    const card = document.createElement("div");
    card.style.width = "90%";
    card.style.padding = "10px";
    card.style.border = "1px solid #ccc";
    card.style.borderRadius = "8px";
    card.style.margin = "10px auto";

    card.innerHTML = `
        <strong>${file.name}</strong>
        <p style="font-size:12px">${(file.size / 1024 / 1024).toFixed(2)} MB</p>

        <div style="height:8px; background:#eee; border-radius:5px;">
            <div class="bar" style="height:100%; width:0%; background:blue; border-radius:5px;"></div>
        </div>

        <p class="status" style="font-size:12px; margin-top:5px;">Uploading...</p>
    `;

    box3.appendChild(card);
    startProgress(card);
}

function startProgress(card) {
    const bar = card.querySelector(".bar");
    const status = card.querySelector(".status");

    let progress = 0;
    const fail = Math.random() < 0.3;

    const timer = setInterval(() => {
        progress += 10;
        bar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(timer);

            if (fail) {
                bar.style.background = "red";
                status.textContent = "Upload failed ❌";
                status.style.color = "red";
            } else {
                bar.style.background = "green";
                status.textContent = "Upload successful ✅";
                status.style.color = "green";
            }
        }
    }, 300);
}
