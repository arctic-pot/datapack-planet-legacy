import ReactDOM from 'react-dom';
import React from 'react';
import './index.scss';
import '@fluentui/styles';
import App from './App';
import fs from 'fs-extra';
import NoDir from './placeholders/NoDir';
import locales from './locale';
import LoadingApp from './placeholders/LoadingApp';
import $ from 'jquery';

$('#close-workspace-button').on('click', () => {
  fs.readJson('./settings.json').then((_data) => {
    const data = _data;
    data.directories.root = null;
    fs.writeJsonSync('./settings.json', data);
    location.reload();
  });
});
if (sessionStorage.getItem('egg')) {
  $('#egg-button').remove();
}

console.log('👋 This message is being logged by "renderer.js", included via webpack');

fs.access('./settings.json').catch(() => {
  fs.writeJsonSync(
    './settings.json',
    {
      lang: 'en',
      directories: {
        root: null,
      },
      font: {
        family: 'monospace',
        size: 16,
        ligatures: false,
      },
    },
    { spaces: 4 }
  );
});

// Load page before loaded
ReactDOM.render(React.createElement(LoadingApp), document.getElementById('root'));

// Using a timeout to making effect and be sure the application will keep running
setTimeout(() => {
  fs.ensureDir('./TRASH_BIN').then();
  fs.readJson('./settings.json').then((data) => {
    sessionStorage.setItem('language', data.lang);
    sessionStorage.setItem('settings', JSON.stringify(data));
    sessionStorage.setItem('dir', data.directories.root);
    const keys = Object.keys;
    if (keys(locales[data.lang]).length < keys(locales['en']).length) {
      sessionStorage.setItem(
        'messages',
        JSON.stringify({
          ...locales['en'],
          ...locales[data.lang],
        })
      );
      sessionStorage.setItem('missingMessages', String(true));
    }
    sessionStorage.setItem('messages', JSON.stringify(locales[data.lang]));

    // Needs to set storage and render page is safety

    // Because a UNKNOWN BUG, the session storage can not get in App.tsx
    // So here we set a timeout to make sure the translation code will
    // correctly appear on the page

    setTimeout(() => {
      if (data.directories.root === null) {
        console.error('Err: no directory selected');
        ReactDOM.render(React.createElement(NoDir), document.getElementById('root'));
      } else {
        ReactDOM.render(React.createElement(App), document.getElementById('root'));
      }
    }, 100);
  });
}, 100);
