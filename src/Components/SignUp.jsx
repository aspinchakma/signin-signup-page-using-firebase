import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import auth from "./../firebase_init";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    checked: false,
  });

  const setUserInfo = useOutletContext();

  // signin using google
  const googleProvider = new GoogleAuthProvider();

  const loginWithGoogle = () => {
    setError("");
    setSuccess("");
    setPasswordError("");

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        setSuccess("Your Account Created!");
      })
      .catch((err) => {
        setError(err.code);
      });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      if (!/(?=.*\d)/.test(value)) {
        setPasswordError("at least one digit");
      } else if (!/(?=.*[a-z])/.test(value)) {
        setPasswordError("at least one lower case");
      } else if (!/(?=.*[A-Z])/.test(value)) {
        setPasswordError("at least one upper case");
      } else if (!/[a-zA-Z0-9]{8,}/.test(value)) {
        setPasswordError("at least 8 from the mentioned characters");
      } else {
        setPasswordError("");
      }
    }
    // user password validation between two password
    // password one
    if (name === "password") {
      const passwordOne = user.password2;
      const passwordTwo = value;
      // matching two password
      if (passwordOne !== passwordTwo) {
        setPasswordError("Not Matching");
      } else {
        setPasswordError("");
      }
    }

    // password two
    if (name === "password2") {
      const passwordOne = user.password;
      const passwordTwo = value;
      // matching two password
      if (passwordOne !== passwordTwo) {
        setPasswordError("Not Matching");
      } else {
        setPasswordError("");
      }
    }
    if (name !== "checked") {
      setUser({ ...user, [name]: value });
    } else {
      const checkedResult = e.target.checked;
      setUser({ ...user, [name]: checkedResult });
      setError("");
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // name validation
    if (user.name.length < 3) {
      setError("Write Your Name");
      e.target.name.focus();
      return;
    }

    // email validation
    if (!user.email.includes("@")) {
      setError("Enter Valid Email");
      e.target.email.focus();
      return;
    }

    if (passwordError.length > 0) {
      setError("Type Password Correctly");
      e.target.password.focus();
      return;
    }
    if (user.password < 8) {
      setError("Please Enter Password");
      return;
    }
    if (!user.checked) {
      setError("Please agree with our terms and condition");
      return;
    }

    // create user using email and password
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((result) => {
        // console.log(result.user);
        // setSuccess("Successfully created!");

        // updating user name
        updateProfile(auth.currentUser, { displayName: user.name });

        // set user
        setUserInfo(result.user);
        // send email verificaiton
        sendEmailVerification(auth.currentUser).then(() =>
          setError("Email verification sent!")
        );
      })
      .catch((err) => setError(err.code));
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 my-10 items-center gap-10">
      <img
        className="max-h-[600px] w-full object-cover"
        src="https://i.ibb.co.com/jX2z6Zn/heroimage.webp"
        alt=""
      />
      <div className="lg:w-[70%] mx-auto">
        <h3 className="text-4xl text-center font-bold">Create Your Account</h3>
        <div className="text-center mt-4">
          <button
            onClick={loginWithGoogle}
            className="flex gap-1 items-center border-1 border-[#e7e7e8] w-full justify-center cursor-pointer px-4 py-2 rounded-lg"
          >
            <img
              className="w-[32px]"
              src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
              alt=""
            />{" "}
            Login With Google
          </button>
        </div>
        <div className="divider my-9">or</div>
        <form onSubmit={handleFormSubmit}>
          <input
            onChange={handleOnChange}
            className="w-full  py-3 px-2 mb-2 border-1 border-[#e7e7e8] rounded-lg outline-0"
            type="text"
            placeholder="Full Name"
            name="name"
          />
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
          <input
            onChange={handleOnChange}
            className="w-full  py-3 px-2 mb-2 border-1 border-[#e7e7e8] rounded-lg outline-0"
            type="password"
            placeholder="Re-type Password"
            name="password2"
          />
          {passwordError && (
            <p className="text-center mt-2 text-red-600">{passwordError}</p>
          )}
          <div>
            <label className="label">
              <input
                onChange={handleOnChange}
                type="checkbox"
                name="checked"
                className="checkbox"
              />
              Accept Terms And Conditions
            </label>
          </div>
          <input
            className="w-full bg-[#007bff] text-center py-3 rounded-lg text-white mt-2 cursor-pointer"
            type="submit"
            value="Create New Account"
          />
          <p className="text-center mt-2">
            Already Have An Account? <NavLink to={`/signin`}>Login</NavLink>
          </p>
        </form>
        {error && <p className="text-center mt-2 text-red-600">{error}</p>}
        {success && (
          <p className="text-center mt-2 text-green-600">{success} </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
