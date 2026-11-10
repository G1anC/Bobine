export type MediaKind = 'movie' | 'show';

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

function film(item: string, file: string, title: string, seconds: number): Pick<MediaItem, 'source' | 'tracks'> {
    return { source: archivePage(item), tracks: [{ id: 'film', title, seconds, url: archiveFile(item, file) }] };
}

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
            {
                id: 'llama-drama',
                title: 'Llama Drama',
                seconds: 90,
                url: archiveFile('Caminandes1LlamaDrama', '01_llama_drama_1080p.mp4')
            },
            {
                id: 'gran-dillama',
                title: 'Gran Dillama',
                seconds: 146,
                url: archiveFile('Caminandes2GranDillama', '02_gran_dillama_1080p.mp4')
            },
            {
                id: 'llamigos',
                title: 'Llamigos',
                seconds: 150,
                url: archiveFile('CaminandesLlamigos', 'Caminandes_ Llamigos-1080p.mp4')
            }
        ]
    }
];

export const library = {
    /** Every title of one kind, in catalogue order. */
    list: async (kind: MediaKind): Promise<MediaItem[]> => SAMPLE.filter((item) => item.kind === kind),
    /** The whole catalogue, for the shelves that mix kinds. */
    all: async (): Promise<MediaItem[]> => SAMPLE
};
