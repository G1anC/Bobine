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
    image?: string;
    tracks: Track[];
};

const CC_BY = { license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/' };
const CC_ZERO = { license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' };
const CC_BY_4 = { license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/' };
const CC_BY_SA = { license: 'CC BY-SA 2.5', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.5/' };
const CC_BY_NC = { license: 'CC BY-NC 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-nc/3.0/' };
const CC_BY_NC_SA_25 = {
    license: 'CC BY-NC-SA 2.5',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/2.5/'
};
const CC_BY_NC_SA_3 = {
    license: 'CC BY-NC-SA 3.0 US',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/3.0/us/'
};
const CC_BY_NC_SA_4 = {
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
};
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

/** A picture kept by Wikimedia Commons, served 500 pixels wide. */
function commons(file: string): string {
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=500`;
}

function part(item: string, file: string, title: string, seconds: number): Track {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { id, title, seconds, url: archiveFile(item, file) };
}

function film(item: string, file: string, title: string, seconds: number): Pick<MediaItem, 'source' | 'tracks'> {
    return { source: archivePage(item), tracks: [{ id: 'film', title, seconds, url: archiveFile(item, file) }] };
}

const GHOSTS = 'nineinchnails_ghosts_I_IV';
const CHOPIN = 'musopen-chopin';
const TRYAD = 'Tryad_-_Public_Domain';
const CALLS = 'SCL115';
const IRSEN = 'SCL081';
const DEATHLESS = 'SCL125';
const ADVENTURE = 'Komikuitstimeforadventure';
const PLAY = 'WM056';
const GOLDBERG = 'The_Open_Goldberg_Variations-11823';
const JAZZ = 'Jazz_Sampler-9619';
const HOUSTON = 'Houston-We-Have-a-Podcast';

/**
 * The sample catalogue: openly licensed titles streamed from the Internet Archive. It stands
 * in for the library API until that exists, and carries the credit each licence asks for.
 * Posters and covers come from Wikimedia Commons where an openly licensed one exists.
 */
const SAMPLE: MediaItem[] = [
    {
        id: 'big-buck-bunny',
        kind: 'movie',
        title: 'Big Buck Bunny',
        year: 2008,
        credit: 'Blender Foundation',
        summary: 'A gentle giant rabbit takes his revenge on three rodents who spoil his morning.',
        image: commons('Big buck bunny poster big.jpg'),
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
        image: commons('Sintel poster.jpg'),
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
        image: commons('ElephantsDreamPoster.jpg'),
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
        image: commons('Tos-poster.png'),
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
        image: commons('Night Of The Living Dead (1968) - Poster.jpg'),
        ...PUBLIC_DOMAIN,
        ...film(
            'Night.Of.The.Living.Dead_1080p',
            'NightOfTheLivingDead_720p_512kb.mp4',
            'Night of the Living Dead',
            5753
        )
    },
    {
        id: 'nosferatu',
        kind: 'movie',
        title: 'Nosferatu',
        year: 1922,
        credit: 'F. W. Murnau',
        summary: 'A clerk sent to Transylvania brings a plague-bearing count back to his own town.',
        image: commons('Max Schreck as Count Orlok in Nosferatu – Eine Symphonie des Grauens (1922).jpg'),
        ...PUBLIC_DOMAIN,
        ...film('Nosferatu1922', 'Nosferatu.mp4', 'Nosferatu', 5514)
    },
    {
        id: 'the-general',
        kind: 'movie',
        title: 'The General',
        year: 1926,
        credit: 'Buster Keaton, Clyde Bruckman',
        summary: 'A train engineer chases the spies who stole his locomotive, and his fiancée with it.',
        image: commons('The General (1926) - Movie Poster 2.png'),
        ...PUBLIC_DOMAIN,
        ...film('TheGeneralBusterKeaton1926', 'TheGeneral2.mp4', 'The General', 4725)
    },
    {
        id: 'his-girl-friday',
        kind: 'movie',
        title: 'His Girl Friday',
        year: 1940,
        credit: 'Howard Hawks',
        summary: 'An editor will do anything to keep his best reporter, who is also his ex-wife, from leaving.',
        image: commons('His Girl Friday (1940 poster).jpg'),
        ...PUBLIC_DOMAIN,
        ...film('his_girl_friday', 'his_girl_friday.mp4', 'His Girl Friday', 5504)
    },
    {
        id: 'cabinet-of-dr-caligari',
        kind: 'movie',
        title: 'The Cabinet of Dr. Caligari',
        year: 1920,
        credit: 'Robert Wiene',
        summary: 'A fairground hypnotist and his sleepwalker arrive in town, and the murders begin.',
        image: commons('The Cabinet of Doctor Caligari Movie poster.jpg'),
        ...PUBLIC_DOMAIN,
        ...film('DasKabinettdesDoktorCaligariTheCabinetofDrCaligari', 'The_Cabinet_of_Dr._Caligari_512kb.mp4', 'The Cabinet of Dr. Caligari', 3061)
    },
    {
        id: 'plan-9-from-outer-space',
        kind: 'movie',
        title: 'Plan 9 from Outer Space',
        year: 1959,
        credit: 'Ed Wood',
        summary: 'Aliens raise the dead to stop mankind from building a weapon that could end the universe.',
        image: commons('Plan nine from outer space.jpg'),
        ...PUBLIC_DOMAIN,
        ...film('plan-9-from-outer-space', 'plan-9-from-outer-space.mp4', 'Plan 9 from Outer Space', 4700)
    },
    {
        id: 'house-on-haunted-hill',
        kind: 'movie',
        title: 'House on Haunted Hill',
        year: 1959,
        credit: 'William Castle',
        summary: 'A millionaire offers five guests a fortune if they last one night in a haunted house.',
        image: commons('House on Haunted Hill (1959) - Title.jpg'),
        ...PUBLIC_DOMAIN,
        ...film('The_House_On_Haunted_Hill', 'The_House_On_Haunted_Hill.mp4', 'House on Haunted Hill', 4483)
    },
    {
        id: 'carnival-of-souls',
        kind: 'movie',
        title: 'Carnival of Souls',
        year: 1962,
        credit: 'Herk Harvey',
        summary: 'After a car accident, an organist is drawn to an abandoned carnival and the figures in it.',
        image: commons('Carnival of Souls (1962 one-sheet poster).jpg'),
        ...PUBLIC_DOMAIN,
        ...film('CarnivalofSouls', 'CarnivalOfSouls.mp4', 'Carnival of Souls', 4979)
    },
    {
        id: 'the-last-man-on-earth',
        kind: 'movie',
        title: 'The Last Man on Earth',
        year: 1964,
        credit: 'Ubaldo Ragona, Sidney Salkow',
        summary: 'The only survivor of a plague spends his days hunting those it turned into vampires.',
        image: commons('Vincent Price (Last Man on Earth) 1.JPG'),
        ...PUBLIC_DOMAIN,
        ...film('TheLastManOnEarth_72', 'the_last_man_on_earth.mp4', 'The Last Man on Earth', 5190)
    },
    {
        id: 'battleship-potemkin',
        kind: 'movie',
        title: 'Battleship Potemkin',
        year: 1925,
        credit: 'Sergei Eisenstein',
        summary: 'The crew of a Russian battleship rises against its officers, and Odessa rises with it.',
        image: commons('Vintage Potemkin.jpg'),
        ...PUBLIC_DOMAIN,
        ...film('BattleshipPotemkin', 'Battleship_Potemkin_512kb.mp4', 'Battleship Potemkin', 4381)
    },
    {
        id: 'a-trip-to-the-moon',
        kind: 'movie',
        title: 'A Trip to the Moon',
        year: 1902,
        credit: 'Georges Méliès',
        summary: 'A club of astronomers is fired at the Moon in a shell and meets the people who live there.',
        image: commons('Voyage dans la Lune affiche.jpg'),
        ...PUBLIC_DOMAIN,
        ...film('ATripToTheMoonGeorgeMelies', 'A Trip to the Moon-George Méliès.mp4', 'A Trip to the Moon', 771)
    },
    {
        id: 'steamboat-bill-jr',
        kind: 'movie',
        title: 'Steamboat Bill, Jr.',
        year: 1928,
        credit: 'Charles Reisner, Buster Keaton',
        summary: 'A captain\'s bookish son must prove himself on the river before a cyclone hits the town.',
        image: commons('Steamboat bill poster.jpg'),
        ...PUBLIC_DOMAIN,
        ...film('SteamboatBillJr', 'Steamboat_Bill.Jr_512kb.mp4', 'Steamboat Bill, Jr.', 4147)
    },
    {
        id: 'the-phantom-of-the-opera',
        kind: 'movie',
        title: 'The Phantom of the Opera',
        year: 1925,
        credit: 'Rupert Julian',
        summary: 'A masked figure living under the Paris Opera will stop at nothing to make one singer a star.',
        image: commons('The Phantom of the Opera (1925 film).jpg'),
        ...PUBLIC_DOMAIN,
        ...film('PhantomOfTheOpera1925HD', 'Phantom of the Opera (Silent 1925).mp4', 'The Phantom of the Opera', 6165)
    },
    {
        id: 'the-little-shop-of-horrors',
        kind: 'movie',
        title: 'The Little Shop of Horrors',
        year: 1960,
        credit: 'Roger Corman',
        summary: 'A clumsy florist grows a plant that makes him famous, and that only eats people.',
        image: commons('The Little Shop of Horrors (1960) - Half-Sheet poster.webp'),
        ...PUBLIC_DOMAIN,
        ...film('TheLittleShopOfHorrors1960_765', 'TheLittleShopOfHorrors1960.mp4', 'The Little Shop of Horrors', 4288)
    },
    {
        id: 'detour',
        kind: 'movie',
        title: 'Detour',
        year: 1945,
        credit: 'Edgar G. Ulmer',
        summary: 'A pianist hitchhiking to Los Angeles takes a dead man\'s name and cannot get rid of it.',
        image: commons('Detour (poster).jpg'),
        ...PUBLIC_DOMAIN,
        ...film('Detour1945_201808', 'Detour (1945).mp4', 'Detour', 4058)
    },
    {
        id: 'sherlock-jr',
        kind: 'movie',
        title: 'Sherlock Jr.',
        year: 1924,
        credit: 'Buster Keaton',
        summary: 'A projectionist who dreams of being a detective falls asleep and walks into the film.',
        image: commons('Sherlock jr poster.jpg'),
        ...PUBLIC_DOMAIN,
        ...film('sherlockjr1924_201909', 'Sherlock Jr. - Buster Keaton (1924) HD [720p].mp4', 'Sherlock Jr.', 2673)
    },
    {
        id: 'cosmos-laundromat',
        kind: 'movie',
        title: 'Cosmos Laundromat',
        year: 2015,
        credit: 'Blender Foundation',
        summary: 'A sheep tired of his island meets a salesman who offers him every life he could wish for.',
        image: commons('CosmosLaundromatPoster.jpg'),
        ...CC_BY_4,
        ...film('CosmosLaundromatFirstCycle', 'Cosmos Laundromat - First Cycle (1080p).mp4', 'Cosmos Laundromat', 730)
    },
    {
        id: 'sprite-fright',
        kind: 'movie',
        title: 'Sprite Fright',
        year: 2021,
        credit: 'Blender Studio',
        summary: 'Teenagers camping in the woods upset the small creatures who keep the forest.',
        image: commons('Sprite Fright-movie poster.jpg'),
        ...CC_BY_4,
        ...film('sprite-fright', 'Sprite Fright - Open Movie by Blender Studio-804p.mp4', 'Sprite Fright', 629)
    },
    {
        id: 'spring',
        kind: 'movie',
        title: 'Spring',
        year: 2019,
        credit: 'Blender Studio',
        summary: 'A shepherd girl and her dog face ancient spirits so that the seasons can turn.',
        image: commons('Blender Open Movie - Spring (2019).png'),
        ...CC_BY_4,
        ...film('spring_blenderopenmovie', 'Spring - Blender Open Movie - YouTube.mp4', 'Spring', 464)
    },
    {
        id: 'caminandes',
        kind: 'show',
        title: 'Caminandes',
        year: 2013,
        credit: 'Pablo Vazquez, Blender Foundation',
        summary: 'Koro the llama meets one obstacle after another on the roads of Patagonia.',
        image: commons('Pablo Vazquez - Caminandes - Episode 1 - Llama Drama - Cover thumbnail.png'),
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
        image: commons('Cover of the Open Goldberg Variations.jpg'),
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
        id: 'ghosts-i-iv',
        kind: 'album',
        title: 'Ghosts I–IV',
        year: 2008,
        credit: 'Nine Inch Nails',
        summary: 'Instrumental sketches recorded in ten weeks, from quiet piano to walls of noise.',
        image: archiveFile(GHOSTS, 'cover.jpg'),
        ...CC_BY_NC_SA_3,
        source: archivePage(GHOSTS),
        tracks: [
            part(GHOSTS, '01_Ghosts_I_320kb.mp3', '1 Ghosts I', 168),
            part(GHOSTS, '02_Ghosts_I_320kb.mp3', '2 Ghosts I', 196),
            part(GHOSTS, '03_Ghosts_I_320kb.mp3', '3 Ghosts I', 231),
            part(GHOSTS, '04_Ghosts_I_320kb.mp3', '4 Ghosts I', 132),
            part(GHOSTS, '05_Ghosts_I_320kb.mp3', '5 Ghosts I', 171),
            part(GHOSTS, '06_Ghosts_I_320kb.mp3', '6 Ghosts I', 258)
        ]
    },
    {
        id: 'chopin-collection',
        kind: 'album',
        title: 'The Complete Chopin Collection',
        year: 2015,
        credit: 'Musopen',
        summary: 'The four ballades and the Fantaisie-Impromptu, from a recording made to be free for everyone.',
        image: commons('Frederic Chopin photo.jpeg'),
        ...CC_ZERO,
        source: archivePage(CHOPIN),
        tracks: [
            part(CHOPIN, 'Ballade no. 1 - Op. 23.mp3', 'Ballade No. 1', 613),
            part(CHOPIN, 'Ballade no. 2 - Op. 38.mp3', 'Ballade No. 2', 494),
            part(CHOPIN, 'Ballade no. 3 - Op. 47.mp3', 'Ballade No. 3', 507),
            part(CHOPIN, 'Ballade no. 4 - Op. 52.mp3', 'Ballade No. 4', 762),
            part(CHOPIN, 'Fantasie Impromptu Op. 66.mp3', 'Fantaisie-Impromptu', 326)
        ]
    },
    {
        id: 'tryad-public-domain',
        kind: 'album',
        title: 'Public Domain',
        year: 2005,
        credit: 'Tryad',
        summary: 'Songs written by musicians who met online and never played in the same room.',
        image: archiveFile(TRYAD, 'Tryad_-_Public_Domain_-_Cover.jpg'),
        ...CC_BY_SA,
        source: archivePage(TRYAD),
        tracks: [
            part(TRYAD, 'Tryad_-_01_-_Intro_-_a_k_a_-_The_Samplist.mp3', 'Intro', 54),
            part(TRYAD, 'Tryad_-_02_-_The_Final_Rewind.mp3', 'The Final Rewind', 273),
            part(TRYAD, 'Tryad_-_03_-_I_See.mp3', 'I See', 237),
            part(TRYAD, 'Tryad_-_04_-_Our_Lives_Change.mp3', 'Our Lives Change', 190),
            part(TRYAD, 'Tryad_-_05_-_Seduction.mp3', 'Seduction', 196),
            part(TRYAD, 'Tryad_-_06_-_Witness.mp3', 'Witness', 385)
        ]
    },
    {
        id: 'calls-and-echoes',
        kind: 'album',
        title: 'Calls and Echoes',
        year: 2014,
        credit: 'Kai Engel',
        summary: 'Slow piano and strings, written like the score of a film nobody shot.',
        image: archiveFile(CALLS, 'cover.jpg'),
        ...CC_BY_NC_SA_4,
        source: archivePage(CALLS),
        tracks: [
            part(CALLS, '01_-_Prologue.mp3', 'Prologue', 233),
            part(CALLS, '02_-_Calls_and_Echoes.mp3', 'Calls and Echoes', 247),
            part(CALLS, '03_-_Fairytale.mp3', 'Fairytale', 315),
            part(CALLS, '04_-_Raining.mp3', 'Raining', 242),
            part(CALLS, '05_-_Vintage_Frames.mp3', 'Vintage Frames', 213),
            part(CALLS, '06_-_The_Flames_of_Rome.mp3', 'The Flames of Rome', 212)
        ]
    },
    {
        id: 'irsens-tale',
        kind: 'album',
        title: 'Irsen\'s Tale',
        year: 2013,
        credit: 'Kai Engel',
        summary: 'Long ambient pieces that move from a first light to a slow farewell.',
        image: archiveFile(IRSEN, 'cover.jpg'),
        ...CC_BY_NC,
        source: archivePage(IRSEN),
        tracks: [
            part(IRSEN, '01_- _intro_(udonthear)_(Album_version).mp3', 'Intro', 397),
            part(IRSEN, '02_-_Leaving.mp3', 'Leaving', 415),
            part(IRSEN, '03_-_Irsen_s_Tale.mp3', 'Irsen\'s Tale', 703),
            part(IRSEN, '04_-_Moonlight_Reprise_(Album_Version).mp3', 'Moonlight Reprise', 296),
            part(IRSEN, '05_-_Nothing_Lasts_Forever_(Album_version).mp3', 'Nothing Lasts Forever', 330),
            part(IRSEN, '06_-_The_Moments_Of_Our_Mornings_(Album_Version).mp3', 'The Moments of Our Mornings', 568)
        ]
    },
    {
        id: 'deathless',
        kind: 'album',
        title: 'Deathless: The Renaissance',
        year: 2014,
        credit: 'Kai Engel',
        summary: 'Orchestral themes for an imaginary epic, with drums, choirs and quiet plains.',
        image: archiveFile(DEATHLESS, 'cover.jpg'),
        ...CC_BY_NC_SA_4,
        source: archivePage(DEATHLESS),
        tracks: [
            part(DEATHLESS, '01_-_The_Adumbration.mp3', 'The Adumbration', 224),
            part(DEATHLESS, '02_-_Disciples_Of_Steel.mp3', 'Disciples of Steel', 304),
            part(DEATHLESS, '03_-_Morning_Placidity.mp3', 'Morning Placidity', 240),
            part(DEATHLESS, '04_-_Chant_Of_Night_Blades.mp3', 'Chant of Night Blades', 168),
            part(DEATHLESS, '05_-_Avenge_The_Fallen.mp3', 'Avenge the Fallen', 166),
            part(DEATHLESS, '06_-_Celestial_Plains.mp3', 'Celestial Plains', 234)
        ]
    },
    {
        id: 'its-time-for-adventure',
        kind: 'album',
        title: 'It\'s Time for Adventure',
        year: 2016,
        credit: 'Komiku',
        summary: 'Bright chiptune-flavoured tunes for a video game journey that does not exist.',
        image: archiveFile(ADVENTURE, 'images_albums_Komiku_-_Its_time_for_adventure__-_20160721124219658.jpg'),
        ...CC_ZERO,
        source: archivePage(ADVENTURE),
        tracks: [
            part(ADVENTURE, 'Komiku_-_01_-_Fouler_lhorizon.mp3', 'Fouler l\'horizon', 107),
            part(ADVENTURE, 'Komiku_-_02_-_Le_Grand_Village.mp3', 'Le Grand Village', 104),
            part(ADVENTURE, 'Komiku_-_03_-_Champ_de_tournesol.mp3', 'Champ de tournesol', 117),
            part(ADVENTURE, 'Komiku_-_04_-_Barque_sur_le_lac.mp3', 'Barque sur le lac', 205),
            part(ADVENTURE, 'Komiku_-_05_-_La_Citadelle.mp3', 'La Citadelle', 161),
            part(ADVENTURE, 'Komiku_-_06_-_La_ville_aux_ponts_suspendus.mp3', 'La ville aux ponts suspendus', 248)
        ]
    },
    {
        id: 'play-2',
        kind: 'album',
        title: 'Play 2',
        year: 2007,
        credit: 'Lee Rosevere',
        summary: 'Warm electronic miniatures built from loops, toy sounds and tape hiss.',
        image: archiveFile(PLAY, 'WM056large.jpg'),
        ...CC_BY_NC_SA_25,
        source: archivePage(PLAY),
        tracks: [
            part(PLAY, '01-LeeRosevere_Play2_StareOfAnEmptyHouse.mp3', 'Stare of an Empty House', 204),
            part(PLAY, '02-LeeRosevere_Play2_Pendulum.mp3', 'Pendulum', 248),
            part(PLAY, '03-LeeRosevere_Play2_FruitInMyLoops.mp3', 'Fruit in My Loops', 131),
            part(PLAY, '04-LeeRosevere_Play2_TheMissingShadow.mp3', 'The Missing Shadow', 159),
            part(PLAY, '05-LeeRosevere_Play2_ThereIsNoMusicOnThisSide.mp3', 'There Is No Music on This Side', 221),
            part(PLAY, '06-LeeRosevere_Play2_TowerTheme.mp3', 'Tower Theme', 213)
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
