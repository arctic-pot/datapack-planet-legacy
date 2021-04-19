import React from 'react';
import { Checkbox, Label, TextField } from '@fluentui/react';
import { useBoolean } from '../../../utils/hooks';

interface ISettingsElementProps extends React.PropsWithChildren<Record<string, unknown>> {
  title: string;
}

interface IOptionalSettingsElementProps extends ISettingsElementProps {
  defaultValue?: boolean;
}

interface ISwitcherElementProps extends ISettingsElementProps {
  defaultValue: boolean;
}

export function TextElement(props: ISettingsElementProps): JSX.Element {
  const { title } = props;
  return (
    <div>
      <TextField styles={{ root: { width: '240px' } }} label={title} />
    </div>
  );
}

export function OptionalTextElement(props: IOptionalSettingsElementProps): JSX.Element {
  const { title, defaultValue } = props;
  const [checked, toggleChecked] = useBoolean(defaultValue);
  const id = Math.random().toString();
  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={toggleChecked}
        onRenderLabel={() => {
          return <Label htmlFor={id}>&nbsp;&nbsp;{title}</Label>;
        }}
      />
      {checked && <TextField styles={{ root: { width: '240px' } }} />}
    </div>
  );
}

export function Switcher(props: ISwitcherElementProps): JSX.Element {
  const { title, defaultValue, children } = props;
  const [checked, toggleChecked] = useBoolean(defaultValue);
  return (
    <div>
      <Checkbox checked={checked} onChange={toggleChecked} label={title} />
      {checked && <blockquote>{children}</blockquote>}
    </div>
  );
}
