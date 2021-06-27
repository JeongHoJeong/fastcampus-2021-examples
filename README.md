# Fastcampus 2021 Node 예시 레포지토리

Fastcampus 2021 노드 강의에서 작성한 예시 코드를 모아둔 레포지토리입니다. 대부분의 코드는 강의에서 보신 내용과 거의 동일하나, 실행의 편의나 셋업 등을 위해 일부 수정된 바가 있습니다.
이 레포지토리를 다운로드 받으신 후, Visual Studio Code를 레포지토리의 루트에서 엽니다.
다음 명령으로 프로젝트를 셋업하고 코드를 살펴보시면 됩니다.

```
npm install
npm run lerna bootstrap
```

- 모든 프로젝트는 node 14.16.1 버전과 npm 6.14.10 버전으로 테스트했습니다.
- `packages` 밑의 각 디렉토리에 프로젝트가 모여 있습니다. 각 레포지토리에 들어가 실행 방법을 확인해 보세요!

## 프로젝트 목록
- [GitHub 관리 CLI 만들기](./packages/cli)
- [Koa, WebSocket으로 라이브 인터랙션 만들기](./packages/live-interaction)
- [이미지 리사이징](./packages/image-resizer)

## 예시 코드 목록
- [Node.js stream](./packages/streams)
- [리팩토링](./packages/refactoring)
- [express 서버 예시](./packages/express-example)
