import { useState } from "react";
import {
  isSettingsFormValid,
  validateSettingsForm,
} from "../utils/settingsFormValidation";
import "./SettingsForm.css";

const INITIAL_FORM_VALUES = {
  displayName: "",
  email: "",
  theme: "light",
  emailNotifications: false,
};

function SettingsForm() {
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateSettingsForm(formValues);

    if (!isSettingsFormValid(validationErrors)) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    setErrors({});
    setSuccessMessage("Settings saved successfully.");
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <div className="settings-form__field">
        <label className="settings-form__label" htmlFor="displayName">
          Display Name
        </label>
        <input
          className="settings-form__input"
          type="text"
          id="displayName"
          name="displayName"
          value={formValues.displayName}
          onChange={handleInputChange}
          aria-invalid={Boolean(errors.displayName)}
          aria-describedby={errors.displayName ? "displayName-error" : undefined}
          required
        />
        {errors.displayName && (
          <p
            className="settings-form__error"
            id="displayName-error"
            role="alert"
          >
            {errors.displayName}
          </p>
        )}
      </div>

      <div className="settings-form__field">
        <label className="settings-form__label" htmlFor="email">
          Email
        </label>
        <input
          className="settings-form__input"
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          required
        />
        {errors.email && (
          <p className="settings-form__error" id="email-error" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="settings-form__field">
        <label className="settings-form__label" htmlFor="theme">
          Theme
        </label>
        <select
          className="settings-form__select"
          id="theme"
          name="theme"
          value={formValues.theme}
          onChange={handleInputChange}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="settings-form__field">
        <div className="settings-form__checkbox-row">
          <input
            className="settings-form__checkbox"
            type="checkbox"
            id="emailNotifications"
            name="emailNotifications"
            checked={formValues.emailNotifications}
            onChange={handleInputChange}
          />
          <label className="settings-form__label" htmlFor="emailNotifications">
            Email Notifications
          </label>
        </div>
      </div>

      <button className="settings-form__submit" type="submit">
        Save Changes
      </button>

      {successMessage && (
        <p className="settings-form__success" role="status">
          {successMessage}
        </p>
      )}
    </form>
  );
}

export default SettingsForm;
