import React from 'react';
import { initializeIcons } from '@fluentui/react';
import CommandsBar from './components/CommandBars';
import Body from './components/Body';
import { IntlProvider } from 'react-intl';
import fs from 'fs';
import locales from './locale';

initializeIcons();

let locale: string = 'en';
try {
    locale = JSON.parse(fs.readFileSync('./settings.json').toString()).lang;
} catch (_e) {
    // Do nothing
}

function App(_props: any): JSX.Element {
    return (
        <IntlProvider messages={locales[locale]} locale={locale}>
            <CommandsBar />
            <Body />
        </IntlProvider>
    );
}

export default App;
