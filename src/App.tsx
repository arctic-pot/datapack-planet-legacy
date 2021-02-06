import React, {useState} from 'react';
import Menu from './components/Menu';
import Menubar from './components/Menubar';
import { initializeIcons, CommandBar, CommandButton } from '@fluentui/react';
import CommandsBar from "./components/CommandBars";

initializeIcons();

function App(_props: any) {

    const [openingMenu, setOpeningMenu] = useState(-1);

    function clickMenuHeaderFn(index: number): () => void {
        return () => {
            if (openingMenu === index) {
                setOpeningMenu(-1);
            } else {
                setOpeningMenu(index);
            }
        }
    }
    return (
        <>
            <Menubar />
            <CommandsBar />
        </>
    );
}

export default App;
