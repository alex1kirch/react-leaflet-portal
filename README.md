DEPRECATED: React-Leaflet 3.2.0 had already solved the issue which solved by creating this package. The React-Leaflet 3.2.0 package use Context, and you can get access to the map object through the `useMap` hook.

So instead of the current React Leaflet Portal package, I recommend using https://react-leaflet.js.org/docs/example-react-control to solving your tasks.

# react-leaflet-portal

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://github.com/alex1kirch/react-leaflet-portal/blob/master/LICENSE) [![Build Status](https://circleci.com/gh/alex1kirch/react-leaflet-portal/tree/master.svg?style=shield)](https://circleci.com/gh/alex1kirch/react-leaflet-portal/tree/master) [![codecov](https://codecov.io/gh/alex1kirch/react-leaflet-portal/branch/master/graph/badge.svg)](https://codecov.io/gh/alex1kirch/react-leaflet-portal)

The repository contains component that use [React Portals](https://reactjs.org/docs/portals.html) to [leaflet map controls](https://leafletjs.com/reference-1.3.2.html#control).

-   [Purpose](#purpose)
-   [Requirements](#requires)
-   [Quick Start](#quick-start)
-   [Usage](#usage)

## Purpose

The component allows to use the leaflet control panel like a normal React child. Features like context are availble because the component child still exists in the React tree.

## Requires

React, ReactDOM, Leaflet and React-Leaflet are peer dependencies, if you haven't already installed them you can use:

```sh static
    npm install leaflet react react-dom react-leaflet # npm
    yarn add leaflet react react-dom react-leaflet # Yarn
```

For typescript:

```sh static
    npm install @types/leaflet @types/react @types/react-dom @types/react-leaflet # npm
    yarn add @types/leaflet @types/react @types/react-dom @types/react-leaflet # Yarn
```

## Quick Start

### Using npm or Yarn

```sh static
    npm install react-leaflet-portal # npm
    yarn add react-leaflet-portal # Yarn
```

Please read the [Introduction](https://react-leaflet.js.org/docs/en/intro.html) and [Leaflet](https://react-leaflet.js.org/docs/en/setup.html) pages of react-leaflet library.

# Usage

```jsx static
import * as React from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as RL from "react-leaflet";
import { Portal } from "react-leaflet-portal";
import * as geojson from "geojson";
// see https://leafletjs.com/examples/choropleth/
import map from "./us-states.json";

type State = { selected?: geojson.Feature };
export default class MyMap extends React.Component<{}, State> {
    state: State = {};

    highlightFeature = (e: { target: { feature: geojson.Feature } }) => {
        const layer = e.target;
        this.setState({ selected: layer.feature });
    };

    resetHighlight = () => {
        this.setState({ selected: undefined });
    };

    handleEachFeature = (feature: geojson.Feature, layer: L.Layer) => {
        layer.on({
            mouseout: this.resetHighlight,
            mouseover: this.highlightFeature,
        });
    };

    handlePortalClick = () => alert("button clicked!");

    setStyle = (feature: geojson.Feature) => ({
        color: "white",
        dashArray: "3",
        fillColor: feature === this.state.selected ? "#666" : "red",
        fillOpacity: 0.7,
        opacity: 1,
        weight: 2,
    });

    render() {
        const { selected } = this.state;

        return (
            <RL.Map center={[37.8, -96]} zoom={4} style={{ width: "100%", height: "400px" }}>
                <RL.TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RL.GeoJSON data={map} onEachFeature={this.handleEachFeature} style={this.setStyle} />
                <Portal position="bottomright">
                    <div style={{ backgroundColor: "#fff", opacity: 0.7, padding: 6 }}>
                        Selected {selected && JSON.stringify(selected.properties)}
                        <br />
                        <button onClick={this.handlePortalClick}>Click me!</button>
                    </div>
                </Portal>
            </RL.Map>
        );
    }
}
```
