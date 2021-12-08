function addDate(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
console.log(addDate('1.1.2021', 1));

export default addDate;