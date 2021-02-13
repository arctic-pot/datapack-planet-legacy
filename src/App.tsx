import React from 'react';
import { initializeIcons } from '@fluentui/react';
import CommandsBar from "./components/CommandBars";

initializeIcons();

function App(_props: any) {
    return (
        <>
            <CommandsBar />
        </>
    );
}

export default App;
