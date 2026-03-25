const form = document.getElementById("uploadForm");
const videosDiv = document.getElementById("videos");

// Upload
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    await fetch("http://localhost:5000/api/videos", {
        method: "POST",
        body: formData
    });

    loadVideos();
});

// Load videos
async function loadVideos() {
    const res = await fetch("http://localhost:5000/api/videos");
    const data = await res.json();

    videosDiv.innerHTML = "";

    data.forEach(video => {
        videosDiv.innerHTML += `
            <div>
                <h3>${video.title}</h3>
                <video width="300" controls>
                    <source src="http://localhost:5000/uploads/${video.file}">
                </video>
                <p>${video.category}</p>
            </div>
        `;
    });
}

loadVideos();