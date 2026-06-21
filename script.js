const menuIcon = document.getElementById("menuIcon");
const navbar = document.getElementById("navbar");

if (menuIcon && navbar) {
  menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("active");

    const icon = menuIcon.querySelector("i");
    if (!icon) return;

    if (navbar.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });
}

/* Active navbar link on scroll */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  if (navbar) {
    navbar.classList.remove("active");
  }

  if (menuIcon) {
    const icon = menuIcon.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }
});

/* Formspree contact form without redirect */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");

if (contactForm && formStatus && sendBtn) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";
    formStatus.textContent = "";
    formStatus.className = "form-status";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        formStatus.textContent = "Message sent successfully. Thank you!";
        formStatus.className = "form-status success";
        contactForm.reset();
      } else {
        formStatus.textContent = "Message could not be sent. Please try again.";
        formStatus.className = "form-status error";
      }
    } catch (error) {
      formStatus.textContent = "Network error. Please try again later.";
      formStatus.className = "form-status error";
    }

    sendBtn.disabled = false;
    sendBtn.textContent = "Send Message";
  });
}
