import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import RequestService from "../../services/RequestService";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
// import ApproverService from "../../services/ApproverService";

const List = ({ type, data, handleClick, approveRequest, rejectRequest }) => {
  // const handleClick = (request_id) => {
  //   RequestService.sendRequest(request_id)
  //   .then((response) => {
  //     console.log(response.data)
  //     navigate("/requests")
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }

  // const approveRequest = (request_id) => {
  //   ApproverService.approveRequest(request_id)
  //   .then((response) => {
  //     console.log(response.data)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }

  let columns;
  switch (type) {
    case "requests":
      columns = [
        { name: "Request Name" },
        { name: "Description" },
        { name: "Amount" },
        { name: "Division" },
        { name: "Department" },
        { name: "Ministry" },
        { name: "Approve" },
      ];
      break;
    case "departments":
      columns = [
        { name: "Department ID" },
        { name: "Name" },
        { name: "Description" },
        { name: "Divisions Count" },
      ];
      break;
    case "division":
      columns = [
        { name: "Division ID" },
        { name: "Division Name" },
        { name: "Division Code" },
      ];
      break;
    case "division_request":
      columns = [
        { name: "Request" },
        { name: "Description" },
        { name: "Amount" },
        { name: "Status" },
      ];
      break;
    case "send_requests":
      columns = [
        { name: "Request" },
        { name: "Description" },
        { name: "Amount" },
        { name: "Status" },
      ];
      break;
    case "ministry_request":
      columns = [
        { name: "Request" },
        { name: "Description" },
        { name: "Amount" },
        { name: "Status" },
        { name: "Division" },
        { name: "Department" },
      ];
      break;
    case "request_by_status":
      columns = [
        { name: "Request" },
        { name: "Description" },
        { name: "Amount" },
        { name: "Ministry" },
        { name: "Status" },
      ];
      break;
    default:
      break;
  }

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.name} className="tableCell">
                {column.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {type === "requests" &&
            data.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.budget_name}</TableCell>
                <TableCell className="tableCell">
                  {request.budget_description}
                </TableCell>
                <TableCell className="tableCell">{request.amount}</TableCell>
                <TableCell className="tableCell">
                  {request.division_name}
                </TableCell>
                <TableCell className="tableCell">
                  {request.departmet_name}
                </TableCell>
                <TableCell className="tableCell">
                  {request.ministry_name}
                </TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${request.status}`}>
                    <CheckIcon
                      className="checkIcon"
                      onClick={() => approveRequest(request.id)}
                    />
                  </span>
                </TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${request.status}`}>
                    <ClearIcon
                      className="clearIcon"
                      onClick={() => rejectRequest(request.id)}
                    />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          {type === "departments" &&
            data.map((department) => (
              <TableRow key={department.name}>
                <TableCell>{department.id}</TableCell>
                <TableCell className="tableCell">{department.name}</TableCell>
                <TableCell className="tableCell">
                  {department.description}
                </TableCell>
                <TableCell className="tableCell">
                  {department.divisionCount}
                </TableCell>
                <TableCell className="tableCell">
                  <div className="cellAction">
                    {console.log(department.id)}
                    <Link
                      to={`/department/${department.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="viewButton">View</div>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          {type === "division" &&
            data.map((division) => (
              <TableRow>
                <TableCell>{division.id}</TableCell>
                <TableCell className="tableCell">
                  {division.divisionName}
                </TableCell>
                <TableCell className="tableCell">
                  {division.divisionCode}
                </TableCell>
                <TableCell className="tableCell">
                  <div className="cellAction">
                    <Link
                      to={`/division/${division.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="viewButton">View</div>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}

          {type === "division_request" &&
            data.map((request) => (
              <TableRow>
                <TableCell className="tableCell">
                  {request.budget_name}
                </TableCell>
                <TableCell className="tableCell">
                  {request.budget_description}
                </TableCell>
                <TableCell className="tableCell">{request.amount}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${request.status}`}>
                    {request.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          {type === "ministry_request" &&
            data.map((ministry_request) => (
              <TableRow key={ministry_request.name}>
                <TableCell>{ministry_request.id}</TableCell>
                <TableCell className="tableCell">
                  {ministry_request.budget_description}
                </TableCell>
                <TableCell className="tableCell">
                  {ministry_request.amount}
                </TableCell>
                <TableCell>
                  <span className={`status ${ministry_request.status}`}>
                    {ministry_request.status}
                  </span>
                </TableCell>
                <TableCell className="tableCell">
                  {ministry_request.division_name}
                </TableCell>
                <TableCell className="tableCell">
                  {ministry_request.departmet_name}
                </TableCell>
                <TableCell className="tableCell">
                  <div className="cellAction">
                    <Link
                      to={`/division/${ministry_request.division_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="viewButton">View</div>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          {type === "request_by_status" &&
            data.map((request) => (
              <TableRow>
                <TableCell className="tableCell">
                  {request.budget_name}
                </TableCell>
                <TableCell className="tableCell">
                  {request.budget_description}
                </TableCell>
                <TableCell className="tableCell">{request.amount}</TableCell>
                <TableCell className="tableCell">
                  {request.ministry_name}
                </TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${request.status}`}>
                    {request.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          {type === "send_requests" &&
            data.map((request) => (
              <TableRow>
                <TableCell className="tableCell">
                  {request.budget_name}
                </TableCell>
                <TableCell className="tableCell">
                  {request.budget_description}
                </TableCell>
                <TableCell className="tableCell">{request.amount}</TableCell>
                <TableCell className="tableCell">
                  <button
                    className="sendButton"
                    onClick={() => handleClick(request.id)}
                  >
                    Send for Approval
                  </button>
                </TableCell>
              </TableRow>
            ))}
          {type === "anotherUserSaw" && (
            <h1>You do not have the permission to view table</h1>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
