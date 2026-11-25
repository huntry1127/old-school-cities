import GlobeHome from './globe-home';
import './globe.css';

export const metadata = {
  title: { absolute: 'Old School Cities | Explore the Map' },
  description: 'Explore the cities behind Old School Cities, a vintage-inspired graphic tee brand.'
};

export default function HomePage() {
  return <GlobeHome />;
}
