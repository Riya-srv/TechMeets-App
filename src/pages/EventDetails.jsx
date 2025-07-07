import Header from "../components/Header"
import { useParams } from "react-router-dom"
import useFetch from "../useFetch"

const EventDetails = () => {
    const eventIdObj = useParams()

    const { data, loading, error } = useFetch(`https://tech-meets-app-backend-c45z.vercel.app/events/${eventIdObj.eventId}`)

    //console.log("Data", data)
    if (loading) {
    return (
      <>
        <Header />
        <div className="container"><p>Loading...</p></div>
            
      </>
    );
  }

    const formatEventDate = (dateStr, startTime, endTime) => {
    const date = new Date(dateStr);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = days[date.getDay()];
    const month= months[date.getMonth()];
    const eventDate = date.getDate();
    const year = date.getFullYear();

    return `${day} ${month} ${eventDate} ${year} at ${startTime} to ${day} ${month} ${eventDate} ${year} at ${endTime}`;
  };


    return(
        <>
        <Header />
        <section  className="bg-body-tertiary">
        <div className="container pb-4">
            <div className="row">
                {data ? (
                    <>
                    <div className="col-md-7">
                        <h1 className="py-2">{data.title}</h1>
                        <p>Hosted By: <b>{data.host}</b></p>
                        <img src={data.image} alt="Event Image" style={{ width: "600px", height: "400px" }} className="img-fluid rounded"/>
                        <h3 className="py-2">Details: </h3>
                        <p>{data.description}</p>
                        <h3>Additional Information:</h3>
                        <p><b>Dress Code: </b>{data.dressCode}</p>
                        <p><b>Age Restrictions: </b>{data.ageRestrictions}</p>
                        <h3>Event Tags: </h3>
                        {data.tags.map((tag,index) =>(
                            <a href="#" 
                            className="btn btn-sm text-white me-2 mb-2"
                            style={{ backgroundColor: "#7534b7" }}>
                        {tag}</a>
                        ))}
                    </div>

                <div className="col-md-4 m-4">
                  <div className="card" style={{ width: "400px", border: 0}}>
                    <div className="card-body">
                      <p className="card-text text-body-secondary mb-1 d-flex align-items-center">
                        <i className="bi bi-clock-fill me-2 flex-shrink-0"></i>{" "}
                        {formatEventDate(
                          data.date,
                          data.startTime,
                          data.endTime
                        )}
                      </p>

                      <p className="card-text pt-3 d-flex align-items-center">
                        <i className="bi bi-geo-alt-fill me-2 flex-shrink-0"></i>{" "}
                        {data.venue}
                      </p>

                      <p className="card-text pt-3 d-flex align-items-center">
                        <i className="bi bi-currency-rupee me-2 flex-shrink-0"></i>{" "}
                        {data.price === 0 ? "0.00" : data.price}
                      </p>
                    </div>
                  </div>
                <h3 className="mt-5">Speakers: ({data.speakers.length})</h3>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {data.speakers.map((speaker, index) => (
                      <div
                        key={index}
                        className="card text-center pt-3"
                        style={{ border: 0, width: "200px", minHeight: "180px" }}
                      >
                        <img
                          src={speaker.picture}
                          alt="Profile Picture"
                          className="img-fluid rounded-circle"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            margin: "0 auto",
                          }}
                        />
                        <p>
                          <strong>{speaker.name}</strong>
                        </p>
                        <p>{speaker.role}</p>
                      </div>
                    ))}
                  </div>

                <div className="mt-3">
                    <a to={"#"} className="btn btn-sm text-white me-2 mb-2" style={{backgroundColor: "#7534b7"}}>
                      RSVP
                    </a>
                </div>
            </div>
              </>
                    ) : (
                        <p>Event Not Found!</p>
                    )
                }
            </div>

        </div>
        </section>
        </>
    )
}

export default EventDetails;