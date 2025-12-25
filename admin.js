// 🔐 CREATE SUPABASE CLIENT (ONLY ONCE)
const supabaseUrl = "https://blcukfihtimpvukjsgsf.supabase.co";
const supabaseKey = "sb_publishable__hf6FXBiVt-J_y34vr9sYQ_SZwowdAZ";

const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

// ✅ LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Login failed: " + error.message);
    return;
  }

  showDashboard();
}

// ✅ SHOW DASHBOARD
async function showDashboard() {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("dashboard").style.display = "block";

  const { data, error } = await supabaseClient
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    alert("Failed to load messages");
    return;
  }

  const box = document.getElementById("messages");
  box.innerHTML = "";

  data.forEach(m => {
    const card = document.createElement("div");
    card.className = "data-card";

    const date = new Date(m.created_at).toLocaleString();

    card.innerHTML = `
      <p><strong>Name:</strong> ${m.name}</p>
      <p><strong>Email:</strong> ${m.email}</p>
      <p><strong>Message:</strong> ${m.message}</p>
      <p><strong>Date & Time:</strong> ${date}</p>

      <button class="delete-btn" onclick="deleteMessage('${m.id}')">
        Delete
      </button>
    `;

    box.appendChild(card);
  });
}

// 🗑️ DELETE MESSAGE
async function deleteMessage(id) {
  const confirmDelete = confirm("Are you sure you want to delete this message?");
  if (!confirmDelete) return;

  const { error } = await supabaseClient
    .from("contacts")
    .delete()
    .eq("id", id);

  if (error) {
    alert("Delete failed");
    return;
  }

  // reload messages
  showDashboard();
}

// ✅ AUTO LOGIN IF SESSION EXISTS
supabaseClient.auth.getSession().then(({ data }) => {
  if (data.session) {
    showDashboard();
  }
});

// ✅ LOGOUT
async function logout() {
  await supabaseClient.auth.signOut();
  location.reload();
}
