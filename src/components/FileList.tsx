import React from 'react';
import { DetailsList, SelectionMode, IGroup } from '@fluentui/react';

interface IItemFormat {
  type: string,
  name: string,
  dir: string
}

interface IFileListProps {
  items: IItemFormat[];
  groups: IGroup[];
}

export default function FileList(props: IFileListProps): JSX.Element {
  return (
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
    />
  );
}
