// src/pages/Home/Home.tsx
import React from 'react';
import { useStudentStore } from '../../store/useStudentStore';

const Home: React.FC = () => {
  const studentsCount = useStudentStore((state) => state.students.length);
  const avg = useStudentStore((state) => state.getAverageGrade());

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Вітаємо у системі!</h1>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
        <div style={{ padding: '20px', border: '1px solid #007bff', borderRadius: '10px' }}>
          <h3>Студентів</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{studentsCount}</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #28a745', borderRadius: '10px' }}>
          <h3>Середній бал</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{avg.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;