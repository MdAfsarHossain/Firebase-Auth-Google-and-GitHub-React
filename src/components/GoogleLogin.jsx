import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import app from "../firebase/firebase.config";

const GoogleLogin = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
      })
      .catch((error) => {
        console.error("Google sign in failed", error);
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
            <button onClick={handleGoogleLogin}>Google Login</button>
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

export default GoogleLogin;
