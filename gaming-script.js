document.addEventListener('DOMContentLoaded', function() {
  // Get the navbar element
  const navbar = document.querySelector('.navbar');
  
  // Initial scroll position check
  checkScroll();
  
  // Listen for scroll events
  window.addEventListener('scroll', checkScroll);
  
  function checkScroll() {
    // Add 'scrolled' class when page is scrolled more than 50px
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});


document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  // Initial scroll position check
  checkScroll();
  
  // Listen for scroll events
  window.addEventListener('scroll', checkScroll);
  
  function checkScroll() {
    // Add 'scrolled' class when page is scrolled more than 50px
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Text reveal on scroll effect
  const scrollText = document.querySelector('.scroll-reveal-text');
    
  if (!scrollText) return;
  
  // Split text into words and wrap each in a span
  const words = scrollText.textContent.split(' ');
  scrollText.innerHTML = words.map((word, index) => 
      `<span class="reveal-word" data-index="${index}">${word}</span>`
  ).join(' ');
  
  const wordElements = document.querySelectorAll('.reveal-word');
  const wordCount = wordElements.length;
  
  // Set initial color for first word white, rest gray
  wordElements.forEach((word, index) => {
      word.style.color = index === 0 ? '#FFFFFF' : '#777777';
      word.style.transition = 'color 0.3s ease';
  });
  
  // Keep track of which words have been turned white
  const activatedWords = new Array(wordCount).fill(false);
  activatedWords[0] = true; 
  
  // Track last scroll position to determine direction
  let lastScrollTop = 0;
  let revealStartPoint = 0;
  let revealEndPoint = 0;
  
  // Set up the positions
  function setupPositions() {
      const rect = scrollText.getBoundingClientRect();
      revealStartPoint = window.scrollY + rect.top - window.innerHeight;
      revealEndPoint = window.scrollY + rect.bottom - window.innerHeight/2;
  }
  

  setupPositions();
  
  // Function to interpolate between colors
  function interpolateColor(startColor, endColor, factor) {
      const r1 = parseInt(startColor.substring(1, 3), 16);
      const g1 = parseInt(startColor.substring(3, 5), 16);
      const b1 = parseInt(startColor.substring(5, 7), 16);
      
      const r2 = parseInt(endColor.substring(1, 3), 16);
      const g2 = parseInt(endColor.substring(3, 5), 16);
      const b2 = parseInt(endColor.substring(5, 7), 16);
      
      const r = Math.round(r1 + factor * (r2 - r1));
      const g = Math.round(g1 + factor * (g2 - g1));
      const b = Math.round(b1 + factor * (b2 - b1));
      
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  // Update on scroll
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const isScrollingDown = scrollY > lastScrollTop;
    const isScrollingUp = scrollY < lastScrollTop;
    lastScrollTop = scrollY;
    
    // Calculate progress through the reveal zone (0 to 1)
    const totalRevealDistance = revealEndPoint - revealStartPoint;
    // Add a slowdown factor (0.6) to reduce the speed - lower = slower
    const slowdownFactor = 0.9; 
    const currentProgress = (scrollY - revealStartPoint) / (totalRevealDistance / slowdownFactor);
    
    // Number of words to color based on scroll progress
    const wordsToColor = Math.floor(currentProgress * wordCount);
    
    wordElements.forEach((word, index) => {
        if (isScrollingDown || !isScrollingUp) {
            // When scrolling down or not actively scrolling
            
            // Words that should be fully white
            if (index < wordsToColor) {
                word.style.color = '#FFFFFF';
                activatedWords[index] = true;
            }
            // Word that is currently transitioning
            else if (index === wordsToColor) {
                const partialFactor = (currentProgress * wordCount) - Math.floor(currentProgress * wordCount);
                word.style.color = interpolateColor('#393939ff', '#FFFFFF', partialFactor);
                if (partialFactor > 0.9) activatedWords[index] = true;
            }
            // Words that should be white because they were activated before
            else if (activatedWords[index]) {
                word.style.color = '#FFFFFF';
            }
            // Words that haven't been activated yet
            else {
                word.style.color = '#393939ff';
            }
        } else {
            // When scrolling up, allow colors to revert
            if (index < wordsToColor) {
                word.style.color = '#FFFFFF';
            } else if (index === wordsToColor) {
                const partialFactor = (currentProgress * wordCount) - Math.floor(currentProgress * wordCount);
                word.style.color = interpolateColor('#393939ff', '#FFFFFF', partialFactor);
            } else {
                word.style.color = '#393939ff';
                activatedWords[index] = false;
            }
        }
    });
});
  
  // Handle window resize
  window.addEventListener('resize', setupPositions);
  
  // Trigger initial calculation
  window.dispatchEvent(new Event('scroll'));
});




