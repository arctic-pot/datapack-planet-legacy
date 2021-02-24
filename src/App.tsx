import React from 'react';
import { initializeIcons } from '@fluentui/react';
import CommandsBar from './components/CommandBars';
import Body from './components/Body';
import { IntlProvider } from 'react-intl';

initializeIcons();

let locale: string = sessionStorage.getItem('locale');
let messages: any = JSON.parse(sessionStorage.getItem('messages'));

console.log(sessionStorage.getItem('messages'))
console.log(messages)

if (!sessionStorage.getItem('loaded')) {
  sessionStorage.setItem('loaded', String(true));
  location.reload();
}

function App(_props: any): JSX.Element {
  return (
    <IntlProvider messages={messages} locale={locale}>
      <CommandsBar />
      <Body />
    </IntlProvider>
  );
}

export default App;
