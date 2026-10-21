/**
 * SSOT for every photograph on Skif's public site, with its licence and
 * credit. /credits renders this list; a photo that is not here is not used.
 * Files are self-hosted in public/photos (downloaded once, never hot-linked),
 * so no third party learns who reads which page. All are Unsplash License:
 * free to use, credit given anyway.
 */
export type Photo = {
  src: `/photos/${string}.jpg`;
  alt: string;
  /** CSS object-position, when the subject is not centred. */
  focus?: string;
  credit: { photographer: string; profile: string; page: string; licence: "Unsplash License" };
};

const unsplash = (photographer: string, handle: string, page: string): Photo["credit"] => ({
  photographer,
  profile: `https://unsplash.com/@${handle}`,
  page,
  licence: "Unsplash License",
});

export const PHOTOS = {
  nightStreet: {
    src: "/photos/night-street.jpg",
    alt: "A lone figure crossing a wet, foggy street at night under a single streetlamp.",
    focus: "50% 55%",
    credit: unsplash("Kai Cheng", "akaicheng", "https://unsplash.com/photos/MCptVsXIsPg"),
  },
  oldTownNight: {
    src: "/photos/old-town-night.jpg",
    alt: "A man seen from behind walking down a cobbled old-town street at night.",
    focus: "50% 60%",
    credit: unsplash("Roman", "rm_reins", "https://unsplash.com/photos/kZkhM8Nj4oY"),
  },
  grappling: {
    src: "/photos/grappling.jpg",
    alt: "Two people in gis grappling on a mat, in black and white.",
    credit: unsplash("Cesar Millan", "crsmillan", "https://unsplash.com/photos/F2PTHpyMGGY"),
  },
  phoneDark: {
    src: "/photos/phone-dark.jpg",
    alt: "Hands holding a phone in a dim room.",
    focus: "60% 50%",
    credit: unsplash("Alexander Grey", "sharonmccutcheon", "https://unsplash.com/photos/1kiXMk2KGAY"),
  },
  skiTouring: {
    src: "/photos/ski-touring.jpg",
    alt: "Ski tourers climbing a large snow slope beneath dark rock walls and mist.",
    credit: unsplash("Matthew Stephenson", "matthewryanstephenson", "https://unsplash.com/photos/0Ac1cRU0Z7o"),
  },
  cprTraining: {
    src: "/photos/cpr-training.jpg",
    alt: "Hands giving chest compressions to a CPR training mannequin.",
    focus: "50% 45%",
    credit: unsplash("Frederick Shaw", "dropfastcollective", "https://unsplash.com/photos/E2JjBMyxBVw"),
  },
  tramStop: {
    src: "/photos/tram-stop.jpg",
    alt: "People waiting and boarding at a lit tram stop at night.",
    credit: unsplash("HungaryCameraClub", "hungarycameraclub", "https://unsplash.com/photos/V7r0n4hyZSI"),
  },
  zurichTram: {
    src: "/photos/zurich-tram.jpg",
    alt: "A Zürich tram on a wet street under hanging lights, reflected in the road.",
    focus: "50% 40%",
    credit: unsplash("Sascha Bosshard", "thesaboo", "https://unsplash.com/photos/EBYKUYfP5Ug"),
  },
  familyPath: {
    src: "/photos/family-path.jpg",
    alt: "An adult and a child walking along a grassy ridge path, seen from behind.",
    credit: unsplash("Brett Jordan", "brett_jordan", "https://unsplash.com/photos/Yd4lXGfsXEk"),
  },
  parkour: {
    src: "/photos/parkour.jpg",
    alt: "A person in mid-air above a concrete channel against a pale sky.",
    focus: "50% 30%",
    credit: unsplash("Rémy Penet", "remypnt", "https://unsplash.com/photos/4A3kLn7SsmM"),
  },
  doorway: {
    src: "/photos/doorway.jpg",
    alt: "Silhouetted people in a building entrance, one standing in a lit glass doorway.",
    credit: unsplash("Liam Scotchmer", "liam_scotchmer", "https://unsplash.com/photos/nYlI5UO3EoA"),
  },
  books: {
    src: "/photos/books.jpg",
    alt: "A stack of old books and a pencil on a dark wooden desk.",
    credit: unsplash("Robin Worrall", "robin_rednine", "https://unsplash.com/photos/Q8HfuO9udts"),
  },
  nightRoad: {
    src: "/photos/night-road.jpg",
    alt: "A car with its headlights on coming along a narrow, foggy country road lined with bare trees at dusk.",
    credit: unsplash("Kwami Fattah Al Sissi", "kwami_heude_50", "https://unsplash.com/photos/HIxGOdDuQ9U"),
  },
  cityRiver: {
    src: "/photos/river-swim.jpg",
    alt: "A line of kayaks on a wide, sunlit city river, with people sitting along the bank under the trees.",
    focus: "50% 60%",
    credit: unsplash("Claudio Schwarz", "purzlbaum", "https://unsplash.com/photos/wN1KDeIz3A8"),
  },
  festival: {
    src: "/photos/festival.jpg",
    alt: "A dense festival crowd, seen from behind, facing a distant stage through smoke lit amber by stage lights.",
    credit: unsplash("Yvette de Wit", "yvettedewit", "https://unsplash.com/photos/NYrVisodQ2M"),
  },
  platform: {
    src: "/photos/platform.jpg",
    alt: "A person with a backpack walking away down a covered train platform beside a waiting train.",
    credit: unsplash("Jan Macháček", "machcz", "https://unsplash.com/photos/D0TKC9d4i78"),
  },
  eveningFlats: {
    src: "/photos/evening-flats.jpg",
    alt: "An apartment block with balconies and a few warmly lit windows against a deep blue evening sky.",
    focus: "50% 65%",
    credit: unsplash("Timur Seyfelmlyukov", "timurse", "https://unsplash.com/photos/_ElhRrxZNVQ"),
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;
