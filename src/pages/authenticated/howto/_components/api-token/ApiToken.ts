import {
  CreateApiTokenResponse,
  DeleteApiTokenResponse,
  GetApiTokenResponse,
} from '@/domain/types/ApiToken';
import ENV from '@/env';
import i18next from 'i18next';

export const API_TOKEN_API_MESSAGE = (currentLang: string) => ({
  unavailable: currentLang === 'ja' ? '現在利用できません' : 'This is currently unavailable.',
  get: {
    success: {
      found: currentLang === 'ja' ? 'APIトークンを取得しました' : 'got an API token.',
      not_found: currentLang === 'ja' ? 'APIトークンが存在しません' : 'API token does not exist.',
    },
    fail: currentLang === 'ja' ? 'APIトークンの取得に失敗しました' : 'Failed to get API token.',
  },
  create: {
    success: currentLang === 'ja' ? 'APIトークンを発行しました' : 'API token issued',
    fail: currentLang === 'ja' ? 'APIトークンの生成に失敗しました' : 'Failed to create API token.',
  },
  remove: {
    success: currentLang === 'ja' ? 'APIトークンを削除しました' : 'API token removed.',
    fail: currentLang === 'ja' ? 'APIトークンの削除に失敗しました' : 'Failed to remove API token.',
  },
});

export async function createApiToken(idToken: string): Promise<CreateApiTokenResponse> {
  const currentLang = i18next.language;
  const res = await fetch(`${ENV.API_ENDPOINT}/api-token`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
      Authorization: 'Bearer ' + idToken,
    },
  });

  if (res.status === 403) {
    return {
      operationResult: {
        success: false,
        message: API_TOKEN_API_MESSAGE(currentLang).unavailable,
      },
      token: {
        secret: '',
        expiration: '',
      },
    };
  }

  if (!res.ok) {
    return {
      operationResult: {
        success: false,
        message: API_TOKEN_API_MESSAGE(currentLang).create.fail,
      },
      token: {
        secret: '',
        expiration: '',
      },
    };
  }

  const token = await res.json();
  return {
    operationResult: {
      success: true,
      message: API_TOKEN_API_MESSAGE(currentLang).create.success,
    },
    token: {
      secret: token.api_token_secret,
      expiration: token.api_token_expiration,
    },
  };
}

export async function deleteApiToken(idToken: string): Promise<DeleteApiTokenResponse> {
  const currentLang = i18next.language;
  const res = await fetch(`${ENV.API_ENDPOINT}/api-token`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
      Authorization: 'Bearer ' + idToken,
    },
  });

  if (res.status === 403) {
    return {
      operationResult: {
        success: false,
        message: API_TOKEN_API_MESSAGE(currentLang).unavailable,
      },
    };
  }

  if (!res.ok) {
    return {
      operationResult: {
        success: false,
        message: API_TOKEN_API_MESSAGE(currentLang).remove.fail,
      },
    };
  }

  return {
    operationResult: {
      success: true,
      message: API_TOKEN_API_MESSAGE(currentLang).remove.success,
    },
  };
}

export async function getApiToken(idToken: string): Promise<GetApiTokenResponse> {
  const currentLang = i18next.language;
  const res = await fetch(`${ENV.API_ENDPOINT}/api-token`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
      Authorization: 'Bearer ' + idToken,
    },
  });

  if (res.status === 403) {
    return {
      operationResult: {
        success: false,
        message: API_TOKEN_API_MESSAGE(currentLang).unavailable,
      },
      token: {
        secret: '',
        expiration: '',
      },
    };
  }

  if (res.status === 404) {
    return {
      operationResult: {
        success: true,
        message: API_TOKEN_API_MESSAGE(currentLang).get.success.not_found,
      },
      token: {
        secret: '',
        expiration: '',
      },
    };
  }

  if (!res.ok) {
    return {
      operationResult: {
        success: false,
        message: API_TOKEN_API_MESSAGE(currentLang).get.fail,
      },
      token: {
        secret: '',
        expiration: '',
      },
    };
  }

  const token = await res.json();
  return {
    operationResult: {
      success: true,
      message: API_TOKEN_API_MESSAGE(currentLang).get.success.found,
    },
    token: {
      secret: token.api_token_secret,
      expiration: token.api_token_expiration,
    },
  };
}
