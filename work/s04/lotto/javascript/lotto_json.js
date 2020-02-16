const createWinningNumbers = (length, floor, ceiling) => {
    let selectedNumbers = [];
    for (let i = 0; i < length; i++) {
        let number = Math.floor((Math.random() * ceiling) + floor);
        if (!selectedNumbers.includes(number)) {
            selectedNumbers.push(number);
        } else {
            i--;
        }
    }
    return selectedNumbers;
};

const sortNumbers = (numbers) => {
    return numbers.sort((a, b) => {
        return (a - b)
    });
};

const getWinningNumbers =  (length, floor, ceiling) => {
    let winningNumbers = createWinningNumbers(length, floor, ceiling);
    return sortNumbers(winningNumbers);
};

exports.generate_JSON = function(length,floor,ceiling) {
    return getWinningNumbers(length,floor,ceiling);
};