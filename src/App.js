import React, { useState, useEffect } from "react";
import "./App.css";
import AlertList from "./Alert";
import { FaRegCopyright } from "react-icons/fa";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVehicle, setSearchVehicle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const loadVehicles = async () => {
      const response = await fetch("/vehicles.json");
      const data = await response.json();
      setVehicles(data);
    };

    const loadAlerts = async () => {
      const response = await fetch("/alerts.json");
      const data = await response.json();
      setAlerts(data);
    };

    loadVehicles();
    loadAlerts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleVehicleSearch = (event) => {
    setSearchVehicle(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filterAlerts = (alerts) => {
    return alerts.filter((alert) => {
      const alertDate = new Date(alert.timestamp);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      const textMatch =
        alert.alert_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.driver_friendly_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        alert.vehicle_friendly_name
          .toLowerCase()
          .includes(searchVehicle.toLowerCase());
      const startDateMatch = start ? alertDate >= start : true;
      const endDateMatch = end ? alertDate <= end : true;

      return textMatch && startDateMatch && endDateMatch;
    });
  };

  const filteredAlerts = filterAlerts(alerts);

  return (
    <div className="container">
      <div className="header">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="vehicle-input">
          <input
            type="text"
            placeholder="Vehicle"
            value={searchVehicle}
            onChange={handleVehicleSearch}
            list="vehicle-options"
          />
          <datalist id="vehicle-options">
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.friendly_name} />
            ))}
          </datalist>
        </div>
        <div className="date-range-input">
          <label htmlFor="start-date">Start Date:</label>
          <input
            type="date"
            id="start-date"
            onChange={handleStartDateChange}
            value={startDate}
          />

          <label htmlFor="end-date">End Date:</label>
          <input
            type="date"
            id="end-date"
            onChange={handleEndDateChange}
            value={endDate}
          />
        </div>
      </div>
      <div className="alerttitle">Alerts</div>
      <AlertList alerts={filteredAlerts} />
      <div className="footer">
        Copyright <FaRegCopyright /> enview.ai 2023
      </div>
    </div>
  );
}

export default App;
