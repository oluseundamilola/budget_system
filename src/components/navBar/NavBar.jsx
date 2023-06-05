import "./navbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
// import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
// import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { useEffect, useState } from "react";
import LoginService from "../../services/LoginService"

const NavBar = () => {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const loadUserData = () => {
      LoginService.userInfo()
      .then((response) => {
        setUserData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    loadUserData()
  },[])


  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon />
        </div>

        <div className="items">
          <div className="item">
            <LanguageIcon className="icon" />
            {userData.email}
          </div>
          {/* <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div> */}
          {/* <div className="item">
            <NotificationsOutlinedIcon className="icon" />
            <div className="counter">4</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div> */}
          <div className="item">
            <FormatListBulletedOutlinedIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
