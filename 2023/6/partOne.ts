const testInput =
    "Time:      7  15   30\n" +
    "Distance:  9  40  200"

const input =
    "Time:        49     87     78     95\n" +
    "Distance:   356   1378   1502   1882"
// To see how much margin of error you have, determine the number of ways you can beat the record in each race;
// in this example, if you multiply these values together, you get 288 (4 * 8 * 9).

// Race is in milliseconds
// You can hold the button for X milliseconds at the start of the race
// this time contributes to your overall race time
// For each whole millisecond you hold the button, your speed increases by 1 meter per second

// INPUT
// The first number is the time for the race
// The second number is the record distance

// Output
// Determine the number of ways you could beat the record for that race
// Then keep track of the product of all of those numbers
// If there is no way to beat the record, output 0
const main = async () => {
    const lines = input.split("\n")
    const [times, distances] = lines.map(item => item.match(/\d+/g)!.map(Number))
    const totalWays: number[] = []
    // GAME LOOP
    for (let i = 0; i < times.length; i++) {
        const ways: number[] = []
        const timeLimit = times[i]
        const recordDistance = distances[i]
        for (let pressDuration = 0; pressDuration <= timeLimit; pressDuration++) {
             // Speed increases by 1 millimeter a second for each millisecond of button press
            const distanceCovered = pressDuration * (timeLimit - pressDuration)
            if (distanceCovered > recordDistance) {
                ways.push(pressDuration)
            }
        }
        if (ways.length === 0) {
            totalWays.length = 0
            break
        } else {
            totalWays.push(ways.length)
        }
    }
    return totalWays.reduce((acc, curr) => acc * curr, 1)
}

try {
    main().then(data => console.log(data))
} catch (err) {
    console.error(err)
}
