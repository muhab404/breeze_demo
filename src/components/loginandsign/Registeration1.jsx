import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";
export default function Registeration() {
  const [error, errorSet] = useState("");
  const [loading, loadingSet] = useState(false);
  const [confirmpass, confirmpasswordSet] = useState({
    check: false,
    meseage: "",
  });
  function toggle() {
    var password = document.getElementsByName("password");
    console.log(password[0]);
    password[0].type = password[0].type == "password" ? "text" : "password";
  }
  function confirmtoggle() {
    var password = document.getElementsByName("confirmpassword");
    // console.log(password[0]);
    password[0].type = password[0].type == "password" ? "text" : "password";
  }
  let navigate = useNavigate();

  const RegisterFormHandler = (event) => {
    event.preventDefault();
    loadingSet(true);
    var { username, email, password, confirmpassword, is_staff } = event.target;
    if (password.value != confirmpassword.value) {
      confirmpasswordSet({
        check: true,
        meseage: "not the same with password",
      });
    } else {
      confirmpasswordSet({
        check: false,
        meseage: "",
      });
      axios
        .post("http://127.0.0.1:8000/meals/signup/", {
          username: username.value,
          password: password.value,
          email: email.value,
          is_staff: is_staff.checked,
        })
        .then((response) => {
          console.log(response);
          loadingSet(false);
          navigate("/regesteration");
        })
        .catch((error) => {
          errorSet(error.response.data[Object.keys(error.response.data)[0]]);
          loadingSet(false);
        });
    }
  };
  return (
    <div className="full-height bg-light container-fluid w-100 d-flex justify-content-center text-start align-items-center form-holder">
      <div className="col-sm-8 col-md-6 col-lg-4 bg-white p-3 form-content">
        <Form onSubmit={RegisterFormHandler}>
          <Form.Group className="mb-3 form-items" controlId="formBasicusername">
            <Form.Label className="form-content">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user name"
              name="username"
              pattern="^[a-zA-Z].{2,20}"
              title="user name must start with character and contain at least 3 words"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              // pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,15}"
              title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
            <Form.Group className="my-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Show Password"
                onClick={toggle}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirmation Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmpassword"
              placeholder="confirm Password"
              // pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,15}"
              required
            />
            {confirmpass.check && (
              <div className="alert alert-danger">{confirmpass.meseage}</div>
            )}
            <Form.Group className="my-3" controlId="formConfirmBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Show Password"
                onClick={confirmtoggle}
              />
            </Form.Group>
          </Form.Group>

          {error.length > 0 && (
            <div className="alert alert-danger">{error}</div>
          )}

          {loading ? (
            <div className="spinner-border text-info" role="status"></div>
          ) : (
            <Button className="w-100 bg-info" variant="primary" type="submit">
              Submit
            </Button>
          )}
        </Form>
      </div>
    </div>
    // <div class="container register">
    //   <div class="row">
    //     <div class="col-md-3 register-left">
    //       <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
    //       <h3>Welcome</h3>
    //       <p>Welcome To The Best Organic Food Store</p>
    //       <input type="submit" name="" value="Login" />
    //       <br />
    //     </div>
    //     <div class="col-md-9 register-right">
    //       <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
    //         <li class="nav-item">
    //           <a
    //             class="nav-link active"
    //             id="home-tab"
    //             data-toggle="tab"
    //             href="#home"
    //             role="tab"
    //             aria-controls="home"
    //             aria-selected="true"
    //           >
    //             Employee
    //           </a>
    //         </li>
    //         <li class="nav-item">
    //           <a
    //             class="nav-link"
    //             id="profile-tab"
    //             data-toggle="tab"
    //             href="#profile"
    //             role="tab"
    //             aria-controls="profile"
    //             aria-selected="false"
    //           >
    //             Hirer
    //           </a>
    //         </li>
    //       </ul>
    //       <div class="tab-content" id="myTabContent">
    //         <div
    //           class="tab-pane fade show active"
    //           id="home"
    //           role="tabpanel"
    //           aria-labelledby="home-tab"
    //         >
    //           <h3 class="register-heading">Apply as a Employee</h3>
    //           <div class="row register-form">
    //             <div class="col-md-6">
    //               <div class="form-group">
    //                 <input
    //                   type="text"
    //                   class="form-control"
    //                   placeholder="First Name *"
    //                   value=""
    //                 />
    //               </div>
    //               <br />
    //               <div class="form-group">
    //                 <input
    //                   type="password"
    //                   class="form-control"
    //                   placeholder="Password *"
    //                   value=""
    //                 />
    //               </div>
    //               <div class="form-group">
    //                 <input
    //                   type="password"
    //                   class="form-control"
    //                   placeholder="Confirm Password *"
    //                   value=""
    //                 />
    //               </div>
    //             </div>
    //             <div class="col-md-6">
    //               <div class="form-group">
    //                 <input
    //                   type="email"
    //                   class="form-control"
    //                   placeholder="Your Email *"
    //                   value=""
    //                 />
    //               </div>

    //               <input type="submit" class="btnRegister" value="Register" />
    //             </div>
    //           </div>
    //         </div>
    //         <div
    //           class="tab-pane fade show"
    //           id="profile"
    //           role="tabpanel"
    //           aria-labelledby="profile-tab"
    //         >
    //           <h3 class="register-heading">Apply as a Hirer</h3>
    //           <div class="row register-form">
    //             <div class="col-md-6">
    //               <div class="form-group">
    //                 <input
    //                   type="text"
    //                   class="form-control"
    //                   placeholder="First Name *"
    //                   value=""
    //                 />
    //               </div>
    //               <div class="form-group">
    //                 <input
    //                   type="text"
    //                   class="form-control"
    //                   placeholder="Last Name *"
    //                   value=""
    //                 />
    //               </div>
    //               <div class="form-group">
    //                 <input
    //                   type="email"
    //                   class="form-control"
    //                   placeholder="Email *"
    //                   value=""
    //                 />
    //               </div>
    //               <div class="form-group">
    //                 <input
    //                   type="text"
    //                   maxlength="10"
    //                   minlength="10"
    //                   class="form-control"
    //                   placeholder="Phone *"
    //                   value=""
    //                 />
    //               </div>
    //             </div>
    //             <div class="col-md-6">
    //               <div class="form-group">
    //                 <input
    //                   type="password"
    //                   class="form-control"
    //                   placeholder="Password *"
    //                   value=""
    //                 />
    //               </div>
    //               <div class="form-group">
    //                 <input
    //                   type="password"
    //                   class="form-control"
    //                   placeholder="Confirm Password *"
    //                   value=""
    //                 />
    //               </div>
    //               <div class="form-group">
    //                 <select class="form-control">
    //                   <option class="hidden" selected disabled>
    //                     Please select your Sequrity Question
    //                   </option>
    //                   <option>What is your Birthdate?</option>
    //                   <option>What is Your old Phone Number</option>
    //                   <option>What is your Pet Name?</option>
    //                 </select>
    //               </div>
    //               <div class="form-group">
    //                 <input
    //                   type="text"
    //                   class="form-control"
    //                   placeholder="`Answer *"
    //                   value=""
    //                 />
    //               </div>
    //               <input type="submit" class="btnRegister" value="Register" />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
