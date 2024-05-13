import jwt from "jsonwebtoken";

export const getDataFromToken = async (request) => {
    try {
        const token = request.cookies.get("token")?.value;
        const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.id;

    } catch (error) {
        console.log("Error in getting data from Token : ", error)
    }

}