import axios from "axios"
import Cookies from 'js-cookie'


const DIVISION_BASE_URL = "http://localhost:8080/api/division/"

class DivisionService{
    getDivisionsByDepartmentId(department_id){
        const tokenString = Cookies.get('_auth')
        return axios.get(DIVISION_BASE_URL + "get_divisions/" +department_id,{headers: { "Authorization" :`Bearer ${tokenString}` }} )

    }
    getDivisionInfo(id){
        const tokenString = Cookies.get('_auth')
        return axios.get(DIVISION_BASE_URL + "division_info/" +id,{headers: { "Authorization" :`Bearer ${tokenString}` }} )
    }
}

export default new DivisionService()