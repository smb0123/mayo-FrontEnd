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

const useAlarm = create(
  persist(
    (set) => ({
      alarm: null,
      setAlarm: (alarm) => set({ alarm: alarm }),
    }),
    {
      name: 'alarm',
    }
  )
);

export { useStoreId, useAlarm };
