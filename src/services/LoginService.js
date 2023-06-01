import axios from "axios"
import Cookies from 'js-cookie'

const LOGIN_BASE_URL = "http://localhost:8080/api/login/"

class LoginService{
    loginUser(loginDetails){
        return axios.post(LOGIN_BASE_URL + "authenticate", loginDetails)
    }
    userRole(tokenString){
        return axios.get(LOGIN_BASE_URL + "role", {headers: { "Authorization" :`Bearer ${tokenString}` }})
    }
    userInfo(){
        const tokenString = Cookies.get('_auth')
        return axios.get(LOGIN_BASE_URL + "user_info", {headers: { "Authorization" :`Bearer ${tokenString}` }})
    }

}

export default new LoginService()