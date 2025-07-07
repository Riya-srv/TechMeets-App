import { NavLink } from "react-router-dom";
import meetupIcon from "../assets/meetup.svg";

const Header = ({ searchEvent, setSearchEvent }) => {
  return (
    <header className="bg-body-tertiary">
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex align-items-center justify-content-between">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={meetupIcon}
              alt="TechMeets"
            />
            <span style={{fontFamily: "Rubik"}}>Tech<span style={{ color: "#7534b7" }}>Meets</span>
            </span>
          </NavLink>

          <form
            className="d-flex"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control"
              type="search"
              placeholder="Search by title and tags"
              aria-label="Search"
              style={{ width: "180px" }}
              value={searchEvent}
              onChange={(e) => setSearchEvent(e.target.value)}
            />
          </form>
        </div>
      </nav>

        <div className="container pt-1">
        <hr
          style={{
            margin: "0",
            borderTop: "2px solid #ccc",
            opacity: "1",
          }}
        />
        </div>
    </header>
  );
};

export default Header;