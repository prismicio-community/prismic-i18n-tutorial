// ./src/app/[lang]/page.tsx

import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';
import { createClient } from '@/prismicio';
import { components } from '@/slices';
// ⬇️ Note the imports of `getLocales` and `LanguageSwitcher`
import { getLocales } from '@/utils/getLocales';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID('page', 'home', { lang });

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title || undefined,
      images: [
        {
          url: home.data.meta_image.url || '',
        },
      ],
    },
  };
}

export default async function Index({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const client = createClient();
  const home = await client.getByUID('page', 'home', {
    lang,
  });
	// ⬇️ Note the fetching of the locales
  const locales = await getLocales(home, client);

	// ⬇️ Note the rendering of the LanguageSwitcher component
  return (
    <>
      <LanguageSwitcher locales={locales} />
      <SliceZone slices={home.data.slices} components={components} />
    </>
  );
}