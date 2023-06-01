import "./single.scss"
import Sidebar from  "../../components/sideBar/Sidebar"
import NavBar from  "../../components/navBar/NavBar"
import Chart from "../../components/chart/Chart"
import List from "../../components/table/Table"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DepartmentService from "../../services/DepartmentService"
import DivisionService from "../../services/DivisionService"

const DepartmentSingle = () => {
    const {department_id} = useParams()
    const [departmentInfo, setDepartmentInfo] = useState({})
    const [divisionData, setDivisionData] = useState([])

    useEffect(() => {
      const loadDepartmentInfo = (department_id) => {
        DepartmentService.getDepartmentById(department_id)
        .then((response) => {
          setDepartmentInfo(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      }
      const loadDivisions = (department_id) => {
        DivisionService.getDivisionsByDepartmentId(department_id)
        .then((response) => {
          console.log(response.data)
          setDivisionData(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      }
      loadDepartmentInfo(department_id)
      loadDivisions(department_id)
    }, [department_id])

  return (
    <div className="single">
      <Sidebar type="user" />
      <div className="singleContainer">
        <NavBar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img 
              src=""
              alt=""
              className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{departmentInfo.description}</h1>
                <div className="detailItem">
                  <span className="itemKey">Ministry Name:</span>
                  <span className="itemValue">{departmentInfo.ministryName}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Number of Divisions:</span>
                  <span className="itemValue">{departmentInfo.divisionCount}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Created At:</span>
                  <span className="itemValue">{departmentInfo.created_at}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Requests pending:</span>
                  <span className="itemValue">12</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title="Approved Requests" />
          </div>
        </div>
        <div className="buttom">
        <h1 className="title">Divisions</h1>
        {
          departmentInfo.divisionCount === 0 ?
          <h2 className="title">No Division in Department</h2>
          :
          <List type = "division" data={divisionData}/>
        }

        </div>
      </div>
    </div>
  )
}

export default DepartmentSingle
