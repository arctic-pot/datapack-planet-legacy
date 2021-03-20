import React from 'react';
import { DefaultButton, Label } from '@fluentui/react';
import selectWorkSpace from '../../utils/selectWorkSpace';

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
        <DefaultButton onClick={selectWorkSpace}>Select an existing DataPack</DefaultButton>
        &nbsp;or&nbsp;
        <DefaultButton disabled>Create a DataPack</DefaultButton>
      </div>
    </div>
  );
}