// Initialize text carousel
document.addEventListener('DOMContentLoaded', function() {

      const carouselImages = [
    'assets/all-you-need-1.png',
    'assets/all-you-need-2.png', 
    'assets/all-you-need-3.png'
  ];
  const carouselImage = document.getElementById('carouselImage');
  // Initialize text carousel
  const textCarousel = document.getElementById('textCarousel');
    if (textCarousel && carouselImage) {
    // Listen for slide events
    textCarousel.addEventListener('slide.bs.carousel', function(event) {
      // Get the index of the next slide
      const nextSlideIndex = event.to;
      
      // Change image with animation
      carouselImage.classList.add('fade-out');
      
      setTimeout(() => {
        // Update image source
        carouselImage.src = carouselImages[nextSlideIndex];
        carouselImage.classList.remove('fade-out');
        carouselImage.classList.add('fade-in');
        
        setTimeout(() => {
          carouselImage.classList.remove('fade-in');
        }, 400);
      }, 300);
    });
  }
  
  // Initialize existing carousel code...
  const carousel = new bootstrap.Carousel(textCarousel, {
    interval: 5000,
    wrap: true
  });
  if (textCarousel) {
    const carousel = new bootstrap.Carousel(textCarousel, {
      interval: 5000,
      wrap: true
    });
    
    // Add click event listeners to buttons if needed
    const prevButton = document.querySelector('[data-bs-target="#textCarousel"][data-bs-slide="prev"]');
    const nextButton = document.querySelector('[data-bs-target="#textCarousel"][data-bs-slide="next"]');
    
    if (prevButton) {
      prevButton.addEventListener('click', function() {
        carousel.prev();
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', function() {
        carousel.next();
      });
    }
    
    // Handle indicator updates when carousel slides
    textCarousel.addEventListener('slid.bs.carousel', function(event) {
      // Get the active slide index
      const activeSlideIndex = event.to;
      
      // Update custom indicators
      const indicators = document.querySelectorAll('.carousel-indicators-custom button');
      indicators.forEach((indicator, index) => {
        // Remove active class from all indicators
        indicator.classList.remove('active');
        indicator.removeAttribute('aria-current');
        
        // Add active class to current indicator
        if (index === activeSlideIndex) {
          indicator.classList.add('active');
          indicator.setAttribute('aria-current', 'true');
        }
      });
    });
    
    // Also make indicators clickable
    const indicators = document.querySelectorAll('.carousel-indicators-custom button');
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
        carousel.to(index);
      });
    });
  }
  
  // Initialize main carousel
  const customCarousel = document.getElementById('customCarousel');
  if (customCarousel) {
    const mainCarousel = new bootstrap.Carousel(customCarousel, {
      interval: 5000,
      wrap: true
    });
  }
});


// Client carousel scrolling
document.addEventListener('DOMContentLoaded', function() {
    const clientsRow = document.getElementById('clientsRow');
    
    // Check if elements exist to avoid errors
    if (!clientsRow) return;
    
    const prevButton = document.querySelector('.col-md-5 .custom-carousel-btn:first-child');
    const nextButton = document.querySelector('.col-md-5 .custom-carousel-btn:last-child');
    
    if (!prevButton || !nextButton) return;
    
    let currentPosition = 0;
    
    // Initial state
    clientsRow.style.transform = `translateX(0)`;
    
    function updateCarousel() {
        // Get current device type
        const isMobile = window.innerWidth < 768;
        
        // Fixed calculation for max position
        const maxPosition = isMobile ? 3 : 1;
        
        // Ensure position is within bounds
        if (currentPosition > maxPosition) currentPosition = maxPosition;
        if (currentPosition < 0) currentPosition = 0;
        
        // Calculate slide width based on device type
        const slideWidth = isMobile ? 25 : 25; 
        
        // Apply transform
        const translateValue = -currentPosition * slideWidth;
        clientsRow.style.transition = 'transform 0.5s ease';
        clientsRow.style.transform = `translateX(${translateValue}%)`;
        
        // Update button states visually
        prevButton.classList.toggle('carousel-btn-disabled', currentPosition === 0);
        nextButton.classList.toggle('carousel-btn-disabled', currentPosition === maxPosition);
    }
    
    // Add event listeners
    prevButton.addEventListener('click', function() {
        currentPosition = Math.max(0, currentPosition - 1);
        updateCarousel();
    });
    
    nextButton.addEventListener('click', function() {
        const isMobile = window.innerWidth < 768;
        const maxPosition = isMobile ? 3 : 1;
        
        currentPosition = Math.min(maxPosition, currentPosition + 1);
        updateCarousel();
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Reset position to valid value when switching between mobile and desktop
        updateCarousel();
    });
    
    // Initialize
    updateCarousel();
});




