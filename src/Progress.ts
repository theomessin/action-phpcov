/**
 * Renders an ASCII progress bar from a percentage.
 * @param percentage The percentage to render.
 * @param columns The width (in characters) of the progress bar.
 */
export default function (percentage: number, columns: number = 20): string {
    let percentage_bar = "";
    const left = Math.round(percentage * columns);
    const right = columns - left;
    for (let i = 0 ; i < left; i++) percentage_bar += "▰";
    for (let i = 0 ; i < right; i++) percentage_bar += "▱";
    return percentage_bar;
};
