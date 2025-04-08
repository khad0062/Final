// SPA Navigation
function navigateToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.focus();
  section.setAttribute("tabindex", "-1");
  updatePageTitle(sectionId);
  history.pushState({ section: sectionId }, "", `#${sectionId}`);
}

function updatePageTitle(sectionId) {
  const titles = {
    home: "Home - Empower Ability Labs",
    services: "Services - Empower Ability Labs",
    schedule: "Schedule a Call - Empower Ability Labs",
  };
  document.title = titles[sectionId] || "Empower Ability Labs";
}

window.onpopstate = function (event) {
  if (event.state?.section) {
    navigateToSection(event.state.section);
  }
};

// Navigation Links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("href").substring(1);
    navigateToSection(sectionId);
  });
});

// Modal Behavior
const modal = document.getElementById("community-modal");
const openModal = document.getElementById("community-btn");
const closeModal = document.getElementById("close-modal");

openModal.addEventListener("click", () => {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  modal.querySelector(".modal-content").focus();
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  openModal.focus();
});

// Toggle Switch Accessibility
const emailSwitch = document.getElementById("email-switch");

emailSwitch.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault(); // Prevent scrolling with Space
    emailSwitch.checked = !emailSwitch.checked; // Toggle state
  }
});

// Show/Hide Event Details
 const speakerOptionCheckbox = document.getElementById('speaker-option');
    const eventDetailsDiv = document.getElementById('event-details');

    // Add event listener to toggle visibility based on checkbox state
    speakerOptionCheckbox.addEventListener('change', function() {
      if (this.checked) {
        eventDetailsDiv.classList.remove('hidden');  // Show event details
        eventDetailsDiv.setAttribute('aria-hidden', 'false');  // Update ARIA attribute
      } else {
        eventDetailsDiv.classList.add('hidden');  // Hide event details
        eventDetailsDiv.setAttribute('aria-hidden', 'true');  // Update ARIA attribute
      }
});
  
  


// Form Submission
const form = document.getElementById("schedule-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const messages = document.getElementById("form-messages");
  let errors = [];

  if (!form.email.value) {
    errors.push("Email is required");
    form.email.setAttribute("aria-invalid", "true");
  }
  if (form.phone.value && !form.phone.checkValidity()) {
    errors.push("Phone must be in format XXXXXXXXXX");
    form.phone.setAttribute("aria-invalid", "true");
  }

  messages.textContent = "";
  if (errors.length > 0) {
    messages.textContent = "Error: " + errors.join(". ");
  } else {
    messages.textContent = "Thank you! Your message has been sent.";
    form.reset();
    eventDetails.classList.add("hidden");
    eventDetails.setAttribute("aria-hidden", "true");
  }
});

// Initial Page Load
const initialSection = window.location.hash.substring(1) || "home";
navigateToSection(initialSection);
