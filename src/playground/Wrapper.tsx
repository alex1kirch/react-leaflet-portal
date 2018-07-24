import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import * as RL from "react-leaflet";

export default class Wrapper extends React.Component {
    render() {
        const { children } = this.props;
        const center: L.LatLngTuple = [51.505, -0.09];

        return (
            <React.StrictMode>
                <RL.Map center={center} zoom={13} style={{ width: "100%", height: "400px" }}>
                    <RL.TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {children}
                </RL.Map>
            </React.StrictMode>
        );
    }
}
