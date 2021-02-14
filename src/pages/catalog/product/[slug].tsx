import { useRouter } from 'next/dist/client/router';
import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { client } from '~/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { GetStaticPaths, GetStaticProps } from 'next';

interface ProductProps {
  product: Document;
}

const AddToCartModal = dynamic(() => import('~/components/AddToCartModal'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Product: React.FC<ProductProps> = ({ product }) => {
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  const router = useRouter();

  const handleAddToCart = useCallback(() => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    setIsAddToCartModalVisible(true);
  }, []);

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>
      <img src={product.data.thumbnail.url} width="600" alt="" />
      <div
        dangerouslySetInnerHTML={{
          __html: PrismicDOM.RichText.asHtml(product.data.description),
        }}
      ></div>
      <p>Price: ${product.data.price}</p>
      <button onClick={handleAddToCart}>Add To Cart</button>

      {isAddToCartModalVisible && <AddToCartModal />}
    </div>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
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
  ProductProps,
  { slug: string }
> = async context => {
  const { slug = '' } = context.params as { slug: string };

  const product = await client().getByUID('product', String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 10,
  };
};
