import React, { useState } from "react";

import Formularz from "./components/formularze/Formularz";
import Haslo from "./components/formularze/Hasło";
import Logowanie from "./components/formularze/Logowanie";

import Ternary from "./components/inne/Ternary";
import Aktualizacja from "./components/inne/Aktualizacja";

import Studenci from "./components/studenci/Studenci";
import StudentManager from "./components/studenci/StudentManager";

import Licznik from "./components/efekty/Licznik";
import Tytul from "./components/efekty/Tytul";
import Odliczanie from "./components/efekty/Odliczanie";

import Komentarze from "./components/produkty/Komentarze";

import NowyLicznik from "./components/liczniki/NowyLicznik";
import NowyKoszyk from "./components/koszyk/NowyKoszyk";
import Koszyk from "./components/koszyk/Koszyk";

enum AppSection {
  TEST_KOMPONENTY = "TEST_KOMPONENTY",
  TEST_TERNARY_AKTUALIZACJA = "TEST_TERNARY_AKTUALIZACJA",
  TEST_STUDENCI = "TEST_STUDENCI",
  TEST_EFEKTY = "TEST_EFEKTY",
  TEST_KOMENTARZE = "TEST_KOMENTARZE",
  TEST_NOWY_LICZNIK = "TEST_NOWY_LICZNIK",
  TEST_NOWY_KOSZYK = "TEST_NOWY_KOSZYK",
}

const AppKomponenty: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Testowanie komponentów</h1>

      <h2>Formularz</h2>
      <Formularz />

      <hr />

      <h2>Hasło</h2>
      <Haslo />

      <hr />

      <h2>Logowanie</h2>
      <Logowanie />
    </div>
  );
};

const AppTernaryAktualizacja: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Testowanie komponentów Ternary i Aktualizacja</h1>
      <h2>Ternary</h2>
      <Ternary />
      <hr />
      <h2>Aktualizacja</h2>
      <Aktualizacja />
    </div>
  );
};

const AppStudenci: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Testowanie komponentów Studenci</h1>

      <h2>Studenci (zadanie 5.1)</h2>
      <Studenci />

      <hr />

      <h2>StudentManager (zadanie 5.2)</h2>
      <StudentManager />
    </div>
  );
};

const AppEfekty: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Testowanie komponentów efektów</h1>

      <h2>Licznik (Zadanie 6.1)</h2>
      <Licznik />

      <hr />

      <h2>Tytuł (Zadanie 6.2)</h2>
      <Tytul />

      <hr />

      <h2>Odliczanie (Zadanie 6.3)</h2>
      <Odliczanie />
    </div>
  );
};

const AppKomentarze: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Test Komentarze</h1>
      <Komentarze />
    </div>
  );
};

const AppNowyLicznik: React.FC = () => {
  return (
    <div>
      <h1>Licznik</h1>
      <Licznik />
      <h1>NowyLicznik</h1>
      <NowyLicznik />
    </div>
  );
};

const AppNowyKoszyk: React.FC = () => {
  return (
    <div>
      <h1>NowyKoszyk</h1>
      <Koszyk />
      <NowyKoszyk />
    </div>
  );
};

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>(
    AppSection.TEST_KOMPONENTY
  );

  return (
    <div>
      <div style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
        <h1>Główne Menu</h1>
        <label>
          Wybierz sekcję do wyświetlenia:
          <select
            value={currentSection}
            onChange={(e) => setCurrentSection(e.target.value as AppSection)}
          >
            <option value={AppSection.TEST_NOWY_KOSZYK}>Zadanie 1</option>
            <option value={AppSection.TEST_NOWY_LICZNIK}>Zadanie 2</option>

            <option value={AppSection.TEST_KOMPONENTY}>Zadanie 3</option>
            <option value={AppSection.TEST_TERNARY_AKTUALIZACJA}>
              Zadanie 4
            </option>
            <option value={AppSection.TEST_STUDENCI}>Zadanie 5</option>
            <option value={AppSection.TEST_EFEKTY}>Zadanie 6</option>
            <option value={AppSection.TEST_KOMENTARZE}>Zadanie 7</option>
          </select>
        </label>
      </div>

      {/* Renderowanie wybranego "App" */}
      {currentSection === AppSection.TEST_KOMPONENTY && <AppKomponenty />}
      {currentSection === AppSection.TEST_TERNARY_AKTUALIZACJA && (
        <AppTernaryAktualizacja />
      )}
      {currentSection === AppSection.TEST_STUDENCI && <AppStudenci />}
      {currentSection === AppSection.TEST_EFEKTY && <AppEfekty />}
      {currentSection === AppSection.TEST_KOMENTARZE && <AppKomentarze />}
      {currentSection === AppSection.TEST_NOWY_LICZNIK && <AppNowyLicznik />}
      {currentSection === AppSection.TEST_NOWY_KOSZYK && <AppNowyKoszyk />}
    </div>
  );
};

export default App;
