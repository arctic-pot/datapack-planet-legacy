import React from 'react';
import { DetailsList, SelectionMode, IGroup } from '@fluentui/react';

interface IFileListProps {
  items: any[];
  groups: IGroup[];
}

export default function FileList(props: IFileListProps): JSX.Element {
  return (
    <DetailsList
      columns={[
        {
          key: 'col1',
          name: 'Type',
          fieldName: 'type',
          minWidth: 0,
        },
        {
          key: 'col2',
          name: 'Name',
          fieldName: 'name',
          minWidth: outerWidth * 0.1,
        },
      ]}
      isHeaderVisible={true}
      items={props.items}
      compact
      selectionMode={SelectionMode.none}
    />
  );
}
