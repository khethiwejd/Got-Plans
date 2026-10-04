import { useAuth } from "../AuthContext";
import NavBar from "../routes/NavBar";

// import formik
import { useFormik } from "formik";

// import useNavigate to progress to the next page
import { useNavigate } from "react-router-dom";

// the function that makes sure that users register so they can access the dashboard
export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    // if-statements that state what will happen incase requirements are not met
    // for name, username, email and password fields
    validate: (values) => {
      const errors = {};

      //   for the firstname
      if (!values.firstName) {
        errors.firstName = "Go ahead and put your first name, it's required";
      } else if (values.firstName.length > 15) {
        errors.firstName = "Max of 15 characters!";
      }

      // for the username
      if (!values.username) {
        errors.username = "Please humour us with a username";
      } else if (values.username.length > 20) {
        errors.username = "Max of 20 characters!";
      } else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
        errors.username = "Only letters, numbers and underscores allowed";
      }

      // for the email
      if (!values.email) {
        errors.email = "Email is required, friend";
      }

      // for the password
      if (!values.password) {
        errors.password = "Put your password in friend";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters bestie!";
      } else if (!/[A-Z]/.test(values.password)) {
        errors.password = "Have atleast one Uppercase letter.";
      } else if (!/[a-z]/.test(values.password)) {
        errors.password = "Have atleast one Lowercase letter.";
      } else if (!/[0-9]/.test(values.password)) {
        errors.password = "Have atleast one Number.";
      } else if (!/[!@#$%^&*(),.?":{}|<>_\\-]/.test(values.password)) {
        errors.password = "Have atleast one Character.";
      }

      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords are not matching friend";
      }

      return errors;
    },

    onSubmit: (values) => {
      register(values);

      //   the page we will land on once we submit
      navigate("/login");
    },
  });

  return (
    <div>
      <div className="container text-center">
        <h3>Welcome! Let's get you organised.</h3>
        <h2>Register</h2>
        <br />

        {/* logic responsible for the registration data */}
        <form onSubmit={formik.handleSubmit}>
          {/* Firstname */}
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="inputBox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />

          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}
          <br />
          {/* Username */}
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="inputBox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />

          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
          <br />
          {/*Email */}
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
          {/* Confirming the password */}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="inputBox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : null}
          <br />
          <br />
          <p>Password must contain:</p>
          <ul className="passwordRequirements">
            <li>Minimum of 8 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
            <li>One special character</li>
          </ul>
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
