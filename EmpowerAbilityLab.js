// SPA Navigation
function navigate(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    
    const activeSection = document.getElementById(sectionId);
    activeSection.style.display = 'block';
    document.title = `${activeSection.querySelector('h1').textContent} - Empower Ability Labs`;
    
    // Focus management
    const heading = activeSection.querySelector('h1');
    heading.setAttribute('tabindex', '-1');
    heading.focus();
    
    // History management
    window.history.pushState({ sectionId }, '', `#${sectionId}`);
}

// Modal Handling
function openModal() {
    const modal = document.getElementById('communityModal');
    modal.style.display = 'block';
    modal.querySelector('h2').focus();
}

function closeModal() {
    document.getElementById('communityModal').style.display = 'none';
    document.querySelector('.btn-community').focus();
}

// Form Handling
document.getElementById('scheduleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        showConfirmation();
    }
});

function validateForm() {
    let isValid = true;
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    // Email validation
    if (!email.checkValidity()) {
        showError('Valid email required', email);
        isValid = false;
    }

    // Phone validation
    const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!phonePattern.test(phone.value)) {
        showError('Format: 613-123-1234', phone);
        isValid = false;
    }

    return isValid;
}

function toggleEventDetails(checkbox) {
    const detailsSection = document.getElementById('eventDetails');
    detailsSection.style.display = checkbox.checked ? 'block' : 'none';
    detailsSection.setAttribute('aria-hidden', !checkbox.checked);
}

// Switch Component
function toggleSwitch(btn) {
    const isChecked = btn.getAttribute('aria-checked') === 'true';
    btn.setAttribute('aria-checked', !isChecked);
    btn.querySelector('img').style.opacity = isChecked ? '1' : '0.5';
}

// Error Handling
function showError(message, element) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    errorDiv.setAttribute('aria-live', 'assertive');
    element.parentNode.insertBefore(errorDiv, element.nextSibling);
}

// History Management
window.addEventListener('popstate', function(event) {
    if (event.state?.sectionId) {
        navigate(event.state.sectionId);
    }
});

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    const initialSection = window.location.hash.substring(1) || 'home';
    navigate(initialSection);
});
