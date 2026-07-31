// ============================================
// MERRYJAY EVENT PLACE - MODERN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== MOBILE MENU =====
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }

  // ===== BACK TO TOP BUTTON =====
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 400) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== SMOOTH SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navbarHeight = navbar ? navbar.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + 
                              window.pageYOffset - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // ===== ANIMATED COUNTERS =====
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function animateCounters() {
    statNumbers.forEach(function(stat) {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000;
      const step = Math.max(1, Math.floor(target / 60));
      let current = 0;
      
      const timer = setInterval(function() {
        current += step;
        if (current >= target) {
          stat.textContent = target + '+';
          clearInterval(timer);
        } else {
          stat.textContent = current;
        }
      }, duration / 60);
    });
  }

  // Start counters when hero is visible
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const heroObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          animateCounters();
        }
      });
    }, { threshold: 0.3 });
    heroObserver.observe(heroSection);
  }

  // ===== SCROLL ANIMATION =====
  const animateElements = document.querySelectorAll(
    '.card, .section-title, .section-sub, .gallery-item, .package-card, .contact-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry, index) {
        if (entry.isIntersecting) {
          setTimeout(function() {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 60);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  } else {
    // Fallback
    animateElements.forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }

  // ===== ROOM FILTER =====
  const filterSelect = document.getElementById('roomFilter');
  const roomCards = document.querySelectorAll('#roomGrid .card');

  if (filterSelect && roomCards.length) {
    filterSelect.addEventListener('change', function() {
      const value = this.value;
      
      roomCards.forEach(function(card) {
        const price = parseInt(card.getAttribute('data-price')) || 0;
        
        if (value === 'all') {
          card.style.display = 'block';
        } else if (value === 'low' && price < 30) {
          card.style.display = 'block';
        } else if (value === 'high' && price >= 35) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // ===== GALLERY FILTER =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(function(b) {
          b.classList.remove('active');
        });
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        galleryItems.forEach(function(item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            setTimeout(function() {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(function() {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ===== GALLERY LIGHTBOX =====
// ===== GALLERY LIGHTBOX (FIXED) =====
const galleryItemsLightbox = document.querySelectorAll('.gallery-item');

galleryItemsLightbox.forEach(function(item) {
  item.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event bubbling
    const img = this.querySelector('img');
    if (!img) return;

    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9998;
      padding: 30px;
      animation: fadeIn 0.3s ease;
      cursor: default;
    `;

    // Image container
    const imgContainer = document.createElement('div');
    imgContainer.style.cssText = `
      position: relative;
      max-width: 90%;
      max-height: 85vh;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: slideUp 0.4s ease;
    `;

    const imgClone = document.createElement('img');
    imgClone.src = img.src;
    imgClone.alt = img.alt || 'Gallery image';
    imgClone.style.cssText = `
      width: 100%;
      height: auto;
      max-height: 85vh;
      object-fit: contain;
      border-radius: 12px;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
    `;

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
      position: absolute;
      top: -50px;
      right: -10px;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(8px);
      border: 2px solid rgba(255, 255, 255, 0.2);
      color: white;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      font-size: 1.3rem;
      cursor: pointer;
      transition: 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'rotate(90deg)';
      this.style.background = 'rgba(201, 162, 39, 0.4)';
      this.style.borderColor = '#C9A227';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'rotate(0)';
      this.style.background = 'rgba(255, 255, 255, 0.15)';
      this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    });

    // Close function
    function closeLightbox() {
      if (lightbox && lightbox.parentNode) {
        lightbox.remove();
      }
    }

    // Close button click
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeLightbox();
    });

    // Click on background (outside image) to close
    lightbox.addEventListener('click', function(e) {
      if (e.target === this) {
        closeLightbox();
      }
    });

    // Escape key to close
    const escapeHandler = function(e) {
      if (e.key === 'Escape') {
        closeLightbox();
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);

    // Assemble
    imgContainer.appendChild(imgClone);
    imgContainer.appendChild(closeBtn);
    lightbox.appendChild(imgContainer);
    document.body.appendChild(lightbox);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Cleanup on close
    const cleanup = function() {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', escapeHandler);
    };

    // Override closeLightbox to include cleanup
    const originalClose = closeLightbox;
    closeLightbox = function() {
      cleanup();
      if (lightbox && lightbox.parentNode) {
        lightbox.remove();
      }
    };

    // Update event listeners to use new close function
    closeBtn.removeEventListener('click', closeBtn._listener);
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeLightbox();
    });
    
    lightbox.removeEventListener('click', lightbox._listener);
    lightbox.addEventListener('click', function(e) {
      if (e.target === this) {
        closeLightbox();
      }
    });
  });
});
  // ===== TESTIMONIALS SLIDER =====
  const testimonialSlider = document.getElementById('testimonialSlider');
  
  if (testimonialSlider) {
    const testimonials = [
      {
        stars: '★★★★★',
        text: '"Amazing hospitality! Everything was perfect from check-in to check-out. The staff went above and beyond to make our stay memorable."',
        author: 'Ayodeji Ogunleye',
        role: 'Wedding Guest'
      },
      {
        stars: '★★★★★',
        text: '"The best event venue we could have chosen. The hall was stunning, the food was delicious, and the service was impeccable. Highly recommend!"',
        author: 'Shobowale Balogun',
        role: 'Corporate Client'
      },
      {
        stars: '★★★★★',
        text: '"Luxurious rooms and fantastic service. The attention to detail in every aspect of our stay was remarkable. Will definitely come back."',
        author: 'Jessica Okonkwo',
        role: 'Vacation Guest'
      },
      {
        stars: '★★★★★',
        text: '"Our wedding was a dream come true. The team at MerryJay made sure everything was perfect. We couldn\'t have asked for a better venue."',
        author: 'Adenike & Philip Thompson',
        role: 'Happy Couple'
      }
    ];
    
    let currentTestimonial = 0;
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    function updateTestimonial(index) {
      const t = testimonials[index];
      testimonialSlider.querySelector('.testimonial-text').textContent = t.text;
      testimonialSlider.querySelector('.author').textContent = t.author;
      testimonialSlider.querySelector('.author-role').textContent = t.role;
      
      // Update dots
      dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === index);
      });
    }
    
    // Dot click
    dots.forEach(function(dot, index) {
      dot.addEventListener('click', function() {
        currentTestimonial = index;
        updateTestimonial(currentTestimonial);
      });
    });
    
    // Auto-rotate every 6 seconds
    setInterval(function() {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonial(currentTestimonial);
    }, 6000);
  }

  // ===== BOOKING FORM =====
  const bookingForm = document.getElementById('bookingForm');
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = this.querySelectorAll('[required]');
      
      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#e74c3c';
          field.style.boxShadow = '0 0 0 4px rgba(231,76,60,0.15)';
        } else {
          field.style.borderColor = '';
          field.style.boxShadow = '';
        }
      });
      
      // Email validation
      const emailField = this.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
          isValid = false;
          emailField.style.borderColor = '#e74c3c';
          emailField.style.boxShadow = '0 0 0 4px rgba(231,76,60,0.15)';
        }
      }
      
      if (isValid) {
        showSuccessPopup(
          'Booking Request Sent Successfully!',
          "We'll contact you shortly to confirm your reservation."
        );
        this.reset();
        
        // Reset all field styles
        this.querySelectorAll('input, textarea, select').forEach(function(f) {
          f.style.borderColor = '';
          f.style.boxShadow = '';
        });
      } else {
        showError('Please fill in all required fields correctly.', this);
      }
    });
    
    // Clear error styling on input
    bookingForm.querySelectorAll('input, textarea, select').forEach(function(field) {
      field.addEventListener('input', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
        const errorMsg = bookingForm.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
      });
    });
  }

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = this.querySelectorAll('[required]');
      
      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#e74c3c';
          field.style.boxShadow = '0 0 0 4px rgba(231,76,60,0.15)';
        } else {
          field.style.borderColor = '';
          field.style.boxShadow = '';
        }
      });
      
      // Email validation
      const emailField = this.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
          isValid = false;
          emailField.style.borderColor = '#e74c3c';
          emailField.style.boxShadow = '0 0 0 4px rgba(231,76,60,0.15)';
        }
      }
      
      if (isValid) {
        showSuccessPopup(
          'Message Sent Successfully!',
          'Thank you for reaching out. We\'ll get back to you within 24 hours.'
        );
        this.reset();
        
        this.querySelectorAll('input, textarea').forEach(function(f) {
          f.style.borderColor = '';
          f.style.boxShadow = '';
        });
      } else {
        showError('Please fill in all required fields correctly.', this);
      }
    });
    
    contactForm.querySelectorAll('input, textarea').forEach(function(field) {
      field.addEventListener('input', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
        const errorMsg = contactForm.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
      });
    });
  }

  // ===== NEWSLETTER SUBSCRIPTION =====
  const newsletterInput = document.querySelector('.newsletter input');
  const newsletterBtn = document.querySelector('.newsletter .btn');

  if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const email = newsletterInput.value.trim();
      
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showSuccessPopup(
          'Subscribed Successfully!',
          'You\'ll receive our latest offers and updates.'
        );
        newsletterInput.value = '';
      } else {
        newsletterInput.style.border = '2px solid #e74c3c';
        newsletterInput.style.boxShadow = '0 0 0 4px rgba(231,76,60,0.15)';
        setTimeout(function() {
          newsletterInput.style.border = '';
          newsletterInput.style.boxShadow = '';
        }, 3000);
      }
    });
    
    newsletterInput.addEventListener('input', function() {
      this.style.border = '';
      this.style.boxShadow = '';
    });
  }

  // ===== SUCCESS POPUP FUNCTION =====
  function showSuccessPopup(title, message) {
    // Remove existing popup
    const existingPopup = document.querySelector('.success-popup-overlay');
    if (existingPopup) existingPopup.remove();
    
    const overlay = document.createElement('div');
    overlay.className = 'success-popup-overlay';
    
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = `
      <div class="checkmark"><i class="fas fa-check-circle"></i></div>
      <h3>${title}</h3>
      <p>${message}</p>
      <button class="btn btn-gold" onclick="this.closest('.success-popup-overlay').remove()">
        Got It
      </button>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
      if (e.target === this) this.remove();
    });
    
    // Close with Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const overlayEl = document.querySelector('.success-popup-overlay');
        if (overlayEl) overlayEl.remove();
      }
    });
  }

  // ===== ERROR MESSAGE FUNCTION =====
  function showError(message, form) {
    let errorMsg = form.querySelector('.error-message');
    if (!errorMsg) {
      errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      form.appendChild(errorMsg);
    }
    
    errorMsg.style.cssText = `
      color: #e74c3c;
      font-weight: 600;
      margin-top: 12px;
      padding: 12px 16px;
      background: #fde8e8;
      border-radius: 10px;
      border-left: 4px solid #e74c3c;
    `;
    errorMsg.textContent = '⚠️ ' + message;
    
    setTimeout(function() {
      if (errorMsg.parentNode) errorMsg.remove();
    }, 5000);
  }

  // ===== WHATSAPP FLOATING BUTTON =====
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function(e) {
      // You can customize the WhatsApp message
      const message = encodeURIComponent('Hello! I would like to inquire about booking at MerryJay Event Place.');
      this.href = 'https://wa.me/2347049056270?text=' + message;
    });
  }

  // ===== INJECT KEYFRAMES (if not already in CSS) =====
  const existingStyle = document.querySelector('style[data-dynamic]');
  if (!existingStyle) {
    const styleSheet = document.createElement('style');
    styleSheet.setAttribute('data-dynamic', 'true');
    styleSheet.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(40px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .lightbox {
        animation: fadeIn 0.3s ease;
      }
      .lightbox img {
        animation: slideUp 0.4s ease;
      }
    `;
    document.head.appendChild(styleSheet);
  }

 
});

// ===== HERO IMAGE SLIDER =====
document.addEventListener('DOMContentLoaded', function() {
  
  const slides = document.querySelectorAll('.hero-slide-img');
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');
  const dotsContainer = document.getElementById('slideDots');
  let currentSlide = 0;
  let slideInterval;

  // Create dots
  if (dotsContainer && slides.length > 0) {
    dotsContainer.innerHTML = '';
    slides.forEach(function(_, index) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (index === 0 ? ' active' : '');
      dot.setAttribute('data-index', index);
      dot.addEventListener('click', function() {
        stopSlider();
        goToSlide(parseInt(this.getAttribute('data-index')));
        startSlider();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = document.querySelectorAll('.slide-dots .dot');

  // Go to slide
  function goToSlide(index) {
    slides.forEach(function(slide) {
      slide.classList.remove('active');
    });
    dots.forEach(function(dot) {
      dot.classList.remove('active');
    });
    
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }
  }

  // Next/Prev
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Auto-play
  function startSlider() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopSlider() {
    clearInterval(slideInterval);
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      stopSlider();
      prevSlide();
      startSlider();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      stopSlider();
      nextSlide();
      startSlider();
    });
  }

  // Pause on hover
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    heroImage.addEventListener('mouseenter', stopSlider);
    heroImage.addEventListener('mouseleave', startSlider);
  }

  // Start the slider
  if (slides.length > 0) {
    slides.forEach(function(slide, index) {
      if (index === 0) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    startSlider();
  }

  
});

// ===== ABOUT IMAGE - SMOOTH CARD SWAP =====
document.addEventListener('DOMContentLoaded', function() {
  
  const aboutCards = document.querySelectorAll('.about-stack-img');
  let currentCardIndex = 0;
  let cardInterval;

  if (aboutCards.length > 1) {
    // Set initial state
    aboutCards.forEach(function(card, index) {
      if (index === 0) {
        card.classList.add('active');
      } else if (index === 1) {
        card.classList.add('next');
      } else if (index === aboutCards.length - 1) {
        card.classList.add('prev');
      }
    });

    // Smooth swap function
    function smoothSwap() {
      const currentCard = aboutCards[currentCardIndex];
      const nextIndex = (currentCardIndex + 1) % aboutCards.length;
      const nextCard = aboutCards[nextIndex];
      const prevIndex = (currentCardIndex - 1 + aboutCards.length) % aboutCards.length;
      const prevCard = aboutCards[prevIndex];

      // Current card fades out
      currentCard.classList.remove('active');
      currentCard.classList.add('prev');

      // Next card fades in
      nextCard.classList.remove('next');
      nextCard.classList.add('active');

      // Update the rest
      aboutCards.forEach(function(card, index) {
        if (index !== nextIndex && index !== currentCardIndex) {
          card.classList.remove('prev', 'next', 'active');
          if (index === (nextIndex + 1) % aboutCards.length) {
            card.classList.add('next');
          } else if (index === (currentCardIndex - 1 + aboutCards.length) % aboutCards.length) {
            card.classList.add('prev');
          }
        }
      });

      currentCardIndex = nextIndex;
    }

    // Start auto-swap every 4.5 seconds
    cardInterval = setInterval(smoothSwap, 4500);

    // Pause on hover
    const aboutStack = document.querySelector('.about-image-stack');
    if (aboutStack) {
      aboutStack.addEventListener('mouseenter', function() {
        clearInterval(cardInterval);
      });
      aboutStack.addEventListener('mouseleave', function() {
        cardInterval = setInterval(smoothSwap, 4500);
      });
    }

      }
});

// ===== VIDEO SHOWCASE INTERACTION =====
document.addEventListener('DOMContentLoaded', function() {
  const videoContainer = document.querySelector('.video-container');
  const video = videoContainer ? videoContainer.querySelector('video') : null;
  const playOverlay = videoContainer ? videoContainer.querySelector('.video-play-overlay') : null;

  if (videoContainer && video) {
    // Play/Pause on container click
    videoContainer.addEventListener('click', function(e) {
      // Don't toggle if clicking on video controls
      if (e.target.tagName === 'VIDEO') return;
      
      if (video.paused) {
        video.play();
        videoContainer.classList.add('playing');
        videoContainer.classList.remove('loading');
      } else {
        video.pause();
        videoContainer.classList.remove('playing');
      }
    });

    // Show loading state
    video.addEventListener('loadstart', function() {
      videoContainer.classList.add('loading');
    });

    video.addEventListener('canplay', function() {
      videoContainer.classList.remove('loading');
    });

    // Remove overlay when video starts playing
    video.addEventListener('play', function() {
      videoContainer.classList.add('playing');
    });

    video.addEventListener('pause', function() {
      videoContainer.classList.remove('playing');
    });

    // Handle video ended
    video.addEventListener('ended', function() {
      videoContainer.classList.remove('playing');
      // Optional: Reset to beginning
      video.currentTime = 0;
    });

    // Autoplay on mobile - only if user has interacted with the page
    // This is a fallback for when autoplay is blocked
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            // Video is visible, but don't autoplay - let user click
            // We just preload the video
            video.preload = 'metadata';
          }
        });
      }, { threshold: 0.1 });
      observer.observe(videoContainer);
    }
  }
});