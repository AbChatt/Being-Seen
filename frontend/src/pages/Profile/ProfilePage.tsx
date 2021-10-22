import { useHistory } from "react-router-dom";
import { decodeAuthToken } from "utils/authHelpers";
import UserRoles from "utils/UserRoles";
import Layout from "components/Layout";
import DonorProfile from "components/DonorProfile";
import YouthProfile from "components/YouthProfile";
import MerchantProfile from "components/MerchantProfile";

// Render the profile page of the application. If a user is not logged in (or
// do not have a role we recognize), we redirect them to the homepage.
const ProfilePage = () => {
  const history = useHistory();
  const account = decodeAuthToken();

  if (!account || !(account.role in UserRoles)) {
    history.push("/");
  }

  switch (account && account.role) {
    case UserRoles.merchant:
      return <MerchantProfile />;
    case UserRoles.donor:
      return <DonorProfile />;
    case UserRoles.youth:
      return <YouthProfile />;
    case null:
      return (
        <Layout title="Profile">
          <h1>Profile Page</h1>
        </Layout>
      );
  }
};

export default ProfilePage;
