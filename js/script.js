// JavaScript cho tương tác và hiệu ứng CV Website

// Khởi tạo khi trang web được tải
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo loading screen
    initLoadingScreen();
    
    // Khởi tạo tất cả các tính năng
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initBackToTop();
    initSmoothScrolling();
    initCounterAnimation();
    initContactForm();
    
    // THÊM MỚI: Khởi tạo theme functionality
    initTheme();
    
    console.log('CV Website đã được tải thành công!');
});

/**
 * THÊM MỚI: Khởi tạo chức năng theme
 * Thiết lập theme dựa trên localStorage hoặc system preference
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Xác định theme ban đầu
    let currentTheme = savedTheme;
    if (!currentTheme) {
        currentTheme = systemPrefersDark ? 'dark' : 'light';
    }
    
    // Áp dụng theme
    applyTheme(currentTheme);
    
    // Lắng nghe thay đổi system preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    console.log(`Theme được khởi tạo: ${currentTheme}`);
}

/**
 * THÊM MỚI: Chuyển đổi theme
 * Hàm được gọi khi người dùng click nút toggle
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Thêm hiệu ứng transition
    document.body.classList.add('theme-transition');
    
    // Áp dụng theme mới
    applyTheme(newTheme);
    
    // Lưu vào localStorage
    localStorage.setItem('theme', newTheme);
    
    // Hiển thị thông báo
    showNotification(
        newTheme === 'dark' ? 'Đã chuyển sang chế độ tối 🌙' : 'Đã chuyển sang chế độ sáng ☀️',
        'info'
    );
    
    // Xóa class transition sau khi hoàn thành
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 500);
}

/**
 * THÊM MỚI: Áp dụng theme
 * @param {string} theme - 'light' hoặc 'dark'
 */
function applyTheme(theme) {
    const themeIcon = document.getElementById('themeIcon');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.name = 'sunny';
        }
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.name = 'moon';
        }
    }
}

/**
 * THÊM MỚI: Lấy theme hiện tại
 * @returns {string} - 'light' hoặc 'dark'
 */
function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

/**
 * Khởi tạo màn hình loading
 * Ẩn màn hình loading sau 2 giây
 */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Ẩn loading screen sau 2 giây
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

/**
 * Khởi tạo hiệu ứng gõ chữ cho Banner
 * Tự động thay đổi các nghề nghiệp khác nhau
 */
function initTypingEffect() {
    const typingText = document.getElementById('typingText');
    const texts = [
        'Sinh viên năm 2 CNTT',
        'Đại học Giao thông Vận tải thành phố Hồ Chí Minh',
        'Lập trình Web',
        'CV Võ Văn Hiền'
    ];
    
    let textIndex = 0;      // Chỉ số văn bản hiện tại
    let charIndex = 0;      // Chỉ số ký tự hiện tại
    let isDeleting = false; // Trạng thái đang xóa hay đang gõ
    
    /**
     * Hàm gõ chữ từng ký tự
     */
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Đang xóa ký tự
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Đang gõ ký tự
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100; // Tốc độ gõ/xóa
        
        if (!isDeleting && charIndex === currentText.length) {
            // Đã gõ xong, dừng 2 giây rồi bắt đầu xóa
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Đã xóa xong, chuyển sang văn bản tiếp theo
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Bắt đầu hiệu ứng typing sau khi loading screen biến mất
    setTimeout(typeText, 2500);
}

/**
 * Khởi tạo navigation và mobile menu
 * Xử lý menu hamburger và highlight active link
 */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu khi click hamburger
    hamburger?.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Đóng menu khi click vào nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Highlight active nav link khi scroll và update navbar
    window.addEventListener('scroll', throttle(function() {
        let current = '';
        const sections = document.querySelectorAll('.section');
        
        // Tìm section hiện tại đang được xem
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        // Highlight nav link tương ứng
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Cập nhật background navbar
        updateNavbar();
    }, 16));
}

