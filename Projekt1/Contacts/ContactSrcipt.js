document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const textArea = document.getElementById("wiadomosc");

  form.addEventListener("submit", function (event) {
    const emailValue = emailInput.value;
    if (!validateEmail(emailValue)) {
      alert("Proszę podać poprawny adres e-mail.");
      event.preventDefault();
    } else if (!textArea) {
      alert("Proszę podać wiadomość.");
    } else {
      alert("wiadomość wysłana");
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});
