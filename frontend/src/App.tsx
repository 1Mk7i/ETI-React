import React, { useState } from 'react';
import { 
  students, 
  postsData2, // для фільтрації та Лаби №3
  type Student, 
  type Post 
} from './data';
import SearchBar from './components/molecules/SearchBar/SearchBar';
import PostCard from './components/molecules/Post/Post';
import styles from './App.module.css';

// Типізація для табів
type Tab = 'students' | 'news' | 'stats' | 'about';

const App: React.FC = () => {
  // --- СТАН (State) ---
  const [activeTab, setActiveTab] = useState<Tab>('students');
  const [showHelp, setShowHelp] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // --- ЛОГІКА ОБЧИСЛЕНЬ ---
  
  // 1. Студенти
  const activeStudents = students.filter(s => s.isActive);
  const successfulStudents = students.filter(s => (s.grade ?? 0) >= 60);
  
  // Вибір масиву для рендерингу (Тернарний оператор - Практична №3)
  const studentsToDisplay = filterActive ? successfulStudents : students;

  // 2. Статистика
  const averageGrade = activeStudents.length > 0 
    ? activeStudents.reduce((acc, curr) => acc + (curr.grade ?? 0), 0) / activeStudents.length 
    : 0;

  // 3. Фільтрація постів (Лабораторна №3)
  const filteredPosts = postsData2.filter(post => 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.appContainer} style={{ padding: '20px' }}>
      <h1>Мій React Проєкт</h1>

      {/* 2. Оператор && (Просте умовне відображення) */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowHelp(!showHelp)}>
          {showHelp ? "Приховати інструкцію" : "Показати інструкцію"}
        </button>
        {showHelp && (
          <div style={{ 
            padding: '15px', 
            background: '#eef2f7', 
            marginTop: '10px', 
            borderRadius: '8px',
            borderLeft: '4px solid #007bff' 
          }}>
            <p><strong>Довідка:</strong> Використовуйте вкладки для перемикання розділів. У вкладці "Студенти" доступний фільтр за успішністю.</p>
          </div>
        )}
      </div>

      {/* 4. Навігація (Інтерфейс із табами) */}
      <nav className={styles.filters} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        {(['students', 'news', 'stats', 'about'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? styles.active : ''}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              borderRadius: '20px',
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

      {/* Контент табів (Умовне відображення) */}
      <div className={styles.content} style={{ marginTop: '20px' }}>
        
        {/* ТАБ: СТУДЕНТИ (Практична №3) */}
        {activeTab === 'students' && (
          <section>
            <h2>Список студентів</h2>
            <button 
              onClick={() => setFilterActive(!filterActive)} 
              style={{ marginBottom: '15px', padding: '5px 10px' }}
            >
              {filterActive ? "Показати всіх" : "Тільки успішні (>=60)"}
            </button>
            
            {/* Порожній стан (Empty State) */}
            {studentsToDisplay.length > 0 ? (
              <ul style={{ lineHeight: '2' }}>
                {studentsToDisplay.map(s => (
                  <li key={s.id}>
                    <strong>{s.name}</strong> — 
                    {/* Оператор нульового злиття (??) - Захист від помилок */}
                    <span style={{ 
                      color: (s.grade ?? 0) >= 60 ? '#28a745' : '#dc3545', 
                      marginLeft: '5px',
                      fontWeight: 'bold'
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

        {/* ТАБ: НОВИНИ (Лабораторна №3) */}
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
                    // Додаємо пропси, яких немає в Post, але є в PostItem/PostCard
                    date="Сьогодні" 
                    avatar="https://via.placeholder.com/150" 
                  />
                ))
              ) : (
                <p className={styles.empty}>Новин за запитом "{searchTerm}" не знайдено.</p>
              )}
            </div>
          </section>
        )}

        {/* ТАБ: СТАТИСТИКА */}
        {activeTab === 'stats' && (
          <section>
            <h2>Аналітика</h2>
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <p>Загальна кількість студентів: <strong>{students.length}</strong></p>
              <p>Активних студентів: <strong>{activeStudents.length}</strong></p>
              <p>Середній бал (активні): <strong style={{ color: '#007bff' }}>{averageGrade.toFixed(1)}</strong></p>
            </div>
          </section>
        )}

        {/* ТАБ: ПРО АВТОРА */}
        {activeTab === 'about' && (
          <section>
            <h2>Про автора</h2>
            <p>Цей додаток розроблено в рамках вивчення React. Тут поєднано роботу зі списками, станом, фільтрацією та умовним рендерингом.</p>
            <p>Група: <strong>Твоя Група</strong></p>
          </section>
        )}
      </div>
    </div>
  );
};

export default App;