// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }

  // Initialize Typed.js
  if (typeof Typed !== 'undefined') {
    new Typed('.typing', {
      strings: [
        'web solutions',
        'mobile applications', 
        'digital experiences',
        'software that matters'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true
    });
  }

  // Initialize Particles.js
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#2563eb" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#2563eb",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        }
      },
      retina_detect: true
    });
  }

  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Header scroll effect
  const header = document.querySelector('.topbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // Active Navigation Link Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function highlightNavLink() {
    let scrollY = window.pageYOffset + 100;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to current link
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavLink);
  
  // Trigger on page load
  highlightNavLink();

  // Animate skill bars on scroll
  const skillLevels = document.querySelectorAll('.skill-level');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute('data-level');
        entry.target.style.width = level + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  skillLevels.forEach(skill => skillObserver.observe(skill));

  // Web3Forms Submission Handler
  const contactForm = document.getElementById('contactForm');
  const result = document.getElementById('result');
  const submitBtn = document.getElementById('submit-btn');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Disable submit button and show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      // Get form data
      const formData = new FormData(this);
      
      // Set redirect to thank you page (clean URL)
      formData.set('redirect', window.location.origin + '/thank-you');
      
      try {
        // Submit to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Redirect to thank you page
          window.location.href = '/thank-you';
        } else {
          // Show error message
          result.innerHTML = `
            <div class="error-message">
              <i class="fas fa-exclamation-circle"></i>
              <div>
                <h4>Error Sending Message</h4>
                <p>${data.message || 'Please try again later.'}</p>
              </div>
            </div>
          `;
          result.style.display = 'block';
          
          // Re-enable submit button
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
          }, 2000);
        }
      } catch (error) {
        // Network error
        result.innerHTML = `
          <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <div>
              <h4>Network Error</h4>
              <p>Unable to send message. Please check your connection and try again.</p>
            </div>
          </div>
        `;
        result.style.display = 'block';
        
        // Re-enable submit button
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        }, 2000);
      }
    });
  }

  // Add pulse animation to CTA button periodically
  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    setInterval(() => {
      ctaBtn.classList.add('pulse');
      setTimeout(() => {
        ctaBtn.classList.remove('pulse');
      }, 1000);
    }, 5000);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        // Update active nav link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        
        // Smooth scroll to section
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add hover effect to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Typing text animation for brand title
  const brandTitle = document.querySelector('.brand-title');
  if (brandTitle) {
    const titles = ['Software Developer', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'];
    let currentIndex = 0;
    
    function typeText(text, element, callback) {
      let i = 0;
      element.textContent = '';
      
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, 100);
        } else {
          setTimeout(callback, 2000);
        }
      }
      
      type();
    }
    
    function deleteText(element, callback) {
      let text = element.textContent;
      let i = text.length;
      
      function del() {
        if (i > 0) {
          element.textContent = text.substring(0, i - 1);
          i--;
          setTimeout(del, 50);
        } else {
          callback();
        }
      }
      
      del();
    }
    
    function cycleTitles() {
      typeText(titles[currentIndex], brandTitle, function() {
        setTimeout(function() {
          deleteText(brandTitle, function() {
            currentIndex = (currentIndex + 1) % titles.length;
            setTimeout(cycleTitles, 500);
          });
        }, 2000);
      });
    }
    
    // Start the typing animation
    setTimeout(cycleTitles, 1000);
  }
});

// Add CSS for no-scroll class
const style = document.createElement('style');
style.textContent = `
  body.no-scroll {
    overflow: hidden;
  }
  
  .pulse {
    animation: pulse-animation 1s infinite;
  }
  
  @keyframes pulse-animation {
    0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
    100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
  }
`;
document.head.appendChild(style);