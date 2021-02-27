import React from 'react';
import { DefaultButton, Label } from '@fluentui/react';
import electron from 'electron';
import fs from 'fs';
import path from 'path';

function select() {
  const settings = JSON.parse(fs.readFileSync('./settings.json').toString());
  const selected = electron.remote.dialog.showOpenDialogSync({
    properties: ['openDirectory', 'dontAddToRecent', 'createDirectory'],
  });
  if (selected) {
    settings.directories.root = path.resolve(selected[0]);
    fs.writeFileSync('./settings.json', Buffer.from(JSON.stringify(settings, null, 4)));
    location.reload();
  }
}

export default function NoDir(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      {/* I think there should be a image */}
      <Label>You have not selected any workspace</Label>
      <div>&nbsp;</div>
      <div>
        <DefaultButton onClick={select}>Select an existing DataPack</DefaultButton>
        &nbsp;or&nbsp;
        <DefaultButton disabled>Create a DataPack</DefaultButton>
      </div>
    </div>
  );
}
