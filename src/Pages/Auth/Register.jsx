import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate()
  let {userLogin,setUserLogin}= useContext(UserContext)

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handleSubmitForm,
    validate: handleValidateForm,
  });

  async function handleSubmitForm(values) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      console.log("🚀 ~ handleSubmitForm ~ data:", data);
      toast.success("success Login")
      if(data.message=="success"){
        localStorage.setItem("userToken",data.token)
        setUserLogin(data.token)
        navigate("/login")
      }
      if (toast.success("success Login")) {
        navigate("/login")
      };
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
    // name
    if (!values.name) {
      errors.name = "the name is required";
    } else if (!/([a-zA-Z0-9_\s]+)/.test(values.name)) {
      errors.name = "the name must be min legnth is 3";
    }
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
    //repass
    if (!values.rePassword) {
      errors.rePassword = "rePassword is required";
    } else if (values.password !== values.rePassword) {
      errors.rePassword = "the password was wrong";
    }
    //phone
    if (!values.phone) {
      errors.phone = "the phone is required";
    } else if (
      !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(values.phone)
    ) {
      errors.phone = "the number is not valid";
    }
    return errors;
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
        <h1 className="text-2xl mt-3 mb-3">Register Now:</h1>
        <div className="mb-5">
          <label
            htmlFor="Name"
            className="block mb-2 text-sm font-medium text-green-900 "
          >
            Your Name
          </label>
          <input
            type="text"
            id="Name"
            className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Yaya"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className="text-2xs text-red-500 flex justify-start mt-2 ms-2 capitalize">
            {formik.touched.name && formik.errors.name}
          </span>
        </div>
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

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-green-900 "
          >
            Re-Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            name="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className="text-2xs text-red-500 flex justify-start mt-2 ms-2 capitalize">
            {formik.touched.rePassword && formik.errors.rePassword}
          </span>
        </div>

        <div className="mb-5">
          <label
            htmlFor="Phone"
            className="block mb-2 text-sm font-medium text-green-900 "
          >
            Phone
          </label>
          <input
            type="tel"
            id="Phone"
            className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="+20 10/11/12/15********"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className="text-2xs text-red-500 flex justify-start mt-2 ms-2 capitalize">
            {formik.touched.phone && formik.errors.phone}
          </span>
        </div>

        <div className="flex justify-end mb-10">
          <button
            type="submit"
            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-start"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}