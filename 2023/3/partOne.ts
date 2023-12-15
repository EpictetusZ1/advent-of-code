import { loadFile } from "../../utils";


const main = async () => {
    const loadInput = await loadFile()
    const splitLines = (input: string) => input.split("\n")
    const lines = splitLines(loadInput)
    const getArrayFromLines = (line: string) => line.split("")
    const isSymbol = (char: any) => [',', '*', '+', '#', '$', '!', '@', '&', '%', '^', '(', ')', '-', '=', '{', '}', '[', ']', '|', ':', ';', '<', '>', '/', '?', '~', '`'].includes(char)
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

    const checkSurround = (numIndex: number[], lineIndex: number) => {
        for (let position of numIndex) {
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue
                    const checkX = position + dx
                    const checkY = lineIndex + dy
                    if (checkY >= 0 && checkY < lines.length && checkX >= 0 && checkX < lines[checkY].length) {
                        if (isSymbol(lines[checkY][checkX])) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }

    let validNums: number[] = []

    for (let i = 0; i < lines.length; i++) {
        const lineArray = getArrayFromLines(lines[i])
        const data = getNumbersFromArray(lineArray)
        const nums = data.numbers
        const indices = data.positions

        nums.forEach((num, index) => {
            if (checkSurround(indices[index], i)) {
                validNums.push(num)
            }
        })
    }

    return validNums.reduce((acc, val) => acc + val, 0)
}

try {
   main().then((data) => console.log(data))
} catch (err) {
    console.log("error", err)
}
