import React, { useState } from 'react';
import { useStudentStore } from '../../../store/useStudentStore';

const formStyles: { [key: string]: React.CSSProperties } = {
  form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { fontWeight: 600, fontSize: '0.95rem', color: '#1a1a1a' },
  input: { padding: '0.75rem 1rem', border: '1px solid #e0e0e0', borderRadius: '6px', outline: 'none' },
  error: { color: '#dc3545', fontSize: '0.85rem' },
  submitBtn: { padding: '0.75rem 2rem', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  submitBtnDisabled: { backgroundColor: '#ccc', cursor: 'not-allowed', opacity: 0.7 }
};

const AddStudentForm: React.FC = () => {
  const addStudent = useStudentStore((state) => state.addStudent);
  const [formData, setFormData] = useState({ name: '', score: '' });
  const [errors, setErrors] = useState<{name?: string, score?: string}>({});

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = "Ім'я обов'язкове";
    const scoreNum = Number(formData.score);
    if (!formData.score || isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      newErrors.score = "Бал має бути від 0 до 100";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valErrors = validate();
    if (Object.keys(valErrors).length === 0) {
      addStudent({
        id: Date.now(),
        name: formData.name,
        grade: Number(formData.score),
        isActive: true
      });
      setFormData({ name: '', score: '' });
      setErrors({});
    } else {
      setErrors(valErrors);
    }
  };

  const isInvalid = !formData.name || !formData.score || Object.keys(validate()).length > 0;

  return (
    <form onSubmit={handleSubmit} style={formStyles.form}>
      <div style={formStyles.inputGroup}>
        <label style={formStyles.label}>ПІБ студента:</label>
        <input
          style={formStyles.input}
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Напр. Іван Іванов"
        />
        {errors.name && <span style={formStyles.error}>{errors.name}</span>}
      </div>
      <div style={formStyles.inputGroup}>
        <label style={formStyles.label}>Бал:</label>
        <input
          type="number"
          style={formStyles.input}
          value={formData.score}
          onChange={(e) => setFormData({...formData, score: e.target.value})}
          placeholder="0-100"
        />
        {errors.score && <span style={formStyles.error}>{errors.score}</span>}
      </div>
      <button type="submit" disabled={isInvalid} style={isInvalid ? {...formStyles.submitBtn, ...formStyles.submitBtnDisabled} : formStyles.submitBtn}>
        Додати студента
      </button>
    </form>
  );
};

export default AddStudentForm;