const env = import.meta.env;

const ENV = {
  AWS_CONFIG: {
    region: env.VITE_APP_AUTH_REGION,
    userPoolId: env.VITE_APP_AUTH_USER_POOL_ID,
    userPoolWebClientId: env.VITE_APP_AUTH_USER_POOL_WEB_CLIENT_ID,
    cookieStorage: {
      domain: env.VITE_APP_AUTH_COOKIE_STORAGE_DOMAIN,
      path: '/',
      expires: 365,
      sameSite: 'strict',
      secure: env.VITE_APP_AUTH_COOKIE_STORAGE_DOMAIN !== 'localhost',
    },
    authenticationFlowType: 'USER_SRP_AUTH',
  },
  API_ENDPOINT: (() => {
    if (!env.VITE_APP_API_ENDPOINT || env.VITE_APP_API_ENDPOINT === '') {
      throw new Error('Env `VITE_APP_API_ENDPOINT` is not specified');
    }
    if (`${env.VITE_APP_API_ENDPOINT}`.endsWith('/')) {
      const endpointString = `${env.VITE_APP_API_ENDPOINT}`;
      return endpointString.substring(0, endpointString.length - 1);
    }
    return env.VITE_APP_API_ENDPOINT;
  })(),
  API_SIGNUP_ENDPOINT: (() => {
    if (!env.VITE_APP_API_SIGNUP_ENDPOINT || env.VITE_APP_API_SIGNUP_ENDPOINT === '') {
      throw new Error('Env `VITE_APP_API_SIGNUP_ENDPOINT` is not specified');
    }
    return env.VITE_APP_API_SIGNUP_ENDPOINT;
  })(),
};

export default ENV;
