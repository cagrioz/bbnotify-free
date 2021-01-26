export default class Question {

    constructor() {
        this.answerState   = false;
        this.length        = 0;
        this.questionTypes = [];
        this.answer        = "";

        this.dataset = {
            yes: {
                descriptions: [
                    'any question',
                    'anything',
                    'question', 
                    'want to ask', 
                    'any problem', 
                    'problem'
                ],
                answers: [
                    "no"
                ]
            },
            no: {
                descriptions: [
                    'clear', 
                    'allright', 
                    'alright'
                ],
                answers: [
                    "yes",
                    "clear",
                    "allright",
                    "alright",
                    "si"
                ]
            }
        };
    }

    questionSearch(questionTitle) {
        let currentType;

        // Get the length of dataset question types
        this.length = Object.keys(this.dataset).length;

        // Push all question types into an array
        for (const [key, value] of Object.entries(this.dataset)) {
            this.questionTypes.push(key);
        }
        
        // Get the length of "this.dataset" object dynamically
        for (let i = 0; i < this.length; i++) {

            // Get the current question type from the siblings of "this.dataset"
            currentType = this.questionTypes[i];

            // Iterate for each question
            this.dataset[currentType].descriptions.forEach(question => {
                
                // Search the question title in entered question database
                if (questionTitle.includes(question)) {
                    // Update the answerState
                    if (currentType == 'yes') {
                        this.answerState = true;
                    } else {
                        this.answerState = false;
                    }
                }

            });
        }
    }   


    answerSearch(choices) {
        let ansType = (this.answerState) ? "yes" : "no";
        let index;
    
        choices.forEach((choice, i) => {
            this.dataset[ansType].answers.forEach(answer => {
    
                if (choice.includes(answer)) {
                    index = i + 1;
                }
    
            });
        });
        
        return index;
    }

    sendNotifications(res) {
        chrome.runtime.sendMessage({ poll: res }, (response) => {
            if (chrome.runtime.lastError) {
                setTimeout(this.sendNotifications(res), 1000);
            }
        });
    }

}
