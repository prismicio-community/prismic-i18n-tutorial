// ./src/app/layout.tsx

import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import './styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="any"
          href="https://prismic.io/favicon.ico"
        />
      </head>
      <body className="flex flex-col items-center bg-zinc-50">
        <div className="bg-white max-w-5xl min-h-screen border-x border-solid border-gray-200 p-12 w-full flex flex-col gap-20">
          {children}
          <PrismicPreview repositoryName={repositoryName} />
        </div>
      </body>
    </html>
  );
}