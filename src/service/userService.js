// File Service
import userRepository from "../repository/userRepository.js"


const getUser = () => {
    const data = userRepository.getUser()

    if(data.length < 1) {
        return 'data gak ada'
    }
    return data
}

export default {
    getUser
}