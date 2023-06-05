import "./single.scss"
import Sidebar from  "../../components/sideBar/Sidebar"
import NavBar from  "../../components/navBar/NavBar"
import Chart from "../../components/chart/Chart"
import List from "../../components/table/Table"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import DepartmentService from "../../services/DepartmentService"
import DivisionService from "../../services/DivisionService"
import RequestService from "../../services/RequestService"

const DivisionSingle = () => {
    const {division_id} = useParams()
    const [divisionInfo, setDivisionInfo] = useState({})
    const [requestData, setRequestData] = useState([])
    
    
    useEffect( () => {
        const loadDivisionInfo = (division_id) => {
            DivisionService.getDivisionInfo(division_id)
            .then((response) => {
                setDivisionInfo(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        const loadRequestData = (division_id) => {
            RequestService.getRequestByDivisionId(division_id)
            .then((response) => {
                console.log(response.data)
                setRequestData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
       

        loadDivisionInfo(division_id)
        loadRequestData(division_id)
    }, [division_id])

  return (
    <div className="single">
      <Sidebar type="user" />
      <div className="singleContainer">
        <NavBar />
        <div className="top">
          <div className="left">
            <Link to={`/requests/new/${division_id}`}>
            <div className="editButton">Create Request</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
            <div className="itemImg">
                Division
              </div>
              <div className="details">
                <h1 className="itemTitle">{divisionInfo.divisionName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Division Code Name:</span>
                  <span className="itemValue">{divisionInfo.divisionCode}</span>
                </div>
                {/* <div className="detailItem">
                  <span className="itemKey">Number of Requests:</span>
                  <span className="itemValue">?12?</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Approved Request:</span>
                  <span className="itemValue">?12?</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pending Requests:</span>
                  <span className="itemValue">?12?</span>
                </div> */}
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title="Approved Requests" />
          </div>
        </div>
        <div className="buttom">
        <h1 className="title">Requests</h1>
        {
          requestData.length < 1 ?
          <h2 className="title">No Request in Division</h2>
          :
          <List type = "division_request" data={requestData}/>
        }

        </div>
      </div>
    </div>
  )
}

export default DivisionSingle
