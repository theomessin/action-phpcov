import Progress from "../src/Progress";

test("default renedring for 0.5 works", () => {
    const __output = "▰▰▰▰▰▱▱▱▱▱";
    const output = Progress(0.5);
    expect(output).toBe(__output);
});

test("it returns empty progress bar for 0.0", () => {
    const __output = "00";
    const output = Progress(0, 2, "1", "0");
    expect(output).toBe(__output);
});

test("it returns correct progress bar for 0.5", () => {
    const __output = "10";
    const output = Progress(0.5, 2, "1", "0");
    expect(output).toBe(__output);
});

test("it returns full progress bar for 1.0", () => {
    const __output = "11";
    const output = Progress(1, 2, "1", "0");
    expect(output).toBe(__output);
});

test("it rounds 0.33 correctly", () => {
    const __output = "1110000000";
    const output = Progress(0.33, 10, "1", "0");
    expect(output).toBe(__output);
});
