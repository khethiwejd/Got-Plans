import { useAuth } from "../AuthContext";
import NavBar from "../routes/NavBar";

// import formik
import { useFormik } from "formik";

// import useNavigate to progress to the next page
import { useNavigate } from "react-router-dom";

// function that basically authenticates a user that just registered
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    // if-statements that state what will happen incase requirements are not met
    // for both email and password fields
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Email is required, friend";
      }

      if (!values.password) {
        errors.password = "Put your password in friend";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters bestie!";
      }

      return errors;
    },

    onSubmit: (values) => {
      const result = login(values.email, values.password);

      if (!result.success) {
        alert(result.message);
        return;
      }

      //   shows where our next page should be
      navigate("/dashboard");
    },
  });

  return (
    <div>
      <div className="container text-center">
        <h2>Please Login</h2>
        <br />

        {/* logic responsible for the email only */}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="inputBox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}

          {/* logic responsible for the password */}
          <br />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="inputBox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
