import React from 'react';
import { Icon } from '@fluentui/react';
import { ipcRenderer } from 'electron';

export default function Menubar(): JSX.Element {
  return (
    <>
      <div id="icon" className="float-left">
        DataPack Planet
      </div>
      <button
        className="button"
        id="close-button"
        onClick={() => {
          ipcRenderer.send('close');
        }}
      >
        <Icon iconName="ChromeClose" />
      </button>
      <button
        className="button"
        id="minimize-button"
        onClick={() => {
          ipcRenderer.send('minimize');
        }}
      >
        <Icon iconName="ChromeMinimize" />
      </button>
      <button
        className="button"
        id="refresh-button"
        onClick={() => {
          location.reload();
        }}
      >
        <Icon iconName="Refresh" />
      </button>
      <button className="button" id="close-workspace-button">
        <Icon iconName="ClosePane" />
      </button>
      <div className="button not-clickable" />
      <button
        className="button"
        id="egg-button"
        onClick={() => {
          sessionStorage.setItem('egg', '3c6b3fc60789adcc9d56110fc2c89c4b');
          location.reload();
          new Notification('You triggered a super secret option!');
        }}
      />
    </>
  );
}
