import * as L from "leaflet";
import * as React from "react";
import { createPortal } from "react-dom";
import * as RL from "react-leaflet";

declare module "react-leaflet" {
    interface ILeafletContext {
        leaflet: {
            map: L.Map;
        };
    }

    function withLeaflet<TProps>(component: React.ReactType<ILeafletContext & TProps>): React.ReactType<TProps>;
}

const control = L.Control.extend({
    onAdd() {
        return this.options.el;
    },
});

export interface IOwnPortalProps {
    /** Class name for component's outer div. */
    className?: string;
    /** The position of leaflet control panel. */
    position: L.ControlPosition;
}

/**
 * The Portal component properties.
 * @see Portal
 */
export type PortalProps = RL.ILeafletContext & IOwnPortalProps;

/**
 * The Portal component renders React portal to leaflet control panel.
 */
export class Portal extends React.Component<PortalProps> {
    leafletElement: L.Control;
    el: HTMLElement;

    constructor(props: PortalProps) {
        super(props);

        const { position } = props;

        this.el = L.DomUtil.create("div", props.className);
        this.leafletElement = new control({ position, el: this.el });
    }

    componentDidMount() {
        this.leafletElement.addTo(this.props.leaflet.map);
    }

    componentDidUpdate(prevProps: PortalProps) {
        const { position } = this.props;

        if (position !== prevProps.position) {
            this.leafletElement.setPosition(position);
        }
    }

    render() {
        const { children } = this.props;

        return createPortal(children, this.el);
    }
}

export default RL.withLeaflet(Portal);
