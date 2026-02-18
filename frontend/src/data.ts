export interface PostItem {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

export const postsData: PostItem[] = [
  {
    id: 1,
    author: "User123",
    avatar: "https://wallpapers.com/images/hd/coolest-pictures-88c269e953ar0aw4.jpg",
    content: "Це мій перший пост у новій соціальній мережі! React - це круто.",
    date: "2 год тому",
    likes: 5
  },
  {
    id: 2,
    author: "Admin",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_X-38n_COdeFRwoR77GoGt3lD1YEsG4j9Hg&s",
    content: "Сьогодні ми вивчаємо Lists & Keys. Не забувайте про унікальні ключі!",
    date: "4 год тому",
    likes: 12
  },
  {
    id: 3,
    author: "Student_KP",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8dP4Z3ji00tU9NOuVnbiKzuKASUiVIW10RA&s",
    content: "Лабораторна робота №2 виконується успішно.",
    date: "1 день тому",
    likes: 2
  }
];

export interface Student {
  id: number;
  name: string;
  grade: number;
  isActive: boolean;
}

export const students: Student[] = [
  { id: 1, name: 'Олександр', grade: 85, isActive: true },
  { id: 2, name: 'Марія', grade: 55, isActive: true },
  { id: 3, name: 'Іван', grade: 92, isActive: false },
  { id: 4, name: 'Олена', grade: 78, isActive: true },
  { id: 5, name: 'Дмитро', grade: 45, isActive: false },
];