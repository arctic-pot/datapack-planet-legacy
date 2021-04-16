import React from 'react';
import { Breadcrumb, CommandBar, ICommandBarItemProps, Text } from '@fluentui/react';
import Editor from './editor/Editor';
import { FormattedMessage } from 'react-intl';

interface IEditorViewProps {
  openingTab: string;
  setOpeningTab: React.Dispatch<string>;
  fileHistory: string[];
  setFileHistory: React.Dispatch<string[]>;
}

export default function EditorView(props: IEditorViewProps): JSX.Element {
  const { openingTab, setOpeningTab, fileHistory, setFileHistory } = props;
  const openingTabSplit: string[] = openingTab ? openingTab.split(':') : [''];
  const historyTabs: ICommandBarItemProps[] = [];
  fileHistory.forEach((history: string) => {
    historyTabs.push({
      key: history,
      text: history,
      onClick: () => {
        setOpeningTab(history);
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Interface has a wrong MouseDown definition
      onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const otherHistory = fileHistory.filter((h) => h !== history);
        if (e.button !== 0) {
          setFileHistory(otherHistory);
          // If closed current tab workspace should be clear
          if (openingTab === history) {
            if (fileHistory.length > 1) {
              setOpeningTab(otherHistory[0]);
            } else {
              setOpeningTab(undefined);
            }
          }
        }
      },
    });
  });
  if (openingTab) {
    const breadcrumbItems = [{ key: 'namespace', text: openingTabSplit[0] }];
    openingTabSplit[1].split(/\//g).forEach((path, index) => {
      breadcrumbItems.push({ key: 'name' + index, text: path });
    });
    return (
      // TODO: 2021/3/28 historyTabs will let Stack overflow
      <>
        <CommandBar items={historyTabs} />
        <div>
          <Breadcrumb items={breadcrumbItems} styles={{ root: { margin: '0' } }} />
        </div>
        <div style={{ height: '-webkit-fill-available', width: '100%' }}>
          <Editor />
        </div>
      </>
    );
  }
  const bothStyle = { color: '#ddd', fontWeight: 600 };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Text style={{ fontSize: '1.75em', ...bothStyle }}>DataPack Planet</Text>
      <Text>&nbsp;</Text>
      <Text style={{ fontSize: '1em', ...bothStyle }}>
        <FormattedMessage id="tips.selectFile" />
      </Text>
    </div>
  );
}
