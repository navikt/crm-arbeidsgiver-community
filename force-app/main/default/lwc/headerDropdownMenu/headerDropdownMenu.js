import { LightningElement, track } from 'lwc';
import dekoratoren from '@salesforce/resourceUrl/dekoratoren';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class HeaderDropdownMenu extends LightningElement {
    dekoratoren = dekoratoren;
    @track menuPressed = false;

    renderedCallback() {
        loadStyle(this, dekoratoren);
    }

    handleOnClickMenu(event) {
        this.menuPressed = !this.menuPressed;
    }
}