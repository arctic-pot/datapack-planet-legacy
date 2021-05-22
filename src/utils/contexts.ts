import { createContext } from 'react';

export const EditorContext = createContext({
  fileHistory: null,
  setFileHistory: null,
  openingTab: null,
  setOpeningTab: null,
  openingTabType: null,
  setOpeningTabType: null,
});
