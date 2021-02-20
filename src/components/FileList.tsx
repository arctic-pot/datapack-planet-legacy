import React from 'react';
import {DetailsList, SelectionMode} from '@fluentui/react';

interface IFileListProps {
    items: any[];
}

export default function FileList(props: IFileListProps): JSX.Element {

    return (
        <DetailsList
            columns={[
                {
                    key: 'col1',
                    name: 'Name',
                    fieldName: 'name',
                    minWidth: outerWidth * 0.1
                }
            ]}
            isHeaderVisible={false}
            items={props.items}
            compact
            selectionMode={SelectionMode.none}
        />
    )
}
