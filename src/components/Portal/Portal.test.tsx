import { mount } from "enzyme";
import * as L from "leaflet";
import * as React from "react";
import { Portal, PortalProps } from "./Portal";

const setup = (propOverrides?: Partial<PortalProps>) => {
    const props: PortalProps = {
        position: "bottomleft",
        leaflet: {
            map: L.map(L.DomUtil.create("div")),
        },
        ...propOverrides,
    };

    const children = <div data-test="children">children</div>;
    const wrapper = mount(<Portal {...props}>{children}</Portal>);

    return {
        props,
        children,
        wrapper,
    };
};

const teardown = (setupResult: Partial<ReturnType<typeof setup>>) => {
    setupResult.wrapper!.unmount();
};

describe("<Portal />", () => {
    it("should render a children component", () => {
        // arrange
        const { wrapper, children } = setup();
        // act
        // assert
        expect(wrapper.containsMatchingElement(children)).toBeTruthy();
        teardown({ wrapper });
    });

    it("should set a correct initial position", () => {
        // arrange
        const {
            props: {
                leaflet: { map },
            },
            wrapper,
        } = setup({ position: "bottomleft" });
        const container = map.getContainer();
        const children = container.querySelector("[data-test='children']");
        // act
        // assert
        expect(children).not.toBeNull();
        expect(children!.parentElement!.parentElement!.className).toEqual("leaflet-bottom leaflet-left");
        teardown({ wrapper });
    });

    it("should change the position after changing the position property", () => {
        // arrange
        const {
            props: {
                leaflet: { map },
            },
            wrapper,
        } = setup();
        const container = map.getContainer();
        const children = container.querySelector("[data-test='children']");
        // act
        wrapper.setProps({ position: "topright" });
        // assert
        expect(children).not.toBeNull();
        expect(children!.parentElement!.parentElement!.className).toEqual("leaflet-top leaflet-right");
        teardown({ wrapper });
    });
});
