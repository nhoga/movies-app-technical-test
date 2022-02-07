import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div className="profile">
        <div>
          <img src={user.picture} alt={user.name}></img>
        </div>
        <div className="name">Welcome, {user.name}</div>
      </div>
    )
  );
};

export default Profile;
