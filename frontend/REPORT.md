# Звіт про виконання лабораторної роботи №1

**Тема:** Проєтування архітектури React-додатка, використання методології Atomic Design та стилізація через CSS Modules.  
**Технологічний стек:** React 19, TypeScript, Vite, Docker, CSS Modules.

---

## 1. Мета роботи
Створити каркас веб-застосунку, налаштувати структуру проєкту за методологією Atomic Design та розробити набір базових UI-компонентів (атомів та молекул) з використанням ізольованих стилів.

---

## 2. Хід виконання роботи

### 2.1. Ініціалізація проєкту
Проєкт розгорнуто за допомогою Vite з використанням шаблону `react-ts-swc`. Для забезпечення ідентичного середовища розробки проєкт запущено всередині Docker-контейнера.

**Структура Docker-контейнера:**
- Базовий образ: `node:20-alpine`
- Команда запуску: `npm run dev -- --host`

### 2.2. Архітектура Atomic Design
У папці `src/components` створено ієрархію папок:
- `atoms/` — для базових елементів (кнопки, інпути).
- `molecules/` — для складених компонентів (картки).



---

## 3. Код розроблених компонентів

### 3.1. Компонент Input (Атом)
Компонент реалізовано з підтримкою `label` та пропсів для гнучкого використання.

**`src/components/atoms/Input/Input.tsx`**
```tsx
import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  type: string;
  placeholder: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder, label }) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input 
        type={type} 
        placeholder={placeholder} 
        className={styles.input} 
      />
    </div>
  );
};

export default Input;