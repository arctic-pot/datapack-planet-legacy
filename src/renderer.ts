import ReactDOM from 'react-dom';
import React from 'react';
import './index.scss';
import '@fluentui/styles';
import App from './AppContent';
import fs from 'fs';
import NoDir from './placeholders/NoDir';
console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);

fs.access('./settings.json', (err) => {
  if (err) {
    fs.writeFileSync(
      './settings.json',
      JSON.stringify(
        {
          lang: 'en',
          directories: {
            root: null,
          },
        },
        null,
        4
      )
    );
  }
});

ReactDOM.render(App, document.getElementById('root'));

fs.readFile('./settings.json', (err: any, data: Buffer) => {
  if (JSON.parse(data.toString()).directories.root === null) {
    console.error('Err: no directory selected');
    ReactDOM.render(
      React.createElement(NoDir),
      document.getElementById('root')
    );
  }
});
