// src/pages/Profile/Profile.tsx
import React, { useState } from 'react';
import { useStudentStore } from '../../store/useStudentStore';
import AddStudentForm from '../../components/molecules/AddStudentForm/AddStudentForm';

const Profile: React.FC = () => {
  const students = useStudentStore((state) => state.students);
  const [filterActive, setFilterActive] = useState(false);

  const studentsToDisplay = filterActive 
    ? students.filter(s => (s.grade ?? 0) >= 60) 
    : students;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Управління студентами</h2>
      
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee', borderRadius: '10px' }}>
        <h3>Додати студента</h3>
        <AddStudentForm />
      </div>

      <button 
        onClick={() => setFilterActive(!filterActive)} 
        style={{ marginBottom: '20px', padding: '10px', cursor: 'pointer', borderRadius: '5px' }}
      >
        {filterActive ? "Показати всіх" : "Тільки успішні (>=60)"}
      </button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {studentsToDisplay.map(s => (
          <li key={s.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
            <strong>{s.name}</strong> — {s.grade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;