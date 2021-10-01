import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "../style/Header.css";
import { connect } from "react-redux";
import { ownerHouseDetails } from "../store/Actions/house";
import { getContact, getGroup } from "../store/Actions/contact";
import { getLoan, getLoanTransaction, getMortgageTransaction } from "../store/Actions/Loan";
import { getInsurance } from "../store/Actions/insurance";
import { getWarranty } from "../store/Actions/Warranty";
import { getTransaction } from "../store/Actions/Transaction";
import { getDocument } from "../store/Actions/Document";
import { getLink } from "../store/Actions/Link";
import { getShare } from "../store/Actions/Share";
import { getGallery } from "../store/Actions/Gallery";
import { getLease } from "../store/Actions/Lease";
import logo from "../Logo.png";
import { getHouseDetail } from "../store/Actions/house";
import { getEvent } from "../store/Actions/Reminder";


const Navbar = (props) => {
   console.log('userDatauserData', props.accountDetails);
 
  const user = JSON.parse(localStorage.getItem('user'));
  let userRole = user.role
  const [owner_id, setOwner_id] = useState(JSON.parse(localStorage.getItem('user')).id);
  const [buttonStatus, setButtonStatus] = useState("")
  const [clickStatus, setClickStatus] = useState(false);
  
  if (user) {
    var Uname = user ? user["name"] : "";
  }


  useEffect(() => {
    if (props.house && props.house.length > 0) {
      console.log(props.house[0]['house']["id"]);
      let data = {
        "house_id": props.house[0]['house']["id"],
        "email": JSON.parse(localStorage.getItem('user')).email
      }
      props.getContact(data)
      props.getTransaction(data);
      props.getMortgageTransaction(data);
      props.getLoan(data);
      var param = {
        data: [
          { "id": props.house[0]['house']["id"], email: JSON.parse(localStorage.getItem('user')).email },
        ]
      };
      props.getHouseDetail(param);
    }
  }, [props.house])

  const handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/");
  }

  useEffect(() => {
    props.ownerHouseDetails({ "owner_id": JSON.parse(localStorage.getItem('user')).email })
  }, [])

  const [house_id, setHouse_id] = useState("");

  const updateHouse = (id, type) => {


    setHouse_id(id);
    let data = {
      "house_id": id,
      "email": JSON.parse(localStorage.getItem('user')).email
    }

    props.getGroup(data);

    if (type === "contact") {
      props.getLoan(data);
      props.getTransaction(data);
      props.getContact(data)
    } else if (type === "transaction" || type === "homecost") {
      props.getLoan(data);
      props.getContact(data)
      if (type === "homecost") {
        let data = {
          "house_id": id,
          "email": JSON.parse(localStorage.getItem('user')).email,
          "hometocost": true
        }
        props.getTransaction(data);
      } else {
        props.getTransaction(data);
      }

      props.getMortgageTransaction(data);
    } else if (type === "loan") {
      props.getLoan(data);
    } else if (type === "warranty") {
      props.getWarranty(data);
    } else if (type === "insurance") {
      props.getInsurance(data);
    } else if (type === "document") {
      props.getDocument(data);
    } else if (type === "link") {
      props.getLink(data);
    } else if (type == "shareproperty") {
      props.getShare(data);
    } else if (type === 'gallary') {
      props.getGallery(data);
    } else if (type === 'leases') {
      props.getLease(data);
    } else if (type == "report") {
      props.getContact(data)
      props.getTransaction(data);
    } else if (type == "reminders") {
      props.getInsurance(data);
      props.getEvent(data)
    }

    var param = {
      data: [
        { "id": id, email: JSON.parse(localStorage.getItem('user')).email },
      ]
    };
    props.getHouseDetail(param);

  }

  useEffect(() => {
    if (props.houseDetail && props.houseDetail.house.length > 0) {

      document.getElementById("root").classList.remove("full-access");
      document.getElementById("root").classList.remove("read-only");

      if (props.houseDetail.house[0].accesslevel == "Read-Only") {
        document.getElementById("root").classList.add("read-only");
      } else {
        document.getElementById("root").classList.add("full-access");
      }
      let path = window.location.pathname;
      if ("/house-details" === path || "/title-holders" === path || "/hoa-detail" === path || "/realtor-detail" === path || "/hmo-space" === path) {
        setHouse_id(props.houseDetail.house[0].id);
      }
    }
  }, [props.houseDetail]);



  return (
    <React.Fragment>
      <nav className="navbar navbar-default navbar-fixed-top outer-bg">
        <div className="container-fluid">
          <div className="navbar-header">

            <NavLink className="navbar-brand header-color" to={"/dashboard"} onClick={() => updateHouse(props.house[0]['house']["id"], "")}>
              <img src={logo} className="logo" />
            </NavLink>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <NavLink
                to="/"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>
                  <i className="glyphicon glyphicon-user header-color"></i>
                  <span className="header-color"> Hello, {Uname}</span>
                </span>
                <span className="caret header-color" />
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="" to={{
                    pathname: "/personal",
                    state: {}
                  }}><span className="glyphicon glyphicon-user header-color" /> Account Details</NavLink>
                </li>
                <li>
                  <NavLink to={"/"} onClick={handleLogout}>
                    <span className="glyphicon glyphicon-log-in header-color" /> Logout
                  </NavLink>
                </li>
                {userRole === "1" && 
                <React.Fragment>
                <li>
                  <NavLink to={{
                    pathname: "/create-user",
                    state: {}
                  }}>
                    Create User
                  </NavLink>
                </li>
                <li>
                  <NavLink to={{
                    pathname: "/user-list",
                    state: {}
                  }}>
                    List User
                  </NavLink>
                </li>
                <li>
                  <NavLink to={{
                    pathname: "/mail-list",
                    state: {}
                  }}>
                    Mail List
                  </NavLink>
                </li>
                </React.Fragment>
                }
              </ul>
            </li>
          </ul>
        </div>
        <div className="container-fluid inner-bg">
          <ul className="nav navbar-nav">
            {
              props.house ? (props.house.map((house) => {
                return (
                  <li key={house.house.id} className={house_id === house.house.id ? "dropdown houseDropDown house-selected" : "dropdown houseDropDown"} >
                    <NavLink
                      to="/"
                      className="dropdown-toggle header-color "
                      data-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="navinner"> {house.house.houseno + (house.house.city ? " - " + house.house.city : "")} </span>
                      <span className="caret" />
                    </NavLink>
                    <ul className="dropdown-menu header-color">
                      <section className="homeDropDown">
                        <section>
                          <li>
                            <NavLink onClick={() => updateHouse(house.house.id, "contact")} to={{
                              pathname: "/contact",
                              state: { house_id: house.house.id }
                            }} >
                              Contacts
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={{
                              pathname: "/loan-list",
                              state: { house_id: house.house.id }
                            }} onClick={() => updateHouse(house.house.id, "loan")}>
                              Loans
                            </NavLink>
                          </li>

                          <li>
                            <NavLink to={{
                              pathname: "/insurance-list",
                              state: { house_id: house.house.id }
                            }} onClick={() => updateHouse(house.house.id, "insurance")}>
                              Insurance
                            </NavLink>
                          </li>

                          <li>
                            <NavLink to={{
                              pathname: "/transaction-list",
                              state: { house_id: house.house.id }
                            }} onClick={() => updateHouse(house.house.id, "transaction")}>
                              Transactions
                            </NavLink>
                          </li>
                        </section>
                        <section>
                          <li>
                            <NavLink to={{
                              pathname: "/warranty-list",
                              state: { house_id: house.house.id }
                            }} onClick={() => updateHouse(house.house.id, "warranty")}>
                              Warranties
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={{
                              pathname: "homecost",
                              state: { house_id: house.house.id }
                            }} onClick={() => updateHouse(house.house.id, "homecost")}>
                              Home Cost
                            </NavLink>
                          </li>


                          <li>
                            <NavLink to={{
                              pathname: "share-list",
                              state: { house_id: house.house.id }
                            }} onClick={() => updateHouse(house.house.id, "shareproperty")}>
                              Share Property
                            </NavLink>
                          </li>

                          <li>
                            <NavLink to={{
                              pathname: "lease-list",
                              state: { house_id: house.house.id }
                            }} onClick={() => updateHouse(house.house.id, "leases")}>
                              Leases
                            </NavLink>
                          </li>

                        </section>
                        <section>
                          <li>
                            <NavLink to={{
                              pathname: "/document-list",
                              state: { house_id: house.house.id }
                            }} onClick={() => updateHouse(house.house.id, "document")}>
                              Documents
                            </NavLink>
                          </li>

                          <li>
                            <NavLink to={{
                              pathname: "/link-list",
                              state: { house_id: house.house.id }
                            }} onClick={() => updateHouse(house.house.id, "link")}>
                              Links
                            </NavLink>
                          </li>


                          <li>
                            <NavLink to={{
                              pathname: "/gallary",
                              state: { house_id: house.house.id }
                            }} onClick={() => updateHouse(house.house.id, "gallary")}>
                              Gallaries
                            </NavLink>
                          </li>

                          <li>
                            <NavLink to={{
                              pathname: "/remindercalender",
                              state: { house_id: house.house.id }
                            }} onClick={() => updateHouse(house.house.id, "reminders")}>
                              Reminders
                            </NavLink>
                          </li>
                        </section>
                        <section>
                          <li>
                            <NavLink to={{
                              pathname: "report-list",
                              state: { house_id: house.house.id }
                            }} onClick={() => updateHouse(house.house.id, "report")}>
                              Reports
                            </NavLink>
                          </li>
                           <li>
                            <NavLink to={{
                              pathname: "incident",
                              state: { house_id: house.house.id }
                            }} onClick={() => updateHouse(house.house.id, "incident")}>
                              Incidents
                            </NavLink>
                          </li>
                        </section>
                      </section>
                    </ul>
                  </li>
                )
              })
              ) :
                ""
            }

          </ul>
        </div>
      </nav>

    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  house: state.House.houses.data,
  houseDetail: state.House.houseDetail.data,
  accountDetails : state.Account.accountDetails.data
})

const mapDispatchToProps = {
  ownerHouseDetails,
  getContact,
  getLoan,
  getInsurance,
  getWarranty,
  getTransaction,
  getDocument,
  getLink,
  getShare,
  getGallery,
  getLease,
  getHouseDetail,
  getLoanTransaction,
  getMortgageTransaction,
  getGroup,
  getEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