// Stacked cards functionality - RESPONSIVE
document.addEventListener('DOMContentLoaded', function() {
  const cardsWrapper = document.querySelector('.stacked-cards-wrapper');
  const cards = document.querySelectorAll('.insight-card');
  const progressLineFill = document.querySelector('.progress-line-fill');
  const segmentMarkers = document.querySelectorAll('.segment-marker');
  let currentIndex = 0;
  let isAnimating = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const cardCount = cards.length;
    const insightImages = [
    'assets/gamer-5.png',
    'assets/gamer-2.png',
    'assets/gamer-3.png',
    'assets/gamer-4.png',
    'assets/gamer-1.png',
    'assets/gamer-6.png',
    'assets/gamer-7.png',
    'assets/gamer-8.png'
  ];
  
  if (!cardsWrapper || !cards.length) return;
  
  // Detect if mobile device
  const isMobile = () => window.innerWidth < 768;
  
  // Update progress indicator (line or bar)
  function updateProgress() {
    const minProgress = 5;
    const remainingProgress = 95;
    
    let progressPercentage;
    
    // If we're on the last card, force 100%
    if (currentIndex === cardCount - 1) {
      progressPercentage = 100;
    } else {
      progressPercentage = minProgress + (currentIndex / (cardCount - 1)) * remainingProgress;
    }
    
    // Update vertical or horizontal fill based on device
    if (isMobile()) {
      progressLineFill.style.width = `${progressPercentage}%`;
      progressLineFill.style.height = '4px'; // Ensure height is set for mobile
    } else {
      progressLineFill.style.height = `${progressPercentage}%`;
      progressLineFill.style.width = '4px'; // Ensure width is set for desktop
    }
  }
  
  // Initialize card positions
  function initializeCards() {
    cards.forEach((card, index) => {
      const position = (index - currentIndex + cardCount) % cardCount;
      card.setAttribute('data-index', position);
      
      // All content should be loaded and ready, just controlled by opacity
      if (position === 0) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
    
    // Initialize progress
    updateProgress();
  }

  const prevImage = document.querySelector('.prev-image img');
  const currentImage = document.querySelector('.current-image img');
  const nextImage = document.querySelector('.next-image img');
  
  // Initialize images
  function updateImages() {
    if (!prevImage || !currentImage || !nextImage) return;
    
    // Calculate indices with wrapping
    const prevIndex = (currentIndex - 1 + cardCount) % cardCount;
    const nextIndex = (currentIndex + 1) % cardCount;
    
    // Update image sources
    prevImage.src = insightImages[prevIndex];
    currentImage.src = insightImages[currentIndex];
    nextImage.src = insightImages[nextIndex];
    
  // Add animation effects
  prevImage.style.animation = 'none';
  currentImage.style.animation = 'none';
  nextImage.style.animation = 'none';
  
  // Force browser to recognize animation restart
  setTimeout(() => {
    currentImage.style.animation = 'fadeIn 0.6s forwards';
  }, 10);
  }
  
  // Call once to set up initial images
  updateImages();
  
  // Update the transitionCards function to also update images
  const originalTransitionCards = transitionCards;
  transitionCards = function(direction) {
    originalTransitionCards(direction);
    updateImages();
  };
  
  // Call once to set up initial state
  initializeCards();
  
  // Function to handle card transition
  function transitionCards(direction) {
    if (isAnimating) return;
    isAnimating = true;
    
    // Calculate new index based on direction
    if (direction === 'next') {
      currentIndex = (currentIndex + 1) % cardCount;
    } else {
      currentIndex = (currentIndex - 1 + cardCount) % cardCount;
    }
    
    // Update all cards with new positions
    cards.forEach((card, index) => {
      const newPosition = (index - currentIndex + cardCount) % cardCount;
      
      // Remove active class from all cards first
      card.classList.remove('active');
      
      // Set the new data attribute which will trigger the CSS transitions
      card.setAttribute('data-index', newPosition);
      
      // Add active class to the new top card
      if (newPosition === 0) {
        card.classList.add('active');
      }
    });
    
    // Update progress indicator
    updateProgress();
    
    // Reset animation lock after transition completes
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
  
  // Wheel event handling for desktop
  let wheelTimeout;
  cardsWrapper.addEventListener('wheel', function(event) {
    // Only use wheel events on desktop
    if (isMobile()) return;
    
    event.preventDefault();
    
    // Clear any existing timeout to prevent stacking
    clearTimeout(wheelTimeout);
    
    // Only proceed if not currently animating
    if (isAnimating) return;
    
    // Use a shorter timeout for more responsive scrolling
    wheelTimeout = setTimeout(() => {
      if (event.deltaY > 20) {
        transitionCards('next');
      } else if (event.deltaY < -20) {
        transitionCards('prev');
      }
    }, 10); 
  }, { passive: false });
  
  // Touch support with different behavior for mobile vs desktop
  cardsWrapper.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  cardsWrapper.addEventListener('touchend', function(e) {
    if (isAnimating) return;
    
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    
    const touchDistanceX = touchStartX - touchEndX;
    const touchDistanceY = touchStartY - touchEndY;
    const minSwipeDistance = 30;
    
    if (isMobile()) {
      if (Math.abs(touchDistanceX) >= minSwipeDistance && 
          Math.abs(touchDistanceX) > Math.abs(touchDistanceY)) {
        if (touchDistanceX > 0) {
          transitionCards('next'); 
        } else {
          transitionCards('prev'); 
        }
      }
    } else {
      if (Math.abs(touchDistanceY) >= minSwipeDistance && 
          Math.abs(touchDistanceY) > Math.abs(touchDistanceX)) {
        if (touchDistanceY > 0) {
          transitionCards('next'); 
        } else {
          transitionCards('prev'); 
        }
      }
    }
  }, { passive: true });
  

  segmentMarkers.forEach((marker, index) => {
    marker.addEventListener('click', function() {
      if (isAnimating || index === currentIndex) return;

      const direction = index > currentIndex ? 'next' : 'prev';
      
      const targetIndex = index;
      
      if (Math.abs(targetIndex - currentIndex) > 1) {
        let stepsToTake = Math.abs(targetIndex - currentIndex);
        let stepsCounter = 0;
        
        const animateSteps = setInterval(() => {
          transitionCards(direction);
          stepsCounter++;
          
          if (stepsCounter >= stepsToTake) {
            clearInterval(animateSteps);
          }
        }, 300);
      } else {
        transitionCards(direction);
      }
    });
  });
  

  let scrollPosition = 0;
  let isScrollDisabled = false;
  
  function preventScroll() {
    if (isScrollDisabled) {
      window.scrollTo(0, scrollPosition);
    }
  }
  

  cardsWrapper.addEventListener('mouseenter', function() {
    if (!isMobile()) {
      scrollPosition = window.pageYOffset;
      isScrollDisabled = true;
      window.addEventListener('scroll', preventScroll);
    }
  });
  
  cardsWrapper.addEventListener('mouseleave', function() {
    if (!isMobile()) {
      isScrollDisabled = false;
      window.removeEventListener('scroll', preventScroll);
    }
  });
  

  window.addEventListener('resize', function() {
    updateProgress(); 
    initializeCards();
  });


});


// hide qr on scroll and visible when on top of the screen
document.addEventListener('DOMContentLoaded', function() {
  const qrContainer = document.querySelector('.qr-bottom-right');
  if (!qrContainer) return;
  checkQrVisibility();  
  window.addEventListener('scroll', checkQrVisibility);  
  function checkQrVisibility() {
    if (window.scrollY <= 100) {
      qrContainer.classList.remove('qr-hidden');
    } else {
      qrContainer.classList.add('qr-hidden');
    }
  }
});


// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqToggle = document.getElementById('faqToggle');
  const faqContainer = document.getElementById('faqContainer');
  const faqChevron = document.querySelector('.faq-chevron');
  
  if (faqToggle && faqContainer && faqChevron) {
    faqToggle.addEventListener('click', function() {
      faqContainer.classList.toggle('active');
      faqChevron.classList.toggle('active');
      
    });
  }
});





// Toggle overlay menu
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const togglerIcon = document.querySelector('.navbar-toggler-icon');
  const overlayMenu = document.querySelector('.overlay-menu');
  const body = document.body;
  const closeIcon = document.querySelector('.navbar-toggler .close-icon');
  
  if (!navbarToggler || !overlayMenu || !togglerIcon) return;
  
  // Remove the data-bs-toggle and data-bs-target attributes to prevent Bootstrap's default behavior
  navbarToggler.removeAttribute('data-bs-toggle');
  navbarToggler.removeAttribute('data-bs-target');
  
  // Only trigger when clicking the hamburger icon, not the entire button
  togglerIcon.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event from bubbling up to parent elements
            // Check if any overlay is open
    const activeOverlay = document.querySelector('.client-overlay.active');
    if (activeOverlay) {
      // Close the overlay
      activeOverlay.classList.remove('active');
      body.classList.remove('overlay-active');
      // Open the menu
      navbarToggler.classList.add('active');
      overlayMenu.classList.add('active');
      body.style.overflow = 'hidden';
      return;
    }

    // Default menu toggle
    navbarToggler.classList.toggle('active');
    overlayMenu.classList.toggle('active');
    if (overlayMenu.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
    
    // Prevent scrolling when overlay is active
    if (overlayMenu.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });
  
  // Add click handler for the close icon
  if (closeIcon) {
    closeIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      navbarToggler.classList.remove('active');
      overlayMenu.classList.remove('active');
      body.style.overflow = '';
    });
  }
  
  // Prevent the overlay from opening when clicking on other parts of the button
  navbarToggler.addEventListener('click', function(e) {
    if (e.target !== togglerIcon && !togglerIcon.contains(e.target) && 
        e.target !== closeIcon && !closeIcon.contains(e.target)) {
      // Do nothing when clicking on other parts of the button
      e.preventDefault();
      e.stopPropagation();
    }
  });
  
  // Close overlay when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInside = overlayMenu.contains(event.target) || togglerIcon.contains(event.target);
    
    if (!isClickInside && overlayMenu.classList.contains('active')) {
      navbarToggler.classList.remove('active');
      overlayMenu.classList.remove('active');
      body.style.overflow = '';
    }
  });
  
  // Handle escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && overlayMenu.classList.contains('active')) {
      navbarToggler.classList.remove('active');
      overlayMenu.classList.remove('active');
      body.style.overflow = '';
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const overlayContactLink = document.getElementById('overlay-contact-link');
  const overlayMenu = document.querySelector('.overlay-menu');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const body = document.body;

  if (overlayContactLink && overlayMenu) {
    overlayContactLink.addEventListener('click', function() {
      overlayMenu.classList.remove('active');
      if (navbarToggler) navbarToggler.classList.remove('active');
      body.style.overflow = '';
      // Let the anchor scroll happen naturally
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const footerOurWorksLink = document.getElementById('footer-our-works-link');
  const clientOverlay = document.getElementById('spicy-studios-overlay'); 
  const body = document.body;

  if (footerOurWorksLink && clientOverlay) {
    footerOurWorksLink.addEventListener('click', function(e) {
      e.preventDefault();
      clientOverlay.classList.add('active');
      body.classList.add('overlay-active');
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const footerClientsLink = document.getElementById('footer-clients-link');
  const learnMoreOverlay = document.getElementById('learn-more-overlay');
  const body = document.body;

  if (footerClientsLink && learnMoreOverlay) {
    footerClientsLink.addEventListener('click', function(e) {
      e.preventDefault();
      learnMoreOverlay.classList.add('active');
      body.classList.add('overlay-active');
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const servicesFeatureBox = Array.from(document.querySelectorAll('.overlay-menu .feature-box')).find(box => {
    const heading = box.querySelector('h3');
    return heading && heading.textContent.trim() === 'Services';
  });

  const overlayMenu = document.querySelector('.overlay-menu');
  const body = document.body;
  const navbarToggler = document.querySelector('.navbar-toggler');
  const ourServicesSection = document.getElementById('our-services');

  if (servicesFeatureBox && overlayMenu && ourServicesSection) {
    servicesFeatureBox.style.cursor = 'pointer';
    servicesFeatureBox.addEventListener('click', function() {
      overlayMenu.classList.remove('active');
      if (navbarToggler) navbarToggler.classList.remove('active');
      body.style.overflow = '';
      setTimeout(() => {
        ourServicesSection.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    });
  }
});



// Client overlay functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get client boxes
    const clientBoxes = document.querySelectorAll('.client-box');
    const body = document.body;
    
    // Map client names to overlay IDs
    const clientOverlayMap = {
        'Spicy Studios': 'spicy-studios-overlay',
        'Brew Beans': 'brew-beans-overlay',
        'Pure Chips Studio': 'pure-chips-studio-overlay',
        'On the Go': 'on-the-go-overlay'
    };
    
    // Add click event to each client box
    clientBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // Get client name
            const clientName = this.querySelector('h4').textContent;
            const overlayId = clientOverlayMap[clientName];
            
            if (overlayId) {
                // Show overlay
                const overlay = document.getElementById(overlayId);
                overlay.classList.add('active');
                body.classList.add('overlay-active');
            }
        });
    });
    
    // Handle close button clicks
    const closeButtons = document.querySelectorAll('.close-overlay-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const overlay = this.closest('.client-overlay');
            overlay.classList.remove('active');
            body.classList.remove('overlay-active');
        });
    });
    
    // Close overlay when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const activeOverlay = document.querySelector('.client-overlay.active');
            if (activeOverlay) {
                activeOverlay.classList.remove('active');
                body.classList.remove('overlay-active');
            }
        }
    });
    
    // Close overlay when clicking outside the detail box
    const overlays = document.querySelectorAll('.client-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            if (event.target === overlay) {
                overlay.classList.remove('active');
                body.classList.remove('overlay-active');
            }
        });
    });
});





