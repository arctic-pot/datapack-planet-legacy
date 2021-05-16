import ReactDOM from 'react-dom';
import React from 'react';
import './index.scss';
import '@fluentui/styles';
import App from './App';
import fs from 'fs-extra';
import NoDir from './placeholders/NoDir';
import locales from './locale';
import LoadingApp from './placeholders/LoadingApp';
import { initializeIcons } from '@fluentui/react';
import Menubar from './Menubar';

initializeIcons();

console.log('👋 This message is being logged by "renderer.js", included via webpack');

// Add a spinner while app is loading
(async () => {
  // Async operating to avoid stop the main thread
  ReactDOM.render(React.createElement(LoadingApp), document.getElementById('root'));
})();

fs.access('./settings.json')
  // region settings and trash bin
  .catch(() => {
    console.warn('No settings.json');
    fs.writeJsonSync(
      './settings.json',
      {
        lang: 'en',
        directories: {
          root: null,
        },
        font: {
          family: '"Consolas", "Menlo", "monospace", "sans-serif"',
          size: 16,
          ligatures: false,
        },
      },
      { spaces: 4 }
    );
    return false;
  })
  .then(() => fs.ensureDir('./TRASH_BIN'))
  .then(() => fs.readJson('./settings.json'))
  // endregion
  // region strings for localization
  .then((data) => {
    sessionStorage.language = data.lang;
    sessionStorage.settings = JSON.stringify(data);
    sessionStorage.dir = data.directories.root;
    sessionStorage.messages = JSON.stringify(locales[data.lang]);
    const keys = Object.keys;
    if (keys(locales[data.lang]).length < keys(locales['en']).length) {
      sessionStorage.messages = JSON.stringify({
        ...locales['en'],
        ...locales[data.lang],
      });
      sessionStorage.missingMessages = String(true);
    }
    return data;
  })
  // endregion
  .then((data) => {
    // Needs to set storage and render page to keep safety
    ReactDOM.render(React.createElement(Menubar), document.getElementById('menubar'));
    if (data.directories.root === null) {
      ReactDOM.render(React.createElement(NoDir), document.getElementById('root'));
    } else {
      ReactDOM.render(React.createElement(App), document.getElementById('root'));
    }
  });
