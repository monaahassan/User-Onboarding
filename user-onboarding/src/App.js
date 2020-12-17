import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import Form from './Form';
import './App.css';
import axios from 'axios';
import schema from "./formSchema";
import * as yup from "yup"


///Initial States///
const initialFormValues = {
///Here are the text inputs///
///Name, Email, Password, Terms Of Service(checkbox), Submit Button
name: "",
email: "",
password: "", 
terms: false,
};
const initialFormErrors ={
  username: "",
  email: "",
  password: "",
  terms: false,
};
const initialUsers = [];
const initialDisabled = true;

export default function App() {
//////////////// STATES ////////////////
const [users, setUsers] = useState(initialUsers); // array of user objects
const [formValues, setFormValues] = useState(initialFormValues); // object
const [formErrors, setFormErrors] = useState(initialFormErrors); // object
const [disabled, setDisabled] = useState(initialDisabled); // boolean

 //////////////// HELPERS ////////////////
 const getUsers = () => {
  // 🔥 STEP 5- IMPLEMENT! ON SUCCESS PUT USERS IN STATE
  //    helper to [GET] all Users from `http://buddies.com/api/friends`
  axios
    .get("http://buddies.com/api/friends")
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      console.log(err);
      debugger;
    });
};
const postNewUser = (newUser) => {
  // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
  //    helper to [POST] `newFriend` to `http://buddies.com/api/friends`
  //    and regardless of success or failure, the form should reset
  axios
    .post("http://buddies.com/api/friends", newUser)
    .then((res) => {
      setUsers([res.data, ...users]);
      setFormValues(initialFormValues);
    })
    .catch((err) => {
      console.log(err);
      debugger;
    });
};

 //////////////// EVENT HANDLERS ////////////////
 const inputChange = (name, value) => {
  // 🔥 STEP 10- RUN VALIDATION WITH YUP
  // yup.reach will allow us to "reach" into the schema and test only one part.
  // We give reach the schema as the first argument, and the key we want to test as the second.

  yup
    .reach(schema, name) // get to this part of the schema
    //we can then run validate using the value
    .validate(value) // validate this value
    .then(() => {
      // happy path and clear the error
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    })
    // if the validation is unsuccessful, we can set the error message to the message
    // returned from yup (that we created in our schema)
    .catch((err) => {
      setFormErrors({
        ...formErrors,
        // validation error from schema
        [name]: err.errors[0],
      });
    });

  setFormValues({
    ...formValues,
    [name]: value, // NOT AN ARRAY
  });
};


const formSubmit = () => {
  const newUser = {
    username: formValues.username.trim(),
    email: formValues.email.trim(),
    password: formValues.password.trim(),
    terms: formValues.terms.trim(),
    // 🔥 STEP 7- WHAT ABOUT HOBBIES?
    // hobbies: ["coding", "reading", "hiking"].filter(
    //   (hobby) => formValues[hobby]
    // ),
  };
  // 🔥 STEP 8- POST NEW FRIEND USING HELPER
  postNewUser(newUser);
};

//////////////// SIDE EFFECTS ////////////////
useEffect(() => {
  getUsers();
}, []);

useEffect(() => {
  // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
  schema.isValid(formValues).then((valid) => {
    setDisabled(!valid);
  });
}, [formValues]);


return (
    <div className="App">
      <header className="App-header">
      <h1>App</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {users.map((user) => {
        return <Form key={user.id} details={user} />;
      })}
    </div>
  );
}


