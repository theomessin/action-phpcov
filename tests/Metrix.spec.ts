import Metrix from "../src/Metrix";

test("it correctly parses clover.spec.xml", async () => {
    // Act: parse the fixture clover.spec.xml metrix.
    const metrix = await Metrix(`${__dirname}/__clover.xml`);

    // Assert: the coverage metric to be 23/52.
    expect(metrix.coverage).toBe(23/52);
});
