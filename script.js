function getGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('p');
  if (name) document.getElementById('guestName').innerText = decodeURIComponent(name);
}

function updateCountdown() {
  const eventDate = new Date("2026-06-03T00:00:00").getTime();
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML = `
    <div class="time-box"><div class="time">${days}</div><div class="label">Hari</div></div>
    <div class="time-box"><div class="time">${hours}</div><div class="label">Jam</div></div>
    <div class="time-box"><div class="time">${minutes}</div><div class="label">Menit</div></div>
    <div class="time-box"><div class="time">${seconds}</div><div class="label">Detik</div></div>
  `;
}

function openInvitation() {
  // Sembunyikan hero dengan animasi
  document.querySelector('.hero').classList.add('hide');

  // Aktifkan scroll & navbar setelah delay animasi
  setTimeout(() => {
    document.body.style.overflow = "auto";
    document.getElementById('navbar').classList.add('show');
    document.getElementById('bg-music').play();
    document.getElementById('home').scrollIntoView({ behavior: "smooth" });
  }, 1000); // tunggu animasi 1 detik
}

// Highlight navbar saat scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-item");

  let index = sections.length;

  while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

  navLinks.forEach((link) => link.classList.remove("active"));
  navLinks[index].classList.add("active");
});

getGuestName();
updateCountdown();
setInterval(updateCountdown, 1000);

// Saat halaman direfresh dan ada hash (#acara, #rsvp, dll), paksa kembali ke hero
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  const forceToHero = ['#acara', '#rsvp', '#thanks', '#mempelai', '#home'];

  if (forceToHero.includes(hash)) {
    // Hapus hash dan paksa reload ulang ke hero
    history.replaceState(null, null, ' ');
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.getElementById('navbar').classList.remove('show');
  }
});
