import React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

const inlineRocketLogo =
  "data:image/svg+xml,%3Csvg width='45' height='45' viewBox='0 0 273 275' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M136.5 257C202.774 257 256.5 203.274 256.5 137C256.5 70.7258 202.774 17 136.5 17C70.2258 17 16.5 70.7258 16.5 137C16.5 203.274 70.2258 257 136.5 257Z' fill='%23274548'/%3E%3Cmask id='mask0' mask-type='alpha' maskUnits='userSpaceOnUse' x='16' y='17' width='241' height='240'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M136.5 257C202.774 257 256.5 203.274 256.5 137C256.5 70.7258 202.774 17 136.5 17C70.2258 17 16.5 70.7258 16.5 137C16.5 203.274 70.2258 257 136.5 257Z' fill='white'/%3E%3C/mask%3E%3Cg mask='url(%23mask0)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M136.5 322C200.013 322 251.5 292.899 251.5 257C251.5 221.101 200.013 192 136.5 192C72.9873 192 21.5 221.101 21.5 257C21.5 292.899 72.9873 322 136.5 322Z' fill='%23FBF6EE'/%3E%3C/g%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M115.995 120.271C115.995 120.271 108.221 122.363 106.114 128.87C104.008 135.376 114.863 167.981 114.863 167.981H117.059C117.059 167.981 128.011 135.42 125.876 128.87C123.741 122.319 115.995 120.271 115.995 120.271Z' fill='%239FE2DD'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M157.635 120.271C157.635 120.271 149.861 122.363 147.754 128.87C145.648 135.376 156.503 167.981 156.503 167.981H158.698C158.698 167.981 169.65 135.42 167.516 128.87C165.381 122.319 157.635 120.271 157.635 120.271Z' fill='%239FE2DD'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M136.766 114.828C136.766 114.828 125.798 136.887 125.798 154.62C125.798 172.354 136.766 185.323 136.766 185.323C136.766 185.323 147.714 172.378 147.714 154.62C147.714 136.863 136.766 114.828 136.766 114.828Z' fill='%23EDC034'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M136.764 102.898C136.764 102.898 127.99 117.449 127.99 142.691C127.99 167.932 136.764 173.393 136.764 173.393C136.764 173.393 145.522 167.847 145.522 142.691C145.522 117.534 136.764 102.898 136.764 102.898Z' fill='%23EDC034'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M136.702 66C136.702 66 113.518 83.0365 113.518 112.114C113.518 141.19 136.779 147.481 136.779 147.481C136.779 147.481 160 141.093 160 112.114C160 83.1345 136.702 66 136.702 66Z' fill='%23FBF6EE'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M143.326 72.1048C139.603 66.1523 136.686 63 136.686 63C136.686 63 133.871 66.0394 130.247 71.8005C132.315 72.829 134.645 73.4074 137.111 73.4074C139.322 73.4074 141.424 72.9424 143.326 72.1048Z' fill='%23EDC034'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M136.741 90.193C131.831 90.193 127.852 94.1727 127.852 99.0819C127.852 103.991 131.831 107.971 136.741 107.971C141.65 107.971 145.63 103.991 145.63 99.0819C145.63 94.1727 141.65 90.193 136.741 90.193Z' fill='%23274548'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M136.741 120.074L130.074 128.222L134.542 167.492H138.99L143.407 128.222' fill='%239FE2DD'/%3E%3C/svg%3E%0A";

const MapDisplay = ({ addressCoords }) => {
  if (typeof window !== "undefined") {
    const mapIcon = new L.Icon({
      iconUrl: inlineRocketLogo,
      iconRetinaUrl: inlineRocketLogo,
      iconAnchor: null,
      popupAnchor: null,
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
      iconSize: new L.Point(45, 45),
      className: "leaflet-map-marker",
    });
    return (
      <Map center={addressCoords} zoom={14} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          crossOrigin
        />
        <Marker position={addressCoords} icon={mapIcon} />
      </Map>
    );
  }
  return null;
};

export default MapDisplay;
