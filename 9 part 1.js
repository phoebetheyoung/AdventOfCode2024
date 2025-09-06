// Open input page, in console use:
input = document.body.getElementsByTagName("pre")[0].innerHTML.split("");

// Part 1
fileSizes = input.filter((_, index) => index % 2 === 0).map(v => Number.parseInt(v));
gapSizes = input.filter((_, index) => index % 2 !== 0).map(v => Number.parseInt(v));

let position = 0;
let checksum = 0;

for (let index = 0; index < fileSizes.length; index++) {
    for (let j = 0; j < fileSizes[index]; j++) {
        checksum += position * index;
        position++;
    }

    for (let j = 0; j < gapSizes[index]; j++) {
        lastIndex = fileSizes.length - 1;
        checksum += position * (lastIndex);
        fileSizes[lastIndex]--;

        if (fileSizes[lastIndex] === 0) {
            fileSizes.pop();
            gapSizes.pop();
        }

        position++;
    }
}

console.log(checksum);