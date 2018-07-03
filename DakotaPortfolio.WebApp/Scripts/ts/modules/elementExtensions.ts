// Create extensions for JS Element to make altering them easier
interface Element {
    hasClass(className: string): boolean;
    addClass(className: string): void;
    removeClass(className: string): void;
}

/**
* @description Check if Element has a certain class
* @param {string} className - Name of the class you are looking for in the Element
* @return {boolean} - Returns if true or false if the class exists or not
*/
Element.prototype.hasClass = function (className: string): boolean {
    let ret: boolean = false;
    if (this.classList) {
        ret = this.classList.contains(className);
    }
    else {
        ret = new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);
    }
    return ret;
};

/**
* @description Add a class to an Element
* @param {string} className - Name of the class you want to add to the Element
*/
Element.prototype.addClass = function (className: string): void {
    if (this.classList) {
        this.classList.add(className);
    }
    else {
        this.className += ' ' + className;
    }
}

/**
* @description Remove a class from an Element
* @param {string} className - Name of the class you want to remove from the Element
*/
Element.prototype.removeClass = function (className: string) {
    if (this.classList) {
        this.classList.remove(className);
    }
    else {
        this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}