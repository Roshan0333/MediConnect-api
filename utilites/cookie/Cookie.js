let Cookies = (res,tokenType,token, expiresIn) => {
    res.cookie(tokenType, token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: expiresIn
    })
}

module.exports = {Cookies};