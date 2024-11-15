import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import './App.css';
import GitHubLogin from "./components/GitHubLogin";
import app from './firebase/firebase.config';



function App() {
  const [user, setUser] = useState(null);
  
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const loggedUser = result.user;
      setUser(loggedUser);
    })
    .catch((error) => {
      console.error("Google sign in failed", error);
    })
  }

  const handleGithubLogin = () => {
    signInWithPopup(auth, githubProvider)
    .then((result) => {
      // console.log(result.user);
      const loggedUser = result.user;
      setUser(loggedUser);
      //...
    })
    .catch((error) => {
      console.error("Github sign in failed", error);
    })
  }

  const handleSignOut = () => {
    auth.signOut()
    .then(() => {
      console.log("Sign-out successful");
      setUser(null);
      //...
    })
   .catch((error) => {
     console.error("Sign-out failed", error);
     //...
   })
  }

  return (
    <>

      {/* <h1>Firebase + React</h1>
      <div className="">
        {user ? <button onClick={handleSignOut}>Sign Out</button> : 
        
        <div className="">
          <button onClick={handleGoogleLogin}>Google Login</button>
          <button onClick={handleGithubLogin}>GitHub Login</button>
        </div>
        }
      </div>

      <div className="">
        {user && 
        <>
        <p>Welcome, {user.displayName}!</p>
        <p>Email: {user.email}</p>
        <img src={user.photoURL} alt={user.displayName} />
        </>
        }
      </div> */}

      {/* <GoogleLogin></GoogleLogin> */}
      <GitHubLogin></GitHubLogin>
    </>
  )
}

export default App
