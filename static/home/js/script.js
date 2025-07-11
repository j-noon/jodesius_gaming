document.addEventListener("DOMContentLoaded", function () {
  const openModalBtn = document.getElementById("open-comment-modal");
  const modal = document.getElementById("comment-modal");
  const closeModalBtn = document.querySelector(".close-modal");

  if (openModalBtn) {
    openModalBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});