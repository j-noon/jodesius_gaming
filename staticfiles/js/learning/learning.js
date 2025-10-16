document.addEventListener('DOMContentLoaded', function() {
  // ========== Nmap Modal ==========
  const nmapButton = document.getElementById('nmap-button');
  const nmapModal = document.getElementById('nmap-modal');
  const nmapCloseBtn = document.getElementById('nmap-close-button');
  
  if (nmapButton) {
    nmapButton.addEventListener('click', function() {
      nmapModal.style.display = 'flex';
      const terminal = document.getElementById('terminal-output');
      if (terminal) terminal.scrollTop = 0;
    });
  }

  if (nmapCloseBtn) {
    nmapCloseBtn.addEventListener('click', () => {
      nmapModal.style.display = 'none';
    });
  }

  const nmapCloseSpan = document.getElementById('nmap-close-span');
if (nmapCloseSpan) {
  nmapCloseSpan.addEventListener('click', () => {
    const nmapModal = document.getElementById('nmap-modal');
    if (nmapModal) nmapModal.style.display = 'none';
  });
}

  // ========== Brute Force Modal ==========
  const bruteText = `<b>hydra -l admin -P wordlist.txt 192.234.1.10 http-post-form "/login.php:user=^USER^&pass=^PASS^:F=incorrect"</b>

Hydra v9.5 (c) 2025 by van Hauser/THC & others
[DATA] Target: 192.234.1.10 - Protocol: http-post-form
[DATA] Login: admin
[DATA] Wordlist: wordlist.txt
[DATA] Error message: incorrect

[80][http-post-form] host: 192.168.1.10   login: admin   password: 1234
[STATUS] Attack finished in 6.02 seconds. 1 valid password found.`;

  const bruteButton = document.getElementById('brute-button');
  const bruteModal = document.getElementById('brute-modal');
  const bruteCloseBtn = document.getElementById('brute-close-button');
  const bruteCloseSpan = document.getElementById('brute-close-span');

  function typeWriter(text, elementId, speed = 30) {
    let i = 0;
    const el = document.getElementById(elementId);
    if (!el) return;
    
    el.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  if (bruteButton) {
    bruteButton.addEventListener('click', function() {
      bruteModal.style.display = 'flex';
      typeWriter(bruteText, 'brute-output', 25);
    });
  }

  // Close handlers for brute modal
  [bruteCloseBtn, bruteCloseSpan].forEach(element => {
    if (element) element.addEventListener('click', () => {
      bruteModal.style.display = 'none';
    });
  });

  // Close when clicking outside modal content
  [nmapModal, bruteModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  });
});