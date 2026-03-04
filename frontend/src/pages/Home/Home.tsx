import { useState } from 'react';
import { students as initialStudents, type Student } from '../../data';

const Home = () => {
  const [currentStudents] = useState<Student[]>(initialStudents);

  const activeStudents = currentStudents.filter(s => s.isActive);
  const averageGrade = activeStudents.length > 0 
    ? activeStudents.reduce((acc, curr) => acc + (curr.grade ?? 0), 0) / activeStudents.length 
    : 0;

  return (
    <section>
      <h2>Мій React Проєкт</h2>
      
      <div style={{ 
        padding: '20px', 
        background: '#f8f9fa', 
        borderRadius: '8px', 
        marginBottom: '30px',
        borderLeft: '4px solid #007bff'
      }}>
        <p><strong>Ласкаво просимо!</strong> Це навчальний проєкт для вивчення React та маршрутизації.</p>
        <p>Перейдіть на вкладку <strong>"Стрічка"</strong> щоб подивитися новини, або <strong>"Профіль"</strong> щоб управляти студентами.</p>
      </div>

      <h3>Загальна статистика</h3>
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <p>Загальна кількість студентів: <strong>{currentStudents.length}</strong></p>
        <p>Активних студентів: <strong>{activeStudents.length}</strong></p>
        <p>Середній бал (активні): <strong style={{ color: '#007bff' }}>{averageGrade.toFixed(1)}</strong></p>
      </div>
    </section>
  );
};

export default Home;