// Learn More button overlay functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the learn more button using its ID
    const learnMoreButton = document.getElementById('clientsLearnMoreBtn');
    const learnMoreOverlay = document.getElementById('learn-more-overlay');
    const body = document.body;
    
    if (learnMoreButton && learnMoreOverlay) {
        // Add click event to the learn more button
        learnMoreButton.addEventListener('click', function() {
            learnMoreOverlay.classList.add('active');
            body.classList.add('overlay-active');
        });
    }
});


// Client Icons Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.querySelector('.client-icons-carousel .next-btn');
    const prevBtn = document.querySelector('.client-icons-carousel .prev-btn');
    const carousel = document.querySelector('.client-icons-carousel .carousel-container');
    
    if (nextBtn && prevBtn && carousel) {
        // Store all client icons (including hidden ones)
        const allIcons = [
            'assets/client-1.png',
            'assets/client-2.png',
            'assets/client-3.png',
            'assets/client-4.png',
            'assets/client-1.png',
            'assets/client-2.png',
            'assets/client-3.png',
            'assets/client-4.png'
        ];
        
        let currentPosition = 0;
        
        nextBtn.addEventListener('click', function() {
            if (currentPosition + 5 < allIcons.length) {
                currentPosition++;
                updateCarousel();
            }
        });
        
        prevBtn.addEventListener('click', function() {
            if (currentPosition > 0) {
                currentPosition--;
                updateCarousel();
            }
        });
        
        function updateCarousel() {
            // Get all icon items
            const iconItems = carousel.querySelectorAll('.related-icon-item');
            
            // Update each icon with the new images
            iconItems.forEach((item, index) => {
                const img = item.querySelector('img');
                const iconIndex = currentPosition + index;
                
                if (iconIndex < allIcons.length) {
                    img.src = allIcons[iconIndex];
                    img.alt = `Icon ${iconIndex + 1}`;
                }
            });
        }
    }
});

