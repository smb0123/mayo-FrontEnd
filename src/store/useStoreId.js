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

export default useStoreId;
