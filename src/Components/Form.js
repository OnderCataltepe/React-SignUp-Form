import styles from "./Form.module.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Lottie from "lottie-react";
import success from "../assets/success.json";
let schema = yup.object().shape({
  firstName: yup.string().required("This field is required."),
  lastName: yup.string().required("This field is required."),
  email: yup
    .string()
    .required("This field is required.")
    .email("Please enter a valid email address."),
  password: yup
    .string()
    .required("This field is required.")
    .min(8)
    .matches(/[a-z]/, "at least one lowercase char")
    .matches(/[A-Z]/, "at least one uppercase char")
    .matches(
      /(?=.*[0-9])|(?=.*?\W).*$/,
      "at least one number or special char (@,!,#, etc)."
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("This field is required."),
  acceptTerms: yup
    .bool()
    .oneOf([true], "You need to accept the terms and conditions"),
});
const Form = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    onSubmit: (values) => {
      setIsSubmit(true);
    },
    validationSchema: schema,
  });

  if (isSubmit) {
    return (
      <div className={styles.successContainer}>
        <Lottie
          style={{ width: "18rem", marginTop: "4rem" }}
          animationData={success}
          loop={false}
        />
        ;<p>Thank You!</p>
        <p>Your submission has been sent.</p>
      </div>
    );
  }
  return (
    <div className={styles.formDiv}>
      <h1>Create An Account</h1>
      <form onSubmit={formik.handleSubmit}>
        <Container fluid>
          <Row>
            <Col className={styles.col}>
              <label htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <p className={styles.errorMessages}>
                  {formik.errors.firstName}
                </p>
              )}
            </Col>
            <Col className={styles.col}>
              {" "}
              <label htmlFor="lastName">Last Name</label>
              <input
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <p className={styles.errorMessages}>{formik.errors.lastName}</p>
              )}
            </Col>
          </Row>
          <Row>
            <Col className={styles.col}>
              {" "}
              <label htmlFor="email">Email Address</label>
              <input
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <p className={styles.errorMessages}>{formik.errors.email}</p>
              )}
            </Col>
          </Row>
          <Row>
            <Col className={styles.col}>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <p className={styles.errorMessages}>{formik.errors.password}</p>
              )}
            </Col>
          </Row>
          <Row>
            <Col className={styles.col}>
              <label htmlFor="password">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <p className={styles.errorMessages}>
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </Col>
          </Row>
          <Row>
            <Col className={styles.checkCol}>
              <div>
                <input
                  name="acceptTerms"
                  type="checkbox"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.acceptTerms}
                />
                <label htmlFor="acceptTerms">
                  <p>
                    I agree to the{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://en.wikipedia.org/wiki/Terms_of_service"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://en.wikipedia.org/wiki/Privacy_policy"
                    >
                      Privacy Policy`
                    </a>
                  </p>
                </label>
              </div>

              {formik.errors.acceptTerms && formik.touched.acceptTerms && (
                <p className={styles.errorMessages}>
                  {formik.errors.acceptTerms}
                </p>
              )}
            </Col>
          </Row>
        </Container>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Form;
