import {
    Environment,
    Network,
    RecordSource,
    Store,
    RequestParameters,
    Variables
  } from "relay-runtime";
  import fetch from "isomorphic-fetch";
  
// 더이상 어떻게 요청해서 뿌려볼수 있을지 모르겠네요...😹
// 타입스크립트 공부하고 올게요.... 아래 참고해서 일단 했습니다.. -유진-
// https://relay.dev/docs/getting-started/installation-and-setup/ -> 릴레이 공식문서
// https://blog.logrocket.com/whats-new-in-relay-v11/ -> 릴레이 v11
// https://github.com/relay-tools/relay-compiler-language-typescript/ -> 타입스크립트-릴레이
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35707 ->  import {graphql} 관련

  function fetchQuery(operation: RequestParameters, variables: Variables) {
    return fetch('https://podhouse-server.herokuapp.com/graphql', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
      }).then((response: any) => {
        return response.json()
      })
  }
  
  const network = Network.create(fetchQuery);
  
  const env = new Environment({
    network,
    store: new Store(new RecordSource(), {
      gcReleaseBufferSize: 10,
    }),
  });
  
  export default env;