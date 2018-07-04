// Local
import '../modules/elementExtensions';
import { LabelFloat, Menu } from '../modules';
import { IPage } from '../interfaces';

export class HomePage implements IPage {
    private _menu: Menu;

    constructor() {
        this._menu = new Menu();
    }

    public Init(): void {
        this._menu.Init();
    }
}