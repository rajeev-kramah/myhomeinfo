import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
 
class Alertmessage extends Component {
    createNotification (type,message){
        switch (type) {
          case 'info':
             return NotificationManager.info(message);
          case 'success':
            return NotificationManager.success(message);
         
          case 'warning':
             return NotificationManager.warning(message, 3000);
           
          case 'error':
            return NotificationManager.error(message, 5000, () => {
              alert('callback');
            });
           default: 
            return NotificationManager.info(message);
      };
  }
 
  render() {
    return (
      <div>
        <NotificationContainer/>
      </div>
    );
  }
}
 
export default Alertmessage;