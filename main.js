// 🔹 SUPABASE (PUBLIC – INSERT ONLY)
const supabaseUrl = "https://blcukfihtimpvukjsgsf.supabase.co";
const supabaseKey = "sb_publishable__hf6FXBiVt-J_y34vr9sYQ_SZwowdAZ";

const supabaseClient = supabase.createClient(
  supabaseUrl,
  supabaseKey
);

// UI helpers
function toggleDrawer() {
  const drawer = document.getElementById("mobileDrawer");
  if (drawer) drawer.classList.toggle("open");
}

function openPage(page) {
  window.location.href = page;
}

// CONTACT FORM ONLY
async function sendMessage() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const purpose = document.getElementById("purpose").value;

  if (!name || !email || !message) {
    alert("Please fill all fields😒");
    return;
  }

  const { error } = await supabaseClient
    .from("contacts")
    .insert([{ name, email, message, purpose }]);

  if (error) {
    alert("❌ Something went wrong😐");
    console.error(error);
  } else {
    alert("✅ Message sent😎");
  }
}
