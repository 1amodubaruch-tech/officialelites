document.addEventListener("DOMContentLoaded", function() {

    // ===================================
    // 1. Sidebar Menu Functionality
    // ===================================
    
    // Highlight active menu item when clicked
    document.querySelectorAll(".sidebar nav ul li a").forEach(link => {
      link.addEventListener("click", function() {
        document.querySelectorAll(".sidebar nav ul li a").forEach(el => el.classList.remove("active"));
        this.classList.add("active");
      });
    });

    // Toggle submenu for Celebrities
    const celebLink = document.getElementById("celeb-link");
    const parentLi = celebLink ? celebLink.parentElement : null; // Check for element existence

    if (celebLink && parentLi) {
        celebLink.addEventListener("click", function(e) {
          e.preventDefault(); 
          parentLi.classList.toggle("active"); 
        });
    }

    // ===================================
    // 2. Celebrity Data & Slideshow
    // ===================================

    const celebrities = [
      { name: "Beyoncé", img: "https://www.nme.com/wp-content/uploads/2024/11/Beyonce@2000x1270.jpg" },
      { name: "Leonardo DiCaprio", img: "https://tse2.mm.bing.net/th/id/OIP.6QbnGoY_P2DAMMnNjlb9gAHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Taylor Swift", img: "https://tse1.mm.bing.net/th/id/OIP.pwHtIJluFezlJMSxCaY3vgHaKQ?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Dwayne Johnson", img: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/07/instar50850618.jpg" },
      { name: "Rihanna", img: "https://static.independent.co.uk/2025/02/22/16/36/GettyImages-2170616237.jpg" },
      { name: "Chris Hemsworth", img: "https://people.com/thmb/kdIlo7TO2G9NJrNxeSxlryJlSkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(709x309:711x311)/chris-hemsworth-extraction-2-new-york-premiere-061323-1-dabafa8edd904df8a20e278e7e974f53.jpg" },
      { name: "Zendaya", img: "https://www.nme.com/wp-content/uploads/2024/01/Zendaya-main.jpg" },
      { name: "Tom Holland", img: "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/5694/production/_130046122_gettyimages-1258362974.jpg" },
      { name: "Adele", img: "https://cdn.britannica.com/98/163898-050-B2E2A704/British-sensation-Adele.jpg" },
      { name: "Will Smith", img: "https://theblast.prod.media.wordpress.mattersmedia.io/2023/01/Will-Smith-1024x683.jpg" }
    ];

    let currentIndex = 0;
    const imageElement = document.getElementById("celebrityImage");
    const nameElement = document.getElementById("celebrityName");

    if (imageElement && nameElement) {
        function showCelebrity(index) {
          imageElement.style.opacity = 0;
          setTimeout(() => {
            imageElement.src = celebrities[index].img;
            nameElement.textContent = celebrities[index].name;
            imageElement.style.opacity = 1;
          }, 500);
        }
        showCelebrity(currentIndex);
        setInterval(() => {
          currentIndex = (currentIndex + 1) % celebrities.length;
          showCelebrity(currentIndex);
        }, 3000);
    }


    // ===================================
    // 3. Gallery Slideshow
    // ===================================

    const slideshowWrapper = document.getElementById("slideshowWrapper");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const slides = document.querySelectorAll(".slideshow-wrapper img");
    
    if (slideshowWrapper && prevBtn && nextBtn && slides.length > 0) {
        let slideIndex = 0;
        const totalSlides = slides.length;

        function showSlide(index) {
          if (index >= totalSlides) {
            slideIndex = 0;
          } else if (index < 0) {
            slideIndex = totalSlides - 1;
          } else {
            slideIndex = index;
          }
          slideshowWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
        }
        function autoSlide() {
          slideIndex++;
          showSlide(slideIndex);
        }
        let slideInterval = setInterval(autoSlide, 3000);

        nextBtn.addEventListener("click", () => {
          showSlide(slideIndex + 1);
          resetInterval();
        });
        prevBtn.addEventListener("click", () => {
          showSlide(slideIndex - 1);
          resetInterval();
        });
        function resetInterval() {
          clearInterval(slideInterval);
          slideInterval = setInterval(autoSlide, 3000);
        }
    }


    // ===================================
    // 4. Online Visitors Counter
    // ===================================
    const onlineVisitorsElement = document.getElementById("online-visitors");
    if (onlineVisitorsElement) {
        function generateOnlineVisitors() {
          const min = 500000;
          const max = 20500000;
          const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          if (randomNumber >= 1000000) {
            return (randomNumber / 1000000).toFixed(1) + "m";
          } else {
            return Math.floor(randomNumber / 1000) + "k";
          }
        }
        onlineVisitorsElement.textContent = generateOnlineVisitors();
    }


    // ===================================
    // 5. Scroll Animation
    // ===================================
    const statsSection = document.getElementById("stats");
    const statisticsSection = document.getElementById("statistics");

    if (statsSection || statisticsSection) {
        window.addEventListener("scroll", function() {
          const screenHeight = window.innerHeight;

          if (statsSection && statsSection.getBoundingClientRect().top < screenHeight - 100) {
            statsSection.classList.add("visible");
          }
          if (statisticsSection && statisticsSection.getBoundingClientRect().top < screenHeight - 100) {
            statisticsSection.classList.add("visible");
          }
        });
    }


    // ===================================
    // 6. Pie Chart (Requires Chart.js library to be loaded)
    // ===================================
    const pieChartElement = document.getElementById('pieChart');
    if (pieChartElement) {
        // Ensure the Chart variable is available globally before creating the chart
        if (typeof Chart !== 'undefined') {
            const ctx = pieChartElement.getContext('2d');
            const pieChart = new Chart(ctx, {
              type: 'pie',
              data: {
                labels: ['American', 'Europe', 'African', 'Australia', 'Asia'],
                datasets: [{
                  data: [40, 25, 15, 10, 10],
                  backgroundColor: ['#a10d0dff','#1976d2','#b342f5ff','#04ff97ff','#192127ff'],
                  borderColor: '#ffffff',
                  borderWidth: 2
                }]
              },
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: '#333', font: { size: 14 } }
                  }
                },
                animation: { animateScale: true, animateRotate: true }
              }
            });
        } else {
            console.error("Chart.js library not found. Pie chart cannot be initialized.");
        }
    }


    // ===================================
    // 7. Google Translate Initialization
    // (Relies on an external script, kept as-is)
    // ===================================

    // Note: The googleTranslateElementInit function must be globally available 
    // if called by the Google Translate script. You might need to move this 
    // function definition outside of the DOMContentLoaded block or ensure 
    // the Google Translate script is loaded after this one.
    // Assuming you have the global function definition somewhere else or rely on it.


    // ===================================
    // 8. Card Options Toggle Function
    // (Consolidated the duplicate definitions)
    // ===================================
    window.toggleOptions = function(button) { // Made global to be accessible via HTML 'onclick'
      const options = button.nextElementSibling;
      const isVisible = options.style.display === "block";

      // Hide all other options first
      document.querySelectorAll(".options").forEach(opt => opt.style.display = "none");

      // Toggle the clicked one
      options.style.display = isVisible ? "none" : "block";
    }


    // ===================================
    // 9. Review Slider Functionality
    // ===================================
    const reviewSection = document.querySelector(".reviews-section");
    if (reviewSection) {
        const slidesTrack = reviewSection.querySelector(".slides");
        const slideItems = reviewSection.querySelectorAll(".slide");
        const nextReviewBtn = reviewSection.querySelector(".next-btn");

        if (slidesTrack && slideItems.length > 0 && nextReviewBtn) {
            let reviewIndex = 0;
            let reviewWidth = reviewSection.querySelector(".review-slider").clientWidth;

            function setReviewWidths() {
              reviewWidth = reviewSection.querySelector(".review-slider").clientWidth;
              slideItems.forEach(slide => {
                slide.style.minWidth = `${reviewWidth}px`;
                slide.style.width = `${reviewWidth}px`;
                slide.style.flex = `0 0 ${reviewWidth}px`;
              });
              slidesTrack.style.transform = `translateX(-${reviewIndex * reviewWidth}px)`;
            }

            slidesTrack.style.display = "flex";
            slidesTrack.style.transition = "transform 0.6s ease-in-out";
            setReviewWidths();
            window.addEventListener("resize", setReviewWidths);

            function goToReview(i) {
              reviewIndex = (i + slideItems.length) % slideItems.length;
              slidesTrack.style.transform = `translateX(-${reviewIndex * reviewWidth}px)`;
            }

            nextReviewBtn.addEventListener("click", e => {
              e.preventDefault();
              goToReview(reviewIndex + 1);
            });
        }
    }


    // ===================================
    // 10. Search Functionality
    // ===================================
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const searchContainer = document.querySelector(".search-container");
    const cards = document.querySelectorAll(".card");

    if (searchInput && searchBtn && searchContainer) {
        // Create a "No Result" message element
        const noResultMsg = document.createElement("p");
        noResultMsg.textContent = "No Result";
        noResultMsg.style.textAlign = "center";
        noResultMsg.style.color = "#ff4d4d";
        noResultMsg.style.fontWeight = "bold";
        noResultMsg.style.display = "none"; // hidden by default

        // Insert message just below the search bar
        searchContainer.appendChild(noResultMsg);

        function filterCards() {
          const query = searchInput.value.toLowerCase().trim();
          let found = false;

          cards.forEach(card => {
            // Reset any previous highlight
            card.style.border = "none";

            // Use both data-name and alt text for matching
            const nameAttr = card.getAttribute("data-name") || "";
            const imgElement = card.querySelector("img");
            const altAttr = imgElement ? imgElement.alt : ""; // Check if img exists
            const name = (nameAttr + " " + altAttr).toLowerCase();

            if (query === "") {
              // If search box is empty, show all cards
              card.style.display = "block";
              found = true;
            } else if (name.includes(query)) {
              // Show and highlight matching card
              card.style.display = "block";
              card.style.border = "3px solid red"; // red highlight
              found = true;
            } else {
              // Hide non-matching cards
              card.style.display = "none";
            }
          });

          // Show "No Result" if nothing found
          noResultMsg.style.display = found ? "none" : "block";
        }

        // Search button click
        searchBtn.addEventListener("click", filterCards);

        // Live search as you type
        searchInput.addEventListener("keyup", filterCards);
    }


    // ===================================
    // 11. Support Button Mailto
    // ===================================
    const supportBtn = document.getElementById("supportBtn");
    if (supportBtn) {
        supportBtn.addEventListener("click", function() {
          const email = "1amodubaruch@gmail.com";
          const subject = encodeURIComponent("Support Today"); 
          const body = encodeURIComponent("Hello, I would like to support your work. Please provide me with details.");
          
          window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        });
    }
});



 // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    document.querySelector(href).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Amount button selection
        const amountButtons = document.querySelectorAll('.amount-btn');
        amountButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                amountButtons.forEach(b => b.style.borderColor = 'var(--border)');
                amountButtons.forEach(b => b.style.backgroundColor = 'var(--background)');
                this.style.borderColor = 'var(--primary)';
                this.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
            });
        });

        // Add fade-in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.6s ease-in forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .stat-item').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);



        
    window.addEventListener('load', function() {
        // Set a timer for how long the greeting stays up
        setTimeout(function() {
            const overlay = document.getElementById('greeting-overlay');
            overlay.classList.add('fade-away');
            
            // Remove from DOM after fade finishes
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 1000);
        }, 3000); 
    });



    // Google Translate Initialization
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en'
    }, 'google_translate_element');
}

// Ensure smooth scrolling for long policy pages
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

