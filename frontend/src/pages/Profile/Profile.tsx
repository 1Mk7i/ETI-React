import { useState } from 'react';
import { students as initialStudents, type Student } from '../../data';
import AddStudentForm from '../../components/molecules/AddStudentForm/AddStudentForm';

const profileStyles: { [key: string]: React.CSSProperties } = {
  empty: {
    textAlign: 'center',
    color: '#999',
    padding: '20px',
    fontStyle: 'italic'
  }
};

const Profile = () => {
  const [currentStudents, setCurrentStudents] = useState<Student[]>(initialStudents);
  const [filterActive, setFilterActive] = useState(false);

  const handleAddStudent = (newStudent: Student) => {
    setCurrentStudents([newStudent, ...currentStudents]);
  };

  const activeStudents = currentStudents.filter(s => s.isActive);
  const successfulStudents = currentStudents.filter(s => (s.grade ?? 0) >= 60);
  const studentsToDisplay = filterActive ? successfulStudents : currentStudents;

  const averageGrade = activeStudents.length > 0 
    ? activeStudents.reduce((acc, curr) => acc + (curr.grade ?? 0), 0) / activeStudents.length 
    : 0;

  return (
    <section>
      <h2>Управління студентами</h2>
      
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee', borderRadius: '10px' }}>
        <h3>Додати нового студента</h3>
        <AddStudentForm onAddStudent={handleAddStudent} />
      </div>

      <button 
        onClick={() => setFilterActive(!filterActive)} 
        style={{ marginBottom: '15px', padding: '8px 16px', cursor: 'pointer' }}
      >
        {filterActive ? "Показати всіх" : "Тільки успішні (>=60)"}
      </button>
      
      {studentsToDisplay.length > 0 ? (
        <ul style={{ lineHeight: '2' }}>
          {studentsToDisplay.map(s => (
            <li key={s.id}>
              <strong>{s.name}</strong> — 
              <span style={{ 
                color: (s.grade ?? 0) >= 60 ? '#28a745' : '#dc3545', 
                marginLeft: '5px', fontWeight: 'bold'
              }}>
                {s.grade ?? "Оцінка відсутня"} 
                {s.grade !== undefined && s.grade !== null && (
                  ` (${s.grade >= 60 ? 'Зараховано' : 'Незараховано'})`
                )}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={profileStyles.empty}>За вашим запитом нікого не знайдено.</p>
      )}

      <hr style={{ opacity: 0.2, margin: '30px 0' }} />

      <h3>Аналітика</h3>
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <p>Загальна кількість студентів: <strong>{currentStudents.length}</strong></p>
        <p>Активних студентів: <strong>{activeStudents.length}</strong></p>
        <p>Середній бал (активні): <strong style={{ color: '#007bff' }}>{averageGrade.toFixed(1)}</strong></p>
      </div>
    </section>
  );
};

export default Profile;
