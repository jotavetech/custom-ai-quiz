import { useState } from "react";
import getQuestions from "./utils/openai";
import { QuestionsType } from "./types";
import Game from "./Game";

function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsType>([]);

  const sendRequestOpenAI = async () => {
    if (!prompt) return;
    setLoading(true);

    try {
      const result = await getQuestions(prompt);
      setQuestions(result);

      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-600 text-white text-xl min-h-full flex flex-col items-center">
      <header className="flex justify-center py-10 text-2xl">
        <h1>Bem-vindo(a) ao Perguntinhas!</h1>
      </header>
      <div>
        <div className="flex flex-col w-52 items-center gap-2">
          <label htmlFor="prompt">Tema das perguntas</label>
          <input
            type="text"
            id="prompt"
            className="bg-slate-500 border-2 border-black rounded-md outline-none px-2"
            maxLength={30}
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          />
          <button
            className="bg-slate-700 w-48 h-12 rounded-md hover:bg-slate-800"
            onClick={sendRequestOpenAI}
          >
            {loading ? "Carregando..." : "Gerar perguntas"}
          </button>
        </div>
      </div>
      <div>
        {questions.length > 0 && <Game questions={questions} prompt={prompt} />}
      </div>
    </div>
  );
}

export default App;
