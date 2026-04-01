import { create } from 'zustand';
import { students as initialData, type Student } from '../data';

interface StudentState {
  students: Student[];
  // Actions
  addStudent: (student: Student) => void;
  // Селектори для обчислюваних даних (Stats)
  getActiveStudents: () => Student[];
  getAverageGrade: () => number;
}

export const useStudentStore = create<StudentState>((set, get) => ({
  students: initialData,

  addStudent: (newStudent) => 
    set((state) => ({ 
      students: [newStudent, ...state.students] 
    })),

  getActiveStudents: () => {
    return get().students.filter(s => s.isActive);
  },

  getAverageGrade: () => {
    const active = get().getActiveStudents();
    if (active.length === 0) return 0;
    return active.reduce((acc, curr) => acc + (curr.grade ?? 0), 0) / active.length;
  }
}));