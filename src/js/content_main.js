import Question from './models/Question.js';
import QuestionView from './views/QuestionView.js';
import { elements } from './views/base.js';

let notificationSent = false;
const interval = 3000;

let pollElement, questionTitle, choices, choicesText;

window.setInterval(() => {
	pollElement = elements.pollElement;

	// Check if poll element is exist
    if (pollElement) {

        // Trigger the notification if the poll popup is visible on screen.
        if (!pollElement.classList.contains('ng-hide')) {

            // Send a notification only if no previous notifications were sent.
            if (!notificationSent) {
				let BBCollab   = new Question();
				let BBCollabUI = new QuestionView();

				// Get DOM elements
                questionTitle = elements.questionTitle.textContent.toLowerCase();
                choices = elements.choices;
                choicesText = choices.map((cur) => cur.textContent.toLowerCase());    

                // Search the questions
                BBCollab.questionSearch(questionTitle);

				// Get the index of choice in poll
				let index = BBCollab.answerSearch(choicesText);

				// Click the button
                BBCollabUI.clickButton(index);
                
                if (chrome.storage && chrome.storage.local != null) {

                    // Check if notifications are activated at popup.html
                    chrome.storage.local.get('notifications', (data) => {
                        if (typeof data.notifications !== 'undefined' && data.notifications) {
                            // Send the notifications
                            notificationSent = true;
                            //chrome.runtime.sendMessage({ poll: true }, (response) => {});
                            BBCollab.sendNotifications(true);
                        } else {
                            notificationSent = false;
                        }
                    });

                }
                
            }

        } else {

			// Check if notification is sent, if it is then set the defaults
            if (notificationSent) {
                notificationSent = false;
                BBCollab.sendNotifications(false);
			}
			
        }
	}
	
}, interval);
