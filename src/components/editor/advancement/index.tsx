import React from 'react';
import { Separator, Stack } from '@fluentui/react';
import './AdvancementEditor.scss';
import { Switcher, TextElement } from '../visual/utils';
import { injectIntl, WrappedComponentProps } from 'react-intl';

interface IAdvancementEditorProps extends React.PropsWithChildren<WrappedComponentProps> {
  fileIdentifier?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default injectIntl(function AdvancementEditor(props: IAdvancementEditorProps): JSX.Element {
  const { intl } = props;
  const fmt = (id: string) => {
    return intl.formatMessage({ id: id });
  };

  return (
    <Stack styles={{ root: { padding: 10, boxSizing: 'border-box' } }}>
      <Switcher defaultValue={false} title={fmt('editor.display')}>
        <TextElement title={fmt('editor.title')} />
        <TextElement title={fmt('editor.desc')} />
      </Switcher>
      <Separator />
    </Stack>
  );
});
