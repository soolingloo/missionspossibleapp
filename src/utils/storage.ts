import { Category } from '../types';

const STORAGE_KEY = 'missions-possible-data';

export const loadCategories = (): Category[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
  
  return [
    { id: '1', name: 'Client', tasks: [], color: '#FF6B9D' },
    { id: '2', name: 'Biz System', tasks: [], color: '#4ECDC4' },
    { id: '3', name: 'Web & Funnel', tasks: [], color: '#95E1D3' },
    { id: '4', name: 'AI & Tech', tasks: [], color: '#FFA07A' },
    { id: '5', name: 'Learning', tasks: [], color: '#9B59B6' },
    { id: '6', name: 'Personal', tasks: [], color: '#3498DB' },
  ];
};

export const saveCategories = (categories: Category[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};
