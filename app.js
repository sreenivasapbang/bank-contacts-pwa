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

  render(data);

  search.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    render(data.filter(c => c.bank_name.toLowerCase().includes(q)));
  });
}

loadContacts();

// Register service worker for offline use
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}