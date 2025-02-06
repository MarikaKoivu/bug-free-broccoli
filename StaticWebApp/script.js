function displayMessage() {
    document.getElementById("message").innerText = "Hello, this is a message!";
}

document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 100) {
            navLinks.forEach(link => link.classList.remove("active"));
            navLinks[index].classList.add("active");
        }
    });
});

// Lomakkeen lähetyksen käsittely
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email.includes("@") && message.length >= 10) {
        alert("Form submitted successfully!");
    } else {
        alert("Please fill all fields correctly.");
    }
});

// koodi JSONPlaceholderin hakemiseen ja lisäämiseen HTML-sivulle
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("dataContainer");
        data.slice(0, 5).forEach(post => {
            const item = document.createElement("div");
            item.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            container.appendChild(item);
        });
    })
    .catch(error => console.error("Error fetching data: ", error));
