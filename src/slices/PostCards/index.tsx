
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
} from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';
import { asText, Content, FilledContentRelationshipField  } from '@prismicio/client';
/**
 * Props for `PostCards`.
 */
export type PostCardsProps = SliceComponentProps<Content.PostCardsSlice>;

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <h2 className="font-bold text-2xl">{children}</h2>
  ),
  paragraph: ({ children }) => <p className="text-slate-700">{children}</p>,
};

/**
 * Component for "PostCards" Slices.
 */
const PostCards = ({ slice }: PostCardsProps): JSX.Element => {
  const sortedPosts = slice.items.sort((a, b) => {
    const dateA = new Date(a.publication_date || '');
    const dateB = new Date(b.publication_date || '');
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section className="grid grid-cols-2 gap-8">
      {sortedPosts.map((post) => {
   

        return (
          <PrismicNextLink
            field={post.link}
            key={asText(post.title)}
            className="flex flex-col gap-2 hover:bg-blue-50 rounded-lg duration-300 ease-in-out transition-all p-2"
          >
            <p className="font-regular">
              {new Date(post?.publication_date || '').toLocaleDateString()}
            </p>
            <PrismicRichText field={post.title} components={components} />
            <PrismicRichText field={post.description} components={components} />
            <div className="border-b border-solid border-gray-200 w-12 mt-8" />
          </PrismicNextLink>
        );
      })}
    </section>
  );
};

export default PostCards;