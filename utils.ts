import * as fs from "fs"

export const loadFile = (): Promise<string> => {
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