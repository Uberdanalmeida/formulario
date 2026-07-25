const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const recoveryForm = document.getElementById("recovery-form");
const tabs = document.querySelectorAll(".tab-button");
const toggleButtons = document.querySelectorAll("[data-toggle-form]");
const passwordToggles = document.querySelectorAll(".password-toggle");
const formTitle = document.getElementById("form-title");
const welcomeScreen = document.getElementById("welcome-screen");
const dashName = document.getElementById("dash-name");
const dashEmail = document.getElementById("dash-email");
const dashBirth = document.getElementById("dash-birth");
const dashPhone = document.getElementById("dash-phone");
const logoutButton = document.getElementById("logout-button");
const recoveryMessage = document.getElementById("recovery-message");
const loginStatus = document.getElementById("login-status");
const registerStatus = document.getElementById("register-status");
const recoveryStatus = document.getElementById("recovery-status");
const storageKey = "formularioUsuarios";

function getUsers() {
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem(storageKey, JSON.stringify(users));
}

function setActiveView(view) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === view);
  });

  loginForm.classList.toggle("active", view === "login");
  registerForm.classList.toggle("active", view === "register");
  recoveryForm.classList.toggle("active", view === "recover");
  welcomeScreen.classList.add("hidden");

  if (view === "login") {
    formTitle.textContent = "Entrar";
  } else if (view === "register") {
    formTitle.textContent = "Criar conta";
  } else {
    formTitle.textContent = "Recuperar senha";
  }

  clearFormErrors(loginForm);
  clearFormErrors(registerForm);
  clearFormErrors(recoveryForm);
  clearStatus(loginStatus);
  clearStatus(registerStatus);
  clearStatus(recoveryStatus);
  if (recoveryMessage) recoveryMessage.textContent = "";
}

function showError(element, message) {
  element.textContent = message;
}

function clearFormErrors(form) {
  const errors = form.querySelectorAll(".error-message");
  errors.forEach((el) => {
    el.textContent = "";
  });
}

function showStatus(element, message, type = "success") {
  if (!element) return;
  element.textContent = message;
  element.classList.remove("success", "error");
  element.classList.add(type);
}

function clearStatus(element) {
  if (!element) return;
  element.textContent = "";
  element.classList.remove("success", "error");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return phone === "" || /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(phone);
}

function findUserByEmail(email) {
  return getUsers().find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
}

function showWelcome(user) {
  dashName.textContent = user.nome;
  dashEmail.textContent = user.email;
  dashBirth.textContent = user.nascimento || "Não informado";
  dashPhone.textContent = user.telefone || "Não informado";

  welcomeScreen.classList.remove("hidden");
  loginForm.classList.remove("active");
  registerForm.classList.remove("active");
  recoveryForm.classList.remove("active");
  tabs.forEach((tab) => tab.classList.remove("active"));
  formTitle.textContent = "Bem-vindo";
}

function togglePassword(button) {
  const target = document.getElementById(button.dataset.target);
  if (!target) return;

  const isHidden = target.type === "password";
  target.type = isHidden ? "text" : "password";
  button.textContent = isHidden ? "Ocultar" : "Mostrar";
}

function handleLogin(event) {
  event.preventDefault();
  clearFormErrors(loginForm);

  const emailElement = document.getElementById("login-email");
  const passwordElement = document.getElementById("login-senha");
  const emailError = document.getElementById("login-email-error");
  const passwordError = document.getElementById("login-senha-error");

  const email = emailElement.value.trim();
  const password = passwordElement.value;
  let valid = true;

  if (!email) {
    showError(emailError, "Informe o e-mail.");
    valid = false;
  } else if (!isValidEmail(email)) {
    showError(emailError, "Digite um e-mail válido.");
    valid = false;
  }

  if (!password) {
    showError(passwordError, "Informe a senha.");
    valid = false;
  }

  if (!valid) return;

  const user = findUserByEmail(email);
  if (!user || user.senha !== password) {
    showError(passwordError, "E-mail ou senha incorretos.");
    alert("E-mail ou senha incorretos.");
    return;
  }

  loginForm.reset();
  alert(`Seja bem-vindo, ${user.nome}!`);
  showWelcome(user);
}

