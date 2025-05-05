export {getDotenVar}

function getDotenVar(varName: string): string{
    const envVar = process.env[varName]
    if (!envVar) {
        throw new Error(`${varName} var is undefined in .env`)
    }
    return envVar
}