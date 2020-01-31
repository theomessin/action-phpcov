import Action from "../src/Action";
jest.mock("../src/Action");
import "../src/Index";

test("it calls action once with no arguments", () => {
    expect(Action).toBeCalledWith();
    expect(Action).toBeCalledTimes(1);
})
