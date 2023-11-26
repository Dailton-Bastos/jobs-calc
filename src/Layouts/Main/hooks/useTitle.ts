import { create } from 'zustand';

type TitleState = {
  headerTitle: string;
  setHeaderTitle: (newTitle: string) => void;
  pageTitle: string;
  setpageTitle: (newTitle: string) => void;
};

export const userTitle = create<TitleState>((set) => ({
  headerTitle: '',
  setHeaderTitle: (title: string) => set(() => ({ headerTitle: title })),
  pageTitle: '',
  setpageTitle: (title: string) => set(() => ({ pageTitle: title })),
}));
