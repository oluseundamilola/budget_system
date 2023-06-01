import axios from "axios";
import Cookies from "js-cookie";

const REQUEST_BASE_URL = "http://localhost:8080/api/budget/";

class RequestService {
  createRequest(division_id, requestDetails){
    const tokenString = Cookies.get("_auth");
    return axios.post(REQUEST_BASE_URL + "add_budget/" + division_id, requestDetails, {
      headers: { Authorization: `Bearer ${tokenString}` },
    })
  }

  getRequestByDivisionId(division_id) {
    const tokenString = Cookies.get("_auth");
    return axios.get(REQUEST_BASE_URL + "get_requests/" + division_id, {
      headers: { Authorization: `Bearer ${tokenString}` },
    });
  }
  getRequestByStatus(status) {
    const tokenString = Cookies.get("_auth");
    return axios.get(REQUEST_BASE_URL + "requests_by_status/" + status, {
      headers: { Authorization: `Bearer ${tokenString}` },
    });
  }
  getRequestByMinistry(){
    const tokenString = Cookies.get("_auth");
    return axios.get(REQUEST_BASE_URL + "request_by_ministry", {
      headers : { Authorization: `Bearer ${tokenString}` }
    })
  }

  sendRequest(request_id) {
    const tokenString = Cookies.get("_auth");
    return axios.put(
      REQUEST_BASE_URL + "send_to_approver/" + request_id,
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

export default new RequestService();
