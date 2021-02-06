import ReactDOM from 'react-dom';
import './index.scss';
import '@fluentui/styles'
import App from './AppContent';
console.log('👋 This message is being logged by "renderer.js", included via webpack');
ReactDOM.render(App, document.getElementById('root'))
