/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BlogPosts_viewer = {
    readonly allBlogPosts: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"BlogPostPreview_post">;
            };
        } | null> | null;
    };
    readonly " $refType": "BlogPosts_viewer";
};
export type BlogPosts_viewer$data = BlogPosts_viewer;
export type BlogPosts_viewer$key = {
    readonly " $data"?: BlogPosts_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"BlogPosts_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BlogPosts_viewer",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "BlogPostPreview_post"
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
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'e62062f27206b82b97434015b0042cfc';
export default node;
