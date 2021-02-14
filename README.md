# NextJS

- Framework para ReactJS

- Resolve questões de indexação dos motores de busca.

- Quando o usuário acessa a aplicação ele é levado para um servidor node, que reenderiza a página e retorna tudo pronto para o browser do usuário, esse recurso é chamado `Server-side-rendering`

- E sim podemos utilizar o NextJS para tudo ao invés de utilizar o create react app

---

## Criar aplicação com o NextJS

- Execute o seguinte comando:

```shell
yarn create next-app NOME_DO_PROJETO
```

- Ele é bem rápido, mais rápido que o create app do react

### Adicionar o typescript ao NextJS

- Basta adicionar as dependencias:

```shell
yarn add typescript @types/react @types/node -D
```

- Basicamente só alterar a extensão dos arquivos de .js para ts e sair utilizando

---

### Limpando a estrutura

- Podemos remover a pasta `styles/`, na pasta `public` podemos apagar o favicon e o vercel
- Apagar a pasta `pages/api/`
- Renomear a extensão dos arquivos da pasta `pages` para `.tsx`

- Alterar o conteúdo de `pages/index.tsx`:

```tsx
const Home = () => {
  return <div>
    <h1>Hello World</h1>
  </div>;
}

export default Home;
```

- E também de `_app.tsx`:

```tsx
const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp

```

- Por fim para ver a aplicação rodando podemos executar o seguinte comando:

```shell
yarn dev
```

---

### Testando que o NextJS é renderizado pelo server side

- Podemos desabilitar o Javascript e basicamente a aplicação continua funcionando, diferente de uma aplicação feita em react caso desabilitemos o js do browser ela não irá funcionar

---

### Typescript, ESLint, Prettier, root import

- Instale o Editor Config no vscode: [](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

- Na raiz do projeto clique com o botão direito do mouse e selecione:

```
Generate .editorconfig
```

- Será gerado um arquivo e insira o código:

```yml
  root = true

  [*]
  indent_style = space
  indent_size = 2
  charset = utf-8
  trim_trailing_whitespace = true
  insert_final_newline = true
  end_of_line = lf
```

- [Start a clean Next.js project with TypeScript, ESLint and Prettier from scratch](https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js)

- Instalar `eslint`:

```shell
yarn add --dev eslint @typescript-eslint/parser  @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

- Detalhes sobre as dependencias:

eslint is the main ESLint package.
@typescript-eslint/parser will allow ESLint to parse TypeScript files.
@typescript-eslint/eslint-plugin will add TypeScript specific lint rules.
eslint-plugin-react will add React specific lint rules.
eslint-plugin-react-hooks will extend eslint-plugin-react to add React Hooks rules.
eslint-plugin-jsx-a11y will add accessibility related rules.

- Criar o arquivo `.eslintrc.js`:

```js
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8 }, // to enable features such as async/await
  ignorePatterns: ['node_modules/*', '.next/*', '.out/*', '!.prettierrc.js'], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: ['eslint:recommended'],
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: { version: 'detect' },
          "import/resolver": {
            "babel-plugin-root-import": {
            rootPathSuffix: "./src"
          },
        },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // TypeScript rules
        'plugin:react/recommended', // React rules
        'plugin:react-hooks/recommended', // React hooks rules
        'plugin:jsx-a11y/recommended', // Accessibility rules
        'prettier/@typescript-eslint', // Prettier plugin
        'plugin:prettier/recommended', // Prettier recommended rules
      ],
      rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        // We will use TypeScript's types for component props instead
        'react/prop-types': 'off',

        // No need to import React when using Next.js
        'react/react-in-jsx-scope': 'off',

        // This rule is not compatible with Next.js's <Link /> components
        'jsx-a11y/anchor-is-valid': 'off',

        // Why would you want unused vars?
        '@typescript-eslint/no-unused-vars': ['error'],

        // I suggest this setting for requiring return types on functions only where useful
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
      },
    },
  ],
}
```

- Adicionar o prettier:

```shell
yarn add --dev prettier eslint-plugin-prettier eslint-config-prettier
```

- Criar o arquivo `.prettierrc.js`:

```js
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
}

