document.addEventListener('DOMContentLoaded', function() {
   
    let unauthorizedModal = document.getElementById('unauthorized-modal');
    let modalOverlay = document.querySelector('.modal-overlay');
    
    if (!unauthorizedModal) {
        unauthorizedModal = document.createElement('div');
        unauthorizedModal.id = 'unauthorized-modal';
        unauthorizedModal.className = 'unauthorized-modal';
        unauthorizedModal.style.display = 'none';
        unauthorizedModal.innerHTML = `
            <div class="modal-content">
                <h2>Nice try!</h2>
                <p>Please login to access this content!</p>
                <div class="modal-buttons">
                    <a href="/accounts/login/" class="text-link">Login</a>
                    <a href="/accounts/register/" class="text-link">Register</a>
                </div>
            </div>
        `;
        document.body.appendChild(unauthorizedModal);
    }

    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.style.display = 'none';
        document.body.appendChild(modalOverlay);
    }

    
    const style = document.createElement('style');
    style.textContent = `
        .text-link {
            color: black !important;
            text-decoration: underline !important;
            background: none !important;
            border: none !important;
            padding: 0 !important;
            font-size: 1rem;
            cursor: pointer;
            margin: 0 10px;
        }
        .text-link:hover {
            color: #f229de !important;
        }
    `;
    document.head.appendChild(style);

   
    const showModal = () => {
        unauthorizedModal.style.display = 'block';
        modalOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    const hideModal = () => {
        unauthorizedModal.style.display = 'none';
        modalOverlay.style.display = 'none';
        document.body.style.overflow = '';
    };

    // Find and handle protected links
    document.querySelectorAll('a').forEach(link => {
        const linkText = link.textContent.toLowerCase();
        const linkHref = link.getAttribute('href') || '';
        
        if (linkText.includes('gallery') || linkText.includes('learning') || 
            linkHref.includes('gallery') || linkHref.includes('learning')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showModal();
            });
        }
    });

    modalOverlay.addEventListener('click', hideModal);
    unauthorizedModal.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && unauthorizedModal.style.display === 'block') {
            hideModal();
        }
    });
});