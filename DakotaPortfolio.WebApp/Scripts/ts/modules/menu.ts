import './elementExtensions';

export class Menu {
    private _menuOpens: NodeListOf<Element>;
    private _menuCloses: NodeListOf<Element>;

    constructor() {
        this._menuOpens = document.querySelectorAll('*[data-menu-open]');
        this._menuCloses = document.querySelectorAll('*[data-menu-close]');
    }

    public Init(): void {
        let opens = this._menuOpens;
        let closes = this._menuCloses;

        for (let i = 0, l = opens.length; i < l; i++) {
            opens[i].addEventListener('click', (e) => {
                let target = <Element>e.target;

                if (target.hasClass('active')) {
                    document.querySelector(target.getAttribute('data-menu-open')).removeClass('active');
                }
                else {
                    document.querySelector(target.getAttribute('data-menu-open')).addClass('active');
                }
            });
        }

        for (let i = 0, l = closes.length; i < l; i++) {
            closes[i].addEventListener('click', (e) => {
                let target = <Element>e.target;

                document.querySelector(target.getAttribute('data-menu-close')).removeClass('active');
            });
        }
    }
}