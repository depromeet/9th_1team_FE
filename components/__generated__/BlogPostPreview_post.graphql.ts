/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BlogPostPreview_post = {
    readonly id: string;
    readonly title: string;
    readonly " $refType": "BlogPostPreview_post";
};
export type BlogPostPreview_post$data = BlogPostPreview_post;
export type BlogPostPreview_post$key = {
    readonly " $data"?: BlogPostPreview_post$data;
    readonly " $fragmentRefs": FragmentRefs<"BlogPostPreview_post">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BlogPostPreview_post",
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
  "type": "BlogPost",
  "abstractKey": null
};
(node as any).hash = '8cb8861c94062f8169421aaffe852b84';
export default node;
