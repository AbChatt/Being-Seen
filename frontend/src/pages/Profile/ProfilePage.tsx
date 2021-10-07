import { useHistory } from "react-router-dom";
import { decodeAuthToken, UserRoles } from "utils/checkAuth";
import Layout from "components/Layout";

const ProfilePage = () => {
  const history = useHistory();
  const account = decodeAuthToken();

  if (!account || !(account.role in UserRoles)) {
    history.push("/");
  }

  return (
    <Layout title="Profile">
      <h1>Profile Page</h1>
    </Layout>
  );
};

export default ProfilePage;
