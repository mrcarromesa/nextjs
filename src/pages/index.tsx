import { GetServerSideProps } from 'next';
import Link from 'next/link';
import SEO from '~/components/SEO';
import { client } from '~/lib/prismic';
import { Title } from '~/styles/pages/Home';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

interface IProducts {
  id: number;
  title: string;
}

// interface HomeProps {
//   recommendedProducts: IProducts[];
// }

interface HomeProps {
  recommendedProducts: Document[];
}

const Home = ({ recommendedProducts }: HomeProps) => {
  return (
    <div>
      <SEO title="DevCommerce, your best e-commerce" shoudExcludeTitleSuffix />
      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map(recommendedProduct => (
            <li key={recommendedProduct.id}>
              <Link href={`catalog/product/${recommendedProduct.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;

// Isso é bom para os motores de buscas, porém deve ser utilizado com cuidado TTFB
// export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
//   const response = await fetch('http://localhost:3333/recommended');
//   const recommendedProducts = await response.json();

//   return {
//     props: {
//       recommendedProducts,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};
