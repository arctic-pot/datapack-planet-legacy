import React, { PropsWithChildren, useRef, useState } from 'react';
import {
  ContextualMenu,
  ContextualMenuItemType,
  DetailsList,
  IContextualMenuItem,
  IGroup,
  SelectionMode,
} from '@fluentui/react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import * as electron from 'electron';
import { IItemFormat } from './Body';
import fs from 'fs-extra';

interface IFileListProps extends PropsWithChildren<WrappedComponentProps> {
  items: IItemFormat[];
  groups: IGroup[];
}

export default injectIntl(function FileList(props: IFileListProps): JSX.Element {
  const [position, setPosition] = useState<number[]>([0, 0]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [contextMenuItem, setContextMenuItem] = useState<IItemFormat>();
  const positionRef = useRef();
  const { intl } = props;
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
            type: contextMenuItem.type
          });
        });
        break;
    }
  };
  return (
    <>
      <div
        style={{ position: 'fixed', top: position[1] - 60, left: position[0] }}
        ref={positionRef}
      />
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
                    iconName:
                      '\u0045\u006D\u006F\u006A\u0069\u0054\u0061' +
                      '\u0062\u0053\u0079\u006D\u0062\u006F\u006C\u0073',
                    style: {
                      color: '\u0023' + 'e' + 2 * 3 + 'a' + 303 / (3 / 2),
                    },
                  },
                  text:
                    '\u0053\u0061\u0079\u0069\u006E\u0067\u0020\u002A\u0046' +
                    '\u0055\u0043\u004B\u002A',
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
        onItemContextMenu={(item: IItemFormat, index, e: MouseEvent) => {
          setPosition([e.pageX, e.pageY]);
          setShowMenu(true);
          setContextMenuItem(item);
        }}
      />
    </>
  );
});
