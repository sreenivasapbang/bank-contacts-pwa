async function loadContacts() {
  const res = await fetch('contacts.json');
  const data = await res.json();
  const search = document.getElementById('search');
  const results = document.getElementById('results');

  function render(list) {
    results.innerHTML = '';
    list.forEach(c => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${c.bank_name}</strong><br>
        ${c.official_name}<br>
        📞 <a href="tel:${c.contact_number}">${c.contact_number}</a><br>
        📧 <a href="mailto:${c.email}">${c.email}</a>
      `;
      results.appendChild(li);
    });
  }

  // Initial render
  render(data);

  // Search filter
  search.addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = data.filter(c =>
      c.bank_name.toLowerCase().includes(q) ||
      c.official_name.toLowerCase().includes(q) ||
      c.contact_number.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
    render(filtered);
  });
}

loadContacts();
