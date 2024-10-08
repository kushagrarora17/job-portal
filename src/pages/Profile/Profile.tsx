import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import { ProfileType } from "../../types";
import { getUserProfile, saveUserProfile } from "../../utils";
import { UserContext } from "../../contexts/userContext";

const defaultFormState = {
  name: "",
  email: "",
  skills: "",
  github: "",
};

const Profile = () => {
  const [form, setForm] = useState<ProfileType>(defaultFormState);
  const [error, setError] = useState(defaultFormState);
  const user = useContext(UserContext);
  const isFreelancer = user && user.type === "FREELANCER";

  useEffect(() => {
    if (isFreelancer)
      getUserProfile(user ? user.id : 0).then((data) => setForm(data));
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
        alert("Profile updated successfully");
      })
      .catch((err) => {
        alert("An error occured. Check logs.");
        console.error(err);
      });
  };

  if (!isFreelancer) {
    return <h2>Not Authorised for Profile</h2>;
  }

  return (
    <div className="profile-page">
      <h3 className="page-heading">Profile</h3>
      <div className="form-group">
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
      <div className="form-group">
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
      <div className="form-group">
        <label>Skills</label>
        <textarea
          placeholder="Enter comma (,) separated values"
          value={form.skills}
          onChange={handleInput}
          id={"skills"}
        />
        {error.skills && <p>{error.skills}</p>}
      </div>
      <div className="form-group">
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
      <div className="form-group">
        <button disabled={hasErrors} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Profile;