// Add click event handlers to client icons in the learn-more-overlay
document.addEventListener('DOMContentLoaded', function() {
    // Get the learn more overlay
    const learnMoreOverlay = document.getElementById('learn-more-overlay');
    
    // Get all client icons inside the learn more overlay
    const clientIcons = learnMoreOverlay.querySelectorAll('.related-icon-item');
    
    // Map of client indices to overlay IDs
    const clientOverlayMap = {
        0: 'spicy-studios-overlay',
        1: 'brew-beans-overlay',
        2: 'pure-chips-studio-overlay',
        3: 'on-the-go-overlay',
        4: 'spicy-studios-overlay'  // Wrapping around to first client for 5th icon
    };
    
    // Add click event to each client icon
    clientIcons.forEach((icon, index) => {
        icon.addEventListener('click', function() {
            // Hide the learn more overlay
            learnMoreOverlay.classList.remove('active');
            
            // Get the client overlay ID
            const overlayId = clientOverlayMap[index];
            
            // Show the client overlay
            const clientOverlay = document.getElementById(overlayId);
            if (clientOverlay) {
                clientOverlay.classList.add('active');
                document.body.classList.add('overlay-active');
            }
        });
        
        // Add cursor pointer to indicate it's clickable
        icon.style.cursor = 'pointer';
    });
});







