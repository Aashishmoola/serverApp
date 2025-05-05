
export { IJWTPayload, orderStatus }

interface IJWTPayload {
    userEmail: string,
    isAdmin:boolean,
    iat: number,
    exp: number,
}

type orderStatus = "Processing" | "In Transit" | "Delivered"



