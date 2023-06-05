import Sidebar from "../../components/sideBar/Sidebar";
import NavBar from "../../components/navBar/NavBar"
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect, useState } from "react";
import ApproverService from "../../services/ApproverService";
import MinistryService from "../../services/MinistryService"
import DepartmentService from "../../services/DepartmentService";
import LoginService from "../../services/LoginService";
import RequestService from "../../services/RequestService";
import  FinanceService  from "../../services/FinanceService";

const Home = () => {
  const [sentRequest, setSentRequest] = useState([])
  const [ministryCount, setMinistryCount] = useState("")
  const [departmentCount, setDepartmentCount] = useState("")
  const [userData, setUserData] = useState({})
  const [financeInfo, setFinanceInfo] = useState({})

  useEffect(() => {
    const loadRequestData = (requestStatus) => {
      RequestService.getRequestByStatus(requestStatus)
        .then((response) => {
          setSentRequest(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    const loadMinistryCount = () => {
      MinistryService.loadAllMinistries()
      .then((response) => {
        setMinistryCount(response.data.length)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    const loadDepartmentsCount = () => {
      DepartmentService.getAllDepartments()
      .then((response) => {
        setDepartmentCount(response.data.length)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    const loadUserData = () => {
      LoginService.userInfo()
      .then((response) => {
        setUserData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    const loadfinanceInfo = (id) => {
      FinanceService.getFinanceInfo(id)
      .then((response) => {
        console.log(response.data)
        setFinanceInfo(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }



    loadfinanceInfo(1)
    loadRequestData("Pending");
    loadMinistryCount()
    loadDepartmentsCount()
    loadUserData()
  }, [])

  const approveRequest = (request_id) => {
    ApproverService.approveRequest(request_id)
    .then((response) => {
      console.log(response.data)
      if(sentRequest){
        setSentRequest((prevRequest) => {
          return prevRequest.filter((requests) => requests.id !== request_id)
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const rejectRequest = (request_id) => {
    ApproverService.rejectRequest(request_id)
    .then((response) => {
      console.log(response.data)
      if(sentRequest){
        setSentRequest((prevRequests) => {
          return prevRequests.filter((requests) => requests.id !== request_id)
        })
      }
    })
  }

  return (
    <div className="home">
      <Sidebar type="admin" />
      <div className="homeContainer">
        <NavBar />
        <div className="widgets">
          <Widget type="ministry" count = {ministryCount} />
          <Widget type="department" count={departmentCount} />
          <Widget type="division" />
          <Widget type="Request"/>
        </div>
        <div className="charts">
          <Featured data ={financeInfo}/>
          <Chart title="Approved Request over 6 Mouths" aspect={2/1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Requests From Divisions</div>

          {
            userData.role === "ROLE_APPROVER" && sentRequest.length !== 0 ? (
            <List type="requests" data = {sentRequest} approveRequest={approveRequest} rejectRequest={rejectRequest} />
            ): (
            <h2 className="listTitle">Request List is empty</h2>
          )}

          {
            userData.role === "ROLE_ADMIN" && <h1 className="listTitle">Only an Approver can view this table</h1>
          }
          
        </div>
      </div>
    </div>
  )
}

export default Home
