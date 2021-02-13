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
    TextField
} from '@fluentui/react';
import React, {FormEvent, useState} from 'react';
import SettingsPanel from './SettingsPanel';

export default function CommandsBar() {
    const [newDialogHidden, setNewDialogHidden] = useState(true);
    const [settingsShow, setSettingsShow] = useState(false);
    const [error, setError] = useState('');
    const [selectingTag, setSelectingTag] = useState(false);
    const [id, setId] = useState('');
    const [tagType, setTagType] = useState('');
    const [type, setType] = useState('');
    const [prefix, setPrefix]: [string, React.Dispatch<React.SetStateAction<string>>] = useState(undefined);
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
        // TODO 2021/2/6 should have a public create file fn
    }

    return (
        <>
            <CommandBar
                items={[
                    {
                        key: 'new',
                        text: 'New',
                        iconProps: { iconName: 'Add' },
                        onClick: () => {
                            setNewDialogHidden(false);
                            setSelectingTag(false);
                            setPrefix(undefined)
                        }
                    },
                    {
                        key: 'save',
                        text: 'Save All',
                        iconProps: { iconName: 'Save' },
                    },
                    {
                        key: 'open',
                        text: 'Open',
                        iconProps: { iconName: 'FolderOpen' },
                    },
                ]}
                overflowItems={[
                    {
                        key: 'metadata',
                        text: 'Edit pack metadata',
                        iconProps: { iconName: 'Edit' }
                    }
                    ]}
                farItems={[
                    {
                        key: 'setting',
                        text: 'Settings',
                        iconProps: { iconName: 'Settings' },
                        iconOnly: true,
                        onClick: () => {
                            setSettingsShow(true);
                        }
                    }
                ]}
            />
            <Dialog
                hidden={ newDialogHidden }
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Create File',
                    subText: 'Create a new file and open editor. You should not add file extension.',
                    closeButtonAriaLabel: 'Close',
                    onDismiss: () => setNewDialogHidden(true)
                }}
            >
                <Dropdown
                    placeholder="Select the type of the new file"
                    label="New file type:"
                    options={[
                        { key: 'advancements', text: 'Advancement' },
                        { key: 'dimension_type', text: 'Dimension type' },
                        { key: 'dimension', text: 'Dimension' },
                        { key: 'functions', text: 'Function', selected: true },
                        { key: 'item_modifiers', text: 'Item modifier', disabled: true },
                        { key: 'loot_tables', text: 'Loot table' },
                        { key: 'predicates', text: 'Predicate' },
                        { key: 'recipes', text: 'Recipe' },
                        { key: 'tags', text: 'Tag' },
                    ]}
                    onChange={typeSelectorChangeHandler}
                />
                <Label style={{ display: selectingTag ? undefined : 'none' }}>With the tag type:</Label>
                <Dropdown
                    placeholder="Select the type of the tag"
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
                    placeholder="Namespace ID"
                    label="Namespaced identifier:"
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
                        setId(newText)
                    }}
                    prefix={prefix}
                />
                <DialogFooter>

                    <PrimaryButton onClick={createHandler} text="Create" />
                    <DefaultButton onClick={() => setNewDialogHidden(true)} text="Cancel" />
                </DialogFooter>
            </Dialog>
            <SettingsPanel show={settingsShow} setStateFn={setSettingsShow} />
        </>

    )
}
