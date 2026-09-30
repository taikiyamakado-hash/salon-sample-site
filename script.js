'use strict';

// Mobile navigation: close after navigation, outside click, or Escape.
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');

function closeMenu() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});

document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});

// Demo only: no network requests, personal information, or persistent storage.
const booking = document.querySelector('#booking-dialog');
const form = document.querySelector('#booking-form');
const result = document.querySelector('#booking-result');
const date = document.querySelector('#visit-date');
const now = new Date();
date.min = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, '0'),
  String(now.getDate()).padStart(2, '0')
].join('-');

function openDialog(dialog) {
  dialog.showModal();
  document.body.classList.add('modal-open');
}

document.querySelectorAll('[data-reserve]').forEach(button => {
  button.addEventListener('click', () => {
    closeMenu();
    openDialog(booking);
  });
});

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) dialog.close();
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  document.querySelector('#booking-summary').textContent = [
    document.querySelector('#service').value,
    date.value,
    document.querySelector('#visit-time').value
  ].join(' ／ ');
  form.hidden = true;
  result.hidden = false;
  document.querySelector('#booking-back').focus();
});

document.querySelector('#booking-back').addEventListener('click', () => {
  result.hidden = true;
  form.hidden = false;
  document.querySelector('#service').focus();
});

// Descriptive notes for generated style images, not claims of actual results.
const styles = {
  bob: {
    title: 'Soft bob',
    description: '丸みのあるシルエットと、自然にまとまる毛先。顔まわりの長さを調整して、すっきりとした印象に。おすすめのメニューは「似合わせカット」。朝のスタイリングをシンプルにしたい方へ。'
  },
  layer: {
    title: 'Natural layer',
    description: '顔まわりに軽やかな動きをつけたレイヤーと、落ち着いたブラウンカラー。おすすめのメニューは「カット＋透明感カラー」。長さを大きく変えずに、雰囲気を変えたい方へ。'
  }
};
const styleDialog = document.querySelector('#style-dialog');

document.querySelectorAll('[data-style]').forEach(button => {
  button.addEventListener('click', () => {
    const style = styles[button.dataset.style];
    document.querySelector('#style-title').textContent = style.title;
    document.querySelector('#style-description').textContent = style.description;
    openDialog(styleDialog);
  });
});

document.querySelector('#style-menu').addEventListener('click', () => styleDialog.close());
