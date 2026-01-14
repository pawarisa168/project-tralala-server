export const getHome = (req, res) => {
    res.status(200).json({
        message: "Welcome is Service Home"
    })
}