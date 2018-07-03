import './elementExtensions';

/**
 * UX Floating Labels for forms
 */
export class LabelFloat {
    private _elems: HTMLCollectionOf<Element>;
    private _elem: Element;

    /**
     * Stores a collection of Elements with the 'floater__input' class
     */
    constructor() {
        this._elems = document.getElementsByClassName('floater__input');
    }

    /**
     * Initialize every class 'floater__input' with a blur event that checks the input for values, if it has a value then it adds the 'full' class
     */
    public Init(): void {
        for (let i = 0, l = this._elems.length; i < l; i++) {
            this._elem = this._elems[i];
            this.CheckInput(<HTMLInputElement>this._elem);
            this._elem.addEventListener("blur", (e) => {
                this.CheckInput(<HTMLInputElement>e.target);
            });
        }
    }

    /**
     * Check to see if the input has a value, if it does then add the 'full' class
     * @param {HTMLInputElement} input Input element to check
     */
    private CheckInput(input: HTMLInputElement): void {
        if (input.value != '') { input.addClass('full'); }
        else { input.removeClass('full'); }
    }
}