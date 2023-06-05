import { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import Sidebar from "../../components/sideBar/Sidebar";
import "./new.scss";
import RequestService from "../../services/RequestService";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentService from "../../services/DepartmentService";
import DivisionService from "../../services/DivisionService";

const New = ({ inputs, title, type }) => {
  const { division_id } = useParams();
  const { department_id } = useParams()
  console.log(department_id)
  console.log(division_id)
  const navigate = useNavigate();
  const [requestDetails, setRequestDetails] = useState({
    budget_name: "",
    budget_description: "",
    amount: "",
  });
  const [departmentInfo, setDepartmentInfo] = useState({
    name: "",
    description: "",
  });
  const [divisionInfo, setDivisionInfo] = useState({
    divisionName: "",
    divisionCode: ""
  })

  const handleChange = (e) => {
    const value = e.target.value;
    if (type === "request") {
      console.log(requestDetails);
      setRequestDetails({ ...requestDetails, [e.target.name]: value });
    } else if (type === "department") {
      console.log(departmentInfo);
      setDepartmentInfo({ ...departmentInfo, [e.target.name]: value });
    }
    else if (type === "division"){
      console.log(divisionInfo);
      setDivisionInfo({ ...divisionInfo, [e.target.name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "request") {
      RequestService.createRequest(division_id, requestDetails)
        .then((response) => {
          console.log(response.data);
          navigate(`/division/${division_id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else if(type === "department"){
      DepartmentService.addDepartment(departmentInfo)
      .then((response) => {
        console.log(response.data)
        navigate("/ministry/info")
      })
      .catch((error) => {
        console.log(error)
      })
    }
    else if(type === "division"){
      DivisionService.addDivision(department_id, divisionInfo)
      .then((response) => {
        console.log(response.data)
        navigate(`/department/${department_id}`)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <NavBar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="buttom">
          <div className="left">
            <div className="circle"></div>
          </div>
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              ))}
              <button onClick={handleSubmit}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
