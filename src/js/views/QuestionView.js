import { elements } from './base.js';

export default class QuestionView {
    constructor() {
        this.choices = elements.choices;
    }

    clickButton(i) {
        document.querySelector('.poll-item:nth-child(' + i + ')').click();
        document.querySelector('.poll-item:nth-child(' + i + ') *').click();
    }
}