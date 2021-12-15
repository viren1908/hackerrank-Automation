const puppeteer = require("puppeteer");

const loginLink = 'https://www.hackerrank.com/auth/login';
const email = 'thexhist@gmail.com';
const password = 'Pass1234@#';
const codeObj = require('./code');


let browserOpenPromise = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
})

let page;

browserOpenPromise
    .then(function (browserObj) {
        let browserNewPage = browserObj.newPage();
        return browserNewPage;
    }).then(function (newTab) {
        page = newTab;
        let hackerRankOpenPromise = newTab.goto(loginLink);
        return hackerRankOpenPromise;
    }).then(function () {
        let emailIsEntered = page.type("input[id = 'input-1']", email, {
            delay: 10
        });
        return emailIsEntered;
    }).then(function () {
        let passwordIsEntered = page.type("input[type='password']", password, {
            delay: 10
        });
        return passwordIsEntered;
    }).then(function () {
        let loginButtonClick = page.click('button[data-analytics="LoginPassword"]', {
            delay: 10
        });
        return loginButtonClick;
    }).then(function () {
        let clickOnAlgoPromise = waitandClick('.topic-card a[data-attr1 = "algorithms"]', page);
        return clickOnAlgoPromise;
    }).then(function () {
        let warUpSectionClick = waitandClick('input[value="warmup"]', page)
        return warUpSectionClick;
    }).then(function () {
        let waitfor3Seconds = page.waitForTimeout(3000);
        return waitfor3Seconds;
    }).then(function () {
        // $$ -> querySelectorAll 
        // change the class later
        let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled', {
            delay: 50
        });
        return allChallengesPromise;
    }).then(function (questionArr) {
        console.log(questionArr.length);
        let questionWillBeSolved = questionSolver(page, questionArr[0], codeObj.answer);
        return questionWillBeSolved;
    })


// waiting for element while calling 

function waitandClick(selector, cpage) {
    return new Promise(function (resolve, reject) {
        let waitForModelPromise = cpage.waitForSelector(selector);
        waitForModelPromise
            .then(function () {
                let clickModal = cpage.click(selector);
                return clickModal;
            })
            .then(function () {
                resolve();
            })
            .catch(function (err) {
                reject();
            })
    })
}


function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionWillBeClicked = question.click();
        questionWillBeClicked
            .then(function () {
                let editorInFocusPromise = waitandClick('.monaco-editor.no-user-select.vs', page);
                return editorInFocusPromise;
            })
            .then(function () {
                return waitandClick('.checkbox-input', page);
            })
            .then(function () {
                return page.waitForSelector('textarea.custominput');
            })
            .then(function () {
                return page.type('textarea.custominput', answer, {
                    delay: 10
                })
            })
            .then(function () {
                let CTRLisPressed = page.keyboard.down('Control')
                return CTRLisPressed;
            })
            .then(function () {
                let AisPressed = page.keyboard.press('A', {
                    delay: 50
                })
                return AisPressed;
            })
            .then(function () {
                let XisPressed = page.keyboard.press('X', {
                    delay: 50
                })
                return XisPressed;
            })
            .then(function () {
                let CTRLisUnPressed = page.keyboard.up('Control');
                return CTRLisUnPressed;
            })
            .then(function () {
                let mainEditorInFocus = waitandClick('.monaco-editor.no-user-select.vs', page);
                return mainEditorInFocus;
            })
            .then(function () {
                let CTRLisPressed = page.keyboard.down('Control')
                return CTRLisPressed;
            })
            .then(function () {
                let AisPressed = page.keyboard.press('A', {
                    delay: 50
                })
                return AisPressed;
            })
            .then(function () {
                let VisPressed = page.keyboard.press('V', {
                    delay: 50
                })
                return VisPressed;
            })
            .then(function () {
                let CTRLisUnPressed = page.keyboard.up('Control');
                return CTRLisUnPressed;
            })
            .then(function () {
                return page.click('.hr-monaco__run-code', {
                    delay: 50
                })
                .then(function(){
                    resolve();
                })
                .catch(function(err){
                    reject();
                })
            })
    })
}