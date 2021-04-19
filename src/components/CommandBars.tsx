import {
  CommandBar,
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  Dropdown,
  IDropdownOption,
  Label,
  PrimaryButton,
  TextField,
} from '@fluentui/react';
import React, { FormEvent, PropsWithChildren, useContext, useState } from 'react';
import SettingsPanel from './SettingsPanel';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import createFileByNsId, { TFileType } from '../file/createFileByNsId';
import TrashBinView from './TrashBinView';
import { EditorContext } from '../utils/contexts';

type ICommandbarProps = PropsWithChildren<WrappedComponentProps>;

export default injectIntl(function CommandsBar(props: ICommandbarProps) {
  const { fileHistory, setFileHistory, setOpeningTab } = useContext(EditorContext);
  const { intl } = props;
  const [newDialogHidden, setNewDialogHidden] = useState<boolean>(true);
  const [settingsShow, setSettingsShow] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectingTag, setSelectingTag] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [tagType, setTagType] = useState<string>('');
  /* eslint-enable */
  const [type, setType] = useState<string>('functions');
  const [prefix, setPrefix] = useState<string>(undefined);
  const [trashPanelShow, setTrashPanelShow] = useState<boolean>(false);

  function typeSelectorChangeHandler(_e: React.FormEvent<HTMLDivElement>, item: IDropdownOption) {
    if (item.key === 'tags') {
      setSelectingTag(true);
      setPrefix('#');
    } else {
      setSelectingTag(false);
      setPrefix(undefined);
    }
    setType(item.key as string);
  }

  function createHandler() {
    setNewDialogHidden(true);
    createFileByNsId(sessionStorage.getItem('dir'), type as TFileType, id);
    setFileHistory([`${type}:${id}`, ...fileHistory]);
    setOpeningTab(`${type}:${id}`);
  }

  return (
    <>
      <CommandBar
        items={[
          {
            key: 'new',
            text: intl.formatMessage({ id: 'actions.new' }),
            iconProps: { iconName: 'Add' },
            onClick: () => {
              setType('functions');
              setNewDialogHidden(false);
              setSelectingTag(false);
              setPrefix(undefined);
            },
          },
          {
            key: 'open',
            text: intl.formatMessage({ id: 'actions.open' }),
            iconProps: { iconName: 'FolderOpen' },
          },
        ]}
        overflowItems={[
          {
            key: 'metadata',
            text: intl.formatMessage({ id: 'actions.editMeta' }),
            iconProps: { iconName: 'Edit' },
          },
        ]}
        farItems={[
          {
            key: 'trashBin',
            text: intl.formatMessage({ id: 'actions.trashOpen' }),
            iconProps: { iconName: 'Trash' },
            iconOnly: true,
            onClick: () => {
              setTrashPanelShow(true);
            },
          },
          {
            key: 'setting',
            text: 'Settings',
            iconProps: { iconName: 'Settings' },
            iconOnly: true,
            onClick: () => {
              setSettingsShow(true);
            },
          },
        ]}
      />
      <Dialog
        hidden={newDialogHidden}
        dialogContentProps={{
          type: DialogType.normal,
          title: intl.formatMessage({
            id: 'dialog.createFile.title',
          }),
          subText: intl.formatMessage({
            id: 'dialog.createFile.desc',
          }),
          closeButtonAriaLabel: 'Close',
          onDismiss: () => setNewDialogHidden(true),
        }}
      >
        <Dropdown
          placeholder="Select the type of the new file"
          label="New file type:"
          options={[
            {
              key: 'advancements',
              text: intl.formatMessage({
                id: 'type.advancement',
              }),
            },
            {
              key: 'dimension_type',
              text: intl.formatMessage({ id: 'type.dimType' }),
            },
            {
              key: 'dimension',
              text: intl.formatMessage({ id: 'type.dim' }),
            },
            {
              key: 'functions',
              text: intl.formatMessage({ id: 'type.fn' }),
              selected: true,
            },
            {
              key: 'item_modifiers',
              text: intl.formatMessage({
                id: 'type.itemModifier',
              }),
              disabled: true,
            },
            {
              key: 'loot_tables',
              text: intl.formatMessage({ id: 'type.lootTable' }),
            },
            {
              key: 'predicates',
              text: intl.formatMessage({ id: 'type.predicate' }),
            },
            {
              key: 'recipes',
              text: intl.formatMessage({ id: 'type.recipe' }),
            },
            {
              key: 'tags',
              text: intl.formatMessage({ id: 'type.tag' }),
            },
          ]}
          onChange={typeSelectorChangeHandler}
        />
        <Label style={{ display: selectingTag ? undefined : 'none' }}>With the tag type:</Label>
        <Dropdown
          placeholder={intl.formatMessage({ id: 'dialog.createFile.tagType' })}
          options={[
            { key: 'blocks', text: 'Blocks tag' },
            { key: 'entity_types', text: 'Entity types tag' },
            { key: 'functions', text: 'Functions tag' },
            { key: 'fluids', text: 'Fluids tag' },
            { key: 'items', text: 'Items tag' },
          ]}
          hidden={!selectingTag}
          onChange={(_e: FormEvent<HTMLDivElement>, item: IDropdownOption) => setTagType(item.key as string)}
        />
        <TextField
          placeholder={intl.formatMessage({ id: 'general.nsId' })}
          label={`${intl.formatMessage({ id: 'general.nsId' })}:`}
          errorMessage={error}
          onChange={(_e: React.FormEvent<HTMLInputElement>, newText: string) => {
            if (newText.match(/^([a-z-0-9_]+:)?[a-z-0-9_]+(\/[a-z-0-9_]+)*$/g)) {
              if (!newText.match(/[^a-z-0-9_]/g)) {
                setError('Do not omit "minecraft" namespace');
              } else {
                setError('');
              }
            } else {
              setError('Namespaced identifier is invalid');
            }
            setId(newText);
          }}
          prefix={prefix}
        />
        <DialogFooter>
          <PrimaryButton onClick={createHandler} text={intl.formatMessage({ id: 'button.create' })} />
          <DefaultButton onClick={() => setNewDialogHidden(true)} text={intl.formatMessage({ id: 'button.cancel' })} />
        </DialogFooter>
      </Dialog>
      <SettingsPanel show={settingsShow} setStateFn={setSettingsShow} />
      <TrashBinView show={trashPanelShow} onDismiss={() => setTrashPanelShow(false)} />
    </>
  );
});
