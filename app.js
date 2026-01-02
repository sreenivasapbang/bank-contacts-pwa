async function loadContacts() {
  const res = await fetch('contactdetails.json');
  const data = await res.json();
  const search = document.getElementById('search');
  const results = document.getElementById('results');

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

  // Search filter with debug logs
  search.addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    console.log("Search query:", q);  // 🔍 Debug: shows what you typed

    const filtered = data.filter(c =>
      c.bank_name.toLowerCase().includes(q) ||
      c.official_name.toLowerCase().includes(q) ||
      c.contact_number.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );

    console.log("Filtered results:", filtered);  // 🔍 Debug: shows matching contacts
    render(filtered);
  });
}

loadContacts();

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

