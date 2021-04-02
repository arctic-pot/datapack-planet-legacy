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
import { initializeIcons } from '@fluentui/react';
import Menubar from './Menubar';

initializeIcons();

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

// Load menubar at first
ReactDOM.render(React.createElement(Menubar), document.getElementById('menubar'));
// Add a spinner while app is loading
ReactDOM.render(React.createElement(LoadingApp), document.getElementById('root'));

fs.access('./settings.json')
  .catch(() => {
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
    return false;
  })
  .then(() => fs.ensureDir('./TRASH_BIN'))
  .then(() => fs.readJson('./settings.json'))
  .then((data) => {
    sessionStorage.setItem('language', data.lang);
    sessionStorage.setItem('settings', JSON.stringify(data));
    sessionStorage.setItem('dir', data.directories.root);
    sessionStorage.setItem('messages', JSON.stringify(locales[data.lang]));
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
    return data;
  })
  .then((data) => {
    // Needs to set storage and render page to keep safety
    if (data.directories.root === null) {
      ReactDOM.render(React.createElement(NoDir), document.getElementById('root'));
    } else {
      ReactDOM.render(React.createElement(App), document.getElementById('root'));
    }
  });
