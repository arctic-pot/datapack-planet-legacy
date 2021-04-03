import React, { useState } from 'react';
import CommandsBar from './components/CommandBars';
import Body from './components/Body';
import { IntlProvider } from 'react-intl';

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
  const [fileHistory, setFileHistory] = useState<string[]>([]);
  const [openingTab, setOpeningTab] = useState<string>(null);
  return (
    <IntlProvider messages={messages} locale={locale} defaultLocale="en">
      <CommandsBar {...{ setOpeningTab, fileHistory, setFileHistory }} />
      <Body {...{ fileHistory, setFileHistory, openingTab, setOpeningTab }} />
    </IntlProvider>
  );
}

export default App;
