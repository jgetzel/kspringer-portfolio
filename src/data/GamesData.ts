export enum Platform {
    Browser = "Browser",
    Windows = "Windows",
    Linux = "Linux",
    MacOS = "MacOS",
    Android = "Android",
    iOS = "iOS"
}

export interface Game {
    title: string;
    description: string;
    imageUrl: string;
    link?: string;
    genre: string;
    platforms: Platform[];
}

export const GamesData: Game[] = [
    {
      title: 'Softie',
      description: 'COMING SOON!',
      imageUrl: 'https://via.placeholder.com/800x400',
      genre: 'Platformer',
      platforms: [Platform.Browser]
    },
    {
      title: 'TREE',
      description: "A tree's gotta do what a tree's gotta do.",
      imageUrl: 'https://img.itch.zone/aW1nLzEzOTQ5MTA5LnBuZw==/315x250%23c/pS3VCn.png',
      link: 'https://eowm.itch.io/tree',
      genre: 'Adventure',
      platforms: [Platform.Browser]
    },
    {
      title: 'One Room',
      description: 'Escape from a fishy room.',
      imageUrl: 'https://img.itch.zone/aW1nLzEzMDczNDI2LnBuZw==/315x250%23c/TAZBN%2B.png',
      link: 'https://eowm.itch.io/one-room',
      genre: 'Puzzle',
      platforms: [Platform.Browser]
    },
    {
      title: "Baby, Don't Leave Me! (Game Jam)",
      description: 'Hold on to your baby!',
      imageUrl: 'https://img.itch.zone/aW1nLzQ5ODIxNzYucG5n/315x250%23c/ctK8s4.png', // Replace with actual image
      link: 'https://eowm.itch.io/baby-dont-leave-me',
      genre: 'Platformer',
      platforms: [Platform.Windows]
    },
  ];
