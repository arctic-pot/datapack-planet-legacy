import ReactDOM from 'react-dom';
import React from 'react';
import './index.scss';
import '@fluentui/styles';
import App from './AppContent';
import fs from 'fs';
import NoDir from './placeholders/NoDir';
import locales from './locale';
import LoadingApp from './placeholders/LoadingApp';
console.log('👋 This message is being logged by "renderer.js", included via webpack');

fs.access('./settings.json', (err) => {
  if (err) {
    fs.writeFileSync(
      './settings.json',
      JSON.stringify({
        lang: 'en',
        directories: {
          root: null,
        },
      })
    );
  }
});

// Load page before loaded
ReactDOM.render(React.createElement(LoadingApp), document.getElementById('root'));

// Using a timeout to making effect and be sure the application will keep running
setTimeout(() => {
  fs.readFile('./settings.json', (err: Error | null, data: Buffer) => {
    sessionStorage.setItem('language', JSON.parse(data.toString()).lang);
    sessionStorage.setItem('messages', JSON.stringify(locales[JSON.parse(data.toString()).lang]));
    sessionStorage.setItem('settings', fs.readFileSync('./settings.json').toString());
    sessionStorage.setItem(
      'dir',
      JSON.parse(fs.readFileSync('./settings.json').toString()).directories.root
    );

    // Needs to set storage and render page is safety

    // Because a UNKNOWN BUG, the session storage can not get in App.tsx
    // So here we set a timeout to make sure the translation code will
    // correctly appear on the page

    setTimeout(() => {
      if (JSON.parse(data.toString()).directories.root === null) {
        console.error('Err: no directory selected');
        ReactDOM.render(React.createElement(NoDir), document.getElementById('root'));
      } else {
        ReactDOM.render(App, document.getElementById('root'));
      }
    }, 500);
  });
}, 300);