```

- Instalar a dependencia:

```shell
yarn add babel-plugin-root-import -D
```

- Criar o arquivo `tsconfig.paths.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "~/*": ["*"]
    }
  }
}
```

- Ajustar o arquivo `tsconfig.json`:

```json
{
  "compilerOptions": {
    // ..
    "strict": true,
    // ..
  },
    // ..
  "extends": "./tsconfig.paths.json",
}
```

- Criar o diretório `src` e mover a pasta `pages/` para dentro do `src`

---

## Paginas e Rotas

- No NextJS, precisamos ter uma pasta `pages` obrigatóriamente, é nela que teremos todas as nossas "rotas".
  - Arquivo `pages/index.tsx` será a página inicial sempre
  - `_app.tsx` o next ignora todos os arquivos que iniciam com `_` ele não considera como uma página
  - Se criarmos o arquivo `pages/search.tsx` teremos uma nova rota chamada `/search`
  - Se criarmos o arquivo `pages/catalog/product/index.tsx` teremos uma nova rota chamada `catalog/product/`
- Dessa forma não precisamos do react-router-dom como no projeto reactjs para termos rotas, o NextJS simplifica isso

---

### Rotas dinamicas

- No NextJS podemos definir rotas dinamicas, pense em uma página de produtos no qual passamos o nome da página /nome-produto,
- Para fazer isso criamos uma arquivo chamado: `[NOME_QUALQUER].tsx`, nesse caso foi criado o arquivo `src/pages/catalog/product/[slug].tsx`:

```tsx
const router = useRouter();
return <h1>{router.query.slug}</h1>;
```

- Por fim só acessar a rota no browser: `http://localhost:3000/catalog/product/nome-do-produto-qualquer`

---

## Styled Components

- O NextJS funciona com qualquer lib de styles que o react utiliza.

- Nesse projeto será utilizado o `styled-components`:

```shell
yarn add styled-components
```

- E adicionamos o dependencia de tipagem:

```shell
yarn add @types/styled-components -D
```

- Feito isso, criamos uma pasta `src/styles` e dentro dessa pasta teremos:
  - `GlobalStyle.ts`
  - `pages/Home.ts` - Para páginas que possuir estilização podemos colocar dentro de `style/pages/`NomeDaPagina`.ts`

- Para aplicar o estilo global alteramos o arquivo `src/pages/_app.tsx`:

```tsx
import { AppProps } from 'next/app';
import GlobalStyle from '~/styles/GlobalStyle';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps}></Component>
    </>
  );
};

export default MyApp;

```

