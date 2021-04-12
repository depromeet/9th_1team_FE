/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type indexPage_indexQueryVariables = {};
export type indexPage_indexQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"BlogPosts_viewer">;
    };
};
export type indexPage_indexQuery = {
    readonly response: indexPage_indexQueryResponse;
    readonly variables: indexPage_indexQueryVariables;
};



/*
query indexPage_indexQuery {
  viewer {
    ...BlogPosts_viewer
  }
}

fragment BlogPostPreview_post on BlogPost {
  id
  title
}

fragment BlogPosts_viewer on Viewer {
  allBlogPosts(first: 10, orderBy: {createdAt: desc}) {
    edges {
      node {
        ...BlogPostPreview_post
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "indexPage_indexQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BlogPosts_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "indexPage_indexQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "orderBy",
                "value": {
                  "createdAt": "desc"
                }
              }
            ],
            "concreteType": "BlogPostConnection",
            "kind": "LinkedField",
            "name": "allBlogPosts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "BlogPostEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "BlogPost",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "allBlogPosts(first:10,orderBy:{\"createdAt\":\"desc\"})"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4f245599e25d95a5651546a015981489",
    "id": null,
    "metadata": {},
    "name": "indexPage_indexQuery",
    "operationKind": "query",
    "text": "query indexPage_indexQuery {\n  viewer {\n    ...BlogPosts_viewer\n  }\n}\n\nfragment BlogPostPreview_post on BlogPost {\n  id\n  title\n}\n\nfragment BlogPosts_viewer on Viewer {\n  allBlogPosts(first: 10, orderBy: {createdAt: desc}) {\n    edges {\n      node {\n        ...BlogPostPreview_post\n        id\n      }\n    }\n  }\n}\n"
  }
};
(node as any).hash = '7586f22201ad3860415129c24a4b74da';
export default node;
