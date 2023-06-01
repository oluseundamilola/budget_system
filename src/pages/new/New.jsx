import { useState } from "react"
import NavBar from "../../components/navBar/NavBar"
import Sidebar from "../../components/sideBar/Sidebar"
import "./new.scss"
import RequestService from "../../services/RequestService"
import { useNavigate, useParams } from "react-router-dom"

const New = ({inputs, title}) => {
  const {division_id} = useParams()
  const navigate = useNavigate()
  const [requestDetails, setRequestDetails] = useState({
    budget_name: "",
    budget_description: "",
    amount: ""
  })

  const handleChange = (e) => {
    const value = e.target.value;
    setRequestDetails({ ...requestDetails, [e.target.name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(requestDetails)
    RequestService.createRequest(division_id, requestDetails)
    .then((response) => {
      console.log(response.data)
      navigate(`/division/${division_id}`)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
      <NavBar />
      <div className="top">
        <h1>{title}</h1>
      </div>
      <div className="buttom">
        <div className="left">
          <img src="" alt="" />
        </div>
        <div className="right">
          <form>
            {inputs.map((input) => (
              <div className="formInput" key={input.id}>
              <label>{input.label}</label>
              <input type={input.type} name={input.name} placeholder={input.placeholder} onChange={(e) => handleChange(e)} />
            </div>
            ))}
            <button onClick={handleSubmit}>Send</button>
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}

export default New