function handleRegister(event) {
  event.preventDefault();
  clearFormErrors(registerForm);

  const nameElement = document.getElementById("nome");
  const birthElement = document.getElementById("nascimento");
  const phoneElement = document.getElementById("telefone");
  const emailElement = document.getElementById("register-email");
  const passwordElement = document.getElementById("senha");
  const genderElement = registerForm.querySelector(
    'input[name="sexo"]:checked',
  );

  const nameError = document.getElementById("nome-error");
  const birthError = document.getElementById("nascimento-error");
  const phoneError = document.getElementById("telefone-error");
  const emailError = document.getElementById("register-email-error");
  const passwordError = document.getElementById("senha-error");
  const genderError = document.getElementById("sexo-error");

  const nome = nameElement.value.trim();
  const nascimento = birthElement.value;
  const telefone = phoneElement.value.trim();
  const email = emailElement.value.trim();
  const senha = passwordElement.value;
  const sexo = genderElement ? genderElement.value : "";

  let valid = true;

  if (!nome) {
    showError(nameError, "Informe seu nome completo.");
    valid = false;
  }

  if (!nascimento) {
    showError(birthError, "Informe sua data de nascimento.");
    valid = false;
  }

  if (!isValidPhone(telefone)) {
    showError(phoneError, "Digite um telefone válido com 10 ou 11 dígitos.");
    valid = false;
  }

  if (!email) {
    showError(emailError, "Informe seu e-mail.");
    valid = false;
  } else if (!isValidEmail(email)) {
    showError(emailError, "Digite um e-mail válido.");
    valid = false;
  }

  if (!sexo) {
    showError(genderError, "Selecione uma opção.");
    valid = false;
  }

  if (!senha) {
    showError(passwordError, "Crie uma senha segura.");
    valid = false;
  } else if (senha.length < 8) {
    showError(passwordError, "A senha deve ter pelo menos 8 caracteres.");
    valid = false;
  }

  if (!valid) return;

  if (findUserByEmail(email)) {
    showError(emailError, "Já existe uma conta registrada com este e-mail.");
    return;
  }

  const users = getUsers();
  users.push({ nome, nascimento, telefone, email, senha, sexo });
  saveUsers(users);

  registerForm.reset();
  setActiveView("login");
  alert("Cadastro realizado com sucesso!");
}

function handleRecovery(event) {
  event.preventDefault();
  clearFormErrors(recoveryForm);
  recoveryMessage.textContent = "";

  const emailElement = document.getElementById("recovery-email");
  const emailError = document.getElementById("recovery-email-error");
  const email = emailElement.value.trim();

  if (!email) {
    showError(emailError, "Informe o e-mail cadastrado.");
    return;
  }

  if (!isValidEmail(email)) {
    showError(emailError, "Digite um e-mail válido.");
    return;
  }

  const user = findUserByEmail(email);
  if (!user) {
    showError(emailError, "Nenhuma conta encontrada com este e-mail.");
    alert("Nenhuma conta encontrada com este e-mail.");
    return;
  }

  recoveryMessage.textContent = `Se o e-mail ${email} estiver cadastrado, você receberá instruções de recuperação em breve.`;
  recoveryMessage.style.color = "#2563eb";
  alert("Instruções de recuperação enviadas para o e-mail informado.");
}

function handleTabClick(event) {
  const view = event.currentTarget.dataset.view;
  setActiveView(view);
}

function handleToggleLink(event) {
  const view = event.currentTarget.dataset.toggleForm;
  setActiveView(view);
}

function handleLogout() {
  welcomeScreen.classList.add("hidden");
  setActiveView("login");
}

tabs.forEach((tab) => tab.addEventListener("click", handleTabClick));
toggleButtons.forEach((button) =>
  button.addEventListener("click", handleToggleLink),
);
passwordToggles.forEach((button) =>
  button.addEventListener("click", () => togglePassword(button)),
);
loginForm.addEventListener("submit", handleLogin);
registerForm.addEventListener("submit", handleRegister);
recoveryForm.addEventListener("submit", handleRecovery);
logoutButton.addEventListener("click", handleLogout);

setActiveView("login");
