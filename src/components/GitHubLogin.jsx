import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import app from "../firebase/firebase.config";

const GitHubLogin = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const gitHubProvider = new GithubAuthProvider();

  const handleGithubLogin = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
      })
      .catch((error) => {
        console.error("Github sign in failed", error);
      });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Sign-out successful");
        setUser(null);
      })
      .catch((error) => {
        console.error("Sign-out failed", error);
      });
  };

  return (
    <>
      <h1>Firebase + Google Login</h1>
      <div className="">
        {user ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <div className="">
            <button onClick={handleGithubLogin}>GitHub Login</button>
          </div>
        )}
      </div>

      <div className="">
        {user && (
          <>
            <p>Welcome, {user.displayName}!</p>
            <p>Email: {user.email}</p>
            <img src={user.photoURL} alt={user.displayName} />
          </>
        )}
      </div>
    </>
  );
};

export default GitHubLogin;
