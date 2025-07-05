// ==============================
// 🔑 REGISTER USER FUNCTION
// ==============================
function registerUser() {
  let phone = document.getElementById("registerPhone").value;
  let email = document.getElementById("registerEmail").value;
  let password = document.getElementById("registerPassword").value;
  let username = document.getElementById("registerUsername").value;

  if (phone && email && password && username) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = users.find(u => u.phone === phone);
    if (existingUser) {
      alert("User with this phone already exists.");
      return false;
    }

    let newUser = {
      phone: phone,
      email: email,
      password: password,
      username: username,
      balance: 0
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    alert("Registration successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("Please fill all fields.");
  }

  return false;
}

// ==============================
// 🔑 LOGIN USER FUNCTION
// ==============================
function loginUser() {
  let phone = document.getElementById("loginPhone").value;
  let password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.phone === phone && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid phone or password.");
  }

  return false;
}

// ==============================
// 🔑 ADMIN LOGIN FUNCTION
// ==============================
function adminLogin() {
  let password = document.getElementById("adminPassword").value;
  if (password === "626269jsm") {
    alert("Admin login successful!");
    window.location.href = "adminDashboard.html";
  } else {
    alert("Invalid admin password.");
  }
  return false;
}

// ==============================
// 🏠 USER DASHBOARD DISPLAY
// ==============================
function displayUserDashboard() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    document.getElementById("usernameDisplay").innerText = currentUser.username;
    document.getElementById("balanceDisplay").innerText = currentUser.balance + " TZS";
  }
}

// ==============================
// 💰 DEPOSIT FUNCTION
// ==============================
function depositMoney() {
  let amount = document.getElementById("depositAmount").value;
  let phone = document.getElementById("depositPhone").value;
  let network = document.getElementById("depositNetwork").value;

  if (amount && phone && network) {
    let deposits = JSON.parse(localStorage.getItem("depositRequests")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let deposit = {
      username: currentUser.username,
      amount: amount,
      phone: phone,
      network: network,
      time: new Date().toLocaleString()
    };

    deposits.push(deposit);
    localStorage.setItem("depositRequests", JSON.stringify(deposits));

    let payment = JSON.parse(localStorage.getItem("paymentDetails"));
    if (payment) {
      alert(`✅ Omba lako limepokelewa!\n\n💰 Lipia ${amount} TZS kwa:\n📞 Namba: ${payment.number}\n👤 Jina: ${payment.name}\n🌐 Network: ${payment.network}\n\n✅ Baada ya malipo, salio lako litaongezwa na admin.`);
    } else {
      alert("⚠️ Payment details hazijawekwa na admin bado.");
    }

    window.location.href = "wallet.html";
  } else {
    alert("Please fill all fields.");
  }

  return false;
}

// ==============================
// 💸 WITHDRAW FUNCTION
// ==============================
function withdrawMoney() {
  let amount = document.getElementById("withdrawAmount").value;
  let phone = document.getElementById("withdrawPhone").value;
  let name = document.getElementById("withdrawName").value;
  let network = document.getElementById("withdrawNetwork").value;

  if (amount && phone && name && network) {
    let withdrawals = JSON.parse(localStorage.getItem("withdrawRequests")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let withdraw = {
      username: currentUser.username,
      amount: amount,
      phone: phone,
      name: name,
      network: network,
      time: new Date().toLocaleString()
    };

    withdrawals.push(withdraw);
    localStorage.setItem("withdrawRequests", JSON.stringify(withdrawals));

    alert("✅ Ombi la kutoa pesa limepokelewa. Admin atakuhudumia hivi karibuni.");
    window.location.href = "wallet.html";
  } else {
    alert("Please fill all fields.");
  }

  return false;
}

// ==============================
// 📝 SAVE PAYMENT DETAILS (ADMIN)
// ==============================
function savePaymentDetails() {
  let number = document.getElementById("payNumber").value;
  let name = document.getElementById("payName").value;
  let network = document.getElementById("payNetwork").value;

  if (number && name && network) {
    let payment = { number, name, network };
    localStorage.setItem("paymentDetails", JSON.stringify(payment));
    alert("Payment details updated successfully!");
    window.location.href = "adminDashboard.html";
  } else {
    alert("Please fill all fields.");
  }

  return false;
}

// ==============================
// 👥 VIEW ALL USERS (ADMIN)
// ==============================
function viewAllUsers() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach(u => {
    let li = document.createElement("li");
    li.textContent = `Username: ${u.username} | Phone: ${u.phone} | Balance: ${u.balance} TZS`;
    userList.appendChild(li);
  });
}

// ==============================
// 💰 CHANGE USER BALANCE (ADMIN)
// ==============================
function changeUserBalance() {
  let phone = document.getElementById("changePhone").value;
  let newBalance = document.getElementById("newBalance").value;

  if (phone && newBalance) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.phone === phone);

    if (user) {
      user.balance = parseInt(newBalance);
      localStorage.setItem("users", JSON.stringify(users));
      alert("User balance updated successfully!");
      window.location.href = "adminDashboard.html";
    } else {
      alert("User not found.");
    }
  } else {
    alert("Please fill all fields.");
  }

  return false;
}

// ==============================
// 💰 APPROVE DEPOSIT (ADMIN)
// ==============================
function viewDepositRequests() {
  let deposits = JSON.parse(localStorage.getItem("depositRequests")) || [];
  let depositList = document.getElementById("depositList");
  depositList.innerHTML = "";

  deposits.forEach(d => {
    let li = document.createElement("li");
    li.textContent = `Username: ${d.username} | Amount: ${d.amount} | Phone: ${d.phone} | Network: ${d.network} | Time: ${d.time}`;
    depositList.appendChild(li);
  });
}

// ==============================
// 💸 APPROVE WITHDRAWAL (ADMIN)
// ==============================
function viewWithdrawalRequests() {
  let withdrawals = JSON.parse(localStorage.getItem("withdrawRequests")) || [];
  let withdrawList = document.getElementById("withdrawList");
  withdrawList.innerHTML = "";

  withdrawals.forEach(w => {
    let li = document.createElement("li");
    li.textContent = `Username: ${w.username} | Amount: ${w.amount} | Phone: ${w.phone} | Name: ${w.name} | Network: ${w.network} | Time: ${w.time}`;
    withdrawList.appendChild(li);
  });
}

// ==============================
// 🚪 LOGOUT FUNCTION
// ==============================
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
      
