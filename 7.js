// Open input page, in console use:
input = document.body.getElementsByTagName("pre")[0].innerHTML;

calibrationEquations = input.split("\n").filter(row => row.length > 0).map(row => {
    [testValue, remainingNumbers] = row.split(": ");

    return [
        Number.parseInt(testValue),
        remainingNumbers.split(" ").map(v => Number.parseInt(v)),
    ];
});

// Part 1
total = 0;

calibrationEquations.forEach(equation => {
    testValue = equation[0];
    remainingNumbers = equation[1];
    calculationSoFar = [remainingNumbers[0]];

    for (let i = 1; i < remainingNumbers.length; i++) {
        calculationSoFar = calculationSoFar.flatMap(v => {
            return [
                v + remainingNumbers[i],
                v * remainingNumbers[i],
            ]
        })
    }

    if (calculationSoFar.includes(testValue)) {
        total += testValue;
    }
});

console.log(total);

// Part 2
total2 = 0;

combine = (a, b) => {
    return Number.parseInt(a.toString().concat(b.toString()));
}

calibrationEquations.forEach(equation => {
    testValue = equation[0];
    remainingNumbers = equation[1];
    calculationSoFar = [remainingNumbers[0]];

    for (let i = 1; i < remainingNumbers.length; i++) {
        calculationSoFar = calculationSoFar.flatMap(v => {
            return [
                v + remainingNumbers[i],
                v * remainingNumbers[i],
                combine(v, remainingNumbers[i]),
            ]
        })
    }

    if (calculationSoFar.includes(testValue)) {
        total2 += testValue;
    }
});

console.log(total2);