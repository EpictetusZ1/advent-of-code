const testInput =
    "467..114..\n" +
    "...*......\n" +
    "..35..633.\n" +
    "......#...\n" +
    "617*......\n" +
    ".....+.58.\n" +
    "..592.....\n" +
    "......755.\n" +
    "...$.*....\n" +
    ".664.598.."


const main = async () => {
    const splitLines = (input: string) => {
        return input.split("\n")
    }

    // Find any number adjacent to a symbol
    // Need to keep track of:
    // - 2 positions on outside + length of number above number
    // - position to left and right
    //- 2 positions on outside + length of number below number

    // Find the index of the number

    const getArrayFromLines = (line: string) => {
        return line.split("")
    }
    const lines = splitLines(testInput)

    const getNumbersFromArray = (line: string[]) => {
        let currNum = []
        let numPositions = []
        let numbers = []
        let positions = []

        for (let i = 0; i < line.length; i++) {
            const char = line[i]
            if (isNaN(parseInt(char))) {
                if (currNum.length > 0) {
                    numbers.push(parseInt(currNum.join("")))
                    positions.push(numPositions)
                    currNum = []
                    numPositions = []
                }
            } else {
                currNum.push(char)
                numPositions.push(i)
            }
        }

        if (currNum.length > 0) {
            numbers.push(parseInt(currNum.join("")))
            positions.push(numPositions)
        }

        return { numbers, positions }
    }


    const validNums: number[] = []

    const checkSurround = (num: number, numIndex: number[], lineIndex: number) => {

    }

    for (let i = 0; i < lines.length; i++) {
        const dataArr = getArrayFromLines(lines[i])
        console.log(dataArr)
        const data = getNumbersFromArray(dataArr)
        console.log("data", data)
        if (data) {
            const nums: number[] = data.numbers
            const indices = data.positions
            console.log("nums: ", nums)
            console.log("indicies: ", indices)
            nums.forEach((myNum, index) => {
                checkSurround(myNum, indices, i)
            })
        }
    }
}

try {
    main()
} catch (err) {
    console.log("error", err)
}
