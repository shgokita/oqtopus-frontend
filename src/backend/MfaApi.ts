import ENV from '@/env';

// ログイン前の為、IDトークンではなくユーザーID/パスワードでの認証
export async function resetMfa(email: string, password: string): Promise<boolean> {
  const data = {
    email,
    password,
    client_id: ENV.AWS_CONFIG.userPoolWebClientId,
  };
  const res = await fetch(`${ENV.API_SIGNUP_ENDPOINT}/mfa_reset_request`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.status === 200;
}
