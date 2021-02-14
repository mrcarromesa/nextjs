import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import { client } from '~/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import Link from 'next/link';

// interface IProducts {
//   id: number;
//   title: string;
// }

interface CategoryProps {
  category: Document;
  products: Document[];
}

const Category: React.FC<CategoryProps> = ({ category, products }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(category.data.title)}</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={`/catalog/product/${product.uid}`}>
              <a>{PrismicDOM.RichText.asText(product.data.title)}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
//   const categories = (await response.json()) as [{ id: string }];

//   const paths = categories.map(category => {
//     return {
//       params: { slug: category.id },
//     };
//   });

//   return {
//     paths,
//     fallback: true,
//   };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await client().query([
    Prismic.Predicates.at('document.type', 'category'),
  ]);

  const paths = categories.results.map(category => {
    return {
      params: { slug: category.uid },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

/* GetStaticProps<
  CategoryProps,
  { slug: string }
> */

/**
 *
 *
 * (context: { params: { slug: string; }; }) => Promise<{ props: { products: ApiSearchResponse; }; revalidate: number; }>
 */

export const getStaticProps: GetStaticProps<
  CategoryProps,
  { slug: string }
> = async context => {
  const { slug = '' } = context.params as { slug: string };

  const category = await client().getByUID('category', String(slug), {});
  const products = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.at('my.product.category', category.id), // campo "meu", sempre que quero pegar o relacionamento precisa ser pelo id e não pelo slug
  ]);

  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/products?category_id=${slug}`,
  // );
  // const products = await response.json();

  return {
    props: {
      category,
      products: products.results,
    },
    revalidate: 60,
  };
};
