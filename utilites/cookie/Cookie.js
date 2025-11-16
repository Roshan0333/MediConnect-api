let Cookies = (res, tokenType, token, expiresIn) => {
    res.cookie(tokenType, token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: expiresIn
    })
}

let RemoveCookies = (res) => {
    try {
        res.clearCookie("AccessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "Lax"
        })

        res.clearCookie("RefreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax'
        })


        return res.status(200).json({status: 200, msg: "You Signout SuccessFully"})
    }

    catch (err) {
        return res.status(500).json({ status: 500, error: err.message })
    }
}

module.exports = { Cookies, RemoveCookies };