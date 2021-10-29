import "./login.css";
import { React, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../config";

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photo: ""
  });

  const provider = new firebase.auth.GoogleAuthProvider();

  const signInHandler = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        setUser({
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        });
      });
  };

  return (
    <div className="login">
      <h1>Authentication</h1>
      {!user.isSignIn && (
        <button onClick={signInHandler} className="button">
          Sign In With Google
        </button>
      )}
      {user.isSignIn && (
        <div className="userProfile">
          Welcome {user.name} !<br />
          <img src={user.photo} />
          <br />
          Email {user.email}
        </div>
      )}
    </div>
  );
};

export default Login;
