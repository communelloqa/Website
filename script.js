const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

const fields = {
  name: {
    input: document.querySelector("#name"),
    error: document.querySelector("#name-error"),
    message: "Please enter your name.",
  },
  email: {
    input: document.querySelector("#email"),
    error: document.querySelector("#email-error"),
    message: "Please enter a valid email address.",
  },
  subject: {
    input: document.querySelector("#subject"),
    error: document.querySelector("#subject-error"),
    message: "Please select a topic.",
  },
  message: {
    input: document.querySelector("#message"),
    error: document.querySelector("#message-error"),
    message: "Please enter your message.",
  },
};

function validateField(field) {
  const value = field.input.value.trim();
  let valid = value.length > 0;

  if (field.input.type === "email") {
    valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  field.input.classList.toggle("invalid", !valid);
  field.error.textContent = valid ? "" : field.message;
  field.input.setAttribute("aria-invalid", String(!valid));
  return valid;
}

Object.values(fields).forEach((field) => {
  field.input.addEventListener("blur", () => validateField(field));
  field.input.addEventListener("input", () => {
    if (field.input.classList.contains("invalid")) {
      validateField(field);
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isValid = Object.values(fields).every(validateField);
  if (!isValid) {
    status.textContent = "Please complete the required fields.";
    return;
  }

  const button = form.querySelector("button");
  button.disabled = true;
  button.firstChild.textContent = "Message sent ";
  status.textContent = "Thank you. Your message is ready for our team.";

  form.reset();
  button.disabled = false;

  window.setTimeout(() => {
    button.firstChild.textContent = "Send message ";
  }, 2200);
});

document.querySelector("#year").textContent = new Date().getFullYear();
