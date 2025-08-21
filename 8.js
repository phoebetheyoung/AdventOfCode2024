// Open input page, in console use:
input = document.body.getElementsByTagName("pre")[0].innerHTML;
rows = input.split("\n").map(row => row.split("")).filter(row => row.length > 0);

uniqueCharacters = [...new Set(rows.flatMap(row => row))];

getCoordsOfCharacter = (character) => {
    coords = [];

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < rows[0].length; columnIndex++) {
            if (rows[rowIndex][columnIndex] === character) {
                coords.push([rowIndex, columnIndex]);
            }
        }
    }

    return coords;
}

// Part 1
fillInAntinodes = (coord1, coord2) => {
    [x, y] = coord1;
    [w, z] = coord2;

    [a, b] = [x - (w - x), y - (z - y)];
    [c, d] = [w - (x - w), z - (y - z)];
    
    if (a >= 0 && a < rows.length && b >= 0 && b < rows[0].length) {
        antinodePositions[a][b] = 1;
    }
    if (c >= 0 && c < rows.length && d >= 0 && d < rows[0].length) {
        antinodePositions[c][d] = 1;
    }
}

antinodePositions = new Array(rows.length).fill(0).map(_ => new Array(rows[0].length).fill(0)); 

uniqueCharacters.forEach(character => {
    if (character !== ".") {
        coords = getCoordsOfCharacter(character);

        for (let i = 0; i < coords.length; i++) {
            for (let j = i + 1; j < coords.length; j++) {
                fillInAntinodes(coords[i], coords[j]);
            }
        }
    }
});

numberOfAntinodes = antinodePositions.map(row => {
    return row.reduce((total, v) => total + v);
}).reduce((total, v) => total + v);

console.log(numberOfAntinodes);

// Part 2
fillInAntinodes2 = (coord1, coord2) => {
    diff = [coord2[0] - coord1[0], coord2[1] - coord1[1]];
    let i = 0;
    let stillGoing = true;

    while (stillGoing && i < 1000) {
        [a, b] = [coord1[0] + i * diff[0], coord1[1] + i * diff[1]];
        [c, d] = [coord1[0] - i * diff[0], coord1[1] - i * diff[1]];
        stillGoing = false

        if (antinodePositions2[a] && antinodePositions2[a][b] !== undefined) {
            antinodePositions2[a][b] = 1;
            stillGoing = true;
        }
        if (antinodePositions2[c] && antinodePositions2[c][d] !== undefined) {
            antinodePositions2[c][d] = 1;
            stillGoing = true;
        }

        i++;
    }
}

antinodePositions2 = new Array(rows.length).fill(0).map(_ => new Array(rows[0].length).fill(0)); 

uniqueCharacters.forEach(character => {
    if (character !== ".") {
        coords = getCoordsOfCharacter(character);

        for (let i = 0; i < coords.length; i++) {
            for (let j = i + 1; j < coords.length; j++) {
                fillInAntinodes2(coords[i], coords[j]);
            }
        }
    }
});

numberOfAntinodes2 = antinodePositions2.map(row => {
    return row.reduce((total, v) => total + v);
}).reduce((total, v) => total + v);

console.log(numberOfAntinodes2);