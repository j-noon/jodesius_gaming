/* global document */

document.addEventListener('DOMContentLoaded', function () {
  const protectedLinks = document.querySelectorAll('.protected-link');
  const unauthorizedModal = document.getElementById('unauthorized-modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const loginModal = document.querySelector('.modal');

  // Show modal when protected links are clicked
  protectedLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (!document.body.classList.contains('logged-in')) {
        if (unauthorizedModal && modalOverlay && loginModal) {
          e.preventDefault();
          unauthorizedModal.style.display = 'block';
          modalOverlay.style.display = 'block';
          loginModal.classList.add('modal-blur');
        }
      }
    });
  });
});