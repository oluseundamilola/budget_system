import "./list.scss";
import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sideBar/Sidebar";
import { useEffect, useState } from "react";
import RequestService from "../../services/RequestService";
import List from "../../components/table/Table";
import LoginService from "../../services/LoginService";
import Sidebar from "../../components/sideBar/Sidebar";

const RequestStatus = ({type}) => {
    const [requests, setRequest] = useState([])

    useEffect(() => {
      const loadRequestData = (requestStatus) => {
        console.log(type)
        RequestService.getRequestByStatus(requestStatus)
          .then((response) => {
            setRequest(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      loadRequestData(type)
    }, [type])

    console.log(type)

  return (
    <div className='list'>
      <Sidebar type="admin" />
      <div className="listContainer">
        <NavBar />
        <List type="request_by_status" data={requests}/>
      </div>
    </div>
  )
}

export default RequestStatus
