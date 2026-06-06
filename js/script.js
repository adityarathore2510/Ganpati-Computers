/**
 * GANPATI COMPUTERS — PREMIUM INTERACTIONS & UTILITIES
 * Author: Senior Frontend Engineer
 * Handcrafted Vanilla ES6+ JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. PREMIUM HEADER SCROLL EFFECT ---
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Init on page load

  // --- 2. MOBILE NAVIGATION DRAWER & TOGGLE ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navBar     = document.querySelector('.nav-bar');
  const navLinks   = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navBar.classList.toggle('open');
    // Prevent body scroll when menu is open
    document.body.style.overflow = navBar.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navBar.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // --- 3. SOLUTIONS HUB TAB SYSTEM ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContentPanels = document.querySelectorAll('.tab-content-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update active button state
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show target panel, hide others
      tabContentPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // --- 4. SCROLL REVEAL ANIMATIONS (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(elem => {
    revealObserver.observe(elem);
  });

  // --- 5. STATS NUMBER COUNTER ANIMATION ---
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateCounter = (counterElem) => {
    const target = parseInt(counterElem.getAttribute('data-target'), 10);
    const suffix = counterElem.getAttribute('data-suffix') || '';
    const duration = 2000; // Animation duration in milliseconds
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const countInterval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * target);
      
      counterElem.innerHTML = currentValue + `<span>${suffix}</span>`;

      if (frame === totalFrames) {
        counterElem.innerHTML = target + `<span>${suffix}</span>`;
        clearInterval(countInterval);
      }
    }, frameRate);
  };

  const statsSection = document.querySelector('.stats-card');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(num => animateCounter(num));
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // --- 6. FAQ ACCORDION EXPAND/COLLAPSE ---
  const faqHeaders = document.querySelectorAll('.faq-header');
  
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.parentElement;
      const isActive = parentItem.classList.contains('active');

      // Close all FAQs first
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const body = item.querySelector('.faq-body');
        body.style.maxHeight = null;
      });

      // If clicked item wasn't active, open it
      if (!isActive) {
        parentItem.classList.add('active');
        const body = parentItem.querySelector('.faq-body');
        // Set max height dynamically for transition smoothness
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // --- 7. FLOATING BACK TO TOP CONTROL ---
  const toTopBtn = document.querySelector('.to-top-float');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      toTopBtn.classList.add('visible');
    } else {
      toTopBtn.classList.remove('visible');
    }
  });

  toTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- 8. CONTACT FORM VALIDATION & MOCK SUBMISSION ---
  const contactForm = document.getElementById('contactForm');
  const alertContainer = document.getElementById('formAlert');

  if (contactForm) {
    // Input elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');

    // Validation patterns
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[6-9]\d{9}$/; // Indian mobile numbers 10 digits

    const showError = (inputElem, message) => {
      const group = inputElem.parentElement;
      group.classList.add('error');
      group.classList.remove('success');
      const errSpan = group.querySelector('.error-message');
      if (errSpan) {
        errSpan.textContent = message;
      }
    };

    const showSuccess = (inputElem) => {
      const group = inputElem.parentElement;
      group.classList.add('success');
      group.classList.remove('error');
    };

    const validateInput = (inputElem) => {
      const val = inputElem.value.trim();

      // Check empty
      if (val === '') {
        showError(inputElem, 'This field is required.');
        return false;
      }

      // Check email
      if (inputElem === emailInput && !emailPattern.test(val)) {
        showError(inputElem, 'Please enter a valid email address.');
        return false;
      }

      // Check phone (optional validation style or strictly 10 digits)
      if (inputElem === phoneInput) {
        // Strip out non-digits to check
        const cleanPhone = val.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
          showError(inputElem, 'Please enter a valid 10-digit mobile number.');
          return false;
        }
      }

      showSuccess(inputElem);
      return true;
    };

    // Live validation on blur
    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
      input.addEventListener('blur', () => validateInput(input));
      input.addEventListener('input', () => {
        // Clear errors as user types
        const group = input.parentElement;
        if (group.classList.contains('error')) {
          group.classList.remove('error');
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      
      // Validate all fields
      [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
        if (!validateInput(input)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        alertContainer.className = 'form-alert alert-error';
        alertContainer.textContent = 'Please correct the highlighted errors before submitting.';
        return;
      }

      // Show Loading State
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Inquiry... <span class="spinner"></span>';

      // Mock sending service (2 seconds delay)
      setTimeout(() => {
        alertContainer.className = 'form-alert alert-success';
        alertContainer.textContent = `Thank you, ${nameInput.value}! Your inquiry has been sent successfully. An IT specialist will contact you within 2 hours.`;
        
        // Reset form
        contactForm.reset();
        document.querySelectorAll('.form-group').forEach(group => {
          group.classList.remove('success', 'error');
        });

        // Reset submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Auto hide success alert after 8 seconds
        setTimeout(() => {
          alertContainer.style.display = 'none';
        }, 8000);
      }, 1500);
    });
  }

  // --- 9. ACCESSIBLE ACTIVE NAV LINK TRACKING ON SCROLL ---
  const sections = document.querySelectorAll('section[id]');
  
  const trackNavScroll = () => {
    const scrollPos = window.scrollY + 100; // Offset for sticky nav
    
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  
  window.addEventListener('scroll', trackNavScroll);

  // --- 10. INTERACTIVE IT PLANNER CALCULATOR ---
  const calcUsers = document.getElementById('calc-users');
  const calcCameras = document.getElementById('calc-cameras');
  
  const resBandwidth = document.getElementById('res-bandwidth');
  const resAps = document.getElementById('res-aps');
  const resStorage = document.getElementById('res-storage');
  const resSla = document.getElementById('res-sla');

  if (calcUsers && calcCameras) {
    const updateCalculator = () => {
      const users = calcUsers.value;
      const cameras = calcCameras.value;

      let bandwidth = '50 Mbps';
      let aps = '1 Unit';
      let storage = '1 TB';
      let sla = 'Basic Support';

      // Bandwidth & AP calculations
      if (users === 'micro') {
        bandwidth = '50 Mbps';
        aps = '1 Unit';
      } else if (users === 'small') {
        bandwidth = '100 Mbps';
        aps = '1 - 2 Units';
      } else if (users === 'medium') {
        bandwidth = '200 Mbps';
        aps = '2 - 3 Units';
      } else if (users === 'large') {
        bandwidth = '500+ Mbps';
        aps = '4 - 6 Units';
      }

      // CCTV Storage calculations
      if (cameras === 'none') {
        storage = '0 TB';
      } else if (cameras === '4') {
        storage = '1 - 2 TB';
      } else if (cameras === '8') {
        storage = '2 - 4 TB';
      } else if (cameras === '16') {
        storage = '4 - 8 TB';
      } else if (cameras === '32') {
        storage = '8 - 12 TB';
      }

      // SLA Tier recommendations
      if (users === 'large' || cameras === '32') {
        sla = 'Enterprise AMC';
      } else if (users === 'medium' || cameras === '16') {
        sla = 'Standard AMC';
      } else {
        sla = 'Basic AMC';
      }

      // Update text in elements
      if (resBandwidth) resBandwidth.textContent = bandwidth;
      if (resAps) resAps.textContent = aps;
      if (resStorage) resStorage.textContent = storage;
      if (resSla) resSla.textContent = sla;
    };

    calcUsers.addEventListener('change', updateCalculator);
    calcCameras.addEventListener('change', updateCalculator);
    updateCalculator(); // Run once initially
  }
});
