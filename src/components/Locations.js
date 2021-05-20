import React, { useState } from "react";
import MapDisplay from "./MapDisplay";
import "leaflet/dist/leaflet.css";
import "./locations.scss";

const locations = [
  {
    name: "Park Slope",
    address1: "461 6th St",
    address2: "",
    city: "Brooklyn",
    state: "NY",
    zipCode: "11215",
    coords: ["40.66903", "-73.982345"],
  },
  {
    name: "Upper East Side",
    address1: "165 E 88th St",
    address2: "Second Floor",
    city: "New York",
    state: "NY",
    zipCode: "10128",
    coords: ["40.780559", "-73.95569"],
    availableExperienceLevels: ["Advanced Code", "Beginner Code"],
  },
  {
    name: "Long Island",
    address1: "3525 Sunrise Hwy",
    address2: "",
    city: "Oakdale",
    state: "NY",
    zipCode: "11769",
    coords: ["40.767263", "-73.153151"],
    availableExperienceLevels: ["Advanced Code", "Beginner Code"],
  },
  {
    name: "Online",
    address1: "Your home",
    address2: "",
    city: "Anywhere",
    state: "",
    zipCode: "",
    coords: [],
    availableExperienceLevels: ["Advanced Code", "Beginner Code"],
  },
];

const Locations = () => {
  const defaultLocation = locations[0];
  const [location, setLocation] = useState(defaultLocation);

  return (
    <div className="locations">
      <div className="locations__buttons">
        {!!locations &&
          locations.map((l, i) => (
            <button
              className="custom-button"
              key={`location-${i}`}
              onClick={() => setLocation(l)}
            >
              {l.name}
            </button>
          ))}
      </div>
      <div className="locations__map">
        <MapDisplay addressCoords={location.coords} />
      </div>
      <div className="locations__details">
        <h2>{location.name}</h2>
        <div className="locations__details__address">
          <h3>{location.address1}</h3>
          {!!location.address2 && <h3>{location.address2}</h3>}
          <h3>{`${location.city}, ${location.state} ${location.zipCode}`}</h3>
        </div>
      </div>
    </div>
  );
};

// Reviews.propTypes = {
//   data: PropTypes.shape({
//     heading: PropTypes.string,
//     reviews: PropTypes.arrayOf(
//       PropTypes.shape({
//         reviewList: PropTypes.string,
//         name: PropTypes.string,
//       })
//     ),
//   }),
// };

export default Locations;
