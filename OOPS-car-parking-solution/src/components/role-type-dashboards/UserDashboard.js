import React, { useState } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
import { PermIdentity, Storefront, DirectionsCar, LocalCarWash } from "@material-ui/icons";
// import userEvent from "@testing-library/user-event";
 
export default function UserDashboard() {
  const [loading, setLoading] = useState(false);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [size, setSize] = useState([]);
  const [checkinTime, setCheckinTime] = useState([]);
  const [checkoutTime, setCheckoutTime] = useState([]);
  const [userSelectedLocation, setUserLocation] = useState([]);
  const [textInput, setTextInput] = useState([]);
  const [selectedParkingSpot, setSelectedParkingSpot] = useState([]);
  const { currentUser } = useAuth();
  // const userlocation='airport';
  async function getParkingSpots(userLocation, size) {
    const parkingSpotsCollection = firebase.firestore().collection("parking-spots");
    setLoading(true);
    // async function getSize() {
    //   const sizeCollection = firebase.firestore().collection("size");
    //   setLoading(true);
    // }
    parkingSpotsCollection.get().then((querySnapshot) => {
        const items = [];
      querySnapshot.forEach((doc) => {
        const ps = doc.data();
        const id = doc.id;
          if (ps.location===userLocation &&  ps.size === size) 
            items.push({id, ...doc.data()});
      });
      // if (ps.location === userLocation) {
      //   items.push({ id, ...ps });
      // }
      setParkingSpots(items);
    setLoading(false);
    });
    
  }
 
  // // If using local sprint boot server.
  // setLoading(true)
  // await fetch('http://localhost:8080/parking-spot/?date=2021-11-23')
  // .then(res => res.json())
  // .then((data) => {
  //     console.log(data);
  //     setParkingSpots(data)
  // })
  // .catch(console.log)
  // setLoading(false);
 
  // console.log("parking spots :" + parkingSpots);
  //http://localhost:8080/availableSpots?from=8&to=9;
  function handlerUserLocation() {
    console.log(textInput);
    const userLocation = textInput;
    setUserLocation(userLocation);
    getParkingSpots(userLocation, size);
  }
 

  function handleReserveSlot(id) {
    console.log("handleReserveSlot" + id);
    // console.log(currentUser.email);
    // firebase.firestore().collection("parking-spots").doc(id).update({
    //   available: false,
    //   reservedBy: currentUser.email,
    // });
    // setSelectedParkingSpot(id);
  }
  const handleChange = (event) => {
    setTextInput(event.target.value);
  };
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  }
 
  const handleCheckinChange = (event) => {
    setCheckinTime(event.target.value);
  }

  const handleCheckoutChange = (event) => {
    setCheckoutTime(event.target.value);
  }
 
  return (
    <>
      {loading ? <h1>Loading...</h1> : null}
      {!loading && (
        <div class="container" style={{ display: "flex", marginTop: "10px" }}>
          <div className="sidebar">
            <div className="sidebarWrapper">
              <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                  <Link to="/" className="link">
                    <li className="sidebarListItem active">
                      <PermIdentity className="sidebarIcon" />
                      Available
                    </li>
                  </Link>
                  <Link to="/history" className="link">
                    <li className="sidebarListItem">
                      <Storefront className="sidebarIcon" />
                      History
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          <div class="home">
            <div>
            <div class="widgetLg">
                    <h3 class="widgetLgTitle">Parking Availability: </h3>
                    <table class="widgetLgTable">
                        <tr class="widgetLgTr">
                          <th class="widgetLgTh">Location</th>
                          <td class="widgetLgUser">
                          <input
                                onChange={handleChange}
                                style={{ height: "40px" }}
                                placeholder="Location" 
                          />
                          </td>
                        </tr> 
                        <tr class="widgetLgTr">
                          <th class="widgetLgTh">Check-in Time</th>
                          <td class="widgetLgUser">
                          <input
                                onChange={handleCheckinChange}
                                style={{ height: "40px" }}
                                placeholder="Checkin hour"
                          />
                          </td>
                        </tr> 
                        <tr class="widgetLgTr">
                          <th class="widgetLgTh">Check-out Time</th>
                          <td class="widgetLgUser">
                          <input
                                onChange={handleCheckoutChange}
                                style={{ height: "40px" }}
                                placeholder="Checkout hour"
                          />
                          </td>
                        </tr> 
                        <tr class="widgetLgTr">
                          <th class="widgetLgTh">Vehicle Size</th>
                          <td class="widgetLgUser">
                          <input
                                onChange={handleSizeChange}
                                style={{ height: "40px" }}
                                placeholder="Size"
                          />
                          </td>
                        </tr> 
                        <tr class="widgetLgTr">
                          <th class="widgetLgTh"></th>
                          <td class="widgetLgUser">
                            <button
                                  class="btn btn-primary"
                                  style={{ display: "inline-block", marginTop: "20px" }}
                                  onClick={handlerUserLocation}
                                >
                                  Retrieve
                            </button>
                          </td>
                        </tr> 
                    </table>
                  </div>
            </div>
            {userSelectedLocation.length > 0 && (
              <div>
                <div class="featured">
                  <div class="featuredItem">
                    <span class="featuredTitle">
                      Available parking spots in this area:{" "}
                      <b>{userSelectedLocation}</b>
                    </span>
                    <div class="featuredMoneyContainer">
                      <span class="featuredMoney">
                        {parkingSpots && parkingSpots.length > 0
                          ? parkingSpots.length
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="homeWidgets"
                  style={{ display: "flex", margin: "20px" }}
                >
                  <div class="widgetLg">
                    <h3 class="widgetLgTitle">List of users</h3>
                    <table class="widgetLgTable">
                        <tr class="widgetLgTr">
                          <th class="widgetLgTh">Parking Slot</th>
                          <th class="widgetLgTh">Size</th>
                          <th class="widgetLgTh">Location</th>
                          <th class="widgetLgTh">Hourly Rate</th>
                          <th class="widgetLgTh">Status</th>
                        </tr> 
                    {parkingSpots.map((parkingSpot) => (
                        <tr class="widgetLgTr">
                          <td class="widgetLgUser">
                              <DirectionsCar
                                style={{ width: "80px", height: "80px" }}
                              />
                            <span class="widgetLgName">{parkingSpot.slot}</span>
                          </td>
                          <td class="widgetLgDate">{parkingSpot.size}</td>
                          <td class="widgetLgDate">{parkingSpot.location}</td>
                          <td class="widgetLgTime">{parkingSpot.hourlyRate ? parkingSpot.hourlyRate : "100"}</td>
                          <td class="widgetLgStatus">
                          {parkingSpot.available && (
                          <Link
                            to={{
                              pathname: "/services",
                              state: { ...parkingSpot, checkinTime, checkoutTime }
                            }}
                          >
                            <button
                              class="btn btn-primary"
                              onClick={() => handleReserveSlot(parkingSpot.id)}
                            >
                              <svg
                                class="MuiSvgIcon-root widgetSmIcon"
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
                              </svg>
                              Reserve
                            </button>
                            </Link>
                          )}
                          {!parkingSpot.available && (
                              <button
                                class="btn btn-secondary"
                                onClick={() => alert("Aleready reserved!")}
                              >
                                <svg
                                  class="MuiSvgIcon-root widgetSmIcon"
                                  focusable="false"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
                                </svg>
                                Reserve
                              </button>
                          )}
                          
                          </td>
                        </tr>
                    ))}
                    </table>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );                          
}