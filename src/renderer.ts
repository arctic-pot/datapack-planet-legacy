import ReactDOM from 'react-dom';
import React from 'react';
import './index.scss';
import '@fluentui/styles';
import App from './AppContent';
import fs from 'fs-extra';
import NoDir from './placeholders/NoDir';
import locales from './locale';
import LoadingApp from './placeholders/LoadingApp';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

fs.access('./settings.json').catch(() => {
  fs.writeJsonSync(
    './settings.json',
    {
      lang: 'en',
      directories: {
        root: null,
      },
    },
    { spaces: 4 }
  );
});

// Load page before loaded
ReactDOM.render(React.createElement(LoadingApp), document.getElementById('root'));

// Using a timeout to making effect and be sure the application will keep running
setTimeout(() => {
  fs.readJson('./settings.json').then((data) => {
    sessionStorage.setItem('language', data.lang);
    sessionStorage.setItem('messages', JSON.stringify(locales[data.lang]));
    sessionStorage.setItem('settings', JSON.stringify(data));
    sessionStorage.setItem('dir', data.directories.root);

    // Needs to set storage and render page is safety

    // Because a UNKNOWN BUG, the session storage can not get in App.tsx
    // So here we set a timeout to make sure the translation code will
    // correctly appear on the page

    setTimeout(() => {
      if (data.directories.root === null) {
        console.error('Err: no directory selected');
        ReactDOM.render(React.createElement(NoDir), document.getElementById('root'));
      } else {
        ReactDOM.render(App, document.getElementById('root'));
      }
    }, 100);
  });
}, 100);
