export const elements = {
    pollElement: document.getElementById('poll-popup'),
    questionTitle: document.querySelector('.popup-title.poll-select'),
    choices: Array.prototype.slice.call(document.querySelectorAll('.poll-list .poll-item .response-text'))
};

export const clickButton = i => {
    document.querySelector('.poll-item:nth-child(' + (i + 1) + '), .poll-item:nth-child(' + (i + 1) + ') *').click();
};