import { mount } from "enzyme";
import * as L from "leaflet";
import * as React from "react";
import { PortalNoLeaflet, PortalProps } from "./Portal";

const setup = (propOverrides?: Partial<PortalProps>) => {
    const props: PortalProps = {
        position: "bottomleft",
        leaflet: {
            map: L.map(L.DomUtil.create("div")),
        },
        ...propOverrides,
    };

    const children = <div data-test="children">children</div>;
    const wrapper = mount(<PortalNoLeaflet {...props}>{children}</PortalNoLeaflet>);

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

    it("should set a correct initial css class", () => {
        // arrange
        const expected = "testclassname";
        const {
            props: {
                leaflet: { map },
            },
            wrapper,
        } = setup({ className: expected });
        const container = map.getContainer();
        const children = container.querySelector("[data-test='children']");
        // act
        // assert
        expect(children).not.toBeNull();
        expect(children!.parentElement!.className).toContain(expected);
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

    it(`should remove the css class after changing the className property to "undefined"`, () => {
        // arrange
        const {
            props: {
                leaflet: { map },
                className: expected,
            },
            wrapper,
        } = setup({ className: "testclassname" });
        const container = map.getContainer();
        const children = container.querySelector("[data-test='children']");
        // act
        wrapper.setProps({ className: undefined });
        // assert
        expect(children).not.toBeNull();
        expect(children!.parentElement!.className).not.toContain(expected);
        teardown({ wrapper });
    });

    function generateCssClassChangingTest(initial: string | undefined, expected: string) {
        it(`should change the css class after changing the className property from "${initial}" to "${expected}"`, () => {
            // arrange
            const {
                props: {
                    leaflet: { map },
                },
                wrapper,
            } = setup({ className: initial });
            const container = map.getContainer();
            const children = container.querySelector("[data-test='children']");
            // act
            wrapper.setProps({ className: expected });
            // assert
            expect(children).not.toBeNull();
            expect(children!.parentElement!.className).toContain(expected);
            teardown({ wrapper });
        });
    }

    generateCssClassChangingTest(undefined, "testclassname");
    generateCssClassChangingTest("testclassname1", "testclassname2");
});
