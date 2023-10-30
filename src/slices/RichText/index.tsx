// ./src/slices/RichText/index.tsx

import type { Content } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
} from '@prismicio/react';

const components: JSXMapSerializer = {
  label: ({ node, children }) => {
    if (node.data.label === 'codespan') {
      return <code>{children}</code>;
    }
  },
  heading1: ({ children }) => (
    <h1 className="font-bold text-4xl">{children}</h1>
  ),
  paragraph: ({ children }) => <p className="text-slate-700">{children}</p>,
  hyperlink: ({ children, node }) => {
    return (
      <PrismicNextLink field={node.data} className="font-bold underline">
        {children}
      </PrismicNextLink>
    );
  },
};

type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

export default function RichText({ slice }: RichTextProps) {
  return (
    <section className="flex flex-col gap-2">
      <PrismicRichText field={slice.primary.content} components={components} />
    </section>
  );
}