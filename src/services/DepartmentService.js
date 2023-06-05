import axios from "axios";
import Cookies from "js-cookie";

const DEPARTMENT_BASE_URL = "http://localhost:8080/api/department/";

class DepartmentService {
  getDepartmentById(id) {
    const tokenString = Cookies.get("_auth");
    return axios.get(DEPARTMENT_BASE_URL + "department_info/" + id, {
      headers: { Authorization: `Bearer ${tokenString}` },
    });
  }

  getAllDepartments() {
    const tokenString = Cookies.get("_auth");
    return axios.get(DEPARTMENT_BASE_URL + "all", {
      headers: { Authorization: `Bearer ${tokenString}` },
    });
  }

  addDepartment(departmentInfo) {
    const tokenString = Cookies.get("_auth");
    return axios.post(DEPARTMENT_BASE_URL + "add_department", departmentInfo, {
      headers: { Authorization: `Bearer ${tokenString}` },
    });
  }
}

export default new DepartmentService();
