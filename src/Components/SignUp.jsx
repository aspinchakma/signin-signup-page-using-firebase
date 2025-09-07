import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import auth from "./../firebase_init";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // signin using google
  const googleProvider = new GoogleAuthProvider();

  const loginWithGoogle = () => {
    setError("");
    setSuccess("");

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        setSuccess("Your Account Created!");
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 my-10 items-center">
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
            className="w-full  py-3 px-2 mb-2 border-1 border-[#e7e7e8] rounded-lg outline-0"
            type="text"
            placeholder="Full Name"
          />
          <input
            className="w-full  py-3 px-2 mb-2 border-1 border-[#e7e7e8] rounded-lg outline-0"
            type="text"
            placeholder="Email"
          />
          <input
            className="w-full  py-3 px-2 mb-2 border-1 border-[#efefef] outline-none"
            type="text"
            placeholder="Password"
          />
          <input
            className="w-full  py-3 px-2 mb-2 border-1 border-[#e7e7e8] rounded-lg outline-0"
            type="text"
            placeholder="Re-type Password"
          />
          <div>
            <label className="label">
              <input type="checkbox" defaultChecked className="checkbox" />
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
