import { useHistory } from "react-router-dom";
import { decodeAuthToken, UserRoles } from "utils/checkAuth";
import Layout from "components/Layout";

const StorePage = () => {
  const history = useHistory();
  const account = decodeAuthToken();

  if (!account || account.role !== UserRoles.merchant) {
    history.push("/");
  }

  return (
    <Layout title="Store">
      <h1>Store Page</h1>
    </Layout>
  );
};

export default StorePage;
