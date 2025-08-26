import { create, StateCreator } from "zustand";

export interface StatesSliceInterface {
  safeAppsCount: number;
  warnAppsCount: number;
  alertAppsCount: number;
  lastScan: number | null;

  setLastScan: (timestamp: number | null) => void;
  setAlertAppsCount: (count: number) => void;
  setWarnAppsCount: (count: number) => void;
  setSafeAppsCount: (count: number) => void;
}

export const createStateSlice: StateCreator<
  StatesSliceInterface,
  [],
  [],
  StatesSliceInterface
> = (set) => ({
  safeAppsCount: 0,
  warnAppsCount: 0,
  alertAppsCount: 0,
  lastScan: null,
  setLastScan: (timestamp: number | null) => {
    set(() => ({
      lastScan: timestamp,
    }));
  },
  setAlertAppsCount: (count: number) => {
    set(() => ({
      alertAppsCount: count,
    }));
  },
  setWarnAppsCount: (count: number) => {
    set(() => ({
      warnAppsCount: count,
    }));
  },
  setSafeAppsCount: (count: number) => {
    set(() => ({
      safeAppsCount: count,
    }));
  },
});

const useStatesStore = create<StatesSliceInterface>()(createStateSlice);

export default useStatesStore;
