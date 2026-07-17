import { useState } from "react";
import "./SettingsForm.css";

const INITIAL_FORM = {
  displayName: "",
  email: "",
  theme: "system",
  language: "en",
  emailNotifications: true,
  marketingEmails: false,
};

function validateForm(values) {
  const errors = {};

  if (!values.displayName.trim()) {
    errors.displayName = "Display name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

function SettingsForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }

    if (status) {
      setStatus("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("");
      return;
    }

    setStatus("Settings saved successfully.");
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setErrors({});
    setStatus("");
  }

  return (
    <section className="settings" aria-labelledby="settings-heading">
      <div className="settings__header">
        <h2 id="settings-heading">Settings</h2>
        <p>Update your profile and app preferences.</p>
      </div>

      <form className="settings__form" onSubmit={handleSubmit} noValidate>
        <fieldset className="settings__group">
          <legend>Profile</legend>

          <div className="settings__field">
            <label htmlFor="displayName">Display name</label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              value={form.displayName}
              onChange={handleChange}
              placeholder="Jane Doe"
              autoComplete="name"
              aria-invalid={Boolean(errors.displayName)}
              aria-describedby={errors.displayName ? "displayName-error" : undefined}
            />
            {errors.displayName && (
              <p className="settings__error" id="displayName-error" role="alert">
                {errors.displayName}
              </p>
            )}
          </div>

          <div className="settings__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p className="settings__error" id="email-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </fieldset>

        <fieldset className="settings__group">
          <legend>Preferences</legend>

          <div className="settings__field">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              name="theme"
              value={form.theme}
              onChange={handleChange}
            >
              <option value="system">System default</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="settings__field">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              value={form.language}
              onChange={handleChange}
            >
              <option value="en">English</option>
              <option value="ur">Urdu</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="settings__group">
          <legend>Notifications</legend>

          <label className="settings__checkbox">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={form.emailNotifications}
              onChange={handleChange}
            />
            <span>Email me about account activity</span>
          </label>

          <label className="settings__checkbox">
            <input
              type="checkbox"
              name="marketingEmails"
              checked={form.marketingEmails}
              onChange={handleChange}
            />
            <span>Send product updates and tips</span>
          </label>
        </fieldset>

        {status && (
          <p className="settings__status" role="status">
            {status}
          </p>
        )}

        <div className="settings__actions">
          <button type="submit" className="settings__button settings__button--primary">
            Save changes
          </button>
          <button
            type="button"
            className="settings__button settings__button--secondary"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

export default SettingsForm;
