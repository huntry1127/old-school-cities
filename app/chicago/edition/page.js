import CityEdition from '../../city-edition';
import { etsyShopUrl, getProduct } from '../../../lib/products';
import '../edition.css';

export const metadata = {
  title: 'Chicago Edition',
  description: 'Read the stories behind the Chicago drop, from the elevated railroad to the Great Chicago Fire and the deep-dish showdown.'
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
    id: 'pizza-showdown',
    headline: 'The Great Pizza Showdown',
    deck: 'Two skylines, one slice of civic pride, and a deep-dish body slam.',
    paragraphs: [
      'If Chicago and New York could settle their pizza rivalry in the ring, the Sears Tower would show up carrying dinner. In this print, it faces off against the Empire State Building and delivers a deep-dish body slam.',
      'We drew the matchup like an old monster-movie poster, with oversized lettering, scuffed ink, and a city skyline looking on from below.'
    ],
    artwork: { ...getProduct('pizza-showdown').artwork, caption: 'Pizza Showdown tee artwork' },
    href: '/chicago/product/pizza-showdown'
  }
];

export default function ChicagoPage() {
  return <CityEdition city="Chicago" shopHref="/chicago/shop" etsyHref={etsyShopUrl} stories={stories} />;
}
