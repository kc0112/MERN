let puppeteer = require("puppeteer");
let fs = require("fs");
let links = ["https://www.amazon.in", "https://www.flipkart.com", "https://www.paytmmall.com"];
let prodName = process.argv[2];
console.log("before");
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let newTab = await browserInstance.newPage();
        
        let amazonDetails = await getListingFromAmazon(links[0], newTab, prodName);
        console.table(amazonDetails);

        let flipkartDetails = await getListingFromFlipkart(links[1], newTab, prodName);
        console.table(flipkartDetails);

        let paytmmallDetails = await getListingFromPaytmmall(links[2], newTab, prodName);
        console.table(paytmmallDetails);

        await newTab.goto("https://wpforms.com/wp-content/uploads/2017/04/thank-you-page-examples.jpg");
        await newTab.waitForTimeout(2000); // waits for 2 secs here
        await browserInstance.close(); // closes browser
        

    } catch (err) {
        console.log(err);
    }
})();

//product name, url home page 
//output -> top 5 product ->price name print 
async function getListingFromAmazon(link, tab, prodName) {
    console.log("================ From Amazon ======================== ")
    await tab.goto(link);
    await tab.type("#twotabsearchtextbox", prodName);
    await tab.keyboard.press('Enter');
    await tab.waitForSelector(".a-price-whole", { visible: true });

    function consoleFn(priceSelector,pNameSelector){
        let pNameArr = document.querySelectorAll(pNameSelector);
		let priceArr = document.querySelectorAll(priceSelector);

		let details = [];
		for (let i = 0; i < 5; i++) {
			let productName = pNameArr[i].innerText;
			let price = priceArr[i].innerText;

			details.push({
				Name: productName,
				Price: price,
			});
		}
		return details;
    }

    return tab.evaluate(consoleFn, ".a-price-whole", ".a-size-medium.a-color-base.a-text-normal");
}

async function getListingFromFlipkart(link, tab, prodName) {
    console.log("================ From Flipkart ======================== ")
    await tab.goto(link);
    await tab.type("._3704LK", prodName);
    await tab.keyboard.press('Enter');
    await tab.waitForSelector("._4rR01T", { visible: true });

    function consoleFn(priceSelector,pNameSelector){
        let pNameArr = document.querySelectorAll(pNameSelector);
		let priceArr = document.querySelectorAll(priceSelector);

		let details = [];
		for (let i = 0; i < 5; i++) {
			let productName = pNameArr[i].innerText;
			let price = priceArr[i].innerText;

			details.push({
				Name: productName,
				Price: price,
			});
		}
		return details;
    }

    return tab.evaluate(consoleFn, "._4rR01T", "._30jeq3._1_WHN1");
}

async function getListingFromPaytmmall(link, tab, prodName) {
    console.log("================ From Paytmmall ======================== ");
    await tab.goto(link);
    await tab.type("#searchInput", prodName, {delay: 200});
    await tab.keyboard.press('Enter');
    await tab.waitForSelector("._1kMS", { visible: true });
    function consoleFn(priceSelector,pNameSelector){
        let pNameArr = document.querySelectorAll(pNameSelector);
        let priceArr = document.querySelectorAll(priceSelector);
        
		let details = [];
		for (let i = 0; i < 5; i++) {
			let productName = pNameArr[i].innerText;
			let price = priceArr[i].innerText;

			details.push({
				Name: productName,
				Price: price,
			});
		}
		return details;
    }

    return tab.evaluate(consoleFn,"._1kMS", ".UGUy");
}