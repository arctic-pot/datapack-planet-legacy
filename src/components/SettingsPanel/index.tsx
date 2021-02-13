import React from 'react';
import { Modal, Pivot, PivotItem, CompoundButton } from '@fluentui/react'
import { ipcRenderer } from 'electron'

interface ISettingsPanelProps {
    show: boolean,
    setStateFn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SettingsPanel(props: ISettingsPanelProps) {
    const { show, setStateFn } = props

    return (
        <Modal isOpen={ show } onDismiss={ () => { setStateFn(false); } }>
            <Pivot style={{overflow: 'hidden'}}>
                <PivotItem headerText="Appearance" itemIcon="EditStyle">
                </PivotItem>
                <PivotItem headerText="Experience" itemIcon="TestBeaker">
                </PivotItem>
                <PivotItem headerText="Dev-Options" itemIcon="Repair">
                    <div style={{padding: 5}}>
                        <CompoundButton
                            secondaryText="Open electron built-in devtools to debug"
                            onClick={() => {
                                ipcRenderer.send('devtools')
                            }}
                        >
                            Open DevTools
                        </CompoundButton>
                    </div>
                </PivotItem>
            </Pivot>
        </Modal>
    )
}
