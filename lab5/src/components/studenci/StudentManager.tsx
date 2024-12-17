import React, { useState } from "react";
import Dodawanie from "./Dodawanie";

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

const StudentManager: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { imie: "Jan", nazwisko: "Kowalski", rocznik: 1999 },
    { imie: "Anna", nazwisko: "Nowak", rocznik: 2000 },
    { imie: "Piotr", nazwisko: "Zieliński", rocznik: 1998 },
  ]);

  const handleAddStudent = (newStudent: Student) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  return (
    <div>
      <table border={1} cellPadding={5} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Dodawanie nowego studenta</h3>
      <Dodawanie onAdd={handleAddStudent} />
    </div>
  );
};

export default StudentManager;
