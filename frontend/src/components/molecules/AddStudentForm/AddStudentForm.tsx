import React, { useState } from 'react';
import styles from './AddStudentForm.module.css';

interface AddStudentFormProps {
  onAddStudent: (student: { id: number; name: string; grade: number; isActive: boolean }) => void;
}

interface FormFields {
  name: string;
  score: string;
}

interface FormErrors {
  name?: string;
  score?: string;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onAddStudent }) => {
  const [formData, setFormData] = useState<FormFields>({ name: '', score: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  // 3.1 Функція валідації
  const validate = (values: FormFields): FormErrors => {
    const newErrors: FormErrors = {};
    if (!values.name.trim()) {
      newErrors.name = "Ім'я є обов'язковим";
    } else if (values.name.length < 2) {
      newErrors.name = "Ім'я повинно містити принаймні 2 символи";
    }

    const scoreNum = Number(values.score);
    if (values.score === "") {
      newErrors.score = "Будь ласка, введіть бал";
    } else if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      newErrors.score = "Бал повинен бути від 0 до 100";
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Очищення помилок під час введення
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length === 0) {
      onAddStudent({
        id: Date.now(),
        name: formData.name,
        grade: Number(formData.score),
        isActive: true
      });
      setFormData({ name: '', score: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  // Самостійне завдання: Блокування кнопки
  const isInvalid = !formData.name || !formData.score || Object.keys(validate(formData)).length > 0;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label>ПІБ студента:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Напр. Іван Іванов"
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label>Бал:</label>
        <input
          type="number"
          name="score"
          value={formData.score}
          onChange={handleChange}
          placeholder="0-100"
        />
        {errors.score && <span className={styles.error}>{errors.score}</span>}
      </div>

      <button type="submit" disabled={isInvalid} className={styles.submitBtn}>
        Додати студента
      </button>
    </form>
  );
};

export default AddStudentForm;