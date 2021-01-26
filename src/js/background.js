let user_signed_in = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'is_user_signed_in') {
        sendResponse({
            message: 'success',
            payload: user_signed_in
        });
    } else if (request.message === 'sign_out') {
        user_signed_in = false;
        sendResponse({ message: 'success' });
    } else if (request.message === 'sign_in') {
        user_signed_in = true;
        sendResponse({ message: 'success' });
    }

    return true;
});

var notificationId = "";
var title = chrome.i18n.getMessage("notificationTitle");
var content = chrome.i18n.getMessage("notificationContent");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    (async () => {

        if (message.poll) {

            chrome.notifications.create({
                type: "basic",
                iconUrl: chrome.extension.getURL("icons/icon-48.png"),
                title: `${title}`,
                message: `${content}`,
            },
            (id) => {
                notificationId = id;
            }
            );
        } else {
            chrome.notifications.clear(notificationId);
        }
        sendResponse();
    })();

    return true;
});
