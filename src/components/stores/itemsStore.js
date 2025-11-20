import { create } from 'zustand';
import { initialItems } from '../../lib/constants';
import { persist } from 'zustand/middleware';

export const useItemsStore = create(
  persist(
    (set) => ({
      items: initialItems,
      addItem: (newItemText) => {
        const newItem = {
          id: new Date().getTime(),
          name: newItemText,
          packed: false,
        };
        set((state) => ({ items: [...state.items, newItem] }));
      },
      deleteItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },
      toggleItemPacked: (itemId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, packed: !item.packed } : item
          ),
        }));
      },

      removeAllItems: () => {
        set(() => ({ items: [] }));
      },
      resetToIntitial: () => {
        set(() => ({ items: initialItems }));
      },
      markAllAsComplete: () => {
        set((state) => {
          const updatedItems = state.items.map((item) => ({
            ...item,
            packed: true,
          }));
          return { items: updatedItems };
        });
      },
      markAllAsIncomplete: () => {
        set((state) => {
          const updatedItems = state.items.map((item) => ({
            ...item,
            packed: false,
          }));
          return { items: updatedItems };
        });
      },
    }),
    { name: 'items' }
  )
);
