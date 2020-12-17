import React from "react";


export default function Form(props){
    const { values, submit, change, disabled, errors} = props;
    

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    };


    const onChange = (evt) => {
        const { name, value, type, checked} = evt.target;
        const valueToUse = type === "checkbox" ? checked : value;
        change(name, valueToUse);
    };

    return (
        <form className="form container" onSubmit={onSubmit}>
          <div className="form-group submit">
            <h2>Login</h2>
    
            {/* 🔥 DISABLE THE BUTTON */}
            <button disabled={disabled}>submit</button>
    
            <div className="errors">
              {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
              <div>{errors.username}</div>
              <div>{errors.email}</div>
              <div>{errors.password}</div>
              <div>{errors.terms}</div>
            </div>
          </div>
    
          <div className="form-group inputs">
            <h4>General information</h4>

              {/* ////////// TEXT INPUTS ////////// */}
        <label>
          Username
          <input
            value={values.username}
            onChange={onChange}
            name="username"
            type="text"
          />
        </label>

        <label>
          Email
          <input
            value={values.email}
            onChange={onChange}
            name="email"
            type="text"
          />
        </label>
        <label>
          Password
          <input
            value={values.password}
            onChange={onChange}
            name="password"
            type="text"
          />
        </label>


        {/* //checkbox */}
        <label>
          Terms
          <input
            type="checkbox"
            name="terms"
            // let the checkbox be checked if the value inside state resolves to true!
            checked={values.terms}
            onChange={onChange}
          />
        </label>
      </div>
    </form>
  );
}