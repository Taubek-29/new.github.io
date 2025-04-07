document.addEventListener('DOMContentLoaded', function() {
    // Получаем сохраненные данные
    const portfolioData = JSON.parse(localStorage.getItem('portfolioData'));
    
    if (!portfolioData) {
        alert('Данные не найдены. Пожалуйста, заполните форму сначала.');
        window.location.href = 'index.html';
        return;
    }
    
    // Заполняем данные
    document.getElementById('portfolio-name').textContent = portfolioData.name;
    document.getElementById('portfolio-job').textContent = portfolioData.job;
    document.getElementById('about-text').textContent = portfolioData.about;
    document.getElementById('contact-email').textContent = portfolioData.email;
    document.getElementById('contact-email').href = `mailto:${portfolioData.email}`;
    
    // Заполняем навыки
    const skillsList = document.getElementById('skills-list');
    portfolioData.skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill animate__animated animate__fadeInUp';
        skillElement.textContent = skill;
        skillsList.appendChild(skillElement);
    });
    
    // Заполняем проекты
    const projectsGrid = document.getElementById('projects-grid');
    portfolioData.projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card animate__animated animate__fadeInUp';
        projectCard.style.animationDelay = `${index * 0.1}s`;
        projectCard.innerHTML = `
            <h3>${project}</h3>
            <p>Описание проекта может быть здесь. Расскажите о своих достижениях и технологиях, которые вы использовали.</p>
        `;
        projectsGrid.appendChild(projectCard);
    });
    
    // Устанавливаем выбранную тему
    document.getElementById('theme-selector').value = portfolioData.theme;
    applyTheme(portfolioData.theme);
    
    // Обработчик изменения темы
    document.getElementById('theme-selector').addEventListener('change', function() {
        applyTheme(this.value);
    });
    
    // Применение темы
    function applyTheme(theme) {
        const portfolioTheme = document.getElementById('portfolio-theme');
        
        // Удаляем все классы тем
        portfolioTheme.classList.remove(
            'theme-minimal',
            'theme-creative',
            'theme-tech',
            'theme-elegant'
        );
        
        // Добавляем выбранную тему
        portfolioTheme.classList.add(`theme-${theme}`);
    }
    
    // Анимация элементов при скролле
    function animateOnScroll() {
        const skills = document.querySelectorAll('.skill');
        const projects = document.querySelectorAll('.project-card');
        
        skills.forEach((skill, index) => {
            const skillPosition = skill.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (skillPosition < screenPosition) {
                skill.classList.add('animate__fadeInUp');
                skill.style.animationDelay = `${index * 0.1}s`;
            }
        });
        
        projects.forEach(project => {
            const projectPosition = project.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (projectPosition < screenPosition) {
                project.classList.add('animate__fadeInUp');
            }
        });
    }
    
    // Запустить при загрузке
    animateOnScroll();
    
    // Слушатель скролла
    window.addEventListener('scroll', animateOnScroll);
});