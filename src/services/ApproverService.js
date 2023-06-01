import axios from "axios";
import Cookies from "js-cookie";

const APPROVER_BASE_URL = "http://localhost:8080/api/approver/";

class ApproverService {

    getSentRequests(){
        const tokenString = Cookies.get("_auth");
        return axios.get(APPROVER_BASE_URL + "division_requests", {
            headers : { Authorization: `Bearer ${tokenString}` }
        })
    }
    approveRequest(request_id){
        const finance_id = 1
        const tokenString = Cookies.get("_auth");
        return axios.put(
            APPROVER_BASE_URL + "approve_request/" + request_id + "/" + finance_id,
          {},
          {
            headers: {
              Authorization: `Bearer ${tokenString}`,
              "Content-Type": "application/json",
            },
          }
        );
    
      }
}

export default new ApproverService();
