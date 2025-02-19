import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserLogin";

export default function Login() {

  const {userLogin,setUserLogin}= useContext(UserContext)
  const navigate = useNavigate()
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    onSubmit: handlelogin,
    validate: handleValidateForm,
  });

  async function handlelogin(values) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      if(data.message=="success"){
        localStorage.setItem("userToken",data.token)
        toast.success("welcome")
        setUserLogin(data.token)
        navigate("/Home")
      }
      console.log("🚀 ~ handleSubmitForm ~ data:", data);
    } catch (error) {
      if (error?.response.data.errors) {
        toast.error(error?.response.data.errors.msg);

        console.log(
          "🚀 ~ handleSubmitForm ~ .response.data.errors.msg:",
          error.response.data.errors.msg
        );
      } else {
        toast.error(error?.response.data.message);
        console.log(
          "🚀 ~ handleSubmitForm ~ error?.response.data.message:",
          error?.response.data.message
        );
      }
    }
    console.log("🚀 ~ handleSubmitForm ~ error:", error);
  }

  function handleValidateForm(values) {
    const errors = {};
    //email
    if (!values.email) {
      errors.email = "the email is required";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      errors.email = "This email is not valid";
    }
    // password
    if (!values.password) {
      errors.password = "the password is required";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
        values.password
      )
    ) {
      errors.password = "Password must contain capital chars and symbols ";
    }
    return errors;
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
        <h1 className="text-2xl mt-3 mb-3">Login Now:</h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-green-900 "
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@gmail.com"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className="text-2xs text-red-500 flex justify-start mt-2 ms-2 capitalize">
            {formik.touched.email && formik.errors.email}
          </span>
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-green-900 "
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Yaya123*"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className="text-2xs text-red-500 flex justify-start mt-2 ms-2 capitalize">
            {formik.touched.password && formik.errors.password}
          </span>
        </div>


        <div className="flex justify-end mb-10">
          <button
            type="submit"
            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-start"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}