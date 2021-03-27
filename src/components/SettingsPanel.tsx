import React, { PropsWithChildren } from 'react';
import {
  Dropdown,
  Modal,
  Pivot,
  PivotItem,
  Stack,
  Toggle,
  PrimaryButton,
  DefaultButton,
} from '@fluentui/react';
import { injectIntl, WrappedComponentProps } from 'react-intl';

interface ISettingsPanelProps extends PropsWithChildren<WrappedComponentProps> {
  show: boolean;
  setStateFn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default injectIntl(function SettingsPanel(props: ISettingsPanelProps): JSX.Element {
  const { show, setStateFn, intl } = props;
  const settings = JSON.parse(sessionStorage.getItem('settings'));
  const PivotWrapper = (props: PropsWithChildren<Record<string, unknown>>) => {
    return (
      <div style={{ padding: 10 }}>
        <Stack horizontal tokens={{ childrenGap: 15 }}>
          {props.children}
        </Stack>
      </div>
    );
  };

  const stackColumnProps = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 275 } },
  };
  const formatMessage = (id: string, values: Record<string, string | number | boolean> = {}) => {
    return intl.formatMessage({ id }, values);
  };
  const dismiss = () => {
    setStateFn(false);
  };
  // dropdown define
  const langSelectionOptions = [
    {
      key: 'en',
      text: 'English (US)',
    },
  ];

  return (
    <Modal
      isOpen={show}
      onDismiss={() => {
        setStateFn(false);
      }}
    >
      <Pivot style={{ overflow: 'hidden' }}>
        <PivotItem headerText={formatMessage('settings.appearance')} itemIcon="EditStyle">
          <PivotWrapper>
            <Stack {...stackColumnProps}>
              <Dropdown
                options={[{ key: 'monospace', text: 'Default Monospace' }]}
                label={formatMessage('settings.font')}
                defaultSelectedKey={settings.font.family}
                disabled
              />
              <Dropdown
                label={formatMessage('settings.fontSize')}
                options={[
                  { key: 12, text: '12 px' },
                  { key: 13, text: '13 px' },
                  { key: 14, text: '14 px' },
                  { key: 16, text: '16 px' },
                  { key: 18, text: '18 px' },
                  { key: 20, text: '20 px' },
                ]}
                defaultSelectedKey={settings.font.size}
              />
              <Toggle
                label={formatMessage('settings.fontLigatures')}
                onText="On"
                offText="Off"
                defaultChecked={settings.font.ligatures}
              />
            </Stack>
            <Stack {...stackColumnProps}>
              <Dropdown
                label={formatMessage('settings.lang')}
                options={langSelectionOptions}
                defaultSelectedKey={settings.lang}
              />
            </Stack>
          </PivotWrapper>
        </PivotItem>
      </Pivot>
      <div style={{ padding: 10 }}>
        <PrimaryButton onClick={dismiss} styles={{ root: { marginRight: 10 } }}>
          {formatMessage('settings.save')}
        </PrimaryButton>
        <DefaultButton onClick={dismiss}>{formatMessage('settings.cancel')}</DefaultButton>
      </div>
    </Modal>
  );
});
