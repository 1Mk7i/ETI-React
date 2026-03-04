import React, { useState } from 'react';
import { 
  students as initialStudents, // перейменовуємо для початкового стану
  postsData2, 
  type Student, 
  type Post 
} from './data';
import SearchBar from './components/molecules/SearchBar/SearchBar';
import PostCard from './components/molecules/Post/Post';
import styles from './App.module.css';
import AddStudentForm from './components/molecules/AddStudentForm/AddStudentForm';

type Tab = 'students' | 'news' | 'stats' | 'about';

const App: React.FC = () => {
  // --- СТАН (State) ---
  const [activeTab, setActiveTab] = useState<Tab>('students');
  const [showHelp, setShowHelp] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // ПРАКТИЧНА №4: Стан для списку студентів
  const [currentStudents, setCurrentStudents] = useState<Student[]>(initialStudents);

  // --- ЛОГІКА ОБЧИСЛЕНЬ ---
  
  // Обробник додавання нового студента
  const handleAddStudent = (newStudent: Student) => {
    setCurrentStudents([newStudent, ...currentStudents]); // Додаємо на початок списку
  };

  const activeStudents = currentStudents.filter(s => s.isActive);
  const successfulStudents = currentStudents.filter(s => (s.grade ?? 0) >= 60);
  
  const studentsToDisplay = filterActive ? successfulStudents : currentStudents;

  const averageGrade = activeStudents.length > 0 
    ? activeStudents.reduce((acc, curr) => acc + (curr.grade ?? 0), 0) / activeStudents.length 
    : 0;

  const filteredPosts = postsData2.filter(post => 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.appContainer} style={{ padding: '20px' }}>
      <h1>Мій React Проєкт</h1>

      {/* Оператор && (Довідка) */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowHelp(!showHelp)}>
          {showHelp ? "Приховати інструкцію" : "Показати інструкцію"}
        </button>
        {showHelp && (
          <div style={{ 
            padding: '15px', background: '#eef2f7', marginTop: '10px', 
            borderRadius: '8px', borderLeft: '4px solid #007bff', color: '#333'
          }}>
            <p><strong>Довідка:</strong> Використовуйте вкладки для перемикання розділів. Тепер ви можете додавати нових студентів через форму.</p>
          </div>
        )}
      </div>

      {/* Навігація (Таби) */}
      <nav className={styles.filters} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        {(['students', 'news', 'stats', 'about'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? styles.active : ''}
            style={{
              padding: '8px 16px', cursor: 'pointer', borderRadius: '20px',
              border: '1px solid #ccc',
              backgroundColor: activeTab === tab ? '#007bff' : '#fff',
              color: activeTab === tab ? '#fff' : '#000'
            }}
          >
            {tab === 'students' && "Студенти"}
            {tab === 'news' && "Новини"}
            {tab === 'stats' && "Статистика"}
            {tab === 'about' && "Про автора"}
          </button>
        ))}
      </nav>

      <hr style={{ opacity: 0.2 }} />

      <div className={styles.content} style={{ marginTop: '20px' }}>
        
        {/* ТАБ: СТУДЕНТИ (Інтеграція Форми) */}
        {activeTab === 'students' && (
          <section>
            <h2>Управління студентами</h2>
            
            {/* ФОРМА ПОПЕРЕДУ СПИСКУ */}
            <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee', borderRadius: '10px' }}>
               <h3>Додати нового студента</h3>
               <AddStudentForm onAddStudent={handleAddStudent} />
            </div>

            <button 
              onClick={() => setFilterActive(!filterActive)} 
              style={{ marginBottom: '15px', padding: '5px 10px' }}
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
              <p className={styles.empty}>За вашим запитом нікого не знайдено.</p>
            )}
          </section>
        )}

        {/* ТАБ: НОВИНИ */}
        {activeTab === 'news' && (
          <section>
            <h2>Стрічка новин</h2>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <div className={styles.feed} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <PostCard 
                    key={post.id} 
                    {...post}
                    date="Сьогодні" 
                    avatar="https://via.placeholder.com/150" 
                    likes={0}
                  />
                ))
              ) : (
                <p className={styles.empty}>Новин не знайдено.</p>
              )}
            </div>
          </section>
        )}

        {/* ТАБ: СТАТИСТИКА (тепер рахує динамічно) */}
        {activeTab === 'stats' && (
          <section>
            <h2>Аналітика</h2>
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <p>Загальна кількість студентів: <strong>{currentStudents.length}</strong></p>
              <p>Активних студентів: <strong>{activeStudents.length}</strong></p>
              <p>Середній бал (активні): <strong style={{ color: '#007bff' }}>{averageGrade.toFixed(1)}</strong></p>
            </div>
          </section>
        )}

        {/* ТАБ: ПРО АВТОРА */}
        {activeTab === 'about' && (
          <section>
            <h2>Про автора</h2>
            <p>Проєкт виконав студент групи [Твоя група]. Додано валідацію форм та динамічне оновлення стану.</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default App;