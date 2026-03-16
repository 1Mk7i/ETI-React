import React, { useState } from 'react';

const formStyles: { [key: string]: React.CSSProperties } = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontWeight: 600,
    fontSize: '0.95rem',
    color: '#1a1a1a'
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '1rem',
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  error: {
    color: '#dc3545',
    fontSize: '0.85rem',
    fontWeight: 500
  },
  submitBtn: {
    padding: '0.75rem 2rem',
    backgroundColor: '#0066cc',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    alignSelf: 'flex-start',
    marginTop: '0.5rem'
  },
  submitBtnDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
    opacity: 0.7
  }
};

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
    <form onSubmit={handleSubmit} style={formStyles.form}>
      <div style={formStyles.inputGroup}>
        <label style={formStyles.label}>ПІБ студента:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Напр. Іван Іванов"
          style={formStyles.input}
        />
        {errors.name && <span style={formStyles.error}>{errors.name}</span>}
      </div>

      <div style={formStyles.inputGroup}>
        <label style={formStyles.label}>Бал:</label>
        <input
          type="number"
          name="score"
          value={formData.score}
          onChange={handleChange}
          placeholder="0-100"
          style={formStyles.input}
        />
        {errors.score && <span style={formStyles.error}>{errors.score}</span>}
      </div>

      <button
        type="submit"
        disabled={isInvalid}
        style={isInvalid ? {...formStyles.submitBtn, ...formStyles.submitBtnDisabled} : formStyles.submitBtn}
      >
        Додати студента
      </button>
    </form>
  );
};

export default AddStudentForm;