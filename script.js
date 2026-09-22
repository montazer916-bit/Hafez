const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("list");
const error = document.getElementById("error");

// ➕ افزودن تسک جدید
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();

    if (!text) {
        error.hidden = false;
        // 🎬 افکت shake را دوباره اجرا کن
        error.style.animation = "none";
        void error.offsetWidth;
        error.style.animation = "shake 0.4s ease";
        return;
    }

    error.hidden = true;
    addTask(text);
    input.value = "";
    input.focus();
});

// 🧱 ساخت آیتم تسک
function addTask(text) {
    const li = document.createElement("li");
    li.className = "task";
    li.innerHTML = `
    <span class="task-text">${escapeHtml(text)}</span>
    <button class="delete-btn" aria-label="Delete">×</button>
  `;
    list.prepend(li);
}

// 🖱️ کلیک روی تسک → toggle done / حذف
list.addEventListener("click", (e) => {
    const li = e.target.closest(".task");
    if (!li) return;

    if (e.target.classList.contains("delete-btn")) {
        li.style.transition = "all 0.3s ease";
        li.style.opacity = "0";
        li.style.transform = "translateX(60px)";
        setTimeout(() => li.remove(), 300);
    } else {
        li.classList.toggle("done");
    }
});

// 🛡️ جلوگیری از XSS
function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}