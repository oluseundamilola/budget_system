import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { DepartmentInput, DivisionInput, RequestInput, ministyInput } from "./formSource";
import { RequireAuth } from "react-auth-kit";
import DepartmentSingle from "./pages/single/DepartmentSingle";
import DivisionSingle from "./pages/single/DivisionSingle";
import RequestList from "./pages/list/RequestList";
import RequestStatus from "./pages/list/RequestStatus";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<RequireAuth loginPath='/login'><Home /></RequireAuth>} />
            <Route path="/login" element={<Login />} />
            <Route path="ministry">
              <Route index element={<RequireAuth loginPath='/login'><List /></RequireAuth>  } />
              <Route path="info" element = {<RequireAuth loginPath='/login'><Single /></RequireAuth>  } />
              <Route path="new" element = {<RequireAuth loginPath='/login'><New inputs={ministyInput} title="Add new Ministry" /></RequireAuth>  } />
            </Route>

            <Route path="department">
              <Route index element={<RequireAuth loginPath='/login'><List /></RequireAuth>  } />
              <Route path=":department_id" element = {<RequireAuth loginPath='/login'><DepartmentSingle /></RequireAuth>  } />
              <Route path="new" element = {<RequireAuth loginPath='/login'><New inputs={DepartmentInput} title="Add new Department" type="department" /></RequireAuth>  } />
            </Route>

            <Route path="division">
              <Route index element={<RequireAuth loginPath='/login'><List /></RequireAuth>  } />
              <Route path=":division_id" element = {<RequireAuth loginPath='/login'><DivisionSingle /></RequireAuth>  } />
              <Route path="new/:department_id" element = {<RequireAuth loginPath='/login'><New inputs={DivisionInput} title="Add new Division" type="division" /></RequireAuth>  } />
            </Route>

            <Route path="requests">
              <Route index element={<RequireAuth loginPath='/login'><RequestList /></RequireAuth>  } />
              <Route path=":division_id" element = {<RequireAuth loginPath='/login'><DivisionSingle /></RequireAuth>  } />
              <Route path="new/:division_id" element = {<RequireAuth loginPath='/login'><New inputs={RequestInput} title="Create Request" type="request" /></RequireAuth>  } />
              <Route path="approved" element = {<RequireAuth loginPath='/login'><RequestStatus type="Approved" /></RequireAuth>  } />
              <Route path="rejected" element = {<RequireAuth loginPath='/login'><RequestStatus type="Rejected" /></RequireAuth>  } />
            </Route>

            <Route path="products">
              <Route index element={ <List /> } />
              <Route path=":productId" element = { <Single /> } />
              <Route path="new" element = { <New inputs={DepartmentInput} title="Add new Department" /> } />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
