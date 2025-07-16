require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const translate = require("@iamtraction/google-translate");
const axios = require("axios");
const Fuse = require("fuse.js");

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// 🔤 Hindi script detection
const isHindiScript = (text) => /[\u0900-\u097F]/.test(text);

// 🔎 Word list for fuzzy match
const knownWords = [
  "weather",
  "love",
  "friend",
  "school",
  "book",
  "computer",
  "namaste",
  "pyaar",
  "mosam",
  "barish",
  "dosti",
  "rain",
];

const fuse = new Fuse(knownWords, {
  includeScore: true,
  threshold: 0.4,
});

// 📚 Fetch dictionary info
async function fetchWordDetails(word) {
  try {
    const res = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = res.data[0];
    return {
      meaning:
        data.meanings?.[0]?.definitions?.[0]?.definition || "Not available",
      example:
        data.meanings?.[0]?.definitions?.[0]?.example ||
        "No example available.",
      pronunciation:
        data.phonetics?.find((p) => p.text)?.text || "Not available",
    };
  } catch (err) {
    return null;
  }
}

// 🤖 Telegram bot handler
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const rawInput = msg.text?.trim().toLowerCase();
  if (!rawInput) return;

  try {
    let input = rawInput;
    const isHindi = isHindiScript(input);

    // ✅ Apply fuzzy match for English-like words
    if (!isHindi) {
      const fuzzy = fuse.search(input);
      if (fuzzy.length > 0 && fuzzy[0].score < 0.4) {
        input = fuzzy[0].item; // <-- THIS IS NOW USED
        console.log(`🧠 Fuzzy matched "${rawInput}" → "${input}"`);
      }
    }

    // Detect translation direction
    const fromLang = isHindi ? "hi" : "en";
    const toLang = isHindi ? "en" : "hi";

    const translation = await translate(input, { from: fromLang, to: toLang });

    // Dictionary lookup (only if English word)
    const lookupWord = isHindi ? translation.text.split(" ")[0] : input;
    const details = await fetchWordDetails(lookupWord);

    const flag = isHindi ? "🇮🇳 Hindi ➡️ English" : "🇬🇧 English ➡️ Hindi";
    let response = `${flag}\n📝 Meaning: ${translation.text}`;
    response += `\n📢 Pronunciation: ${
      details?.pronunciation || "Not available"
    }`;
    response += `\n💬 Example: ${details?.example || "No example available."}`;

    bot.sendMessage(chatId, response);
  } catch (err) {
    console.error("❌ Error:", err.message);
    bot.sendMessage(chatId, "⚠️ Something went wrong. Try again.");
  }
});
