// ================================
// Portfolio JavaScript
// ================================

// Contact Form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {

        // Stop page from refreshing
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Check fields
        if (!name || !email || !message) {
            formStatus.textContent = "Please fill all the fields.";
            return;
        }

        // Show sending message
        formStatus.textContent = "Sending message...";

        try {

            // Send data to Node.js backend
            const response = await fetch("http://localhost:5000/contact", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            });

            // Convert backend response to JSON
            const data = await response.json();

            // Check backend response
            if (response.ok && data.success) {

                formStatus.textContent = data.message;

                // Clear form after successful submission
                contactForm.reset();

            } else {

                formStatus.textContent =
                    data.message || "Failed to save message.";
            }

        } catch (error) {

            console.error("Backend connection error:", error);

            formStatus.textContent =
                "Unable to connect to server. Make sure backend is running.";
        }
    });
}