import { Router } from './modules';

let _page = document.querySelector('*[data-page]');
let _dataPage: string;
let _router = new Router();

if (_page !== null) { _dataPage = _page.getAttribute('data-page'); }
else { console.log('Error: Cannot find page query selector [data-page]. JS Not loaded.'); }

switch (_dataPage) {
    case 'home': {
        _router.Home();
        break;
    }
}