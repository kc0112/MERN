const puppeteer = require("puppeteer");
const { email, password } = require("../../secrets"); // imported email & paswrd
const { codes } = require("./code");

let global_tab; 

console.log("before");

let browserPromise = puppeteer.launch({
	headless: false, 
	defaultViewport: null,
	args: ["--start-maximized", "--incognito"], 
});

browserPromise
    .then(function (browserReference) {
		
		let newTab_Promise = browserReference.newPage(); 
		return newTab_Promise; 
	})
	
	.then(function (newTabReference) {
		global_tab = newTabReference;

		let loginPageWillBeOpened_Promise = global_tab.goto(
			"https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login" 
		);
		return loginPageWillBeOpened_Promise;
	})
	//loginpage->email
	.then(function () {
		console.log("Login Page Opened");

		let emailWillBeTyped_Promise = global_tab.type("#input-1", email, {
			delay: 100,
		});
		return emailWillBeTyped_Promise;
	})
	//loginpage->password
	.then(function () {
		console.log("email Entered!");

		let passwordWillBeType_Promise = global_tab.type("#input-2", password, {
			delay: 100,
		});
		return passwordWillBeType_Promise;
	})
	//loginpage will be clicked -> dashboard
	.then(function () {
		console.log("password Entered");

		let loginButtonWillBeClicked_Promise = global_tab.click(
			".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
		);
		return loginButtonWillBeClicked_Promise;
	})
	//dashboard page open ,waited for html load,interview click -> interview
	.then(function () {
		console.log("Login Completed. Dashboard Page Opened!");

		let interviewKitclick_Promise = waitAndClick(
			".card-content h3[title='Interview Preparation Kit']"
		);
		return interviewKitclick_Promise;
	})
	//interview page open,waited for html load,warmup click -> warmup
	.then(function () {
		console.log("Interview Preparation Kit page Opened.");

		let warmUpclick_Promise = waitAndClick("a[data-attr1='warmup']");
		return warmUpclick_Promise;
	})
	// warmup page opened
	.then(function () {
        console.log("Warm Up page Opened!");
        
		warmupPageUrl = global_tab.url();
	
		let code = codes[0];
		let question_Promise = questionSolver(code.qName,code.soln,warmupPageUrl);
		for (let i = 1; i < codes.length; i++){
			question_Promise = question_Promise.then(function () {
				return questionSolver(codes[i].qName, codes[i].soln, warmupPageUrl);
			});
		}
		return question_Promise;

	})
	.then(function () {
		console.log("ALL QUESTIONS SOLVED!");
	})
	.catch(function (err) {
		console.log(err);
	});

// go to warmup page
// click given quesName
// type code inputbox
// copy code
// paste in editor
// submit
function questionSolver(quesName, quesCode, warmupPageUrl) {
    return new Promise(function (resolve, reject) {
        
		let gotoWarmupPage_Promise = global_tab.goto(warmupPageUrl);
        gotoWarmupPage_Promise
            // go to given quesName page
			.then(function () {
				
				function browserConsoleRun(quesName) {
					let allQSelector = document.querySelectorAll("h4");
					let qNamesArr = [];

					for (let i = 0; i < allQSelector.length; i++) {
						let qName = allQSelector[i].innerText.split("\n")[0];
						qNamesArr.push(qName);
					}

					let qIdx = qNamesArr.indexOf(quesName);
					console.log("Question Number:", qIdx);

					allQSelector[qIdx].click();
				}

				let quesPageClick_Promise = global_tab.evaluate(
					browserConsoleRun,
					quesName
				);
				return quesPageClick_Promise;
            })
            // select custom input checkbox (cursor b ajata)
			.then(function () {
                
				console.log("reached question page");
                let inputWillBeClicked_Promise = waitAndClick(
					".custom-checkbox.inline"
				);
				return inputWillBeClicked_Promise;
            })
            // type code
			.then(function () {
				console.log("checkbox clicked");
				let codeWillBeTyped_Promise = global_tab.type(".custominput", quesCode);
				return codeWillBeTyped_Promise;
            })
            // In custom input box ->
            // ctrl + A  // typed code select
            // ctrl + X  // typed code copied
			.then(function () {
				console.log("input box code typed");
				let controlIsHoldPromise = global_tab.keyboard.down("Control"); //ctrl dabake rkha 
				return controlIsHoldPromise;
			})
			.then(function () {
				let aisPressedpromise = global_tab.keyboard.press("a"); // ctrl dabake rkha + A clicked
				return aisPressedpromise;
            })
			.then(function () {
				let cutPromise = global_tab.keyboard.press("x"); 
				return cutPromise;
            })
            // click editor 
            // ctrl + A  //template code hatana h
            // ctrl + V  // copied code from inputbox pase krna editor me
			.then(function () {
				console.log("code copied")
				let editorWillBeClickedPromise = global_tab.click(
					".monaco-editor.no-user-select.vs"
				);                                      
				return editorWillBeClickedPromise;
			})
			.then(function () {
				let aisPressedpromise = global_tab.keyboard.press("a");  
				return aisPressedpromise;
			})
			.then(function () {
				console.log("code pasted");
				let pastePromise = global_tab.keyboard.press("v");
				return pastePromise;
            })
            // click submit button 
			.then(function () {
				console.log("submit clicked")
				let submitIsClickedPromise = global_tab.click(
					".pull-right.btn.btn-primary.hr-monaco-submit"
				);
				return submitIsClickedPromise;
			})
			.then(function () {
				resolve();
			})
			.catch(function () {
				reject(err);
			});
	});
}

// wait for slector to load and click selector
function waitAndClick(selector) {
	return new Promise(function (resolve, reject) {
        let selectorWaitPromise = global_tab.waitForSelector(selector, {
            visible: true,
        });
		selectorWaitPromise.then(function () {
			let selectorClickPromise = global_tab.click(selector); 
			selectorClickPromise
				.then(function () {
					resolve();
				})
				.catch(function (err) {
					reject(err);
				});
		});
	});
}




