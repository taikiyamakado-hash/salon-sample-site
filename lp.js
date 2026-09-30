'use strict';

// Local reservation demonstration: never sends or persists input values.
const dialog = document.querySelector('#booking-dialog');
const form = document.querySelector('#booking-form');
const service = document.querySelector('#service');
const date = document.querySelector('#visit-date');
const time = document.querySelector('#visit-time');
const result = document.querySelector('#booking-result');

function todayLocal() {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')].join('-');
}

document.querySelectorAll('[data-book]').forEach(button => {
  button.addEventListener('click', () => {
    form.reset();
    service.value = button.dataset.book;
    date.min = todayLocal();
    form.hidden = false;
    result.hidden = true;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  date.min = todayLocal();
  if (!form.reportValidity()) return;
  document.querySelector('#booking-summary').textContent =
    [service.value, date.value, time.value].join(' ／ ');
  form.hidden = true;
  result.hidden = false;
  document.querySelector('#booking-back').focus();
});

document.querySelector('#booking-back').addEventListener('click', () => {
  result.hidden = true;
  form.hidden = false;
  service.focus();
});
