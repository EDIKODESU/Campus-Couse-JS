// let beginRange = +prompt('Enter the number for the beginning of a range', '1');
// let endRange = +prompt('Enter the number for the end of a range', '100');


exports.checkDivision = function checkDivision(beginRange = 1, endRange = 60) {
    for (let i = beginRange; i <= endRange; i++) {
        let description = " - "

        if (i % 2 === 0) {
            description = " is divisible by 2"
        }
        if (i % 3 === 0 && i % 2 !== 0) {
            description = " is divisible by 2"
        }
        else if (i % 3 === 0) {
            description = description.concat(", is divisible by 2")
        }
        if (i % 10 === 0) {
            description = description.concat(", is divisible by 10")
        }
        
        console.log(`The number ` + i + description)
    }
}
