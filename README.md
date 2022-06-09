# mock-issuer

## overview
ホワイトラベルウォレット開発用のissuerとveriferのmock

## Getting Started

### ngrokのセットアップ
ngrokを使うにはアカウントの登録が必要になります
ngrokの使い方ガイド
https://kakechimaru.com/ngrok/

### .envファイル
プロジェクトのルートディレクトリに.envファイルを作成する
```plaintext
BASE_URL=[ここはngrokを立ち上げた時のURL]
VC_REQUEST_QRCODE=/issuer
VC_VERIFIER_QRCODE=/verifier
VC_REQUEST_URL=/api/issue/issue-request/BlockBaseVC
VC_PRESENTATION_URL=/api/present/presentation-request/BlockBaseVC
MANIFEST_URL=/api/issue/manifest/BlockBaseVC
ISSUE_URL=/api/issue/issue/BlockBaseVC
PRESENT_URL=/api/present/present/BlockBaseVC
VC_EXCHANGE_URL=/api/vc-exchange
SERVER_PRIVATE_KEY=aaa
```

### 立ち上げ
run the ngrok server:
```bash
ngrok http 3000
```
run the development server:

```bash
npm run dev
# or
yarn dev
```
