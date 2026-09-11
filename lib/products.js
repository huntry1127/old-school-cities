export const products = [
  {
    slug: 'sunday-belongs-to-chicago',
    name: 'Sunday Belongs to Chicago',
    price: 34,
    collection: 'Sunday in Chicago',
    description: 'A worn-in tribute to cold air, parking-lot grills, lake-effect wind, and the ritual of a Chicago football Sunday.',
    color: 'Bone',
    etsyUrl: 'https://www.etsy.com/',
    badge: 'First Drop'
  },
  {
    slug: 'south-side-night-game',
    name: 'South Side Night Game',
    price: 34,
    collection: 'South Side',
    description: 'Inspired by summer nights, elevated trains, stadium lights, and neighborhood baseball culture on the South Side.',
    color: 'Washed Black',
    etsyUrl: 'https://www.etsy.com/'
  },
  {
    slug: 'north-side-day-game',
    name: 'North Side Day Game',
    price: 34,
    collection: 'North Side',
    description: 'A sun-faded nod to day baseball, corner bars, old scorecards, and a long summer afternoon on the North Side.',
    color: 'Vintage Cream',
    etsyUrl: 'https://www.etsy.com/'
  },
  {
    slug: 'more-than-a-game',
    name: 'More Than a Game',
    price: 32,
    collection: 'Chicago Classics',
    description: 'City memory in shirt form: stadium streets, skyline silhouettes, neighborhood pride, and stories passed down.',
    color: 'Charcoal',
    etsyUrl: 'https://www.etsy.com/'
  }
];

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}
