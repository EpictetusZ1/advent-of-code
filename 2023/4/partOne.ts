import { loadFile } from "../../utils";


const main = async () => {
    const loadInput = await loadFile()
    const splitLines = (input: string) => input.split("\n")
    const gameLine = (line: string) => line.split("|").map((part) => part.match(/\d+/g)!.map(Number)!)

    const lines = splitLines(loadInput)
    const checkScore = (scoreCard: number[], playerCard: number[]) => {
        let playerScore = 0
        let isFirstMatch = true
        let matchedNumbers = new Set()

        scoreCard.forEach((num: number) => {
            if (playerCard.includes(num) && !matchedNumbers.has(num)) {
                matchedNumbers.add(num)
                if (isFirstMatch) {
                    playerScore = 1
                    isFirstMatch = false
                } else {
                    playerScore *= 2
                }
            }
        })

        return playerScore
    }

    let totalScore = 0
    lines.forEach(line => {
        const formatLine = line.replace(/(Card\W+\d+:\W+)/gm, '').trim()
        const [scoreCard, playerCard] = gameLine(formatLine)

        const score = checkScore(scoreCard, playerCard)
        if (score > 0) {
            totalScore += score
        }
        console.log(score)
    })
}


try {
    main()
} catch (error) {
    console.log(error)
}