// Insights cards overlay functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all insight cards (stacked cards)
    const insightCards = document.querySelectorAll('.insight-card');
    const insightsOverlay = document.getElementById('insights-overlay');
    const body = document.body;
    
    if (!insightCards.length || !insightsOverlay) return;
    
    // Add click event to each insight card (stacked cards)
    insightCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if card is not active and we're in the middle of a transition
            if (!this.classList.contains('active') && window.isAnimating) {
                return;
            }
            
            // Show insights overlay ONLY (not article overlay)
            insightsOverlay.classList.add('active');
            body.classList.add('overlay-active');
            
            // Prevent event from bubbling up
            e.stopPropagation();
        });
    });
    
    // Handle close button clicks
    const closeButton = insightsOverlay.querySelector('.close-overlay-btn');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            insightsOverlay.classList.remove('active');
            body.classList.remove('overlay-active');
        });
    }
    
    // Close overlay when clicking outside the detail box
    insightsOverlay.addEventListener('click', function(event) {
        if (event.target === insightsOverlay) {
            insightsOverlay.classList.remove('active');
            body.classList.remove('overlay-active');
        }
    });
});





// Insight article overlay functionality - separate from stacked cards
document.addEventListener('DOMContentLoaded', function() {
    // Get insight card items (inside the insights overlay)
    const insightCardItems = document.querySelectorAll('.insight-card-item');
    const articleOverlay = document.getElementById('insight-article-overlay');
    const body = document.body;
    
    if (!articleOverlay || !insightCardItems.length) return;
    
    // Add click event to each insight card item
    insightCardItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Get card title and author
            const title = this.querySelector('h5').innerText;
            const author = this.querySelector('p').innerText;
            
            // Update article overlay with card content
            updateArticleContent(title, author);
            
            // Close the insights overlay first
            const insightsOverlay = document.getElementById('insights-overlay');
            if (insightsOverlay) {
                insightsOverlay.classList.remove('active');
            }
            
            // Show article overlay
            articleOverlay.classList.add('active');
            body.classList.add('overlay-active');
            
            // Prevent event from bubbling up
            e.stopPropagation();
        });
    });
    
    // Function to update article content based on clicked card
    function updateArticleContent(title, author) {
        const articleTitle = articleOverlay.querySelector('.article-title');
        const articleAuthor = articleOverlay.querySelector('.article-header p');
        
        if (articleTitle && title) {
            articleTitle.innerText = title;
        }
        
        if (articleAuthor && author) {
            articleAuthor.innerText = author;
        }
    }
    
    // Handle close button click
    const closeButton = articleOverlay.querySelector('.close-overlay-btn');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            articleOverlay.classList.remove('active');
            body.classList.remove('overlay-active');
        });
    }
    
    // Close overlay when clicking outside the detail box
    articleOverlay.addEventListener('click', function(event) {
        if (event.target === articleOverlay) {
            articleOverlay.classList.remove('active');
            body.classList.remove('overlay-active');
        }
    });
});







// studio - evoke 

// Expertise Cards Carousel
document.addEventListener('DOMContentLoaded', function() {
    const expertiseCards = document.querySelectorAll('.expertise-card');
    const prevButton = document.querySelector('.expertise-prev-btn');
    const nextButton = document.querySelector('.expertise-next-btn');
    
    if (!expertiseCards.length || !prevButton || !nextButton) return;
    
    // Define card positions array for tracking current state
    let positions = ['left', 'center', 'right'];
    
    // Initialize cards to their correct positions
    function initializeExpertiseCards() {
        expertiseCards.forEach((card, index) => {
            card.classList.remove('left-card', 'center-card', 'right-card');
            card.classList.add(`${positions[index]}-card`);
            card.setAttribute('data-position', positions[index]);
        });
    }
    
    // Function to shift cards to the left
    function shiftExpertiseCardsLeft() {
        // Rotate the positions array to the left
        positions.push(positions.shift());
        updateCardPositions();
    }
    
    // Function to shift cards to the right
    function shiftExpertiseCardsRight() {
        // Rotate the positions array to the right
        positions.unshift(positions.pop());
        updateCardPositions();
    }
    
    // Update card positions based on the current positions array
    function updateCardPositions() {
        expertiseCards.forEach((card, index) => {
            card.classList.remove('left-card', 'center-card', 'right-card');
            card.classList.add(`${positions[index]}-card`);
            card.setAttribute('data-position', positions[index]);
        });
    }
    
    // Add click events to the navigation buttons
    prevButton.addEventListener('click', shiftExpertiseCardsLeft);
    nextButton.addEventListener('click', shiftExpertiseCardsRight);
    
    // Initialize card positions
    initializeExpertiseCards();
});




