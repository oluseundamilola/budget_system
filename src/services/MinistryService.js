import axios from "axios"
import Cookies from 'js-cookie'

const MINISTRY_BASE_URL = "http://localhost:8080/api/ministry/"

class MinistryService{
    loadMinistryInfo(){
        const tokenString = Cookies.get('_auth')
        return axios.get(MINISTRY_BASE_URL + "ministry_info", {headers: { "Authorization" :`Bearer ${tokenString}` }})
    }
    loadAllMinistries(){
        const tokenString = Cookies.get('_auth')
        return axios.get(MINISTRY_BASE_URL + "get_ministry", {headers: { "Authorization" :`Bearer ${tokenString}` }} )
    }
    //MOVE TO DEPARTMENT SERVICE
    loadDepartments(){
        const tokenString = Cookies.get('_auth')
        return axios.get("http://localhost:8080/api/department/get_department", {headers: { "Authorization" :`Bearer ${tokenString}` }} )
    }
}

export default new MinistryService()