/**
 * Khởi tạo scroll animations
 * Tạo hiệu ứng khi các element xuất hiện trong viewport
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .bounce-in, .rotate-in, .scale-in');
    
    // Tạo Intersection Observer để theo dõi khi element xuất hiện
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element đã xuất hiện, thêm animation
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Thêm delay cho các element liên tiếp
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Quan sát tất cả elements có animation
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

/**
 * Khởi tạo animation cho skill bars
 * Tạo hiệu ứng thanh tiến độ kỹ năng
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const targetWidth = skillBar.getAttribute('data-width');
                
                // Animate skill bar với setTimeout để tạo hiệu ứng
                setTimeout(() => {
                    skillBar.style.width = targetWidth + '%';
                }, 500);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

/**
 * Khởi tạo counter animation
 * Tạo hiệu ứng đếm số cho statistics
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 giây
                const increment = target / (duration / 16); // 60 FPS
                let current = 0;
                
                /**
                 * Hàm cập nhật counter
                 */
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter); // Chỉ chạy 1 lần
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Khởi tạo back to top button
 * Hiển thị/ẩn nút dựa trên vị trí scroll
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    // Hiển thị/ẩn nút dựa trên vị trí scroll
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }, 16));
    
    // Scroll lên đầu trang khi click
    backToTopButton?.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Khởi tạo smooth scrolling
 * Cuộn mượt cho các liên kết anchor
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Trừ đi chiều cao navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Khởi tạo contact form
 * Xử lý validation và submit form liên hệ
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Kiểm tra validation
            if (!name || !email || !message) {
                showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Email không hợp lệ!', 'error');
                return;
            }
            
            // Giả lập gửi form
            showNotification('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.', 'success');
            contactForm.reset();
        });
    }
}

/**
 * Hàm download CV
 * Tạo thông báo và giả lập quá trình tải
 */
function downloadCV() {
    // Tạo thông báo
    showNotification('Đang chuẩn bị tải CV...', 'info');
    
    // Giả lập quá trình tải
    setTimeout(() => {
        // Tạo link tải file (trong thực tế sẽ là file PDF thật)
        const link = document.createElement('a');
        link.href = '#'; // Thay bằng đường dẫn file CV thật
        link.download = 'CV_Nguyen_Van_A.pdf';
        
        // Hiển thị thông báo thành công
        showNotification('CV đã được tải xuống thành công!', 'success');
        
        // Trong thực tế, bạn sẽ uncomment dòng dưới để tải file
        // link.click();
    }, 1500);
}

/**
 * Hàm scroll to contact section
 * Cuộn mượt đến phần liên hệ
 */
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

/**
 * Cập nhật navbar background khi scroll
 * Thêm hiệu ứng blur và trong suốt
 */
function updateNavbar() {
    const navbar = document.querySelector('.nav');
    const currentTheme = getCurrentTheme();
    
    if (window.scrollY > 100) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(45, 45, 45, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--bg-secondary)';
        navbar.style.backdropFilter = 'none';
    }
}

// Helper Functions - Các hàm tiện ích

/**
 * Kiểm tra email hợp lệ
 * @param {string} email - Email cần kiểm tra
 * @returns {boolean} - True nếu email hợp lệ
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Hiển thị thông báo toast
 * @param {string} message - Nội dung thông báo
 * @param {string} type - Loại thông báo (success, error, info, warning)
 */
function showNotification(message, type = 'info') {
    // Xóa thông báo cũ nếu có
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Màu sắc theo loại thông báo
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#007bff',
        warning: '#ffc107'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Hiển thị thông báo
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**
 * Performance Optimization - Throttle scroll events
 * Giảm tần suất gọi hàm để tối ưu hiệu suất
 * @param {Function} func - Hàm cần throttle
 * @param {number} limit - Giới hạn thời gian (ms)
 * @returns {Function} - Hàm đã được throttle
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Lazy Loading cho hình ảnh
 * Tải hình ảnh khi chúng xuất hiện trong viewport
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Keyboard Navigation Support
 * Hỗ trợ điều hướng bằng bàn phím
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC để đóng mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            
            navMenu?.classList.remove('active');
            hamburger?.classList.remove('active');
        }
        
        // Space hoặc Enter để kích hoạt back-to-top button
        if ((e.key === ' ' || e.key === 'Enter') && e.target.id === 'backToTop') {
            e.preventDefault();
            e.target.click();
        }
        
        // THÊM MỚI: Phím tắt cho theme toggle (Ctrl/Cmd + Shift + T)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 't') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

/**
 * Print CV Function
 * In CV ra giấy
 */
function printCV() {
    window.print();
}

/**
 * Share CV Function
 * Chia sẻ CV qua Web Share API hoặc copy link
 */
function shareCV() {
    if (navigator.share) {
        navigator.share({
            title: 'CV - Nguyễn Văn A',
            text: 'Xem CV của tôi',
            url: window.location.href
        });
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Đã sao chép link CV vào clipboard!', 'success');
        });
    }
}

// Initialize additional features on load
window.addEventListener('load', function() {
    initLazyLoading();
    initKeyboardNavigation();
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// THÊM MỚI: Detect và thông báo về accessibility features
window.addEventListener('load', function() {
    // Kiểm tra prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        console.log('User prefers reduced motion - animations will be minimized');
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
    }
    
    // Lắng nghe thay đổi color scheme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            console.log('System color scheme changed:', e.matches ? 'dark' : 'light');
        }
    });
});