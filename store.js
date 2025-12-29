// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  points: 250, // Poin awal
  user: { name: 'EcoBuddy', rank: 5 },
  
  // Logic Pohon Tumbuh
  getTreeStage: (points) => {
    if (points >= 1000) return { stage: 4, label: 'Mighty Oak', image: 'https://cdn-icons-png.flaticon.com/512/9331/9331589.png' }; 
    if (points >= 500) return { stage: 3, label: 'Young Tree', image: 'https://cdn-icons-png.flaticon.com/512/9331/9331459.png' };
    if (points >= 100) return { stage: 2, label: 'Sapling', image: 'https://cdn-icons-png.flaticon.com/512/9331/9331326.png' };
    return { stage: 1, label: 'Seed', image: 'https://cdn-icons-png.flaticon.com/512/9331/9331289.png' };
  },

  addPoints: (amount) => set((state) => ({ points: state.points + amount })),
  redeemPoints: (cost) => set((state) => ({ points: state.points - cost })),
}));

export default useStore;