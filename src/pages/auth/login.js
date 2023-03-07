import AuthToggle from "../../components/AuthToggle";
import withAuth from "../../utils/utils";

const Login = () => {
  return <AuthToggle />;
};

export default withAuth(Login);
