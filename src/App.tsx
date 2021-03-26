import React, { useState } from 'react';
import { initializeIcons, Callout } from '@fluentui/react';
import CommandsBar from './components/CommandBars';
import Body from './components/Body';
import { IntlProvider } from 'react-intl';

initializeIcons();

const locale: string = sessionStorage.getItem('locale');
const messages = JSON.parse(sessionStorage.getItem('messages'));

console.log(sessionStorage.getItem('messages'));
console.log(messages);

if (!sessionStorage.getItem('loaded')) {
  sessionStorage.setItem('loaded', String(true));
  location.reload();
}

function App(): JSX.Element {
  // This array stores namespace Id
  const [openingTabs, setOpeningTabs] = useState<Array<string>>([]);
  const [, setSelectingTab] = useState<number>(0);
  const [calloutsShow, _setCalloutsShow] = useState(true);

  setTimeout(() => {
    _setCalloutsShow(false);
  }, 5 * 1000);

  return (
    <IntlProvider messages={messages} locale={locale}>
      {sessionStorage.getItem('missingMessages') ? (
        <Callout hidden={!calloutsShow}>
          <div style={{ padding: 10 }}>
            Your selected language does not completed.
            <br />
            We replaced incomplete fields into default language
          </div>
        </Callout>
      ) : null}
      <CommandsBar
        openingTabsState={[openingTabs, setOpeningTabs]}
        selectingTabState={[null, setSelectingTab]}
      />
      <Body />
    </IntlProvider>
  );
}

export default App;
