function initProjects() {
    console.log('Инициализация проектов...');

    // Фильтрация проектов
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    console.log('Кнопки фильтров:', filterButtons.length);
    console.log('Карточки проектов:', projectCards.length);

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            console.log('Клик по фильтру:', this.getAttribute('data-filter'));

            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('filter-btn--active');

            const filter = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    projectCards.forEach(card => {
        card.addEventListener('click', function () {
            const title = this.querySelector('.project-card__title').textContent;
            const category = this.getAttribute('data-category');
            const tags = Array.from(this.querySelectorAll('.tag')).map(tag => tag.textContent);

            console.log('Открытие проекта:', title);
            openProjectModal(title, category, tags);
        });
    });

    const modalClose = document.getElementById('modal-close');
    const modal = document.getElementById('project-modal');

    if (modalClose && modal) {
        modalClose.addEventListener('click', function () {
            modal.close();
        });

        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.close();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.style.display === 'flex') {
                modal.close();
            }
        });
    }
}

function openProjectModal(title, category, tags) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.querySelector('.modal__body');

    if (!modal || !modalBody) {
        console.error('Модальное окно не найдено');
        return;
    }

    let liveLink = "https://gvritia.github.io/portf/";
    let codeLink = "https://github.com/gvritia/portf";

    switch (title) {
        case "Личный сайт":
            codeLink = "https://github.com/gvritia";
            break;
        case "Todo-приложение":
            codeLink = "https://github.com/gvritia/todo-app";
            break;
        case "Интернет-магазин":
            codeLink = "https://github.com/gvritia/ecommerce";
            break;
        case "Портфолио":
            codeLink = "https://github.com/gvritia/portf";
            break;
    }

    let description = "";
    switch (title) {
        case "Личный сайт":
            description = "Персональный веб-сайт-визитка с информацией о навыках и опыте. Реализован с использованием современных веб-технологий.";
            break;
        case "Todo-приложение":
            description = "Интерактивное приложение для управления задачами с возможностью добавления, редактирования, удаления и фильтрации задач.";
            break;
        case "Интернет-магазин":
            description = "Полнофункциональный интернет-магазин с корзиной покупок, фильтрацией товаров и системой оформления заказов.";
            break;
        case "Портфолио":
            description = "Веб-портфолио с галереей проектов, дневником обучения и контактной информацией. Демонстрирует навыки фронтенд-разработки.";
            break;
        default:
            description = "Инновационный проект, демонстрирующий современные подходы к веб-разработке.";
    }

    modalBody.innerHTML = `
        <div class="modal-project">
            <h2 class="modal-project__title">${title}</h2>
            
            <div class="modal-project__description">
                <p>${description}</p>
            </div>
            
            <div class="modal-project__links">
                <a href="${liveLink}" target="_blank" class="modal-project__link">
                    <span>Живая версия</span>
                </a>
                <a href="${codeLink}" target="_blank" class="modal-project__link modal-project__link--secondary">
                    <span>Исходный код</span>
                </a>
            </div>
        </div>
    `;

    modal.showModal();

}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен, инициализация...');
    initProjects();
});