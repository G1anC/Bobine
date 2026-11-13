export const TINTS = 6;

/** Which of the placeholder tints a title gets: always the same one for the same title. */
export function tintOf(title: string): number {
    let sum = 0;
    for (const letter of title) sum += letter.codePointAt(0) ?? 0;
    return sum % TINTS;
}
