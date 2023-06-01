import './globals.css';

export const metadata = {
  title: 'Trello Clone',
  description:
    'A Trello clone, built with Next.js and Tailwind CSS, GPT-4 and other cool stuff.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
