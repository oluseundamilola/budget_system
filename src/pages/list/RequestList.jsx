import "./list.scss";
import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sideBar/Sidebar";
import { useEffect, useState } from "react";
import RequestService from "../../services/RequestService";
import List from "../../components/table/Table";
import LoginService from "../../services/LoginService";

const RequestList = () => {
  const [requestData, setRequestData] = useState([]);
  const [userData, setUserData] = useState({});
  const [ministryRequestData, setMinistryRequestData] = useState([]);

  useEffect(() => {
    const loadRequestData = (requestStatus) => {
      RequestService.getRequestByStatus(requestStatus)
        .then((response) => {
          setRequestData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const loadUserData = () => {
      LoginService.userInfo()
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const loadMinistryRequestData = () => {
      RequestService.getRequestByMinistry()
        .then((response) => {
          console.log(response.data);
          setMinistryRequestData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    loadRequestData("Created");
    loadUserData();
    loadMinistryRequestData();
  }, []);

  return (
    <div className="list">
      {userData.role === "ROLE_ADMIN" && <SideBar type="admin" />}
      {userData.role === "ROLE_USER" && <SideBar type="user" />}
      <div className="listContainer">
        <NavBar />
        {userData.role === "ROLE_ADMIN" && (
          <List type="send_requests" data={requestData} />
        )}
        {userData.role === "ROLE_USER" && (
          <List type="ministry_request" data={ministryRequestData} />
        )}
      </div>
    </div>
  );
};

export default RequestList;
