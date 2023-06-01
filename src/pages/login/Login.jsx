import "./login.scss";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import LoginService from "../../services/LoginService";
import { useState } from "react";

const Login = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setLoginDetails({ ...loginDetails, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(loginDetails)
    await LoginService.loginUser(loginDetails)
    .then( (response) => {
      console.log(response.data)
      signIn({
        token: response.data,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {email: loginDetails.email}
      })
      getUserRole(response.data)
      console.log(`under calling function -> ${userRole}`)
    } )
    .catch((error) => {
      console.log(error)
    })
  }

  const getUserRole = async  (token, res) => {
    console.log("running/")
    await LoginService.userRole(token)
    .then((response) => {
      console.log(response.data)
      res = response.data
      console.log(`inside then -> ${userRole}`)
    })
    .catch((error) => {
      console.log(error)
    })
    setUserRole(res)
    console.log(`after catch -> ${res}`)
    if(res === "ROLE_USER"){
      navigate("/ministry/info")
    }
    else if(res === "ROLE_ADMIN" || res === "ROLE_APPROVER"){
      navigate("/")
    }
    
  }

  return (
    <div className="login">
      <div className="loginContainer">
        <input
          className="inputtext"
          type="text"
          placeholder="email"
          name="email"
          onChange={(e) => handleChange(e)}
        />

        <input
          className="inputtext"
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handleSubmit}>Login</button>
        
      </div>
    </div>
  );
};

export default Login;
