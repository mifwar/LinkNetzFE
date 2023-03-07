import AuthToggle from "../../components/AuthToggle";
import withAuth from "../../utils/utils";

const Register = () => {
  return <AuthToggle />;
};

export default withAuth(Register);
