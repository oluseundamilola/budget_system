import "./single.scss"
import Sidebar from  "../../components/sideBar/Sidebar"
import NavBar from  "../../components/navBar/NavBar"
import Chart from "../../components/chart/Chart"
import List from "../../components/table/Table"
import { useEffect, useState } from "react"
import MinistryService from "../../services/MinistryService"
import { Link } from "react-router-dom"
import RequestService from "../../services/RequestService"

const Single = () => {
  const [ministryData, setMinistryData] = useState({})
  const [departmentData, setDepartmentData] = useState([])
  const [pendingRequest, setPendingRequest] = useState([])

  useEffect(() => {
    const loadMinistryData = () => {
      MinistryService.loadMinistryInfo()
      .then((response) =>{
        console.log(response.data)
        setMinistryData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    const loadDepartments = () => {
      MinistryService.loadDepartments()
      .then((response) => {
        console.log(response.data)
        setDepartmentData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    const loadRequestDataByStatus = (requestStatus) => {
      RequestService.getRequestByStatus(requestStatus)
        .then((response) => {
          setPendingRequest(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    loadMinistryData()
    loadDepartments()
    loadRequestDataByStatus("Pending")
  }, [])

  return (
    <div className="single">
      <Sidebar type="user" />
      <div className="singleContainer">
        <NavBar />
        <div className="top">
          <div className="left">
          <Link to="/department/new">
            <div className="editButton">Create Department</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="itemImg">
                Ministry
              </div>
              <div className="details">
                <h1 className="itemTitle">{ministryData.description}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{ministryData.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Department count:</span>
                  <span className="itemValue">{ministryData.departmentCount}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Location:</span>
                  <span className="itemValue">{ministryData.location}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Requests pending:</span>
                  <span className="itemValue">{pendingRequest.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title="Approved Requests" />
          </div>
        </div>
        <div className="buttom">
        <h1 className="title">Departments</h1>
          <List type = "departments" data={departmentData}/>
        </div>
      </div>
    </div>
  )
}

export default Single
