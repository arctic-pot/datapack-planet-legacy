import React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';

export default function LoadingApp(): JSX.Element {
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
      <Spinner label="Please wait until the app is loading" labelPosition="right" size={SpinnerSize.large} />
    </div>
  );
}
