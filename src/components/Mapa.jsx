import { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

class PRUEBAMAPA extends Component {
  render() {
    const position = [24.02638287788725, -104.65373294813544];
    return (
      <div>
        <div style={{ height: "200px", width: "100%", padding : "10px"}}>
          <MapContainer
            center={position}
            zoom={10}
            style={{ height: "100%", width: "70%" }} >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default PRUEBAMAPA;