import React from 'react';
import { ipcRenderer, remote } from 'electron';
import { IconButton } from '@fluentui/react';

function Menubar(props: any) {
    return (
        <div id="menubar">
            <div id="icon" className="float-left">DataPack Planet</div>
            <IconButton
                iconProps={{ iconName: 'ChromeClose' }}
                className="button"
                onClick={() => {
                    ipcRenderer.send('close')
                }}
            />
            <IconButton
                iconProps={{ iconName: 'ChromeMinimize' }}
                className="button"
                onClick={() => {
                    ipcRenderer.send('minimize');
                }}
            />
            { props.children }
        </div>
    )
}

export default Menubar;
