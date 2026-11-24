const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#navbarResponsive");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
});

menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});

document.documentElement.classList.add("has-js");

const projectDetails = {
  portfolio: {
    title: "AXL.DEV",
    copy: "Структуру взял из шаблона Freelancer. Переверстал первый экран, навигацию, галерею и контакты. Визуальный стиль построен на тёмных фиолетовых оттенках и бликах фуксии.",
  },
  responsive: {
    title: "AXL.DEV на телефоне",
    copy: "На узком экране меню сворачивается, а элементы первого экрана и формы выстраиваются в одну колонку. В галерее остаются две колонки. Для навигации можно использовать клавиатуру, а диалоги закрываются по Escape.",
  },
};

const detailDialog = document.querySelector("#project-detail");
const detailImage = document.querySelector("#project-detail-image");
const detailTitle = document.querySelector("#project-detail-title");
const detailCopy = document.querySelector("#project-detail-copy");

for (const trigger of document.querySelectorAll(".detail-trigger")) {
  trigger.addEventListener("click", () => {
    const preview = trigger.closest(".portfolio-item").querySelector("img");
    const details = projectDetails[trigger.dataset.project];
    detailImage.src = preview.src;
    detailImage.alt = preview.alt;
    detailTitle.textContent = details.title;
    detailCopy.textContent = details.copy;
    detailDialog.showModal();
  });
}

const contactForm = document.querySelector("#contact-form");
const emailField = contactForm.elements.email;
const emailError = document.querySelector("#email-error");

function updateEmailError() {
  emailError.hidden = !emailField.validity.typeMismatch;
  if (emailError.hidden) {
    emailField.removeAttribute("aria-invalid");
    emailField.removeAttribute("aria-describedby");
  } else {
    emailField.setAttribute("aria-invalid", "true");
    emailField.setAttribute("aria-describedby", "email-error");
  }
}

emailField.addEventListener("invalid", updateEmailError);
emailField.addEventListener("blur", updateEmailError);
emailField.addEventListener("input", () => {
  if (!emailError.hidden) updateEmailError();
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = new FormData(contactForm);
  const name = values.get("name").trim();
  const email = values.get("email");
  const message = values.get("message").trim();
  const subject = encodeURIComponent("Сообщение с портфолио");
  const body = encodeURIComponent(`Имя: ${name}\r\nEmail: ${email}\r\n\r\n${message}`);
  window.location.href = `${contactForm.getAttribute("action")}?subject=${subject}&body=${body}`;
});
