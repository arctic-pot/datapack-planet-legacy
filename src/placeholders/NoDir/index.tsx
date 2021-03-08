import React from 'react';
import { DefaultButton, Label } from '@fluentui/react';
import electron from 'electron';
import fs from 'fs-extra';
import path from 'path';

function select() {
  const settings = fs.readJsonSync('./settings.json');
  const selected = electron.remote.dialog.showOpenDialogSync({
    properties: ['openDirectory', 'dontAddToRecent', 'createDirectory'],
  });
  if (selected) {
    settings.directories.root = path.resolve(selected[0]);
    fs.writeJson('./settings.json', settings, { spaces: 4 }).then(() => {
      location.reload();
    });
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
