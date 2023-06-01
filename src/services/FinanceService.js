import axios from "axios"
import Cookies from 'js-cookie'


const DIVISION_BASE_URL = "http://localhost:8080/api/finance/"

 class FinanceService{
    getFinanceInfo(id){
        const tokenString = Cookies.get('_auth')
        return axios.get(DIVISION_BASE_URL + "finance_info/" +id,{headers: { "Authorization" :`Bearer ${tokenString}` }} )
    }
}

export default new FinanceService;