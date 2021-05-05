import React, { PropsWithChildren, useContext, useRef, useState } from 'react';
import {
  ContextualMenu,
  ContextualMenuItemType,
  DetailsList,
  IContextualMenuItem,
  IGroup,
  SelectionMode,
  Text,
} from '@fluentui/react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import * as electron from 'electron';
import { IFileListItem } from './Body';
import fs from 'fs-extra';
import ReactDOM from 'react-dom';
import { EditorContext } from '../utils/contexts';

interface IFileListProps extends PropsWithChildren<WrappedComponentProps> {
  items: IFileListItem[];
  groups: IGroup[];
}

export default injectIntl(function FileList(props: IFileListProps): JSX.Element {
  const [position, setPosition] = useState<number[]>([0, 0]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [contextMenuItem, setContextMenuItem] = useState<IFileListItem>();
  const positionRef = useRef();
  const { intl } = props;
  const { setOpeningTab, fileHistory, setFileHistory, setOpeningTabType } = useContext(EditorContext);
  const handleItemClick = (e: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => {
    switch (item.key) {
      case 'explorer':
        electron.shell.showItemInFolder(contextMenuItem.dir);
        break;
      case 'open':
        electron.shell.openPath(contextMenuItem.dir).then();
        break;
      case 'path':
        electron.clipboard.clear();
        electron.clipboard.writeText(contextMenuItem.dir);
        break;
      case 'pathRelative':
        electron.clipboard.clear();
        electron.clipboard.writeText(contextMenuItem.dirR);
        break;
      case 'delete':
        fs.removeSync(contextMenuItem.dir);
        break;
      case 'deleteWorkspace':
        // TODO: Get workspace directory
        break;
      case 'trash':
        fs.readFile(contextMenuItem.dir, 'utf-8').then((data: string) => {
          fs.outputJsonSync(`./TRASH_BIN/${Date.now().toString(16)}.v1.trash`, {
            time: Date.now(),
            content: data,
            title: contextMenuItem.name,
            type: contextMenuItem.type,
            workspace: sessionStorage.getItem('dir'),
          });
        });
        break;
      case '1d5344f93c80fcfe6dce702466cae1e27eef3166':
        ReactDOM.render(<Text>You won't expecting this!</Text>, document.getElementById('root'));
        break;
    }
  };
  return (
    <div style={{ height: '-webkit-fill-available' }}>
      <div style={{ position: 'fixed', top: position[1] - 60, left: position[0] }} ref={positionRef} />
      <ContextualMenu
        title={contextMenuItem ? contextMenuItem.name : null}
        items={[
          {
            key: 'explorer',
            text: intl.formatMessage({ id: 'actions.explorerOpen' }),
            iconProps: { iconName: 'OpenFile' },
          },
          {
            key: 'open',
            text: intl.formatMessage({ id: 'actions.open' }) + '...',
            iconProps: { iconName: 'OpenInNewWindow' },
          },
          {
            key: 'd1',
            itemType: ContextualMenuItemType.Divider,
          },
          {
            key: 'pathRelative',
            text: intl.formatMessage({ id: 'actions.pathRelative' }),
            iconProps: { iconName: 'Code' },
          },
          {
            key: 'path',
            text: intl.formatMessage({ id: 'actions.pathAbsolute' }),
            iconProps: { iconName: 'Code' },
          },
          {
            key: 'd2',
            itemType: ContextualMenuItemType.Divider,
          },
          {
            key: 'copy',
            text: intl.formatMessage({ id: 'actions.copy' }),
            iconProps: { iconName: 'Copy' },
          },
          {
            key: 'rename',
            text: intl.formatMessage({ id: 'actions.rename' }),
            iconProps: { iconName: 'Rename' },
          },
          {
            key: 'trash',
            text: intl.formatMessage({ id: 'actions.trash' }),
            iconProps: { iconName: 'Delete' },
            split: true,
            subMenuProps: {
              onItemClick: handleItemClick,
              items: [
                {
                  key: 'deleteWorkspace',
                  text: intl.formatMessage({ id: 'actions.deleteNamespace' }),
                  iconProps: { iconName: 'Delete', style: { color: 'salmon' } },
                },
                {
                  key: 'delete',
                  text: intl.formatMessage({ id: 'actions.delete' }),
                  iconProps: { iconName: 'Delete' },
                },
              ],
            },
          },
          ...(sessionStorage.getItem('egg')
            ? [
                {
                  key: 'de',
                  itemType: ContextualMenuItemType.Divider,
                },
                {
                  key: '1d5344f93c80fcfe6dce702466cae1e27eef3166',
                  iconProps: {
                    iconName: 'EmojiNeutral',
                  },
                  text: 'L' + 'OL'.repeat(~~(Math.random() * 25) + 1),
                },
              ]
            : []),
        ]}
        target={positionRef}
        hidden={!showMenu}
        onDismiss={() => {
          setShowMenu(false);
        }}
        onItemClick={handleItemClick}
      />
      <DetailsList
        onItemInvoked={(item) => {
          if (!fileHistory.includes(item.name)) {
            setFileHistory([item.name, ...fileHistory]);
          }
          setOpeningTab(item.name);
          setOpeningTabType(item.type);
        }}
        columns={[
          {
            key: 'col2',
            name: 'Name',
            fieldName: 'name',
            minWidth: outerWidth * 0.1,
          },
        ]}
        groups={props.groups}
        isHeaderVisible={false}
        items={props.items}
        compact
        selectionMode={SelectionMode.none}
        onItemContextMenu={(item: IFileListItem, index, e: MouseEvent) => {
          setPosition([e.pageX, e.pageY]);
          setShowMenu(true);
          setContextMenuItem(item);
        }}
      />
    </div>
  );
});
