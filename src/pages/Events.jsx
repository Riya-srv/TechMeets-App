import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../useFetch";

const Events = ({ searchEvent }) => {
  const [eventFilter, setEventFilter] = useState("Both");

  const { data, loading, error } = useFetch(
    "https://tech-meets-app-backend-c45z.vercel.app/events/"
  );

  //console.log(data);
    if (loading) {
    return (
      <>
        <div className="container"><p>Loading...</p></div>
            
      </>
    );
  }
  


  // Function to display date
  const formatEventDate = (dateStr, timeStr) => {
  const date = new Date(`${dateStr}`);


  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // const time = date.toLocaleTimeString("en-IN", {
  //   hour: "numeric",
  //   minute: "numeric",
  //   second: "numeric", 
  //   hour12: false,
  //   timeZone: "Asia/Kolkata"
  // });

  return `${dayName} ${monthName} ${day} ${year} • ${timeStr} IST`;
};

  // to filter events by type
  // NOTE : data || [] for fallback
 
  const eventsByType = (
    eventFilter === "Both"? (data || []) : (data || []).filter((event) => event.type === eventFilter)
  )

  // to search by title and tags
  //NOTE : toLowerCase(), some(), includes() are string functions.

  const filteredEvents = eventsByType.filter(
    (event) => (!searchEvent) || event.title.toLowerCase().includes(searchEvent.toLowerCase()) ||
      (event.tags.some((tag) => tag.toLowerCase().includes(searchEvent.toLowerCase())))
  );


  return (
    <div className="container">
      <div className="container d-flex align-items-center justify-content-between">
        <h1>Meetup Events</h1>

        <select
          className="form-select"
          style={{ width: "180px" }}
          onChange={(e) => setEventFilter(e.target.value)}
        >
          <option value="Both">Select Event Type</option>

          <option value="Both">Both</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
      </div>

      <div>
        <div className="row">
          {filteredEvents.map((event) => (
            <div key={event._id} className="col-md-4">
              <div className="card h-100 text-reset border-0 m-4">
                  <Link to={`/events/${event._id}`}><img
                    src={event.image}
                    alt="Event Image"
                    className="card-img-top rounded img-fluid"
                    style={{ height: "200px"}}
                  /></Link>
                  <span
                    className="position-absolute badge bg-white text-dark fw-normal px-2 py-1 rounded"
                    style={{
                      top: "10px",
                      left: "10px",
                      fontSize: "14px",
                    }}
                  >
                    {event.type} Event
                  </span>

                  <div className="card-body pb-2 ps-0">
                    <p className="card-text text-body-secondary mb-1">
                      {formatEventDate(event.date, event.startTime)}
                    </p>
                    <h5 className="card-title mb-0">{event.title}</h5>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
