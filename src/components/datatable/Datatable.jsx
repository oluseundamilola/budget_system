import { Link } from "react-router-dom";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";



const Datatable = ({ type, data }) => {

  const [buttonDetail, setButtonDetail] = useState("Send to Approver")

  let columns;
  let addType;
  switch (type) {
    case "ministry":
      columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 100 },
        { field: "description", headerName: "Description", width: 170 },
        {
          field: "departmentCount",
          headerName: "Department Count",
          type: "number",
          width: 100,
        },
        { field: "location", headerName: "Location", width: 70 },
        { field: "sector", headerName: "Sectors", type: "number", width: 70 },
        { field: "email", headerName: "User", width: 130 },
      ];
      addType = "Ministry"
      break;

      case "department":
      columns = [
        { field: "department_id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 170 },
        { field: "description", headerName: "Description", width: 300 },
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          width: 100,
        },
        { field: "status", headerName: "Status", width: 100 },
      ];
      addType = ""
      break;
    default:
      break;
  }


  const actionColum = 
      [
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: () => {
            return (
              <div className="cellAction">
                {
                type === "ministry" && 
                <>
                <Link to="/ministry/test">
                  <div className="viewButton">View</div>
                </Link>
                <div className="deleteButton">Delete</div>
                </>
                }
                
              </div>
            );
          },
        },
      ]




  return (
    <div className="datatable">
      <div className="dataTitle">
        Add New {addType}
        <Link
          to="users/new"
          style={{ textDecoration: "none" }}
          className="link"
        >
          Add New
        </Link>
      </div>
      <DataGrid
        rows={data}
        columns={columns.concat(actionColum)}
        initialState={{
          pagination: {
            paginationModel: { page: 2, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
