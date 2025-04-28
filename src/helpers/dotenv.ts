export {getDotenVar}

function getDotenVar(varName: string): string{
    if (!process.env[varName]) {
        throw new Error(`${varName} var is undefined in .env`)
    }
    return process.env[varName]
}