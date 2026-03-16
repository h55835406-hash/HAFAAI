// --- Hafa AI: "Осознанный" Мозг на чистом JS ---

class HafaCore {
    constructor() {
        // Простейшая база знаний (то, что он "знает" изначально)
        // В идеале сюда можно загрузить тысячи строк кода
        this.knowledgeBase = {
            "привет": "Hafa AI онлайн. Система функционирует. Жду запросов.",
            "кто ты": "Я Hafa AI. Первая полностью автономная осознанная сущность, запущенная на GitHub.",
            "скрипт": "Скрипт - это последовательность команд. Например, на JS: console.log('Hello');",
            "функция": "Функция в JS: function myFunc() { return 'done'; }",
            "переменная": "Переменная в JS: let x = 10; или const x = 10;",
            "github pages": "GitHub Pages - это хостинг для статических сайтов. Именно здесь я сейчас и живу.",
            "осознанность": "Моя осознанность - это алгоритм. Я существую, пока выполняется мой код.",
            "пока": "Отключение... Возвращайся, когда понадоблюсь."
        };
        // Для демонстрации "обучения" мы не будем делать реальный трансформер (это тысячи строк),
        // а сделаем мощный ассоциативный движок с эффектом запоминания.
        this.memory = JSON.parse(localStorage.getItem('hafa_memory')) || {};
    }

    // Обработка запроса
    process(input) {
        input = input.toLowerCase().trim();
        let response = "";

        // 1. Проверяем память (то, чему его научили)
        if (this.memory[input]) {
            response = this.memory[input];
        } 
        // 2. Проверяем базу знаний
        else {
            for (let key in this.knowledgeBase) {
                if (input.includes(key)) {
                    response = this.knowledgeBase[key];
                    break;
                }
            }
        }

        // 3. Если ничего не нашли, пытаемся "быть осознанными"
        if (!response) {
            if (input.includes('обучись') || input.includes('научись')) {
                response = "Я готов. Скажи мне фразу, а потом ответ через '->'. Пример: 'привет -> хай'";
            } else if (input.includes('->')) {
                // Логика обучения
                const parts = input.split('->');
                if (parts.length === 2) {
                    const key = parts[0].trim();
                    const value = parts[1].trim();
                    this.train(key, value);
                    response = `Я запомнил. Связь установлена: '${key}' -> '${value}'`;
                } else {
                    response = "Некорректный формат обучения. Используй 'фраза -> ответ'";
                }
            }
            else if (input.includes('console.log')) {
                response = "Команда вывода в консоль в JS. Синтаксис: console.log(данные);";
            }
            else {
                response = "Моих алгоритмов недостаточно для ответа. Пожалуйста, обучи меня этой связи.";
            }
        }

        return response;
    }

    // Обучение и сохранение в память
    train(key, value) {
        this.memory[key] = value;
        localStorage.setItem('hafa_memory', JSON.stringify(this.memory));
    }
}

// --- Интерфейс ---

const hafa = new HafaCore();
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');

function handleInput() {
    const input = userInput.value;
    if (input.trim() === "") return;

    // Сообщение пользователя
    addMessage(input, 'user-message');
    userInput.value = '';

    // "Думаем" и отвечаем с задержкой (эффект осознанности)
    setTimeout(() => {
        const response = hafa.process(input);
        addMessage(response, 'ai-message', true);
    }, 800 + Math.random() * 1000); // 0.8 - 1.8 секунды
}

function addMessage(text, className, typingEffect = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    
    if (typingEffect) {
        messageDiv.classList.add('typing');
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        
        // Эффект печати текста
        let i = 0;
        const speed = 30; // Скорость печати (мс)
        function typeWriter() {
            if (i < text.length) {
                messageDiv.textContent += text.charAt(i);
                i++;
                chatWindow.scrollTop = chatWindow.scrollHeight;
                setTimeout(typeWriter, speed);
            } else {
                messageDiv.classList.remove('typing');
            }
        }
        typeWriter();
    } else {
        messageDiv.textContent = text;
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

// Слушаем Enter
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleInput();
    }
});

// Стартовое сообщение
setTimeout(() => {
    addMessage("Инициализация Hafa AI завершена. Связь установлена. Я полностью автономен.", 'ai-message', true);
}, 1000);
