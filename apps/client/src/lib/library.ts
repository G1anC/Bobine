export type MediaKind = 'movie' | 'show' | 'album' | 'podcast';

export type Track = { id: string; title: string; seconds: number; url: string };

export type MediaItem = {
    id: string;
    kind: MediaKind;
    title: string;
    year: number;
    credit: string;
    summary: string;
    license: string;
    licenseUrl: string;
    source: string;
    tracks: Track[];
};

const CC_BY = { license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/' };
const CC_ZERO = { license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' };
const PUBLIC_DOMAIN = {
    license: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/'
};

function archivePage(item: string): string {
    return `https://archive.org/details/${item}`;
}

function archiveFile(item: string, file: string): string {
    return `https://archive.org/download/${item}/${encodeURI(file)}`;
}

function part(item: string, file: string, title: string, seconds: number): Track {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { id, title, seconds, url: archiveFile(item, file) };
}

function film(item: string, file: string, title: string, seconds: number): Pick<MediaItem, 'source' | 'tracks'> {
    return { source: archivePage(item), tracks: [{ id: 'film', title, seconds, url: archiveFile(item, file) }] };
}

const GOLDBERG = 'The_Open_Goldberg_Variations-11823';
const JAZZ = 'Jazz_Sampler-9619';
const HOUSTON = 'Houston-We-Have-a-Podcast';

/**
 * The sample catalogue: openly licensed titles streamed from the Internet Archive. It stands
 * in for the library API until that exists, and carries the credit each licence asks for.
 */
const SAMPLE: MediaItem[] = [
    {
        id: 'big-buck-bunny',
        kind: 'movie',
        title: 'Big Buck Bunny',
        year: 2008,
        credit: 'Blender Foundation',
        summary: 'A gentle giant rabbit takes his revenge on three rodents who spoil his morning.',
        ...CC_BY,
        ...film('BigBuckBunny_124', 'Content/big_buck_bunny_720p_surround.mp4', 'Big Buck Bunny', 597)
    },
    {
        id: 'sintel',
        kind: 'movie',
        title: 'Sintel',
        year: 2010,
        credit: 'Blender Foundation',
        summary: 'A lone girl crosses a harsh world in search of the baby dragon she once rescued.',
        ...CC_BY,
        ...film('Sintel', 'sintel-2048-stereo_512kb.mp4', 'Sintel', 888)
    },
    {
        id: 'elephants-dream',
        kind: 'movie',
        title: 'Elephants Dream',
        year: 2006,
        credit: 'Blender Foundation',
        summary: 'Two men wander a vast machine that only one of them believes in.',
        ...CC_BY,
        ...film('ElephantsDream', 'ed_hd.mp4', 'Elephants Dream', 654)
    },
    {
        id: 'tears-of-steel',
        kind: 'movie',
        title: 'Tears of Steel',
        year: 2012,
        credit: 'Blender Foundation',
        summary: 'In a ruined Amsterdam, a small crew stages one last attempt to stop the robots.',
        ...CC_BY,
        ...film('Tears-of-Steel', 'tears_of_steel_720p.mp4', 'Tears of Steel', 734)
    },
    {
        id: 'night-of-the-living-dead',
        kind: 'movie',
        title: 'Night of the Living Dead',
        year: 1968,
        credit: 'George A. Romero',
        summary: 'Strangers barricade themselves in a farmhouse as the dead begin to walk.',
        ...PUBLIC_DOMAIN,
        ...film(
            'Night.Of.The.Living.Dead_1080p',
            'NightOfTheLivingDead_720p_512kb.mp4',
            'Night of the Living Dead',
            5753
        )
    },
    {
        id: 'caminandes',
        kind: 'show',
        title: 'Caminandes',
        year: 2013,
        credit: 'Pablo Vazquez, Blender Foundation',
        summary: 'Koro the llama meets one obstacle after another on the roads of Patagonia.',
        ...CC_BY,
        source: archivePage('Caminandes1LlamaDrama'),
        tracks: [
            part('Caminandes1LlamaDrama', '01_llama_drama_1080p.mp4', 'Llama Drama', 90),
            part('Caminandes2GranDillama', '02_gran_dillama_1080p.mp4', 'Gran Dillama', 146),
            part('CaminandesLlamigos', 'Caminandes_ Llamigos-1080p.mp4', 'Llamigos', 150)
        ]
    },
    {
        id: 'open-goldberg-variations',
        kind: 'album',
        title: 'The Open Goldberg Variations',
        year: 2012,
        credit: 'Kimiko Ishizaka, after J. S. Bach',
        summary: 'A studio recording of the Goldberg Variations, given to the public domain by its makers.',
        ...CC_ZERO,
        source: archivePage(GOLDBERG),
        tracks: [
            part(GOLDBERG, 'Kimiko_Ishizaka_-_01_-_Aria.mp3', 'Aria', 300),
            part(GOLDBERG, 'Kimiko_Ishizaka_-_02_-_Variatio_1_a_1_Clav.mp3', 'Variatio 1', 116),
            part(GOLDBERG, 'Kimiko_Ishizaka_-_03_-_Variatio_2_a_1_Clav.mp3', 'Variatio 2', 124),
            part(GOLDBERG, 'Kimiko_Ishizaka_-_04_-_Variatio_3_a_1_Clav_Canone_allUnisuono.mp3', 'Variatio 3', 117),
            part(GOLDBERG, 'Kimiko_Ishizaka_-_05_-_Variatio_4_a_1_Clav.mp3', 'Variatio 4', 69),
            part(GOLDBERG, 'Kimiko_Ishizaka_-_06_-_Variatio_5_a_1_ovvero_2_Clav.mp3', 'Variatio 5', 94)
        ]
    },
    {
        id: 'jazz-sampler',
        kind: 'album',
        title: 'Jazz Sampler',
        year: 2011,
        credit: 'Kevin MacLeod',
        summary: 'Short jazz pieces, from smoky saxophone to bright vibraphone.',
        ...CC_BY,
        source: archivePage(JAZZ),
        tracks: [
            part(JAZZ, 'Kevin_MacLeod_-_AcidJazz.mp3', 'AcidJazz', 212),
            part(JAZZ, 'Kevin_MacLeod_-_As_I_Figure.mp3', 'As I Figure', 220),
            part(JAZZ, 'Kevin_MacLeod_-_Backed_Vibes_Clean.mp3', 'Backed Vibes Clean', 232),
            part(JAZZ, 'Kevin_MacLeod_-_Dances_and_Dames.mp3', 'Dances and Dames', 149),
            part(JAZZ, 'Kevin_MacLeod_-_Faster_Does_It.mp3', 'Faster Does It', 182),
            part(JAZZ, 'Kevin_MacLeod_-_Night_on_the_Docks_-_Sax.mp3', 'Night on the Docks', 174)
        ]
    },
    {
        id: 'houston-we-have-a-podcast',
        kind: 'podcast',
        title: 'Houston We Have a Podcast',
        year: 2019,
        credit: 'NASA Johnson Space Center',
        summary: 'Astronauts, engineers and scientists talk about human spaceflight.',
        ...PUBLIC_DOMAIN,
        source: archivePage(HOUSTON),
        tracks: [
            part(HOUSTON, 'Ep100_Apollo11toNow.mp3', 'Apollo 11 to Now', 1141),
            part(HOUSTON, 'Ep103_SpaceTourismandCommercialization.mp3', 'Space Tourism and Commercialization', 1991),
            part(HOUSTON, 'Ep105_RecyclingWaterandAir.mp3', 'Recycling Water and Air', 2525),
            part(HOUSTON, 'Ep107_OverviewEffect.mp3', 'Overview Effect', 2385)
        ]
    }
];

/** True for the kinds with a picture: they get a poster shape and can go to VLC. */
export function isVideo(kind: MediaKind): boolean {
    return kind === 'movie' || kind === 'show';
}

export const library = {
    /** Every title of one kind, in catalogue order. */
    list: async (kind: MediaKind): Promise<MediaItem[]> => SAMPLE.filter((item) => item.kind === kind),
    /** The whole catalogue, for the shelves that mix kinds. */
    all: async (): Promise<MediaItem[]> => SAMPLE,
    /** One title by its id, or undefined when the library does not hold it. */
    get: async (id: string): Promise<MediaItem | undefined> => SAMPLE.find((item) => item.id === id)
};
