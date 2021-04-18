import { createContext } from 'react';

export const EditorContext = createContext({
  fileHistory: undefined,
  setFileHistory: undefined,
  openingTab: undefined,
  setOpeningTab: undefined,
  openingTabType: undefined,
  setOpeningTabType: undefined,
});
