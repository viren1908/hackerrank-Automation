const puppeteer = require("puppeteer");

const loginLink = 'https://www.hackerrank.com/auth/login';
const email = 'thexhist@gmail.com';
const password = 'Pass1234@#';
const codeObj = require('./code');

// iffi immediately invoked function 
( async function(){
    try {
      
        let browserOpenInstance = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized'],
            defaultViewport: null
        })
        
        let newTab = await browserOpenInstance.newPage(); 
        await newTab.goto(loginLink);
        await newTab.page.type("input[id = 'input-1']", email, {   delay: 10 });
        await newTab.page.type("input[type='password']", password, {delay: 10}); 
        await newTab.page.click('button[data-analytics="LoginPassword"]', {  delay: 10});
        await waitandClick('.topic-card a[data-attr1 = "algorithms"]', newTab); 
        await waitandClick('input[value="warmup"]', newTab); 
        let questArr = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled', { delay: 50 });
        console.log('total Questions ' , questArr.length); 
        await questionSolver(page, questionArr[0], codeObj.answer);

    } catch (error) {
        console.log(error);
    }
})()

async function waitandClick(selector, cpage) {
   await cpage.waitForSelector(selector); 
   let selectorClicked  = cpage.click(selector); 
   return selectorClicked ;
}

async function questionSolver(page,question,answer) {
    await question.click(); 
    await waitandClick('.monaco-editor.no-user-select.vs', page); 
    await waitandClick('.checkbox-input', page); 
    await page.waitForSelector('textarea.custominput'); 
    await page.type('textarea.custominput', answer, { delay: 10});
    await page.keyboard.down('Control');
    await page.keyboard.press('A', {delay: 50 }); 
    await page.keyboard.press('X', {delay: 50 }) ;
    await page.keyboard.up('Control'); 
    await waitandClick('.monaco-editor.no-user-select.vs', page); 
    await page.keyboard.down('Control');
    await page.keyboard.press('A', { delay: 50})
    await page.keyboard.press('V', { delay: 50 }) 
    await page.keyboard.up('Control'); 
    await page.click('.hr-monaco__run-code', {  delay: 50 })  
}

