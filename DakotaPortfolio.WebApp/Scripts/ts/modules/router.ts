import { HomePage } from '../pages';
import { IPage } from '../interfaces';

export class Router {
    private _page: IPage;

    /**
     * Splits up page scripts so js only runs when that page is loaded
     */
    constructor() { }
    /**
     * Run home page scripts
     */
    public Home(): void {
        this._page = new HomePage;
        this._page.Init();
    }
}