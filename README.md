# Cloud Run Test

Cloud Run の素振りをする。

どんな感じで使うのか大雑把に把握 + レイテンシの調査

## メモ

```shell
# ビルド
docker build --platform linux/amd64 . -t asia-northeast1-docker.pkg.dev/hello-cloud-run-389011/cloud-run-test/node-hello

# プッシュ
docker push asia-northeast1-docker.pkg.dev/hello-cloud-run-389011/cloud-run-test/node-hello

# デプロイ
gcloud run deploy node --image asia-northeast1-docker.pkg.dev/hello-cloud-run-389011/cloud-run-test/node-hello
```

Cloud Build に任せるなら

```shell
# ビルド＆プッシュ
gcloud builds submit --tag asia-northeast1-docker.pkg.dev/hello-cloud-run-389011/cloud-run-test/node-hello

# デプロイ
gcloud run deploy node --image asia-northeast1-docker.pkg.dev/hello-cloud-run-389011/cloud-run-test/node-hello
```

## レイテンシ

Metrics Explorer の統計モードよりデータを取得。  
第1世代、MEM512MiB、1CPU、CPUブースト有効。  
サンプル数は20くらい。

### コンテナの起動時のレイテンシ

|    | node|  deno| rust|
|---:|----:|-----:|----:|
|  5%|495ms| 140ms|103ms|
| 50%|841ms| 450ms|108ms|
| 95%|923ms|1150ms|164ms|
|mean|785ms| 510ms|113ms|

### リクエストのレイテンシ

|    | node|  deno|  rust|
|---:|----:|-----:|-----:|
|  5%|3.9ms|0.95ms|1.99ms|
| 50%|319ms|31.8ms|15.6ms|
| 95%|509ms| 127ms|69.4ms|
|mean|325ms|45.6ms|17.4ms|

## warm維持

ドキュメントより

>リクエスト処理後 15 分を過ぎるとインスタンスのアイドル状態は解除されます（ただし、最小インスタンス数を使用してアクティブ状態が保持されている場合は除きます）。
