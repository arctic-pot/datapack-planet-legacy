import React from 'react';
import { Breadcrumb, CommandBarButton, Label, Stack } from '@fluentui/react';
import Editor from './editor/Editor';

interface IEditorViewProps {
  openingTab: string;
  setOpeningTab: React.Dispatch<string>;
  fileHistory: string[];
}

export default function EditorView(props: IEditorViewProps): JSX.Element {
  const { openingTab, setOpeningTab, fileHistory } = props;
  const openingTabSplit: string[] = openingTab ? openingTab.split(':') : [''];
  const historyTabs: JSX.Element[] = [];
  fileHistory.forEach((history: string, index: number) => {
    historyTabs.push(
      <CommandBarButton
        key={index}
        text={history}
        iconProps={{ iconName: 'FileCode' }}
        onClick={() => {
          setOpeningTab(history);
        }}
      />
    );
  });
  if (openingTab) {
    return (
      // TODO: 2021/3/28 historyTabs will let Stack overflow
      <>
        <Stack horizontal styles={{ root: { height: 30, paddingLeft: 5 } }} id="history-tabs">
          <Label>History</Label>
          &nbsp;&nbsp;&nbsp;
          {historyTabs}
        </Stack>
        <div>
          <Breadcrumb
            items={[
              { key: 'namespace', text: openingTabSplit[0] },
              { key: 'name', text: openingTabSplit[1] },
            ]}
            styles={{ root: { margin: '0' } }}
          />
        </div>
        <div style={{ height: '-webkit-fill-available', width: '100%' }}>
          <Editor />
        </div>
      </>
    );
  }
  return <></>;
}
