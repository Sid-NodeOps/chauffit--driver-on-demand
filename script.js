// Chauffit — Interactive Script

document.addEventListener('DOMContentLoaded', function () {

  // ─── SCROLL ANIMATIONS ───
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(function (el) {
    observer.observe(el);
  });

  // ─── NAVBAR SCROLL EFFECT ───
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 1px 3px 0 rgba(0,0,0,0.04)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });

  // ─── MOBILE MENU ───
  var mobileMenu = document.getElementById('mobileMenu');

  window.toggleMobileMenu = function () {
    mobileMenu.classList.toggle('hidden');
  };

  window.closeMobileMenu = function () {
    mobileMenu.classList.add('hidden');
  };

  // ─── WAITLIST MODAL ───
  var waitlistModal = document.getElementById('waitlistModal');
  var waitlistFormWrap = document.getElementById('waitlistForm');
  var waitlistSuccess = document.getElementById('waitlistSuccess');

  window.openModal = function () {
    waitlistFormWrap.classList.remove('hidden');
    waitlistSuccess.classList.add('hidden');
    waitlistModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      var phoneInput = document.getElementById('phone');
      if (phoneInput) phoneInput.focus();
    }, 350);
  };

  window.closeModal = function () {
    waitlistModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.submitWaitlist = function (event) {
    event.preventDefault();
    var phone = document.getElementById('phone').value.trim();
    var city = document.getElementById('city').value.trim();
    var email = document.getElementById('email').value.trim();
    if (!phone || !city) return;

    var waitlistData = JSON.parse(localStorage.getItem('chauffit_waitlist') || '[]');
    waitlistData.push({
      phone: phone,
      city: city,
      email: email || null,
      timestamp: new Date().toISOString(),
      type: 'customer'
    });
    localStorage.setItem('chauffit_waitlist', JSON.stringify(waitlistData));

    waitlistFormWrap.classList.add('hidden');
    waitlistSuccess.classList.remove('hidden');
    event.target.reset();
  };

  // Backdrop click to close
  waitlistModal.addEventListener('click', function (e) {
    if (e.target === waitlistModal) window.closeModal();
  });

  // ─── DRIVER MODAL ───
  var driverModal = document.getElementById('driverModal');
  var driverFormWrap = document.getElementById('driverForm');
  var driverSuccess = document.getElementById('driverSuccess');

  window.openDriverModal = function () {
    driverFormWrap.classList.remove('hidden');
    driverSuccess.classList.add('hidden');
    driverModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      var driverPhone = document.getElementById('driverPhone');
      if (driverPhone) driverPhone.focus();
    }, 350);
  };

  window.closeDriverModal = function () {
    driverModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.submitDriverForm = function (event) {
    event.preventDefault();
    var phone = document.getElementById('driverPhone').value.trim();
    var city = document.getElementById('driverCity').value.trim();
    var checked = document.querySelector('input[name="driverType"]:checked');
    var type = checked ? checked.value : 'driver';
    if (!phone || !city) return;

    var driverData = JSON.parse(localStorage.getItem('chauffit_drivers') || '[]');
    driverData.push({
      phone: phone,
      city: city,
      type: type,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('chauffit_drivers', JSON.stringify(driverData));

    driverFormWrap.classList.add('hidden');
    driverSuccess.classList.remove('hidden');
    event.target.reset();
  };

  // Backdrop click to close
  driverModal.addEventListener('click', function (e) {
    if (e.target === driverModal) window.closeDriverModal();
  });

  // Escape key closes modals
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeModal();
      window.closeDriverModal();
    }
  });

  // ─── FAQ ACCORDION ───
  window.toggleFaq = function (button) {
    var faqItem = button.closest('.faq-item');
    var answer = faqItem.querySelector('.faq-answer');
    var chevron = faqItem.querySelector('.faq-chevron');
    var isOpen = !answer.classList.contains('hidden');

    if (isOpen) {
      answer.classList.add('hidden');
      chevron.style.transform = 'rotate(0deg)';
    } else {
      answer.classList.remove('hidden');
      chevron.style.transform = 'rotate(180deg)';
    }
  };

  // ─── DRIVER TYPE RADIO STYLING ───
  var radios = document.querySelectorAll('input[name="driverType"]');
  radios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      radios.forEach(function (r) {
        var label = r.closest('label');
        if (!label) return;
        if (r.checked) {
          label.classList.add('border-brand-500', 'bg-brand-50');
          label.classList.remove('border-surface-200');
        } else {
          label.classList.remove('border-brand-500', 'bg-brand-50');
          label.classList.add('border-surface-200');
        }
      });
    });
    // Init
    var label = radio.closest('label');
    if (label && radio.checked) {
      label.classList.add('border-brand-500', 'bg-brand-50');
      label.classList.remove('border-surface-200');
    }
  });

  // ─── SMOOTH SCROLL ───
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = 80;
        var pos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
      window.closeMobileMenu();
    });
  });

});