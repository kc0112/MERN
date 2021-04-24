let num1 = 4;
let num2 =2;

try {
    if (num1 % 2 == 0 && num1 % num2 == 0) {
        console.log(num1 % num2);
    } throw (" incompatible types");
}
catch (err) {
    console.log(err);
}