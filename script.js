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
      const currentProgress = (scrollY - revealStartPoint) / totalRevealDistance;
      
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
                  word.style.color = interpolateColor('#777777', '#FFFFFF', partialFactor);
                  if (partialFactor > 0.9) activatedWords[index] = true;
              }
              // Words that should be white because they were activated before
              else if (activatedWords[index]) {
                  word.style.color = '#FFFFFF';
              }
              // Words that haven't been activated yet
              else {
                  word.style.color = '#777777';
              }
          } else {
              // When scrolling up, allow colors to revert
              if (index < wordsToColor) {
                  word.style.color = '#FFFFFF';
              } else if (index === wordsToColor) {
                  const partialFactor = (currentProgress * wordCount) - Math.floor(currentProgress * wordCount);
                  word.style.color = interpolateColor('#777777', '#FFFFFF', partialFactor);
              } else {
                  word.style.color = '#777777';
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
  // Initialize text carousel
  const textCarousel = document.getElementById('textCarousel');
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