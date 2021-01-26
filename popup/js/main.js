document.querySelector('.logout').addEventListener('click', () => {
    chrome.runtime.sendMessage({ message: 'sign_out' }, function (response) {
        if (response.message === 'success') {
            window.location.replace('./popup.html');
        }
    });
});

let notificationSwitch = document.querySelector('.notification-switch');

if (notificationSwitch != null) {

    let defaultValue = notificationSwitch.checked;
    console.log(defaultValue);
    chrome.storage.local.get('notifications', function (data) {
        // If the notifications has a value, then apply that in each initilization
        // Else, set the default value
        if (typeof data.notifications !== 'undefined' && data.notifications !== null) {
            notificationSwitch.checked = data.notifications;
        } else {
            chrome.storage.local.set({ notifications: defaultValue });
        }

    });

    // If switch button changes, update the value
    notificationSwitch.addEventListener('change', (e) => {
        // Update the switch button's value
        notificationSwitch.checked = e.target.checked;

        // Update the chrome storage with the new value
        chrome.storage.local.set({ notifications: e.target.checked });
        console.log(notificationSwitch.checked);

    });

}