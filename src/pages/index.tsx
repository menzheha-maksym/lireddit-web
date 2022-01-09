import { withUrqlClient } from "next-urql"
import { NavBar } from "../components/Navbar"
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrlClient";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>Hello world</div>
      <br />
      {!data ? (
        <div>loading</div>
      ) : (
        data.posts.map(p => <div key={p.id}>{p.title}</div>))
      }
    </>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
