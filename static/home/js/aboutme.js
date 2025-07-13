/* global document */ // Let the linter know 'document' is a browser global

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('abt-me-h2');
  const para = document.querySelector('#about-me p');

  if (btn && para) {
    btn.addEventListener('click', () => {
      if (para.classList.contains('abt-me-p-hide')) {
        para.classList.remove('abt-me-p-hide');
        para.classList.add('abt-me-p-show');
      } else {
        para.classList.remove('abt-me-p-show');
        para.classList.add('abt-me-p-hide');
      }
    });
  }
});