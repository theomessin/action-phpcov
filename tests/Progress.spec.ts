import Progress from "../src/Progress";

test("default value is 10 columns", () => {
    const __output = "▰▰▰▰▰▱▱▱▱▱";
    const output = Progress(0.5);
    expect(output).toBe(__output);
});

test("it renders custom characters", () => {
    const __output = "▰▱";
    const output = Progress(0.5, 2);
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

test("it still works for 10 columns", () => {
    const __output = "1111100000";
    const output = Progress(.5, 10, "1", "0");
    expect(output).toBe(__output);
});

test("it rounds properly for 0.333", () => {
    const __output = "1110000000";
    const output = Progress(0.333, 10, "1", "0");
    expect(output).toBe(__output);
});
