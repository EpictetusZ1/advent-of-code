import * as fs from "fs"


const loadFile = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile("./input.txt", "utf8", (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}


const main = async () => {
    const getNumPairs = (input: string): number => {
        const linePat = /[\n|\r]/gm
        const lines = input.split(linePat)
        const digitPat = /\d/gm
        // Test each line
        // Possible Outcomes:
        // No matches
        // 1 match
        // 2 matches
        // More than 2 matches
        // So I ALWAYS want to get the last match, since if there is only 1 I can set the num to itself with itself concated
        // Then check if there is another match, at the start position

        const pairs: string[] =[]
        for (const line of lines) {
            const matches = line.match(digitPat)
            if (matches && matches.length > 0) {
                if (matches.length === 1) {
                    pairs.push(`${matches[0]}${matches[0]}`)
                } else {
                    pairs.push(`${matches[0]}${matches[matches.length -1]}`)
                }
            }
        }
        return pairs.reduce((acc, curr) => acc + parseInt(curr), 0)
    }

    try {
        const input = await loadFile()
        const output = getNumPairs(input)
        console.log(output)
    } catch (error) {
        console.error("Error reading the file: ", error)
    }
}

main()