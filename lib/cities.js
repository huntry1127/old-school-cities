export const cities = [{ slug: 'chicago', name: 'Chicago', brand: 'Chicago Old School', tagline: 'Made for the city that remembers.', shortTagline: 'Same city. Different era. Better stories.', location: 'Chicago, Illinois' }];
export function getCity(slug) { return cities.find((city) => city.slug === slug); }
