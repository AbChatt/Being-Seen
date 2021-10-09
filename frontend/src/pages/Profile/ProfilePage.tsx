import { useHistory } from "react-router-dom";
import { decodeAuthToken } from "utils/authHelpers";
import UserRoles from "utils/UserRoles";
import Layout from "components/Layout";

// Render the profile page of the application. If a user is not logged in (or
// do not have a role we recognize), we redirect them to the homepage.
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
