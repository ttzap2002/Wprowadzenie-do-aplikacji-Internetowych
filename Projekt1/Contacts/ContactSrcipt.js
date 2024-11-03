document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");

  form.addEventListener("submit", function (event) {
    const emailValue = emailInput.value;
    if (!validateEmail(emailValue)) {
      alert("Proszę podać poprawny adres e-mail.");
      event.preventDefault();
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});