document.addEventListener('DOMContentLoaded', function() {
    // Find the feature box containing "Clients" heading
    const clientsFeatureBox = Array.from(document.querySelectorAll('.feature-box')).find(box => {
        const heading = box.querySelector('h3');
        return heading && heading.textContent.trim() === 'Clients';
    });
    
    const learnMoreOverlay = document.getElementById('learn-more-overlay');
    const body = document.body;
    
    if (clientsFeatureBox && learnMoreOverlay) {
        // Add cursor pointer to indicate it's clickable
        clientsFeatureBox.style.cursor = 'pointer';
        
        // Add click event to the feature box
        clientsFeatureBox.addEventListener('click', function() {
            learnMoreOverlay.classList.add('active');
            body.classList.add('overlay-active');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Find the feature box containing "Insights" heading
    const insightsFeatureBox = Array.from(document.querySelectorAll('.feature-box')).find(box => {
        const heading = box.querySelector('h3');
        return heading && heading.textContent.trim() === 'Insights';
    });
    
    const insightsOverlay = document.getElementById('insights-overlay');
    const body = document.body;
    
    if (insightsFeatureBox && insightsOverlay) {
        // Add cursor pointer to indicate it's clickable
        insightsFeatureBox.style.cursor = 'pointer';
        
        // Add click event to the feature box
        insightsFeatureBox.addEventListener('click', function() {
            insightsOverlay.classList.add('active');
            body.classList.add('overlay-active');
        });
    }
});




document.addEventListener('DOMContentLoaded', function() {
    // Find the feature box or button that should trigger the gallery overlay
    // For example, you can add this to a specific button
    const galleryTrigger = document.getElementById('gallery-trigger'); // Add this ID to your trigger element
    
    if (galleryTrigger) {
        galleryTrigger.addEventListener('click', function() {
            const galleryOverlay = document.getElementById('gallery-overlay');
            if (galleryOverlay) {
                galleryOverlay.classList.add('active');
                document.body.classList.add('overlay-active');
            }
        });
    }
    
    // Handle close button for the gallery overlay
    const galleryCloseBtn = document.querySelector('#gallery-overlay .close-overlay-btn');
    if (galleryCloseBtn) {
        galleryCloseBtn.addEventListener('click', function() {
            const galleryOverlay = document.getElementById('gallery-overlay');
            if (galleryOverlay) {
                galleryOverlay.classList.remove('active');
                document.body.classList.remove('overlay-active');
            }
        });
    }
});



// Gallery images functionality - clicking images opens client overlay
document.addEventListener('DOMContentLoaded', function() {
    // Get the gallery overlay
    const galleryOverlay = document.getElementById('gallery-overlay');
    
    // Get all gallery images
    const galleryImages = galleryOverlay ? galleryOverlay.querySelectorAll('.gallery-item img') : [];
    
    // Add click event to each gallery image
    galleryImages.forEach((image, index) => {
        image.addEventListener('click', function() {
            // Close the gallery overlay first
            galleryOverlay.classList.remove('active');
            
            // Determine which client overlay to show based on image index
            // For simplicity, we'll use a mapping of image indices to client overlays
            const clientOverlays = {
                0: 'spicy-studios-overlay',
                1: 'brew-beans-overlay',
                2: 'pure-chips-studio-overlay',
                3: 'on-the-go-overlay',
                4: 'spicy-studios-overlay',
                5: 'brew-beans-overlay',
                6: 'pure-chips-studio-overlay',
                7: 'on-the-go-overlay'
            };
            
            // Get the overlay ID based on image index
            const overlayId = clientOverlays[index];
            
            // Show the client overlay if it exists
            if (overlayId) {
                const clientOverlay = document.getElementById(overlayId);
                if (clientOverlay) {
                    clientOverlay.classList.add('active');
                    document.body.classList.add('overlay-active'); // Keep body in overlay mode
                }
            }
        });
        
        // Add cursor pointer style to indicate images are clickable
        image.style.cursor = 'pointer';
    });
    
    // Initialize gallery trigger button
    const galleryTrigger = document.getElementById('gallery-trigger');
    if (galleryTrigger && galleryOverlay) {
        galleryTrigger.addEventListener('click', function() {
            galleryOverlay.classList.add('active');
            document.body.classList.add('overlay-active');
        });
    }
});


document.getElementById('services-learn-more').addEventListener('click', function() {
    document.getElementById('new-layout-overlay').classList.add('active');
    document.body.classList.add('overlay-active');
});


// Motion Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get carousel elements - use more specific selectors
    const carousel = document.querySelector('#new-layout-overlay .motion-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.motion-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    
    if (!slides.length || !dots.length || !prevBtn || !nextBtn) return;
    
    console.log("Found carousel with", slides.length, "slides");
    
    // Track current slide
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Ensure initial state is correct
    slides.forEach((slide, index) => {
        slide.style.display = index === 0 ? 'block' : 'none';
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Function to update slide display
    function updateSlides(newIndex) {
        // Make sure index is within bounds
        newIndex = (newIndex + totalSlides) % totalSlides;
        
        // Update current slide
        currentSlide = newIndex;
        
        // Update slides
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.display = 'block';
                slide.classList.add('active');
            } else {
                slide.style.display = 'none';
                slide.classList.remove('active');
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            updateSlides(index);
        });
    });
    
    // Add click event to prev button
    prevBtn.addEventListener('click', function() {
        updateSlides(currentSlide - 1);
    });
    
    // Add click event to next button
    nextBtn.addEventListener('click', function() {
        updateSlides(currentSlide + 1);
    });
});



// Handle case study link clicks in the motion carousel
document.addEventListener('DOMContentLoaded', function() {
    // Get the new layout overlay
    const newLayoutOverlay = document.getElementById('new-layout-overlay');
    if (!newLayoutOverlay) return;
    
    // Get all case study links in the motion carousel
    const caseStudyLinks = newLayoutOverlay.querySelectorAll('.motion-slide a.link-yellow');
    if (!caseStudyLinks.length) return;
    
    // Map each slide to a specific client overlay
    const clientOverlayMap = [
        'spicy-studios-overlay',   // For the first slide (Motion Capture)
        'brew-beans-overlay',      // For the second slide (Virtual Production)
        'pure-chips-studio-overlay' // For the third slide (3D Animation)
    ];
    
    // Add click event to each case study link
    caseStudyLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            
            // Close the current overlay
            newLayoutOverlay.classList.remove('active');
            
            // Find which slide this link belongs to
            const slide = link.closest('.motion-slide');
            const slides = newLayoutOverlay.querySelectorAll('.motion-slide');
            const slideIndex = Array.from(slides).indexOf(slide);
            
            // Get the corresponding client overlay ID
            const overlayId = clientOverlayMap[slideIndex] || clientOverlayMap[0];
            
            // Open the client overlay
            const clientOverlay = document.getElementById(overlayId);
            if (clientOverlay) {
                clientOverlay.classList.add('active');
                document.body.classList.add('overlay-active');
            }
        });
    });
});


