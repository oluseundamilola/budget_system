import "./list.scss"
import NavBar  from "../../components/navBar/NavBar"
import SideBar from "../../components/sideBar/Sidebar"
import Datatable from "../../components/datatable/Datatable"
import { useEffect, useState } from "react"
import MinistryService from "../../services/MinistryService"


const List = () => {
  const [allMinistries, setAllMinistries] = useState([])

  useEffect(() => {
    const loadAllMinistryData = () => {
      MinistryService.loadAllMinistries()
      .then((response) => {
        console.log(response.data)
        setAllMinistries(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    loadAllMinistryData()
  }, [])
  

  return (
    <div className="list">
      <SideBar type="admin" />
      <div className="listContainer">
        <NavBar />
        <Datatable type = "ministry" data = {allMinistries}/>
      </div>
    </div>
  )
}

export default List
