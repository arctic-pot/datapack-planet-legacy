import React from 'react';
import { initializeIcons } from '@fluentui/react';
import CommandsBar from './components/CommandBars';
import Body from './components/Body';
import { IntlProvider } from 'react-intl';

initializeIcons();

const locale: string = sessionStorage.getItem('locale');
const messages = JSON.parse(sessionStorage.getItem('messages'));

console.log(sessionStorage.getItem('messages'))
console.log(messages)

if (!sessionStorage.getItem('loaded')) {
  sessionStorage.setItem('loaded', String(true));
  location.reload();
}

function App(): JSX.Element {
  return (
    <IntlProvider messages={messages} locale={locale}>
      <CommandsBar />
      <Body />
    </IntlProvider>
  );
}

export default App;
