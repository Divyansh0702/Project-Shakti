(() => {
  const $ = (sel) => document.querySelector(sel)
  const $$ = (sel) => Array.from(document.querySelectorAll(sel))

  // Tabs
  $$('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('.tab').forEach(t => t.classList.remove('active'))
      tab.classList.add('active')
      const id = tab.dataset.tab
      $$('.panel').forEach(p => p.classList.remove('active'))
      const panel = $('#' + id)
      if (panel) panel.classList.add('active')
    })
  })

  // Persist admin key in localStorage
  const adminKeyInput = $('#adminKey')
  const saveKeyBtn = $('#saveKey')
  if (adminKeyInput) adminKeyInput.value = localStorage.getItem('ADMIN_KEY') || ''
  if (saveKeyBtn) {
    saveKeyBtn.addEventListener('click', () => {
      localStorage.setItem('ADMIN_KEY', (adminKeyInput && adminKeyInput.value) || '')
      alert('Admin key saved')
    })
  }

  const api = (path, options = {}) => fetch('/api/admin' + path, {
    ...options,
    headers: {
      'x-admin-key': localStorage.getItem('ADMIN_KEY') || '',
      'content-type': 'application/json',
      ...(options.headers || {})
    }
  }).then(async r => {
    const data = await r.json().catch(() => ({}))
    if (!r.ok) throw new Error(data?.message || 'Request failed')
    return data
  })

  // Render cards
  const renderDrivers = async () => {
    try {
      const { drivers } = await api('/drivers')
      const list = $('#driversList')
      list.innerHTML = ''
      const q = ($('#driverSearch')?.value || '').toLowerCase()
      drivers.filter(d => {
        const s = `${d.name||''} ${d.email||''} ${d.phone||''}`.toLowerCase()
        return !q || s.includes(q)
      }).forEach((d) => {
        const el = document.createElement('div')
        el.className = 'card glass'
        el.innerHTML = `
          <div class="chip">${d._id.slice(-6)}</div>
          <input placeholder="Name" value="${d.name || ''}" />
          <input placeholder="Email" value="${d.email || ''}" />
          <input placeholder="Phone" value="${d.phone || ''}" />
          <div class="chip">${d.vehicleNumber || '—'}</div>
          <div class="actions">
            <button class="btn ${d.isVerified ? 'unverify' : 'verify'}">${d.isVerified ? 'Unverify' : 'Verify'}</button>
            <button class="btn save">Save</button>
          </div>
        `
        const [idEl, nameEl, emailEl, phoneEl] = el.querySelectorAll('div,input')
        el.querySelector('.btn.save').addEventListener('click', async () => {
          try {
            await api(`/drivers/${d._id}`, {
              method: 'PUT',
              body: JSON.stringify({ name: nameEl.value, email: emailEl.value, phone: phoneEl.value })
            })
            alert('Saved')
          } catch (err) { alert(err.message) }
        })
        el.querySelector('.btn.verify')?.addEventListener('click', async () => {
          try {
            await api(`/drivers/${d._id}`, { method: 'PUT', body: JSON.stringify({ isVerified: true }) })
            renderDrivers()
          } catch (err) { alert(err.message) }
        })
        el.querySelector('.btn.unverify')?.addEventListener('click', async () => {
          try {
            await api(`/drivers/${d._id}`, { method: 'PUT', body: JSON.stringify({ isVerified: false }) })
            renderDrivers()
          } catch (err) { alert(err.message) }
        })
        list.appendChild(el)
      })
    } catch (err) {
      alert(err.message)
    }
  }

  const renderCustomers = async () => {
    try {
      const { customers } = await api('/customers')
      const list = $('#customersList')
      list.innerHTML = ''
      const q = ($('#customerSearch')?.value || '').toLowerCase()
      customers.filter(c => {
        const s = `${c.name||''} ${c.email||''} ${c.phone||''}`.toLowerCase()
        return !q || s.includes(q)
      }).forEach((c) => {
        const el = document.createElement('div')
        el.className = 'card glass'
        el.innerHTML = `
          <div class="chip">${c._id.slice(-6)}</div>
          <input placeholder="Name" value="${c.name || ''}" />
          <input placeholder="Email" value="${c.email || ''}" />
          <input placeholder="Phone" value="${c.phone || ''}" />
          <div class="chip">${c.address || '—'}</div>
          <div class="actions">
            <button class="btn ${c.isVerified ? 'unverify' : 'verify'}">${c.isVerified ? 'Unverify' : 'Verify'}</button>
            <button class="btn save">Save</button>
          </div>
        `
        const [idEl, nameEl, emailEl, phoneEl] = el.querySelectorAll('div,input')
        el.querySelector('.btn.save').addEventListener('click', async () => {
          try {
            await api(`/customers/${c._id}`, {
              method: 'PUT',
              body: JSON.stringify({ name: nameEl.value, email: emailEl.value, phone: phoneEl.value })
            })
            alert('Saved')
          } catch (err) { alert(err.message) }
        })
        el.querySelector('.btn.verify')?.addEventListener('click', async () => {
          try {
            await api(`/customers/${c._id}`, { method: 'PUT', body: JSON.stringify({ isVerified: true }) })
            renderCustomers()
          } catch (err) { alert(err.message) }
        })
        el.querySelector('.btn.unverify')?.addEventListener('click', async () => {
          try {
            await api(`/customers/${c._id}`, { method: 'PUT', body: JSON.stringify({ isVerified: false }) })
            renderCustomers()
          } catch (err) { alert(err.message) }
        })
        list.appendChild(el)
      })
    } catch (err) {
      alert(err.message)
    }
  }

  const refreshDriversBtn = $('#refreshDrivers')
  const refreshCustomersBtn = $('#refreshCustomers')
  if (refreshDriversBtn) refreshDriversBtn.addEventListener('click', renderDrivers)
  if (refreshCustomersBtn) refreshCustomersBtn.addEventListener('click', renderCustomers)

  // Initial load
  if (refreshDriversBtn) renderDrivers()
  if (refreshCustomersBtn) renderCustomers()
})()

