# CONTRIBUTING

## Coding Standards

### Styling (Tailwind CSS)

#### tailwind.config.ts

繰り返し同じ意図で使用する値や限定する値を予約してください。
※ color, fontSize など

Example:

`bg-blue-500` -> `bg-primary`
`bg-blue-400` -> 使用しない

Tailwind CSS にデフォルトで予約されているカラーは制限し、繰り返し使用する値に名前を付けることで用途を明白にします。

#### class 指定

[clsx](https://www.npmjs.com/package/clsx) を使用し、適度にグルーピングしてください

Example:

  ```tsx
  <div
    className={clsx(
      ['rounded'],
      ['flex', 'gap-3', 'items-center', 'p-5'],
      'font-bold',
      variation === 'info' && ['bg-info', 'text-info-base-content', 'bg-opacity-20'],
      variation === 'error' && ['bg-error', 'text-error-base-content', 'bg-opacity-20'],
      variation === 'success' && ['bg-success', 'text-success-base-content', 'bg-opacity-20']
    )}
  >
  ```

### Lint

Prettier, ESLint を使用してください。

```bash
bun run eslint
```

Prettier による lint をかけられないファイルは `.prettierignore` に記載することで除外可能です。

#### VSCode のセットアップ

```bash
# Setup extensions
$ code --install-extension dbaeumer.vscode-eslint
$ code --install-extension esbenp.prettier-vscode
```

`.vscode/settings.json`

```json
{
  "[javascript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## 環境構築

### Backend のローカル構築

[oqtopus-team/oqtopus-cloud](https://github.com/oqtopus-team/oqtopus-cloud/tree/develop/backend)

### Frontend

1. フロントエンド([本リポジトリ](https://github.com/oqtopus-team/oqtopus-frontend))でプロキシを起動 (CORS 対応)

  ```sh
  cd test/e2e/
  echo 'IP=<host ip>' > .env # 開発マシンのIPアドレス(バックエンド起動ホスト)をプロキシ先に指定
  docker compose up -d
  ```

2. `.env.local` に環境変数の設定

  ```sh
  VITE_APP_AUTH_REGION=ap-northeast-1
  VITE_APP_AUTH_USER_POOL_ID=<your-pool-id>
  VITE_APP_AUTH_USER_POOL_WEB_CLIENT_ID=<your-pool-web-client-id>
  VITE_APP_AUTH_COOKIE_STORAGE_DOMAIN=localhost
  VITE_APP_API_ENDPOINT=http://localhost:8081
  VITE_APP_API_SIGNUP_ENDPOINT=http://localhost:8081
  VITE_APP_APP_ENV=dev
  VITE_APP_APP_ORG=oqtopus
  ```

3. 起動

  ```sh
  bun dev
  ```
