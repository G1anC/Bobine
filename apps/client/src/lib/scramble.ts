/** The odd characters a scrambling position cycles through. */
export const GLYPHS = '{}^[]<>/\\|#%&$@!?*~+=';

/** How many glyphs a character shows before it comes back, and so how wide the wave is. */
export const CHANGES = 3;

/** The number of steps the wave needs to cross a text and leave it whole again. */
export function waveSteps(text: string): number {
    return [...text].length + CHANGES;
}

/**
 * The text at one step of the wave. The wave enters at the first character and moves one
 * character per step: the character at `step` and the two before it show a random glyph,
 * everything else is as written. Each character is therefore scrambled for three steps in a
 * row, with a new glyph each time, and three characters are scrambled at any moment. Spaces
 * stay spaces. Before step 0 and from `waveSteps` on, the text is whole.
 */
export function waveFrame(text: string, step: number, random: () => number = Math.random): string {
    return [...text]
        .map((char, index) => {
            const inWave = index <= step && step < index + CHANGES;
            return inWave && char.trim() !== '' ? GLYPHS[Math.floor(random() * GLYPHS.length)] : char;
        })
        .join('');
}
