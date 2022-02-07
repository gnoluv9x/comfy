function currencyFormater(numb) {
    let currency = String(numb);
    let arr = currency.split("");
    let step = Math.trunc((arr.length - 2) / 3);
    for (let i = 1; i <= step; i++) {
        if (2 * i + 3 < arr.length) {
            arr.splice(-2 * i - 3, 0, ",");
        }
    }
    arr.splice(-2, 0, ".");
    return arr.join("");
}
export default currencyFormater;
