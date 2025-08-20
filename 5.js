// Open input page, in console use:
const input = document.body.getElementsByTagName("pre")[0].innerHTML;

const [rules, updates] = input.split("\n\n").map(list => {
    return list.split("\n").map(string => {
        return string.split(/\||\,/).map(v => Number.parseInt(v));
    })
});

const isOrderCorrect = (a, b) => {
    return !rules.some(rule => {
        return a === rule[1]
            && b === rule[0];
    });
}

const isValid = (update) => {
    return update[0] < Infinity
        && update.every((pageNumber, i) => {
        return update.slice(i + 1).every(p => isOrderCorrect(pageNumber, p))
    });
}

// Part 1:
const validUpdates = updates.filter(isValid);

const total = validUpdates.map(update => {
    return update[Math.floor(update.length / 2)]
}).reduce((total, p) => total + p);

console.log(total);

// Part 2:
const invalidUpdates = updates.filter(update => update[0] < Infinity && !isValid(update));

const correctedUpdates = invalidUpdates.map(update => {
    return update.sort((a, b) => {
        return isOrderCorrect(a, b)
            ? -1
            : 1;
    });
});

const total2 = correctedUpdates.map(update => {
    return update[Math.floor(update.length / 2)]
}).reduce((total, p) => total + p);

console.log(total2);