# Звіт до Лабораторної роботи №3

**Тема:** Інтеграція системи фільтрації та пошуку. Робота з локальним станом.
**Стек:** React (Vite), TypeScript, CSS Modules.

---

## 1. Логіка роботи пошуку та фільтрації

В основному компоненті `App.tsx` реалізовано комбіновану фільтрацію. Дані фільтруються динамічно при кожному рендері на основі двох станів: `searchTerm` (текст із пошуку) та `activeCategory` (обраний тег).



```tsx
// Фрагмент логіки з App.tsx
const filteredPosts = postsData2.filter((post: Post) => {
  const matchesSearch = 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase());
  
  const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
  
  return matchesSearch && matchesCategory;
});