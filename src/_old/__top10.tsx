import { GetStaticProps } from 'next';

interface IProducts {
  id: number;
  title: string;
}

interface Top10Props {
  products: IProducts[];
}

const Top10: React.FC<Top10Props> = ({ products }) => {
  return (
    <div>
      <h1>Top 10</h1>
      <ul>
        {products.map(recommendedProduct => (
          <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Top10;

export const getStaticProps: GetStaticProps<Top10Props> = async _context => {
  const response = await fetch('http://localhost:3333/products');
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 5,
  };
};
