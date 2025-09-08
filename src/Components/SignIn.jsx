import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import { useState } from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import auth from "../firebase_init";

const SignIn = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    isChacked: false,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "checked") {
      const checkedBoxResult = e.target.checked;
      setUser({ ...user, isChacked: checkedBoxResult });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    // reset error message
    setError("");
    // reset success message
    setSuccess("");
    if (!user.isChacked) {
      setError("Accept Terms And Conditions");
      return;
    }
    console.log(user);
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((result) => {
        if (!result.user.emailVerified) {
          setError("verify Your Email");
        }
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  // reset password
  const handleForgetPassword = () => {
    if (!user.email || !user.email.includes("@")) {
      setError("Write Your Email");
    } else {
      setError("");
      sendPasswordResetEmail(auth, user.email)
        .then(() => {
          setSuccess("Password reset email sent!");
        })
        .catch((err) => setError(err.code));
    }
  };
  const facebookProvider = new FacebookAuthProvider();
  const handleFaceBookLogin = () => {
    signInWithPopup(auth, facebookProvider).then((result) => {
      console.log(result.user);
    });
  };

  // login with google
  const googleProvider = new GoogleAuthProvider();
  const handleLoginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((err) => {
        console.log(err.code);
      });
  };
  const twitterProvider = new TwitterAuthProvider();
  const handleLoginWithTwitter = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((err) => {
        console.log(err.code);
      });
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 my-10 items-center">
      <div className="lg:w-[80%] mx-auto">
        <h3 className="text-4xl  font-bold">Sign In</h3>
        <p className="text-gray-400 mt-4">
          Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur
          adipisicing.
        </p>

        <div className="divider my-5">or</div>
        <form onSubmit={handleSignIn}>
          <input
            onChange={handleOnChange}
            className="w-full  py-3 px-2 mb-2 border-1 border-[#e7e7e8] rounded-lg outline-0"
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            onChange={handleOnChange}
            className="w-full  py-3 px-2 mb-2 border-1 border-[#efefef] outline-none"
            type="password"
            placeholder="Password"
            name="password"
          />

          <div className="flex items-center justify-between my-4">
            <label className="label">
              <input
                onChange={handleOnChange}
                type="checkbox"
                name="checked"
                className="checkbox"
              />
              Accept Terms And Conditions
            </label>
            <p
              onClick={handleForgetPassword}
              className="text-gray-400 underline cursor-pointer"
            >
              Forget Password
            </p>
          </div>
          <input
            className="w-full bg-[#007bff] text-center py-3 rounded-lg text-white mt-2 cursor-pointer"
            type="submit"
            value="Login"
          />
          <p className="text-center mt-2">
            Not have an account?{" "}
            <NavLink to={`/signup`}>Create Account</NavLink>
          </p>
        </form>
        {error && <p className="text-center mt-2 text-red-600">{error}</p>}
        {success && (
          <p className="text-center mt-2 text-green-600">{success} </p>
        )}

        {/* others login methods */}
        <div className="divider w-[100px] mx-auto">or</div>
        <button
          onClick={handleFaceBookLogin}
          className="bg-[#3b5998] flex items-center gap-2 justify-center text-white w-full rounded-lg py-3 cursor-pointer"
        >
          <FaFacebookF className="text-[18px]" /> Login With Facebook
        </button>
        <button
          onClick={handleLoginWithTwitter}
          className="bg-[#1da1f2] flex items-center gap-2 justify-center text-white w-full rounded-lg py-3 cursor-pointer mt-2"
        >
          <FaTwitter className="text-[18px]" /> Login With Twitter
        </button>
        <button
          onClick={handleLoginWithGoogle}
          className="bg-[#ea4335] flex items-center gap-2 justify-center text-white w-full rounded-lg py-3 cursor-pointer mt-2"
        >
          <FaGoogle className="text-[18px]" /> Login With Google
        </button>
      </div>
      <img
        className="max-h-[600px] w-full object-cover"
        src="https://i.ibb.co.com/jX2z6Zn/heroimage.webp"
        alt=""
      />
    </div>
  );
};

export default SignIn;
