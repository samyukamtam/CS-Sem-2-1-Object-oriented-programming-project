import React, { useState, useEffect } from "react"
import { Alert, Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import AdminDashboard from "./role-type-dashboards/AdminDashboard"
import WorkerDashboard from "./role-type-dashboards/WorkerDashboard"
import UserDashboard from "./role-type-dashboards/UserDashboard"
import firebase from '../firebase'

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()

  const [currentUserRole, setLoggedInUserRole] = useState([]);

  const [loading, setLoading] = useState(false);

  // TODO: Need api to get the user role
  // Role Id 1. Admin 2. Worker 3. User
  const usersCollection = firebase.firestore().collection('users')

  function getLoggedInUserRole(){
    setLoading(true);
    usersCollection.get().then((users) => {
      const items = users.docs.map((doc) => doc.data());
      // console.log(items)
      const user = items.find((user) => user.id === currentUser.email)
      setLoggedInUserRole(user);
      setLoading(false);
    });
  }
  useEffect(() => {
    //getUsers();
    getLoggedInUserRole();
    // eslint-disable-next-line
  }, []);

  console.log(currentUserRole);

  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? <h1>Loading...</h1> : null}
      {!loading && 
        <main role="main" style={{ minWidth :"100%", height:"100vh" }}>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        Hello, {currentUserRole?.desc || currentUser.email}
                    </li>
                </ul>
                <div>
                  <a class="btn btn-secondary" href="/update-profile" role="button">Update Profile »</a>
                </div>
                <div>
                  <Button variant="link" onClick={handleLogout}>
                    Log Out
                  </Button>
                </div>
            </div>
          </nav>
          { currentUserRole && currentUserRole.roleId === 1 && <AdminDashboard/> }
          { currentUserRole && currentUserRole.roleId === 2 && <WorkerDashboard/> }
          { currentUserRole && currentUserRole.roleId === 3 && <UserDashboard/> }
          { (!currentUserRole || !currentUserRole.roleId ) && <UserDashboard/> }
        </main>
      }
    </>
  )
}
// import React, { useState, useEffect } from "react"
// import { Alert, Button } from "react-bootstrap"
// import { useAuth } from "../contexts/AuthContext"
// import { useHistory } from "react-router-dom"
// import AdminDashboard from "./role-type-dashboards/AdminDashboard"
// import WorkerDashboard from "./role-type-dashboards/WorkerDashboard"
// import UserDashboard from "./role-type-dashboards/UserDashboard"
// import firebase from '../firebase'

// export default function Dashboard() {
//   const [error, setError] = useState("")
//   const { currentUser, logout } = useAuth()

//   const [currentUserRole, setLoggedInUserRole] = useState([]);

//   const [loading, setLoading] = useState(false);

//   // TODO: Need api to get the user role
//   // Role Id 1. Admin 2. Worker 3. User
//   const usersCollection = firebase.firestore().collection('users')

//   function getLoggedInUserRole(){
//     setLoading(true);
//     usersCollection.get().then((users) => {
//       const items = users.docs.map((doc) => doc.data());
//       //console.log(items)
//       const user = items.find((user) => user.id === currentUser.email)
//       setLoggedInUserRole(user);
//       setLoading(false);
//     });
//   }
//   useEffect(() => {
//     //getUsers();
//     getLoggedInUserRole();
//     // eslint-disable-next-line
//   }, []);
//   console.log(currentUserRole);
//   const history = useHistory()

//   async function handleLogout() {
//     setError("")

//     try {
//       await logout()
//       history.push("/login")
//     } catch {
//       setError("Failed to log out")
//     }
//   }

//   return (
//     <>
//       {error && <Alert variant="danger">{error}</Alert>}
//       {loading ? <h1>Loading...</h1> : null}
//       {!loading && 
//         <main role="main" style={{ minWidth :"100%", height:"100vh" }}>
//           <nav class="navbar navbar-expand-lg navbar-light bg-light">
//             <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
//                 <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
//                     <li class="nav-item active">
//                         Hello, {currentUserRole?.desc || currentUser.email}
//                     </li>
//                 </ul>
//                 <div>
//                   <a class="btn btn-secondary" href="/update-profile" role="button">Update Profile »</a>
//                 </div>
//                 <div>
//                   <Button variant="link" onClick={handleLogout}>
//                     Log Out
//                   </Button>
//                 </div>
//             </div>
//           </nav>
//           { currentUserRole && currentUserRole.roleId === 1 && <AdminDashboard/> }
//           { currentUserRole && currentUserRole.roleId === 2 && <WorkerDashboard/> }
//           { currentUserRole && currentUserRole.roleId === 3 && <UserDashboard/> }
//           { (!currentUserRole || !currentUserRole.roleId ) && <UserDashboard/> }
//         </main>
//       }
//     </>
//   )
// }
