async function loadContacts() {
  const res = await fetch('contacts.json');
  let data = await res.json();  // Use let so we can modify later
  const search = document.getElementById('search');
  const results = document.getElementById('results');
  const form = document.getElementById('contactForm');

  function render(list) {
    results.innerHTML = `
      <table border="1" cellpadding="5" style="width:100%; border-collapse:collapse;">
        <thead>
          <tr>
            <th>Bank Name</th>
            <th>Official Name</th>
            <th>Contact Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          ${list.map(c => `
            <tr>
              <td>${c.bank_name}</td>
              <td>${c.official_name}</td>
              <td><a href="tel:${c.contact_number}">${c.contact_number}</a></td>
              <td><a href="mailto:${c.email}">${c.email}</a></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // Initial render
  render(data);

  // Search filter
  search.addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = data.filter(c => {
      const bank = (c.bank_name || "").toString().toLowerCase();
      const official = (c.official_name || "").toString().toLowerCase();
      const contact = (c.contact_number || "").toString().toLowerCase();
      const email = (c.email || "").toString().toLowerCase();
      return bank.includes(q) || official.includes(q) || contact.includes(q) || email.includes(q);
    });
    render(filtered);
  });

  // Handle new contact form
  form.addEventListener('submit', e => {
    e.preventDefault();
    const newContact = {
      bank_name: document.getElementById('bankName').value,
      official_name: document.getElementById('officialName').value,
      contact_number: document.getElementById('contactNumber').value,
      email: document.getElementById('email').value
    };
    data.push(newContact);  // Add to local array
    render(data);           // Refresh table
    form.reset();           // Clear form
    console.log("New contact added:", newContact);
  });
}

loadContacts();
