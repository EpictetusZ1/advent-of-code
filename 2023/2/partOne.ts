import { loadFile } from "../../utils";


const main = async () => {
    const splitGames = (input: string) => {
        return input.split("\n")
    }

    const getSets = (game: string): [string, string[]] => {
        let gameId = game.split(": ")
        return [gameId[0], gameId[1].split(";")]
    }
    const addToLimitOrThrow = (val: number, col: string, gameValues: Map<string, number>) => {
        switch (col) {
            case "red":
                if ( val + gameValues.get("red")! <= 12) {
                    gameValues.set("red", val + gameValues.get("red")!)
                    return true
                } else {
                    return false
                }
            case "blue":
                if (val + gameValues.get("blue")! <= 14) {
                    gameValues.set("blue",  val +  gameValues.get("blue")!)
                    return true
                } else {
                    return false
                }
            case "green":
                if (val + gameValues.get("green")! <= 13) {
                    gameValues.set("green", val +  gameValues.get("green")!)
                    return true
                } else {
                    return false
                }
            default:
                throw new Error("aaa")
        }
    }
    const extractGameData = (gameId: number, sets: string[]) => {
        let validGame = true
        for (const set of sets) {
            const gameValues = new Map<string, number>([["red", 0], ["blue", 0], ["green", 0]] )
            // only 12 red cubes, 13 green cubes, and 14 blue cubes
            const  rounds = set.split(",")
            for (const round of rounds) {
                const noWhite = round.trim()
                const [value, color] = noWhite.split(" ")
                const num = parseInt(value)
                if (!addToLimitOrThrow(num, color, gameValues)) {
                    validGame = false;
                    break; // Break if this round is invalid
                }
            }
            if (!validGame) break // Break if any set is invalid
        }
        if (validGame) {
            return gameId
        } else {
            return null
        }
    }

    try {
        const input = await loadFile()
        const goodGames: number[] = []
        const games = splitGames(input)

        for (const game of games) {
            const [gameNum, set] = getSets(game)
            const gameId = parseInt(gameNum.split(" ")[1])
            const validIds = extractGameData(gameId, set)
            if (validIds) {
                goodGames.push(validIds)
            }
        }
       const answer = goodGames.reduce((curr, acc) => curr + acc, 0)
        console.log("answer: ", answer)
    } catch (error) {
        console.error("Error reading the file: ", error)
    }
}

main()