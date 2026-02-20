import React, { useState } from 'react';
import { students, type Student, postsData2, type Post } from './data';
import SearchBar from './components/molecules/SearchBar/SearchBar';
import PostCard from './components/molecules/Post/Post';
import styles from './App.module.css';

const App: React.FC = () => {
  // --- СТАН (State) для Лабораторної №3 ---
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'News', 'Updates', 'Work'];

  // --- ЛОГІКА Лабораторної №2 (Студенти) ---
  const sortedStudents = [...students].sort((a, b) => b.grade - a.grade);
  const topActiveStudents = students.filter((s: Student) => s.isActive && s.grade > 60);
  const activeStudents = students.filter(s => s.isActive);
  const averageGrade = activeStudents.length > 0 
    ? activeStudents.reduce((acc, curr) => acc + curr.grade, 0) / activeStudents.length 
    : 0;

  // --- ЛОГІКА Лабораторної №3 (Пости) ---
  const filteredPosts = postsData2.filter((post: Post) => {
    const matchesSearch = 
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.appContainer} style={{ padding: '20px' }}>
      
      {/* БЛОК 1: ЛАБОРАТОРНА №3 (Пошук та Фільтрація) */}
      <section style={{ marginBottom: '40px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
        <h1>Стрічка новин (Лаб №3)</h1>
        
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className={styles.filters} style={{ margin: '15px 0' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                marginRight: '10px',
                backgroundColor: activeCategory === cat ? '#007bff' : '#f0f0f0',
                color: activeCategory === cat ? 'white' : 'black',
                border: 'none',
                padding: '5px 15px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.feed}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => <PostCard key={post.id} {...post} />)
          ) : (
            <p className={styles.empty}>Нічого не знайдено за запитом "{searchTerm}"</p>
          )}
        </div>
      </section>

      {/* БЛОК 2: ЛАБОРАТОРНА №2 (Трансформація масивів) */}
      <section>
        <h1>Успішність студентів (Лаб №2)</h1>

        <div style={{ display: 'flex', gap: '40px' }}>
          <div>
            <h3>Всі студенти</h3>
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
          </div>

          <div>
            <h3>Топ-активні (Grade {'>'} 60)</h3>
            <ul>
              {topActiveStudents.map(student => (
                <li key={student.id}>{student.name} ({student.grade})</li>
              ))}
            </ul>
          </div>
        </div>

        <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>
          <strong>Середній бал активних:</strong> {averageGrade.toFixed(1)}
        </p>
      </section>

    </div>
  );
};

export default App;