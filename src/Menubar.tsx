import React, { useRef } from 'react';
import { ContextualMenu, ContextualMenuItemType, Icon } from '@fluentui/react';
import { ipcRenderer } from 'electron';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { useBoolean } from './hooks';
import { closeWorkspace } from './Menubar.utils';
import selectWorkSpace from './utils/selectWorkSpace';

const locale: string = sessionStorage.getItem('language');
const messages = JSON.parse(sessionStorage.getItem('messages'));

export default function Menubar(): JSX.Element {
  const fileMenuRef = useRef();
  const editMenuRef = useRef();
  const helpMenuRef = useRef();
  const [fileMenuShow, toggleFileMenuShow, setFileMenuShow] = useBoolean(); // eslint-disable-line
  const [editMenuShow, toggleEditMenuShow, setEditMenuShow] = useBoolean(); // eslint-disable-line
  const [helpMenuShow, toggleHelpMenuShow, setHelpMenuShow] = useBoolean(); // eslint-disable-line

  return (
    <IntlProvider messages={messages} locale={locale} defaultLocale="en">
      <div id="icon">DataPack Planet</div>
      <div className="menu" ref={fileMenuRef} onClick={toggleFileMenuShow}>
        <FormattedMessage id="menu.file" />
      </div>
      <ContextualMenu
        target={fileMenuRef}
        items={[
          {
            key: 'closeWorkspace',
            text: messages['menu.closeWorkspace'],
          },
          {
            key: 'openWorkspace',
            text: messages['menu.openWorkspace'],
          },
          {
            key: 'd1',
            itemType: ContextualMenuItemType.Divider,
          },
          {
            key: 'exit',
            text: messages['menu.exit'],
          },
        ]}
        hidden={!fileMenuShow}
        onItemClick={(ev, item) => {
          toggleFileMenuShow();
          switch (item.key) {
            case 'closeWorkspace':
              closeWorkspace();
              break;
            case 'openWorkspace':
              selectWorkSpace();
              break;
            case 'exit':
              ipcRenderer.send('close');
              break;
          }
        }}
        onDismiss={toggleFileMenuShow}
      />
      <div className="menu" ref={editMenuRef} onClick={toggleEditMenuShow}>
        <FormattedMessage id="menu.edit" />
      </div>
      <ContextualMenu
        target={editMenuRef}
        items={[]}
        hidden={!editMenuShow}
        onItemClick={() => {
          toggleEditMenuShow();
        }}
        onDismiss={toggleEditMenuShow}
      />
      <div className="menu" ref={helpMenuRef} onClick={toggleHelpMenuShow}>
        <FormattedMessage id="menu.help" />
      </div>
      <ContextualMenu
        target={helpMenuRef}
        items={[]}
        hidden={!helpMenuShow}
        onItemClick={() => {
          toggleHelpMenuShow();
        }}
        onDismiss={toggleHelpMenuShow}
      />
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
      <button className="button" id="close-workspace-button" onClick={closeWorkspace}>
        <Icon iconName="ClosePane" />
      </button>
      <div className="button not-clickable" />
      <div className="button not-clickable" />
      {sessionStorage.getItem('egg') ? null : (
        <button
          className="button"
          id="egg-button"
          onClick={() => {
            sessionStorage.setItem('egg', '3c6b3fc60789adcc9d56110fc2c89c4b');
            location.reload();
            new Notification('You triggered a super secret option!');
          }}
        />
      )}
    </IntlProvider>
  );
}