- Porém há um pequeno problema... o `styled-components` não funciona nativamente com o next no esquema de `server-side-reendering`
- Para resolver isso vamos na documentação do `styled-components` especificamente na parte de server side rendering Next.js [Styled-components Next.js](https://styled-components.com/docs/advanced#nextjs)

- Basicamente criamos o arquivo `babel.config.js`:

```js
module.exports = {
  presets: ["next/babel"],
  plugins: [["styled-components", { "ssr": true }]]
}

```

- Instalamos também a dependencia:

```shell
yarn add babel-plugin-styled-components -D
```

- Por fim criamos o arquivo `src/pages/_document.tsx`, o arquivo `_app.tsx` é um component que fica por volta das páginas que é reenderizado apenas uma vez, por isso que adicionamos o component `GlobaStyle` pois não precisamos que ele reenderize a cada página mas sim apenas uma vez só.

- Já o `_document` é um arquivo que fica por volta da aplicação também mas ele é reenderizado a cada tela, toda vez que mudamos de uma tela para outra, o componet do `_document` executa novamente.
- Ele também pré carrega a pagina e ele também pega todos os estilos do css que foram gerados pelo pré-carregamento da página index, da página de produto, assim por diante e na hora que o node irá mostrar a página ele já monta com alguns estilos da página e não só com o html.


---

### Criar um fake server JSON

- Criamos na raiz do projeto o arquivo `server.json`

- Para executar esse servidor utilizamos o comando:

```shell
npx json-server server.json -p 3333 -w
```

- O npx irá instalar o `json-server` caso já tenhamos ainda, porém não será como dependencia do nosso projeto.
- Informamos o nome do arquivo
- Informamos a porta: `-p 3333`
- Informamos que queremos que o servidor restart caso realizemos alguma alteração no arquivo `-w`

- Para adicionar delay adicionamos a propriedade `-d VALOR_MILISEGUDOS`

---

### Chamadas de api

- Para chamadas de api podemos utilizar o proprio axios, ou fetch ou melhor ainda que é recomendado pelo proprio nextjs: [SWR](https://swr.vercel.app)


## Client Side Fetching

- Ocorre quando realizamos uma chamada de api para retornar dados que serão reenderizados em tela, executando apenas no lado do cliente:

```tsx
useEffect(() => {
    fetch('http//localhost:3333/recommended').then(response => {
      response.json().then(data => {
        setRecommendedProducts(data);
      });
    });
  }, []);
```

- O retorno dessa api não será indexada pelos motores de busca

---

## Server Side render

- Na prática:

```ts
const Home = ({ recommendedProducts }: HomeProps): JSX.Element => {
  return (
    <div>
      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map(recommendedProduct => (
            <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;

// Isso é bom para os motores de buscas, porém deve ser utilizado com cuidado TTFB
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch('http//localhost:3333/recommended');
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
```

- A function é a `getServerSideProps`, ela é reenderizada pelo lado servidor, então no browser já retorna com os itens reenderizados

---

## Static Site Generation

- O nextjs gera o conteúdo estatico dessa página no momento do build, fazendo o acesso ser práticamente instantaneo basicamente ele não irá realziar consulta a API, ou banco de dados simplesmente gera o conteúdo e gera o arquivo com o conteúdo pronto e mantem assim, e não atualiza mais mantem o mesmo conteúdo, a menos que utilizemos a prop `revalidate` o qual o nextjs irá gerar uma nova página estática após x segundos conforme determinado na prop `revalidate`, Um exemplo disso está em `src/pages/top10.tsx`:

```tsx
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

```

- Utilizamos a function: `getStaticProps`


---

## Páginas estáticas dinâmicas


- Esse tipo de página é bem parecida com a página `src/pages/top10.tsx`, que vimos no exemplo anterior, porém como ela também é dinamica precisamos de mais uma function para informar todos os parametros que a nossa página receberá e que queremos que seja estáticos.

- Para isso utilizamos o parametro `getStaticPaths`:

```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/categories`);
  const categories = (await response.json()) as [{ id: string }];

  const paths = categories.map(category => {
    return {
      params: { slug: category.id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
```

- Utilizamos essa function em conjunto com a function `getStaticProps`

- Um exemplo disso está em `src/pages/catalog/categories/[slug].tsx`

- Por fim para ver na prática funcionando podemos, iniciar o servidor JSON, depois executar o comando:

```shell
yarn build
```

- Depois executar:

```shell
yarn start
```

- e no browser podemos acessar: http://localhost:3000/catalog/categories/calcas

---

## fallback - Página estáticas dinâmicas

- Imagine que temos um blog, geramos a build com página estáticas dinâmicas, mais tarde precisamos adicionar mais uma página, se para isso precisarmos gerar o build toda vez para adicionar essa página realmente acaba perdendo o sentido, o nextjs. Porém temos o recurso do fallback para nos auxiliar,

- O fallback estando true, quando o primeiro usuário acessar essa página que ainda não existe, o nextjs irá tentar encontrar essa nova página e se ela existir ele irár gera-lá de forma estática

- Um exemplo temos no `src/pages/catalog/categories/[slug].tsx`:

```tsx
const Category: React.FC<CategoryProps> = ({ products }) => {
  const router = useRouter();

  // Verifica se a página está em processo de reenderização
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }
  // ...
}
```

```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  // ...

  return {
    paths,
    fallback: true, // <- Ativamos o fallback
  };
};
```

---

## Página 404

- Basta apenas criar uma página dentro de `src/pages/404.tsx` e Adicionar qualquer conteúdo


---

## Import dinamico

- Em alguns casos eu não preciso importar todos os recursos que serão utilizados poucas vezes pelo usuário, por exemplo se eu tenho um pacote pesado, como no caso o lodash, ou outros, e são recursos que utilizo poucas vezes eu posso importar esse recurso apenas quando for necessário, exemplo prático:


Em um arquivo temos:

```ts
export default {
  sum: (a: number, b: number): number => {
    return a + b;
  }
}
```

- E no component utilizamos:

```tsx
export default function Home()  {
  async function handleSum() {
    const math = (await import('../lib/math')).default;
    alert(math.sum(1,1));
  }
}
```

- Isso é apenas um exemplo simples, no mundo real utilizamos libs que são pesadas e que não são utilizadas com muita frequencia.


---

## Lazy load

- Recurso para só carregar algum recurso quando o usuário realmente acionar, um exemplo disso em `src/pages/catalog/product/[slug].tsx`:

```tsx
import dynamic from 'next/dynamic';

const AddToCartModal = dynamic(() => import('~/components/AddToCartModal'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

```

- O import é o enderenço do component que estamos importando,
- loading utilizamos um html que queremos exibir em quanto o component carrega
- ssr - definimos se queremos que o server renderize o component pelo lado dele (true). OU se fica a cargo do proprio browser (false).


---

## Variaveis de ambiente

- Ambientes:
  - `.env.local`
  - `.env.development`
  - `.env.production`
  - `.env.test`

- Adicionar variaveis normalmente, como:

```.env
API_URL=http://localhost:3333
```

- só ficaram disponíveis para functions que são executadas no nodejs, como no caso do `getStaticPaths`, mas se precisa que ela fique disponível também para o browser, precisa adicionar o pré-fixo: `NEXT_PUBLIC_`_:

```.env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

- Por fim podemos utilizar a variavei em qualquer lugar, apenas chamando dessa forma `process.env.NOME_DA_VARIAVEL`

---

### SEO

- Criamos o component `src/components/SEO/index.tsx`

- Adicionamos ele na página que queremos ter o SEO

- Para permitir adicionar as informações do SEO para dentro do head do nosso html utilizamos o component: `import Head from 'next/head';`


---

## Ajustes gerais no doucument

- Quando queremos adicionar uma fonte customizada no next, podemos obter o do google fonts o `<link/>` da fonte, e depois em `src/pages/_document.tsx` precisamos realizar alguns ajustes...

```tsx
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

// ...
// ...
render(): JSX.Element {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />
          {/* aqui pode ir o link da fonte e outros components do head */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
// ...
```

----

## CMS
- ghost (blog)
- strapi (apenas muito pequeno)
- prismic (não recomendado para blog)
- coontentful

---

## Prismic SDK

- Execute o seguinte comando para instalar o prismic:

```shell
yarn add prismic-javascript prismic-dom
```

e

```shell
yarn add @types/prismic-dom -D
```

- Criar o arquivo `lib/prismic.ts` o qual fará a conexeção com o prismic

- Documentação do [Prismic Doc para JS](https://prismic.io/docs/technologies/integrating-with-an-existing-project-javascript)

- Ajustamos o arquivo `src/pages/index.tsx` para realizar algumas consultas:

```tsx
import Link from 'next/link';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

interface HomeProps {
  recommendedProducts: Document[];
}

// ...
{recommendedProducts.map(recommendedProduct => (
  <li key={recommendedProduct.id}>
    <Link href={`catalog/product/${recommendedProduct.uid}`}>
      <a>
        {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
      </a>
    </Link>
  </li>
))}
// ...
// ...

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
```

- Importamos o `Link` do next ele precisa dentro delo da tag `<a></a>`
- Importamos o `Document` para tipar o retorno do `client().query(...)`
- Importamos o PrismicDOM pois o prismic.data.title retorna o object então precisamos utiliza-lo para transformar em text


- Mais informações de como realizar consultas no prismic [Predicate](https://prismic.io/docs/technologies/query-predicate-reference-javascript)


---

### Ajustando pagina de categorias para obter os itens

- Ajustes no arquivo `src/pages/catalog/categories/[slug].tsx`:

```tsx
// ...
interface CategoryProps {
  category: Document;
  products: Document[];
}

// ...
  <h1>{PrismicDOM.RichText.asText(category.data.title)}</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={``}>
              <a>{PrismicDOM.RichText.asText(product.data.title)}</a>
            </Link>
          </li>
        ))}
      </ul>
// ...

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


  return {
    props: {
      category,
      products: products.results,
    },
    revalidate: 60,
  };
};
```


---


## Página de busca

- Página de busca `src/pages/search` foi utilizado o `getServerSideProps` para permitir ser indexada pelos motores de buscas

---

## Enviar para produção

- Primeiro na nossa máquina executamos o comando:

```shell
yarn build
```

- Para verificar se está tudo ok.

- Podemos utilizar o vercel para realizar deploy

- Instalamos a [vercel-cli](https://vercel.com/download)

- Realizar o login:

```shell
vercel login
```

- Depois no projeto só executar:

```shell
vercel
```
