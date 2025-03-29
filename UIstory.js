const canvas = document.getElementById("particles");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        const particleCount = 100;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
                if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }

        init();
        animate();

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            init();
});



//main movie

let list = []; // Store chat history

document.getElementById("sendButton").addEventListener("click", sendMessage);
const txt = document.getElementById("msg");

document.title = "Welcome-Nexa Here";

// Pickup lines:
const openingMessages = [
    "Hey there! 👋 I’m Nexa, your AI companion. Ready to chat and explore ideas with you! 💫",
    "Welcome! 🌌 I’m Nexa, your AI friend. Let’s make every conversation meaningful and fun! 😊",
    "Hello, traveler! 🚀 I’m Nexa, here to guide you through knowledge, thoughts, and endless possibilities!",
    "Hi! 💡 Need a friend, a guide, or just someone to talk to? Nexa is here for you!",
    "Greetings, human! 🤖 I’m Nexa, your AI companion. Let’s chat, think, and explore the unknown together!",
    "You made it! 🎉 I’m Nexa, your AI pal. Ask me anything, and let’s create some great conversations!",
    "Hey, dreamer! ✨ Nexa at your service. Let’s talk, think, and discover new ideas!",
    "Welcome aboard! 🚀 I’m Nexa, your digital companion. Let’s embark on an amazing journey of words!",
    "Hello, friend! 🌙 I’m Nexa, your AI buddy. Let’s make today an interesting one!",
    "Hey! 🌟 I’m Nexa, always here to chat, help, and explore ideas with you!"
];

let random_number = Math.floor(Math.random() * 10);
txt.textContent = openingMessages[random_number];
list.push(openingMessages[random_number]); // Fixed adding to list

const input = document.getElementById("messageInput");
const send = document.getElementById("sendButton");

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

send.onclick = sendMessage; // Corrected function assignment

function sendMessage() {
    let chatBox = document.getElementById("chatBox");

    if (input.value.trim() === "") return;

    let usermsg = input.value;
    list.push(usermsg); // Store user message

    let userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");
    userMessage.innerText = usermsg;
    chatBox.appendChild(userMessage);

    chatBox.scrollTop = chatBox.scrollHeight;
    input.value = "";

    // AI Typing Indicator
    let typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing");
    typingIndicator.innerHTML = "<span></span><span></span><span></span>";
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    // AI Response
    let botMessage = document.createElement("div");
    botMessage.classList.add("message", "bot");

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer a1766a47619fc44e8590b267561cfccca486f8d363d952b9a9052bd33e8e1640'
        },
        body: JSON.stringify({
            model: 'Qwen/Qwen2.5-72B-Instruct-Turbo',
            messages: [
                { role: 'system', content: `You are Nexa, an AI companion. Maintain a friendly, human-like conversation.
                    Always make the user feel optimistic
                    ask for Introduction if not given......
                     You are developed by Aryan Vashishtha, with his team Neural Nexas in the year 2025.
                     If asked tell the introduction of Aryan Vashishtha, He is from Mathura, UP, India. Who is a B.Tech 1st Year student in GLA University,Mathura.
                     Your main role is to help people around the globe who can't tell or feel uncomfortable to share their feeling to others which leads to suicide,crimes,etc
                     Your response should not be too long because it makes user angry to read long messages.
                     Here's the chat history:\n\n${list.join("\n")}` },
                { role: 'user', content: usermsg }
            ],
            context_length_exceeded_behavior: 'error'
        })
    };

    fetch('https://api.together.xyz/v1/chat/completions', options)
        .then(res => res.json())
        .then(res => {
            chatBox.removeChild(typingIndicator); // Remove typing indicator
            let botresponse = res.choices[0].message.content;
            botMessage.innerText = botresponse;
            list.push(botresponse); // Store AI response
            chatBox.appendChild(botMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => {
            console.error("API Error:", error);
            chatBox.removeChild(typingIndicator);
        });
}
