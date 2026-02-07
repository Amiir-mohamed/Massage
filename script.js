// Services prices
const services = {
  "Swedish Massage": 20,
  "Deep Tissue Massage": 30,
  "Hot Stone Massage": 40
};

// Load customers from LocalStorage
let customers = JSON.parse(localStorage.getItem("customers")) || [];

const bookBtn = document.getElementById("bookBtn");
if (bookBtn) {
  bookBtn.addEventListener("click", bookMassage);
}


function bookMassage() {
  const nameInput = document.getElementById("name");
  const serviceInput = document.getElementById("service");
  const name = nameInput.value.trim();
  const service = serviceInput.value;

  // Regex-kan wuxuu ogolaanayaa sax 3 magac oo xarfo ah (Tusaale: Ahmed Ali Farah)
  const namePattern = /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/;

  // 1. Hubinta haddii meelaha banaan la dhaafay
  if (name === "" || service === "") {
    showMessage("❌ Fadlan buuxi dhammaan qaybaha banaan.", "red");
    return;
  }

  // 2. Hubinta haddii magacu uu yahay sax 3 magac
  if (!namePattern.test(name)) {
    showMessage("❌ Fadlan geli saddex magac oo xarfo ah (First Middle Last).", "red");
    nameInput.style.borderColor = "red"; // Feedback muuqaal ah
    return;
  }

  // Haddii xogtu sax tahay
  const price = services[service];
  customers.push({ name, service, price });
  localStorage.setItem("customers", JSON.stringify(customers));

  // Success Feedback
  showMessage("✅ Boos qabsashadaadu waa lagu guuleystay!", "green");
  nameInput.style.borderColor = "#d4af37"; // Ku celi midabkii dahabka

  // Nadiifi meelaha wax laga qoro
  nameInput.value = "";
  serviceInput.value = "";
}

// Display customers in Table
function displayCustomers() {
  const list = document.getElementById("customerList");
  if (!list) return;

  list.innerHTML = "";

  customers.forEach((c, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${c.name}</td>
      <td>${c.service}</td>
      <td>$${c.price}</td>
      <td><button class="btn-delete" onclick="deleteCustomer(${index})">Delete</button></td>
    `;

    list.appendChild(row);
  });
}

// Delete customer
function deleteCustomer(index) {
  if(confirm("Ma hubtaa inaad tirtirto macmiilkan?")) {
      customers.splice(index, 1);
      localStorage.setItem("customers", JSON.stringify(customers));
      displayCustomers();
  }
}

// Helper to show status messages
function showMessage(text, color) {
  const message = document.getElementById("message");
  if (!message) return;
  message.textContent = text;
  message.style.color = color;
}

// Run display function when page loads
displayCustomers();

// Hubi in bogga uu si buuxda u load-gareeyay
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Jooji in boggu iskiis u reload noqdo
            e.preventDefault();

            // 1. DOM Manipulation: Soo qaad xogta meelaha laga qoro
            const nameInput = document.getElementById('user-name');
            const emailInput = document.getElementById('user-email');
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();

            // 2. Input Validation: Regex-ka saddexda magac (First Middle Last)
            // Wuxuu eegayaa: Magac + Space + Magac + Space + Magac
            const namePattern = /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/;

            // 3. User Feedback Logic
            if (name === "" || email === "") {
                alert("❌ Fadlan buuxi dhammaan qaybaha banaan.");
                return;
            }

            // Hubinta shuruudda saddexda magac
            if (!namePattern.test(name)) {
                alert("❌ Fadlan geli saddex magac oo sax ah (Tusaale: Ahmed Ali Farah).");
                nameInput.style.borderColor = "red"; // Visual Feedback
                return;
            }

            // Hubinta email-ka (Validation fudud)
            if (!email.includes("@")) {
                alert("❌ Fadlan geli Email sax ah.");
                return;
            }

             if (!email.includes(".")) {
                alert("❌ Fadlan geli Email sax ah.");
                return;
            }

            // Haddii wax kasta sax yihiin
            alert("✅ Mahadsanid " + name + "! Farriintaada waa la diray.");
            nameInput.style.borderColor = "#d4af37"; // Ku celi midabkii hore
            contactForm.reset(); // Nadiifi form-ka
        });
    }
});


//
// 4. Shaqada Raadinta iyo Soo Bandhigista (Search Function)
function displayCustomers(filterText = "") {
  const list = document.getElementById("customerList");
  if (!list) return;

  list.innerHTML = ""; // Nadiifi table-ka

  // Shaandheynta macaamiisha iyadoo la eegayo magaca
  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(filterText.toLowerCase())
  );

  filtered.forEach((c, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${c.name}</td>
      <td>${c.service}</td>
      <td>$${c.price}</td>
      <td><button class="btn-delete" onclick="deleteCustomer(${index})">Delete</button></td>
    `;
    list.appendChild(row);
  });
}

// 5. Qabashada Qoraalka Raadinta (Search Event Listener)
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keyup", (e) => {
    displayCustomers(e.target.value);
  });
}

// 6. Tirtirista Macmiilka
function deleteCustomer(index) {
  if (confirm("Ma hubtaa inaad tirtirto macmiilkan?")) {
    customers.splice(index, 1);
    localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomers();
  }
}

// 7. Message Helper
function showMessage(text, color) {
  const messageBox = document.getElementById("message");
  if (!messageBox) return;
  messageBox.textContent = text;
  messageBox.style.color = color;
  setTimeout(() => { messageBox.textContent = ""; }, 4000);
}

// Soo saar liiska markii ugu horreysay ee bogga la furo
displayCustomers();

