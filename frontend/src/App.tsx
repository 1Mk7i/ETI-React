import React from 'react';
import { students, type Student } from './data';

const App: React.FC = () => {
  const sortedStudents = [...students].sort((a, b) => b.grade - a.grade);

  const topActiveStudents = students.filter((s: Student) => s.isActive && s.grade > 60);

  const activeStudents = students.filter(s => s.isActive);
  const averageGrade = activeStudents.length > 0 
    ? activeStudents.reduce((acc, curr) => acc + curr.grade, 0) / activeStudents.length 
    : 0;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Трансформація масивів</h1>

      <section>
        <h2>Всі студенти</h2>
        <ul>
          {sortedStudents.map((student) => (
            <li 
              key={student.id} 
              style={{ 
                color: student.isActive ? 'black' : 'gray',
                textDecoration: student.isActive ? 'none' : 'line-through'
              }}
            >
              {student.name} — {student.grade} балів
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Топ-активні</h2>
        <ul>
          {topActiveStudents.map(student => (
            <li key={student.id}>{student.name} ({student.grade})</li>
          ))}
        </ul>
      </section>

      <p><strong>Середній бал:</strong> {averageGrade.toFixed(1)}</p>
    </div>
  );
};

export default App;