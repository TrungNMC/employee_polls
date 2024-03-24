import { render } from "@testing-library/react";
import Home from "../components/Home";
import NoMatch from "../components/NoMatch";

describe('Greetings', () => {
    it('matches the snapshot', () => {
        var component = render(
            <NoMatch /> 
        );
        expect(component).toMatchSnapshot();
    });
});