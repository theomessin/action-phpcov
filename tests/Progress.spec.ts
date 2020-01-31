import Progress from "../src/Progress";

test("it returns empty progress bar for 0.0", () => {
    const __output = "▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱";
    const output = Progress(0);
    expect(output).toBe(__output);
});

test("it rounds properly for 0.333", () => {
    const __output = "▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱▱▱▱";
    const output = Progress(0.333);
    expect(output).toBe(__output);
});

test("it returns correct progress bar for 0.5", () => {
    const __output = "▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱";
    const output = Progress(0.5);
    expect(output).toBe(__output);
});

test("it returns full progress bar for 1.0", () => {
    const __output = "▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰";
    const output = Progress(1);
    expect(output).toBe(__output);
});
