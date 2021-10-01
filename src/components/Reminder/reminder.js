import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listWeek from "@fullcalendar/list";
import listYear from "@fullcalendar/list";
//import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/list/main.css";
import { Link } from "react-router-dom";
import ContactModal from "./event";
import { connect } from "react-redux";

class Reminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGroup : false,
      calendarWeekends: true,
      calendarEvents: this.props.events
    };
    this.addNewEvent = this.addNewEvent.bind(this);
    this.togglePopup = this.togglePopup.bind(this)
  }



    componentWillReceiveProps(nextProps){
      console.log(this.props.accountDetails)
      console.log(nextProps.accountDetails)
       if(this.props.events != nextProps.events){
           this.setState({calendarEvents : nextProps.events})
       }
    }


   addNewEvent(house_id){
        console.log(house_id)
    }

    togglePopup = () => {
        this.setState({showGroup : !this.state.showGroup});
    };

  render() {
    let house_id = this.props.location.state.house_id ? this.props.location.state.house_id : "";
   
    let events = this.state.calendarEvents;
    if(events == undefined){
      events = [];
    }
    /**All Reminder data */
    let subscription = {
      id : "",
      title : "Subscription Expiry Date",
      date : new Date(JSON.parse(localStorage.getItem('user')).subenddate)
    }
    events.push(subscription);
    /**Insurance reminder */
    if(this.props.insurances && this.props.insurances.length > 0){
      for(let i=0; i< this.props.insurances.length; i++){
        console.log(this.props.insurances)
        let subscription = {
          id : "",
          title : this.props.insurances[i].comments,
          date : new Date(this.props.insurances[i].reminder_date)
        }
        events.push(subscription);
    
      }
    }
   
   
  

    return (
      <div className="remainder">
       <div className="row">
           <div className="col-md-4">
                <FullCalendar initialView="listYear" plugins={[listYear]} events={events} />
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6" align="center">
                      <Link onClick={()=>this.togglePopup()} to={{
                            pathname : "/remindercalender",
                            state : {house_id : house_id}
                        }} onClick={()=>this.togglePopup()} className="btn btn-primary btn-sm addNewItem">
                        <span className="glyphicon glyphicon-plus"> </span> Add New Event
                      </Link>
                  </div>
                  <div className="col-md-3"></div>
                </div>
               
           </div>
           <div className="col-md-8">
                <FullCalendar
                events={events}
                defaultView="dayGridMonth"
                plugins={[dayGridPlugin]}
                header={{
                    left: "prev,next today",
                    center: "title",
                    right: "listWeek"
                }}
                />
           </div>
           
       </div>
       {this.state.showGroup ? <ContactModal house_id={house_id} toggle={this.togglePopup} /> : null}
      </div>
    );
  }
}


const mapStateToProps = (state) => (
  console.log("props.insuranceDetails::",state),
  {
  events : state.Reminder.events.data,
   accountDetails : state.Account.accountDetails.data,
   insurances : state.Insurance.insurances.data
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
