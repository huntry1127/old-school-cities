import './globals.css';
import './parent.css';

export const metadata = {
  title: { default: 'Old School Cities | The Cities You Remember', template: '%s | Old School Cities' },
  description: 'Original apparel inspired by the sports, neighborhoods, traditions, and stories that make a city feel like home.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
