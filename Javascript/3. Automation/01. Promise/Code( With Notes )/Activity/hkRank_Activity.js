const puppeteer = require("puppeteer");
const { email, password } = require("../../secrets"); // imported email & paswrd
const { codes } = require("./code");

let global_tab; // to keep info of TAB we'll work on,
// acc. to node naming convetion TABs are opften referred as PAGEs

console.log("before");

// Launched Browser
let browserPromise = puppeteer.launch({
	headless: false, // ":false" s Automation hote hue dikhta hai
	// defaultViewport: null,
	// args: ["--start-maximized", "--incognito"], // "--start.." -> max Window Size, "--icog..." -> Automates in icog. mode
});

browserPromise
	//newpage open
	.then(function (browserReference) {
		// after launch -> we'll get browser's refrnce
		let newTab_Promise = browserReference.newPage(); // ".newPage()"(returns promise) for opening new TAB
		return newTab_Promise; // Necessary to return for Chained Promises!
	})
	//newpage->login page
	.then(function (newTabReference) {
		global_tab = newTabReference; //stores ref of newly created tab

		let loginPageWillBeOpened_Promise = global_tab.goto(
			"https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login" //navigate to login page
		);
		return loginPageWillBeOpened_Promise;
	})
	//loginpage->email
	.then(function () {
		console.log("Login Page Opened");

		// type -> Types into a selector that identifies a form element
		let emailWillBeTyped_Promise = global_tab.type("#input-1", email, {
			delay: 100,
		}); // type(tag, email id , delay rate for typing)
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
		); // Perform a mouse click event on the element passed as parameter
		return loginButtonWillBeClicked_Promise;
	})
	//dashboard page open ,waited for html load,interview click -> interview
	.then(function () {
		console.log("Login Completed. Dashboard Page Opened!");

		// promise -> interview click event
		let interviewKitclick_Promise = waitAndClick(
			".card-content h3[title='Interview Preparation Kit']"
		);
		return interviewKitclick_Promise;
	})
	//interview page open,waited for html load,warmup click -> warmup
	.then(function () {
		console.log("Interview Preparation Kit page Opened.");

		// promise -> warmup button click
		let warmUpclick_Promise = waitAndClick("a[data-attr1='warmup']");
		return warmUpclick_Promise;
	})
	// warmup page opened
	.then(function () {
		console.log("Warm Up page Opened!");
		warmupPageUrl = global_tab.url();
		//for (let i = 0; i < codes.length; i++){
		let code = codes[0];
		let questionPromise = questionSolver(
			code.qName,
			code.soln,
			warmupPageUrl
		);
		return questionPromise;
		//}
	})
	.catch(function (err) {
		console.log(err);
	});

// go to warmup page
// click given quesName
// type code inputbox
// copy code
// paste editor
// submit
function questionSolver(quesName, quesCode, warmupPageUrl) {
    return new Promise(function (resolve, reject) {
        // Why we "goto" warmup pg again? ->
        // For the first qs it's uneccessary but for later qs, we'll have to again go to warmup pg,
        // and then from there navigate to the qs!
		let gotoWarmupPage_Promise = global_tab.goto(warmupPageUrl);
        gotoWarmupPage_Promise
            // go to given quesName page
			.then(function () {
				// dynamically store all qs names on the warmup pg in an arr.
				// execute the fn for quesName if quesName == arr[i].
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
            
			.then(function () {
				// checkbox click
				let inputWillBeClickedPromise = waitAndClick(
					".custom-checkbox.inline"
				);
				return inputWillBeClickedPromise;
			})
			.then(function () {
				// type `
				let codeWillBeTypedPromise = gtab.type(".custominput", code);
				return codeWillBeTypedPromise;
			})
			.then(function () {
				let controlIsHoldPromise = gtab.keyboard.down("Control");
				return controlIsHoldPromise;
			})
			.then(function () {
				// ctrl a
				let aisPressedpromise = gtab.keyboard.press("a");
				return aisPressedpromise;
				// ctrl x
			})
			.then(function () {
				let cutPromise = gtab.keyboard.press("x");
				return cutPromise;
			})
			.then(function () {
				let editorWillBeClickedPromise = gtab.click(
					".monaco-editor.no-user-select.vs"
				);
				return editorWillBeClickedPromise;
			})
			.then(function () {
				// ctrl a
				let aisPressedpromise = gtab.keyboard.press("a");
				return aisPressedpromise;
				// ctrl x
			})
			.then(function () {
				let pastePromise = gtab.keyboard.press("v");
				return pastePromise;
			})
			.then(function () {
				let submitIsClickedPromise = gtab.click(
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

function waitAndClick(selector) {
	return new Promise(function (resolve, reject) {
		let selectorWaitPromise = global_tab.waitForSelector(selector, {
			visible: true,
		}); // wait selector to load
		selectorWaitPromise.then(function () {
			let selectorClickPromise = global_tab.click(selector); // click
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
