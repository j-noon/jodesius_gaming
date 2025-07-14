  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("abt-me-h2");
    const para = document.querySelector("#about-me p");

    btn.addEventListener("click", function () {
      if (para.classList.contains("abt-me-p-hide")) {
        para.classList.remove("abt-me-p-hide");
        para.classList.add("abt-me-p-show");
      } else {
        para.classList.remove("abt-me-p-show");
        para.classList.add("abt-me-p-hide");
      }
    });
  });