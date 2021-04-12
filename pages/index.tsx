import Link from "next/link";
import styled from "styled-components";
import { fetchQuery } from "react-relay";
import { initEnvironment } from "../lib/relay";
import indexPageQuery from "../queries/indexPage";
import BlogPosts from "../components/BlogPosts";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const Index = ({ viewer }) => {
  console.log(viewer);

  return (
    <div>
      <Title>My page</Title>
      <Link href="/about">
        <a>About</a>
      </Link>
      <BlogPosts viewer={viewer} />
    </div>
  );
};

export async function getStaticProps() {
  const environment = initEnvironment();
  const queryProps = await fetchQuery(environment, indexPageQuery);
  const initialRecords = environment.getStore().getSource().toJSON();

  console.log("????", queryProps);

  return {
    props: {
      ...queryProps,
      initialRecords,
    },
  };
}

export default Index;
