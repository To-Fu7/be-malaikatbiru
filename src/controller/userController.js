// File Controller(req, res) => {

import userService from "../service/userService.js"

const getUser = (req, res) => {
    res.send(userService.getUser())
}

export default {
    getUser
}