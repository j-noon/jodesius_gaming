// core/static/core/js/auth_modal.js
document.addEventListener('DOMContentLoaded', function() {
    const protectedLinks = document.querySelectorAll('.protected-link');
    const unauthorizedModal = document.getElementById('unauthorized-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const loginModal = document.querySelector('.modal');

    // Show modal when protected links are clicked
    protectedLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            if (!document.body.classList.contains('logged-in')) {
                e.preventDefault();
                // Show unauthorized modal and overlay
                unauthorizedModal.style.display = 'block';
                modalOverlay.style.display = 'block';
                // Add blur effect to login form
                loginModal.classList.add('modal-blur');
            }
        });
    });

    // Close when clicking overlay
    modalOverlay.addEventListener('click', function() {
        unauthorizedModal.style.display = 'none';
        this.style.display = 'none';
        // Remove blur effect from login form
        loginModal.classList.remove('modal-blur');
    });

    // Prevent modal from closing when clicking inside it
    unauthorizedModal.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Check URL for show_modal parameter (from middleware redirect)
    if (window.location.search.includes('show_modal=true')) {
        unauthorizedModal.style.display = 'block';
        modalOverlay.style.display = 'block';
        loginModal.classList.add('modal-blur');
    }
});