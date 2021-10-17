import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Layout from "components/Layout";

const UserPage = () => {
  const { username } = useParams<{ username: string }>();

  return (
    <Layout title="User page">
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <h1>Future page for {username}</h1>
      </Container>
    </Layout>
  );
};

export default UserPage;
