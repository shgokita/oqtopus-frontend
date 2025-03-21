export default {
  title: 'サインアップ',
  explanation01: '以下のQRコードをMFAアプリで<br />読み込んでください。',
  explanation02: '上記で作成したMFAアプリに表示されるワンタイムパスワードを入力してください。',
  form: {
    totp_code: 'ワンタイムパスワード(TOTP Code)',
    error_message: {
      totp_code: 'ワンタイムパスワードを入力してください。',
    },
  },
  button: '送信する',
};
