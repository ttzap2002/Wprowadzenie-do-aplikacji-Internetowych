import React from "react";

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

const Students: Student[] = [
  { imie: "Jan", nazwisko: "Kowalski", rocznik: 1999 },
  { imie: "Anna", nazwisko: "Nowak", rocznik: 2000 },
  { imie: "Piotr", nazwisko: "Zieliński", rocznik: 1998 },
];

const Studenci: React.FC = () => {
  return (
    <table border={1} cellPadding={5} style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Rocznik</th>
        </tr>
      </thead>
      <tbody>
        {Students.map((student, index) => (
          <tr key={index}>
            <td>{student.imie}</td>
            <td>{student.nazwisko}</td>
            <td>{student.rocznik}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Studenci;
