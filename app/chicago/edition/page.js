import CityEdition from '../../city-edition';
import { etsyShopUrl, getProduct } from '../../../lib/products';
import '../edition.css';

export const metadata = {
  title: 'Chicago Edition',
  description: 'Read the stories behind the Chicago drop, from the elevated railroad and the Great Chicago Fire to the lakefront and football Sundays.'
};

const stories = [
  {
    id: 'story',
    headline: 'The Loop Lives On',
    deck: 'The elevated railroad that became part of Chicago’s skyline.',
    paragraphs: [
      'You hear it before you see it. A train rounds the bend, the steel tracks rattle overhead, and for a few seconds everyone on the sidewalk talks a little louder.',
      'Chicago’s first elevated train ran in 1892. The downtown Loop followed in 1897. Our tee celebrates the view from street level, where the tracks frame the buildings and a passing train turns the whole block into a Chicago scene.'
    ],
    artwork: { ...getProduct('the-loop').artwork, caption: 'The Loop tee artwork' },
    href: '/chicago/product/the-loop',
    source: {
      label: 'Rail history from the CTA',
      href: 'https://www.transitchicago.com/facts/'
    }
  },
  {
    id: 'archive',
    headline: 'The Legend of Mrs. O’Leary’s Cow',
    deck: 'The Great Chicago Fire of 1871 and the story that outlived it.',
    paragraphs: [
      'The story goes that a cow knocked over a lantern and set Chicago ablaze. Investigators found no evidence that Catherine O’Leary started the fire, but the story kept making its way into newspapers, songs, and movies.',
      'Our print takes that familiar tall tale all the way into monster-movie territory, with a giant cow rising out of the lake above a burning skyline.'
    ],
    artwork: { ...getProduct('the-great-chicago-fire').artwork, caption: 'The Great Chicago Fire tee artwork' },
    href: '/chicago/product/the-great-chicago-fire',
    source: {
      label: 'The story behind the legend from WTTW',
      href: 'https://www.wttw.com/chicago-stories/chicago-fire/a-cow-a-lantern-and-a-myth-mrs-oleary-and-19th-century-immigrants-in-chicago'
    }
  },
  {
    id: 'lake-shore-drive',
    headline: 'Cruising Lake Shore Drive',
    deck: 'The lake on one side, the skyline on the other.',
    paragraphs: [
      'There’s a moment on Lake Shore Drive when the road bends and the skyline opens up in front of you. It’s a good excuse to take the long way home, especially when the light is dropping over the lakefront.',
      'Coastal Cruising puts that drive in hot pink and orange, with vintage cars heading toward downtown and the lake catching the last of the sunset.'
    ],
    artwork: { ...getProduct('lake-shore-drive').artwork, caption: 'Lake Shore Drive tee artwork' },
    href: '/chicago/product/lake-shore-drive'
  },
  {
    id: 'sundays',
    headline: 'Sunday Belongs to Chicago',
    deck: 'The tailgate starts long before kickoff.',
    paragraphs: [
      'On a football Sunday, the parking lot has its own schedule. Someone fires up the grill while it’s still cold enough to see your breath. The regulars find each other, pull up a folding chair, and start talking about the game.',
      'That’s the Sunday on our tee. The skyline is in the distance, the flags are up, and the best part of the day might already be happening.'
    ],
    artwork: { ...getProduct('sunday-belongs-to-chicago').artwork, caption: 'Sunday Belongs to Chicago tee artwork' },
    href: '/chicago/product/sunday-belongs-to-chicago'
  }
];

export default function ChicagoPage() {
  return <CityEdition city="Chicago" shopHref="/chicago/shop" etsyHref={etsyShopUrl} stories={stories} />;
}
