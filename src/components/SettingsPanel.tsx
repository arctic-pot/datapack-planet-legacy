import React, { PropsWithChildren } from 'react';
import { Dropdown, Modal, Pivot, PivotItem, Stack } from '@fluentui/react';
import { injectIntl, WrappedComponentProps } from 'react-intl';

interface ISettingsPanelProps extends PropsWithChildren<WrappedComponentProps> {
  show: boolean;
  setStateFn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default injectIntl(function SettingsPanel(props: ISettingsPanelProps): JSX.Element {
  const { show, setStateFn, intl } = props;
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
        <PivotItem
          headerText={intl.formatMessage({ id: 'settings.appearance' })}
          itemIcon="EditStyle"
        >
          <PivotWrapper>
            <Stack {...stackColumnProps}>
              <Dropdown
                label="Language"
                options={langSelectionOptions}
                defaultSelectedKey={sessionStorage.getItem('language')}
              />
            </Stack>
            <Stack {...stackColumnProps}>
              <Dropdown
                options={[{ key: 'monospace', text: 'Default Monospace' }]}
                label="Editor font"
                defaultSelectedKey="monospace"
                disabled
              />
            </Stack>
          </PivotWrapper>
        </PivotItem>
        <PivotItem headerText={intl.formatMessage({ id: 'settings.exp' })} itemIcon="TestBeaker">
          <></>
        </PivotItem>
      </Pivot>
    </Modal>
  );
});
