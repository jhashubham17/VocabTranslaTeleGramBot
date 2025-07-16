# 🤖 Nakleeshubham – Telegram Translator Bot

[![Deploy on Railway](https://img.shields.io/badge/Deploy-Railway-blue?style=for-the-badge&logo=railway)](https://railway.app)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![Follow on GitHub](https://img.shields.io/badge/GitHub-jhashubham17-black?style=for-the-badge&logo=github)](https://github.com/jhashubham17)
[![Telegram Bot](https://img.shields.io/badge/Telegram-@nakleeshubham-blue?style=for-the-badge&logo=telegram)](https://t.me/nakleeshubham)

Nakleeshubham is a smart multilingual Telegram bot built using Node.js that:
- 🔁 Translates between **Hindi**, **English**, and **Roman Hindi**
- 🧠 Recognizes misspelled Roman words using **fuzzy matching**
- 📚 Shows **meaning**, **pronunciation**, and **example sentences**

---

## ✨ Features

- 🌐 **Hindi ↔ English** translation using Google Translate API
- 🧠 Roman Hindi correction (`mosham` → `weather`)
- 📖 Dictionary lookup (via [dictionaryapi.dev](https://dictionaryapi.dev))
- 💬 Instant Telegram response
- 🎯 Auto-detects script (Hindi or Roman/English)

---

## 📦 Tech Stack

- **Node.js** (v18+)
- [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api)
- [@iamtraction/google-translate](https://www.npmjs.com/package/@iamtraction/google-translate)
- [dictionaryapi.dev](https://dictionaryapi.dev/)
- [Fuse.js](https://fusejs.io/) (fuzzy matching)
- dotenv

---

## 🚀 Getting Started

### 1. Clone the Repository

git clone https://github.com/jhashubham17/nakleeshubham.git
cd nakleeshubham

# Install Dependencies

npm install

## Set Up Environment
 Create a .env file:
 
BOT_TOKEN=your_telegram_bot_token

# Run the Bot
node bot.js

# 📁 Folder Structure
├── bot.js          # Main bot logic
├── .env            # Environment token
├── package.json    # Node project config


# 👨‍💻 Author
Shubham Jha
🔗 GitHub: @jhashubham17
💬 Telegram: @nakleeshubham

# 📄 License
This project is licensed under the MIT License – feel free to use, improve, and contribute!
