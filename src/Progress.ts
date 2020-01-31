/**
 * Renders an ASCII progress bar from a percentage.
 * @param percentage The percentage to render.
 * @param columns The width (in characters) of the progress bar.
 */
export default function (
    percentage: number, 
    columns: number = 10,
    c_left: string = "▰",
    c_right: string = "▱",
): string {
    let percentage_bar = "";
    const left = Math.round(percentage * columns);
    const right = columns - left;
    for (let i = 0 ; i < left; i++) percentage_bar += c_left;
    for (let i = 0 ; i < right; i++) percentage_bar += c_right;
    return percentage_bar;
};
