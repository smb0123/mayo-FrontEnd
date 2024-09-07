import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStoreId = create(
  persist(
    (set) => ({
      storeId: null,
      setStoreId: (storeId) => set({ storeId: storeId }),
    }),
    {
      name: 'storeId',
    }
  )
);

const useUserId = create(
  persist(
    (set) => ({
      userId: null,
      setUserId: (userId) => set({ userId: userId }),
    }),
    {
      name: 'userId',
    }
  )
);

export { useStoreId, useUserId };
