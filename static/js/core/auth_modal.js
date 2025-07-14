document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements - will be null if conditionally hidden
    const unauthorizedModal = document.getElementById('unauthorized-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const loginModal = document.querySelector('.modal');

    // Debug: Force-check if elements exist in DOM (even if hidden)
    console.log('DOM Elements:', {
        unauthorizedModal: document.getElementById('unauthorized-modal'),
        modalOverlay: document.querySelector('.modal-overlay'),
        loginModal: document.querySelector('.modal')
    });

    // Only set up handlers if elements exist
    if (unauthorizedModal && modalOverlay && loginModal) {
        // Show modal function
        const showModal = () => {
            unauthorizedModal.style.display = 'block';
            modalOverlay.style.display = 'block';
            loginModal.classList.add('show-modal');
        };

        // Hide modal function
        const hideModal = () => {
            unauthorizedModal.style.display = 'none';
            modalOverlay.style.display = 'none';
            loginModal.classList.remove('show-modal');
        };

        // Handle protected links
        document.querySelectorAll('a.nav-btn').forEach(link => {
            if (link.textContent.match(/gallery|learning/i)) {
                link.addEventListener('click', (e) => {
                    if (!document.body.classList.contains('logged-in')) {
                        e.preventDefault();
                        showModal();
                    }
                });
            }
        });

        // Close modal when clicking overlay
        modalOverlay.addEventListener('click', hideModal);

        // Keep modal open when clicking inside
        unauthorizedModal.addEventListener('click', (e) => e.stopPropagation());

        // Auto-show if URL parameter exists
        if (window.location.search.includes('show_modal=true')) {
            showModal();
        }
    } else {
        console.warn('Auth modal elements not found - ensure template renders them');
    }
});