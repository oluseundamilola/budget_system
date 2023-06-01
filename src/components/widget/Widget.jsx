import { Link } from "react-router-dom";
import "./widget.scss"
// import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const Widget = ({ type, count }) => {
    let data;
    const amount = 1000;
    // const diff = 20;

    switch(type){
        case "ministry":
            data = {
                title: "MINITRIES",
                link: "view",
                link_path: "/ministry",
                data_amount: count,
                icon: (
                    <PersonOutlineOutlinedIcon 
                    className="icon" 
                    style={
                        {backgroundColor: "#00a30e4c", color: "green"}
                    }
                    />
                ),
            }
        break
        case "department":
            data = {
                title: "DEPARTMENTS",
                link: "view",
                link_path: "",
                data_amount: count,
                icon: (
                    <PersonOutlineOutlinedIcon 
                    className="icon" 
                    style={
                        {backgroundColor: "#a300004b", color: "red"}
                    }
                    />
                ),
            }
        break
        case "division":
            data = {
                title: "DIVIONS",
                link: "view",
                link_path: "",
                data_amount: 18,
                icon: (
                    <PersonOutlineOutlinedIcon 
                    className="icon" 
                    style={
                        {backgroundColor: "#eeff0049", color: "#858500"}
                    }
                    />
                ),
            }
        break
        case "Request":
            data = {
                title: "REQUESTS",
                link: "view",
                link_path: "",
                data_amount: 33,
                icon: (
                    <PersonOutlineOutlinedIcon 
                    className="icon" 
                    style={
                        {backgroundColor: "#da00914a", color: "purple"}
                    }
                    />
                ),
            }
        break
        default:
            break
    }

  return (
    <div className="widget">
      <div className="left">
        <div className="title">{data.title}</div>
        <div className="count">
        <span className="countText">count: </span>
        <div className="counter">{data.data_amount}</div>
        </div>
        <Link to={data.link_path} style={{textDecoration: "none"}}>
        <div className="link">{data.link}</div>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
            {/* <KeyboardArrowUpOutlinedIcon />
            {diff} */}
        </div>
        {data.icon}
      </div>
    </div>
  )
}

export default Widget
