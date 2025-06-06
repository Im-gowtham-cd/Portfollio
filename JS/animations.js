gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    const tl = gsap.timeline();

    tl.from('nav:not(.herolink)', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }).from('.herolink:not(.getstarted, .downloadcv)', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    tl.from('.herotext', {
        x: -100,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, "-=0.4");
    
    tl.from('#name', {
        width: 0,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut'
    }, "-=0.2");

    tl.from('.herolink a', {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power1.out'
    }, "-=0.8");

    const heroLinks = document.querySelectorAll('.herolink a');
    heroLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.1,
                // backgroundColor: '#2ecc71',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                scale: 1,
                // backgroundColor: '#3498db',
                duration: 0.3,
                ease: 'power2.in'
            });
        });
    });

    tl.from(['#p1', '#p2', '#p3'], {
        scale: 0,
        rotation: 15,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.5)'
    }, "-=0.5");

    gsap.to('.menance, .menance1', {
        opacity: 0.7,
        scale: 1.1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.from('.profile-card-item', {
        scrollTrigger: {
            trigger: '.profile-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.from('.jojologo', {
        scrollTrigger: {
            trigger: '.profile-image',
            start: 'top 70%'
        },
        y: -50,
        opacity: 0,
        rotation: -10,
        duration: 1.2,
        ease: 'back.out(1.7)'
    });

    gsap.from('.heading ul li', {
        scrollTrigger: {
            trigger: '.heading',
            start: 'top 70%'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power1.out'
    });

    gsap.from('.dio', {
        scrollTrigger: {
            trigger: '.right',
            start: 'top 60%'
        },
        x: 300,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
    });
    
    gsap.from('.jotaro', {
        scrollTrigger: {
            trigger: '.right',
            start: 'top 60%'
        },
        x: -300,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
    });

    const socialIcons = document.querySelectorAll('.last img');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                scale: 1.3,
                rotation: 5,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
        
        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power1.inOut'
            });
        });
    });
    
    document.querySelector('.right').addEventListener('click', (e) => {
        // Create a new div for the effect
        const effect = document.createElement('div');
        effect.className = 'attack-effect';
        effect.style.position = 'absolute';
        effect.style.left = (e.clientX - 50) + 'px';
        effect.style.top = (e.clientY - 50) + 'px';
        effect.style.fontSize = '24px';
        effect.style.fontWeight = 'bold';
        effect.style.color = '#fff';
        effect.style.textShadow = '2px 2px 0 #000';
        effect.style.zIndex = '1000';
        effect.textContent = Math.random() > 0.5 ? 'ORA ORA!' : 'MUDA MUDA!';
        document.body.appendChild(effect);

        gsap.to(effect, {
            y: -100,
            opacity: 0,
            scale: 2,
            duration: 1,
            ease: 'power1.out',
            onComplete: () => effect.remove()
        });
    });
});