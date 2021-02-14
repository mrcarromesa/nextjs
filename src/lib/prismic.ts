import Primisc from 'prismic-javascript';
import { DefaultClient } from 'prismic-javascript/types/client';

// copiamos a url de prismic.io nas configurações da nossa aplicação
export const apiEndpoint = 'https://devcommerce9.cdn.prismic.io/api/v2';

export const client = (req = null): DefaultClient => {
  const options = req ? { req } : undefined;
  return Primisc.client(apiEndpoint, options);
};
