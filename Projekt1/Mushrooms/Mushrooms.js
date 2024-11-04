fetch("../MushroomData/Mushroom.json")
  .then((response) => response.json())
  .then((data) => {
    initApp(data);
  })
  .catch((error) => console.error("Błąd podczas ładowania danych:", error));

function initApp(grzyby) {
  console.log(grzyby);
  generateSidebar(grzyby);
  setupEventListeners(grzyby);
}

function generateSidebar(grzyby) {
  const sidebar = document.getElementById("sidebar");
  const ul = document.createElement("ul");

  for (const litera in grzyby) {
    console.log(litera);
    const li = document.createElement("li");
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = litera.toUpperCase();

    const innerUl = document.createElement("ul");

    grzyby[litera].forEach((grzyb) => {
      const innerLi = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = grzyb.nazwa;
      link.dataset.grzybId = grzyb.id;

      innerLi.appendChild(link);
      innerUl.appendChild(innerLi);
    });

    details.appendChild(summary);
    details.appendChild(innerUl);
    li.appendChild(details);
    ul.appendChild(li);
  }

  sidebar.appendChild(ul);
}

function setupEventListeners(grzyby) {
  document.querySelectorAll("#sidebar a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const grzybId = e.target.dataset.grzybId;
      const grzyb = findMushroomsById(grzyby, grzybId);
      if (grzyb) {
        updateMainContent(grzyb);
      }
    });
  });
}

function findMushroomsById(grzyby, id) {
  for (const litera in grzyby) {
    const found = grzyby[litera].find((grzyb) => grzyb.id === id);
    if (found) {
      return found;
    }
  }
  return null;
}

function updateMainContent(grzyb) {
  const obraz = document.getElementById("grzyb-obraz");
  const nazwa = document.getElementById("grzyb-nazwa");
  const opis = document.getElementById("grzyb-opis");
  const wlasciwosciDiv = document.getElementById("grzyb-wlasciwosci");

  obraz.src = grzyb.obraz;
  obraz.alt = grzyb.nazwa;
  nazwa.textContent = grzyb.nazwa;
  opis.textContent = grzyb.opis;

  obraz.style.width = "100%";
  obraz.style.maxWidth = "300px";
  obraz.style.maxHeight = "300px";
  obraz.style.height = "auto";

  // Wyczyść poprzednie właściwości
  wlasciwosciDiv.innerHTML = "";

  grzyb.wlasciwosci.forEach((wlasciwosc) => {
    let emotikona;
    console.log(wlasciwosc);
    switch (wlasciwosc) {
      case "jadalny":
        emotikona = "🍽️";
        break;
      case "trujacy":
        emotikona = "☠️";
        break;
      case "niejadalny":
        emotikona = "🚫";
        break;
      default:
        emotikona = "";
    }
    const span = document.createElement("span");
    span.textContent = emotikona;
    wlasciwosciDiv.appendChild(span);
  });
}
