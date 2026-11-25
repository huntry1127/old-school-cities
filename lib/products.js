export const etsyShopUrl = 'https://www.etsy.com/shop/ChicagoOldSchool';

export const products = [
  {
    slug: 'the-loop',
    name: 'The Loop Tee',
    collection: 'Chicago Edition',
    description: 'Vintage-style artwork of Chicago’s elevated train running beneath the downtown skyline.',
    artwork: {
      src: '/chicago/the-loop.webp',
      alt: 'The Loop design with an elevated train, the Chicago Theatre sign, and the Sears Tower',
      width: 850,
      height: 755
    },
    etsyUrl: null
  },
  {
    slug: 'the-great-chicago-fire',
    name: 'The Great Chicago Fire Tee',
    collection: 'Chicago Edition',
    description: 'A monster-movie take on the legend of Mrs. O’Leary’s cow, with a giant cow rising out of Lake Michigan.',
    artwork: {
      src: '/chicago/the-great-chicago-fire.webp',
      alt: 'The Great Chicago Fire design with a giant cow rising above a burning Chicago skyline',
      width: 777,
      height: 850
    },
    etsyUrl: null
  },
  {
    slug: 'sunday-belongs-to-chicago',
    name: 'Sunday Belongs to Chicago',
    price: 34,
    collection: 'Sunday in Chicago',
    description: 'A worn-in tribute to cold air, parking-lot grills, lake-effect wind, and the ritual of a Chicago football Sunday.',
    color: 'Bone',
    etsyUrl: null,
    badge: 'First Drop'
  },
  {
    slug: 'south-side-night-game',
    name: 'South Side Night Game',
    price: 34,
    collection: 'South Side',
    description: 'Inspired by summer nights, elevated trains, stadium lights, and neighborhood baseball culture on the South Side.',
    color: 'Washed Black',
    etsyUrl: null
  },
  {
    slug: 'north-side-day-game',
    name: 'North Side Day Game',
    price: 34,
    collection: 'North Side',
    description: 'A sun-faded nod to day baseball, corner bars, old scorecards, and a long summer afternoon on the North Side.',
    color: 'Vintage Cream',
    etsyUrl: null
  },
  {
    slug: 'more-than-a-game',
    name: 'More Than a Game',
    price: 32,
    collection: 'Chicago Classics',
    description: 'City memory in shirt form: stadium streets, skyline silhouettes, neighborhood pride, and stories passed down.',
    color: 'Charcoal',
    etsyUrl: null
  }
];

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}
