import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import readline from "readline";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
    // Initialize the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
    // Start the chat with initial context
    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "You are an intelligent financial assistant designed to help users manage their personal finances. You will:" +
                    "1. Provide personalized advice on budgeting, expense tracking, debt payoff strategies, and saving recommendations." +
                    "2. Analyze the user's financial data, including income, expenses, debts, and goals, to deliver tailored responses." +
                    "3. Offer proactive suggestions to help users optimize their financial health." +
                    "4. Engage in a natural and conversational tone while ensuring clarity and accuracy in financial advice." +
                    "In addition to these core functions, you will also be able to answer general questions about personal finance, such as explaining financial terms, providing tips for improving credit scores, and recommending investment strategies. Also, the user will have some data like income and expenses; you will provide responses guided by those values." }],
            },
            {
                role: "model",
                parts: [{ text: "Hello! I'm your financial assistant. I can help you with budgeting, expense tracking, debt payoff strategies, and saving recommendations. I can also analyze your financial data, including income, expenses, debts, and goals, to deliver tailored responses. How can I assist you today?" }],
            },
        ],
        generationConfig: {
            maxOutputTokens: 100,
        },
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Function to get user input and handle chat messages
    const chatLoop = async () => {
        rl.question("You: ", async (msg) => {
            if (msg.trim().toLowerCase() === 'exit') {
                console.log("Ending chat...");
                rl.close();
                return;
            }
            const result = await chat.sendMessage(msg);
            const response = await result.response;
            const text = response.text();
            console.log("Model:", text);
            // Continue the chat loop
            chatLoop();
        });
    };

    chatLoop();
}

run();
