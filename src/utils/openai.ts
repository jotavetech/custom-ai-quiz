import OpenAI from "openai";
import { QuestionsType } from "../types";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  organization: "org-CA048LhBUDMIgsROtDP46Uhz",
  dangerouslyAllowBrowser: true,
});

const getQuestions = async (prompt: string) => {
  const apiPrompt = `Me retorne, em forma de TEXTO JSON, um array com 10 perguntas sobre o tema ${prompt}, quero esses objetos estruturados assim { pergunta, resposta, alternativas: {a, b, c, d}}, a resposta deve apenas conter a letra. Quero alternativas curtas.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: apiPrompt }],
  });

  const messages = completion.choices[0].message;

  const cleanString = messages.content!.replace(/\n|\s{2,}/g, "");

  return JSON.parse(cleanString) as QuestionsType;
};

export default getQuestions;
