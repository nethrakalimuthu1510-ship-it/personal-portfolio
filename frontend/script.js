// Contact Form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Please fill all fields.";
        return;
    }

    formStatus.textContent = "Sending...";

    try {
        const response = await fetch(
            "https://personal-portfolio-backend-1x7d.onrender.com/contact",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            formStatus.textContent = "Message saved successfully!";
            contactForm.reset();
        } else {
            formStatus.textContent =
                data.message || "Failed to save message.";
        }

    } catch (error) {
        console.error(error);
        formStatus.textContent =
            "Unable to connect to server.";
    }
});