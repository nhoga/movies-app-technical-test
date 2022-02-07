import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <div>
      <button className="logout" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
