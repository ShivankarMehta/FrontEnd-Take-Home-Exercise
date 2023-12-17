import React from "react";
import "./Alertlist.css";
import { IoIosNotificationsOff } from "react-icons/io";
function AlertList({ alerts }) {
  const markAsFalseAlarm = (alertId) => {
    console.log(`Alert ${alertId} marked as false alarm`);
  };

  return (
    <div className="alert-list-container">
      {alerts.map((alert) => (
        <div key={alert.id} className="alert">
          <h3>{alert.alert_type}</h3>
          <p>
            Driver: {alert.driver_friendly_name} / {alert.vehicle_friendly_name}
          </p>
          <p>{new Date(alert.timestamp).toLocaleString()}</p>
          <button onClick={() => markAsFalseAlarm(alert.id)}>
            <IoIosNotificationsOff /> Mark As False Alarm
          </button>
        </div>
      ))}
    </div>
  );
}

export default AlertList;
