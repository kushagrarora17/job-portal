import { ChangeEventHandler, useEffect, useState } from "react";
import { getUserProfile, saveUserProfile } from "../utils";
import { ProfileType } from "../types";

const defaultFormState = {
  name: "",
  email: "",
  skills: "",
  github: "",
};

const Profile = () => {
  const [form, setForm] = useState<ProfileType>(defaultFormState);
  const [error, setError] = useState(defaultFormState);

  useEffect(() => {
    getUserProfile().then((data) => setForm(data));
  }, []);

  const handleInput: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (ev) => {
    const id = ev.target.id;
    const value = ev.target.value;
    const newForm = { ...form, [id]: value };

    const newError = { ...error };
    switch (id) {
      case "name":
        if (/^[A-Za-z\s]{1,}[.]{0,1}[A-Za-z\s]{0,}$/.test(value)) {
          newError[id] = "";
        } else {
          newError[id] = "Full Name can contain only Alphabets and Spaces";
        }
        break;
      case "email":
        if (/^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(value)) {
          newError[id] = "";
        } else {
          newError[id] = "Invalid email id";
        }
        break;
      case "github":
        if (/^([A-Za-z0-9_]){1,20}$/.test(value)) {
          newError[id] = "";
        } else {
          newError[id] =
            "Github username can contain only Alphabets, Numbers and Underscore(_)";
        }
        break;

      default:
        break;
    }

    setForm(newForm);
    setError(newError);
  };

  const hasErrors = Object.values(error).reduce(
    (acc, curr) => Boolean(acc || curr),
    false
  );

  const handleSubmit = () => {
    saveUserProfile(form)
      .then(() => {
        alert("Profile created successfully");
      })
      .catch((err) => {
        alert("An error occured. Check logs.");
        console.error(err);
      });
  };

  return (
    <div>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          id={"name"}
          value={form.name}
          onChange={handleInput}
        />
        {error.name && <p>{error.name}</p>}
      </div>
      <div>
        <label>Email Id</label>
        <input
          type="text"
          placeholder="Enter your email id"
          value={form.email}
          id={"email"}
          onChange={handleInput}
        />
        {error.email && <p>{error.email}</p>}
      </div>
      <div>
        <label>Skills</label>
        <textarea
          placeholder="Enter comma (,) separated values"
          value={form.skills}
          onChange={handleInput}
          id={"skills"}
        />
        {error.skills && <p>{error.skills}</p>}
      </div>
      <div>
        <label>Github Profile</label>
        <input
          type="text"
          placeholder="Enter your Github UserId"
          value={form.github}
          id={"github"}
          onChange={handleInput}
        />
        {error.github && <p>{error.github}</p>}
      </div>
      <div>
        <button disabled={hasErrors} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Profile;
