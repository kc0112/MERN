const fs = require("fs");

// function name (para){
// 	return new Promise(function (resolve, reject) {
// 		yha likho function jisko promisify krna
// 		with callback 
// 		function cb(err, data) {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				resolve(data);
// 			}
// 	})
// }
function promisifiedFileRead(filePath) {
	return new Promise(function (resolve, reject) {
		fs.readFile(filePath, function cb(err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

let fReadPromise = promisifiedFileRead("f1.txt");

console.log(fReadPromise);

fReadPromise.then(function (data) {
	console.log("content-> " + data);
});

fReadPromise.catch(function (err) {
	console.log(err);
});