// Handle "Our Works" feature box click in overlay menu
document.addEventListener('DOMContentLoaded', function() {
    // Find the feature box containing "Our Works" heading
    const ourWorksFeatureBox = Array.from(document.querySelectorAll('.feature-box')).find(box => {
        const heading = box.querySelector('h3');
        return heading && heading.textContent.trim() === 'Our Works';
    });
    
    const overlayMenu = document.querySelector('.overlay-menu');
    const clientOverlay = document.getElementById('spicy-studios-overlay'); // Using the first client overlay
    const body = document.body;
    
    if (ourWorksFeatureBox && overlayMenu && clientOverlay) {
        // Add click event to the feature box
        ourWorksFeatureBox.addEventListener('click', function() {
            // Close the overlay menu
            overlayMenu.classList.remove('active');
            
            // Find and deactivate the navbar toggler if it's active
            const navbarToggler = document.querySelector('.navbar-toggler');
            if (navbarToggler) {
                navbarToggler.classList.remove('active');
            }
            
            // Open the client overlay after a short delay to allow the menu to close
            setTimeout(() => {
                clientOverlay.classList.add('active');
                body.classList.add('overlay-active');
            }, 200);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
  const insightsFeatureBox = Array.from(document.querySelectorAll('.overlay-menu .feature-box')).find(box => {
    const heading = box.querySelector('h3');
    return heading && heading.textContent.trim() === 'Insights';
  });

  const overlayMenu = document.querySelector('.overlay-menu');
  const insightsOverlay = document.getElementById('insights-overlay');
  const body = document.body;

  if (insightsFeatureBox && overlayMenu && insightsOverlay) {
    insightsFeatureBox.style.cursor = 'pointer';
    insightsFeatureBox.addEventListener('click', function() {
      overlayMenu.classList.remove('active');
      body.style.overflow = '';
      setTimeout(() => {
        insightsOverlay.classList.add('active');
        body.classList.add('overlay-active');
      }, 200);
    });
  }
});



function resetNavbarToggler() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  if (navbarToggler) {
    navbarToggler.classList.remove('active');
  }
}

// Our Works overlay menu handler
document.addEventListener('DOMContentLoaded', function() {
  const ourWorksFeatureBox = Array.from(document.querySelectorAll('.overlay-menu .feature-box')).find(box => {
    const heading = box.querySelector('h3');
    return heading && heading.textContent.trim() === 'Our Works';
  });

  const overlayMenu = document.querySelector('.overlay-menu');
  const clientOverlay = document.getElementById('spicy-studios-overlay');
  const body = document.body;

  if (ourWorksFeatureBox && overlayMenu && clientOverlay) {
    ourWorksFeatureBox.style.cursor = 'pointer';
    ourWorksFeatureBox.addEventListener('click', function() {
      overlayMenu.classList.remove('active');
      resetNavbarToggler();
      body.style.overflow = '';
      setTimeout(() => {
        clientOverlay.classList.add('active');
        body.classList.add('overlay-active');
      }, 200);
    });
  }
});

// Clients overlay menu handler
document.addEventListener('DOMContentLoaded', function() {
  const clientsFeatureBox = Array.from(document.querySelectorAll('.overlay-menu .feature-box')).find(box => {
    const heading = box.querySelector('h3');
    return heading && heading.textContent.trim() === 'Clients';
  });

  const overlayMenu = document.querySelector('.overlay-menu');
  const learnMoreOverlay = document.getElementById('learn-more-overlay');
  const body = document.body;

  if (clientsFeatureBox && overlayMenu && learnMoreOverlay) {
    clientsFeatureBox.style.cursor = 'pointer';
    clientsFeatureBox.addEventListener('click', function() {
      overlayMenu.classList.remove('active');
      resetNavbarToggler();
      body.style.overflow = '';
      setTimeout(() => {
        learnMoreOverlay.classList.add('active');
        body.classList.add('overlay-active');
      }, 200);
    });
  }
});

// Insights overlay menu handler
document.addEventListener('DOMContentLoaded', function() {
  const insightsFeatureBox = Array.from(document.querySelectorAll('.overlay-menu .feature-box')).find(box => {
    const heading = box.querySelector('h3');
    return heading && heading.textContent.trim() === 'Insights';
  });

  const overlayMenu = document.querySelector('.overlay-menu');
  const insightsOverlay = document.getElementById('insights-overlay');
  const body = document.body;

  if (insightsFeatureBox && overlayMenu && insightsOverlay) {
    insightsFeatureBox.style.cursor = 'pointer';
    insightsFeatureBox.addEventListener('click', function() {
      overlayMenu.classList.remove('active');
      resetNavbarToggler();
      body.style.overflow = '';
      setTimeout(() => {
        insightsOverlay.classList.add('active');
        body.classList.add('overlay-active');
      }, 200);
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
    const seeMagicBtn = document.getElementById('see-magic-btn');
    const galleryOverlay = document.getElementById('gallery-overlay');
    
    if (seeMagicBtn && galleryOverlay) {
        seeMagicBtn.addEventListener('click', function() {
            galleryOverlay.classList.add('active');
            document.body.classList.add('overlay-active');
        });
    }
});