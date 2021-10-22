import { useHistory } from "react-router-dom";
import { decodeAuthToken } from "utils/authHelpers";
import UserRoles from "utils/UserRoles";
import Layout from "components/Layout";

// Render the store page of the application. If a user is not logged in (or does
// not have the youth role), we redirect them to the homepage.
const StorePage = () => {
  const history = useHistory();
  const account = decodeAuthToken();

  if (!account || account.role !== UserRoles.youth) {
    history.push("/");
  }

  return (
    <Layout title="Store">
      <h1>Store Page</h1>
    </Layout>
  );
};

export default StorePage;
