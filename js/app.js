const cards = document.querySelectorAll('.zoom-in');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      entry.target.style.animationDelay = `${delay}s`;
      entry.target.classList.add('visible');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.001 });  // وقتی 10 درصد کارت وارد صفحه شد

cards.forEach(card => {
  cardObserver.observe(card);
});

  

    // تنظیم سال جاری در فوتر
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // مدیریت منوی موبایل
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.classList.add('mobile-menu-enter-active');
            }, 10);
        } else {
            mobileMenu.classList.remove('mobile-menu-enter-active');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        }
    });

    // بستن منوی موبایل هنگام کلیک روی لینک‌ها
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('mobile-menu-enter-active');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        });
    });

    // مدیریت دکمه اسکرول به بالا
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });
    
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // مدیریت تغییر تم (دارک مود / لایت مود)
    const themeToggleButton = document.getElementById('theme-toggle');
    
    // بررسی تنظیمات ذخیره شده در localStorage
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    themeToggleButton.addEventListener('click', function() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // انیمیشن برای مهارت‌ها
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = function() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    };
    
    // اجرای انیمیشن مهارت‌ها هنگام اسکرول به بخش مهارت‌ها
    const skillsSection = document.getElementById('skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // اضافه کردن کلاس active به لینک منو بر اساس بخش جاری
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-primary-600', 'dark:text-primary-400');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary-600', 'dark:text-primary-400');
            }
        });
    });

    // انیمیشن تایپ برای متن هیرو
    const typeWriter = function(textElement, words, wait = 3000) {
        this.textElement = textElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    
    // متد تایپ
    typeWriter.prototype.type = function() {
        // ایندکس کلمه فعلی
        const current = this.wordIndex % this.words.length;
        // گرفتن متن کامل کلمه فعلی
        const fullTxt = this.words[current];
        
        // بررسی اگر در حالت حذف هستیم
        if (this.isDeleting) {
            // حذف کاراکتر
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // اضافه کردن کاراکتر
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        // درج متن در المان
        this.textElement.innerHTML = `<span class="text-primary-600 dark:text-primary-400">${this.txt}</span>`;
        
        // سرعت تایپ
        let typeSpeed = 100;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        // اگر کلمه کامل شد
        if (!this.isDeleting && this.txt === fullTxt) {
            // مکث در پایان
            typeSpeed = this.wait;
            // تغییر به حالت حذف
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // رفتن به کلمه بعدی
            this.wordIndex++;
            // مکث قبل از تایپ
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
    
    // راه‌اندازی تایپ رایتر
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        new typeWriter(heroTitle, ['طراح وب', 'توسعه‌دهنده', 'فریلنسر'], 3000);
    }

    // اضافه کردن انیمیشن به پروژه‌ها هنگام هاور
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('transform', 'scale-105', 'transition-transform', 'duration-300');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('scale-105');
        });
    });

    // فرم تماس - جلوگیری از ارسال پیش‌فرض و نمایش پیام
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // در اینجا می‌توانید کد ارسال فرم را اضافه کنید
            // مثال: ارسال با fetch یا axios
            
            // نمایش پیام موفقیت
            alert('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
            
            // پاک کردن فرم
            this.reset();
        });
    }



