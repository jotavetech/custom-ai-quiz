import { useEffect, useState } from "react";
import { QuestionsType } from "./types";

function Game({
  questions,
  prompt,
}: {
  questions: QuestionsType;
  prompt: string;
}) {
  const [hits, setHits] = useState(0);

  const [questionsState, setQuestionsState] = useState(questions);

  console.log(questions);

  const incrementHits = () => {
    setHits((prev) => prev + 1);
  };

  const verifyAnswer = (
    answer: string,
    correctAnswer: string,
    pergunta: string
  ) => {
    if (answer === correctAnswer) incrementHits();

    setQuestionsState((prev) =>
      prev.filter((question) => question.pergunta !== pergunta)
    );
  };

  useEffect(() => {
    setQuestionsState(questions);
    setHits(0);
  }, [questions]);

  return (
    <div className="bg-slate-500 p-6 max-w-full rounded-md shadow-md mt-10 m-3">
      <div className="flex justify-between">
        <h2 className="text-gray-200 mr-4">
          Perguntinhas sobre: <b>{prompt}</b>
        </h2>
        <p>Total: {hits}/10</p>
      </div>

      <h3 className="my-5 text-sm">Perguntas:</h3>

      <ul className="flex flex-col gap-2">
        {questionsState.length > 0 ? (
          questionsState.map((question, index) => (
            <li key={index} className="bg-slate-400 p-5 rounded-md">
              <p>
                {index + 1}. {question.pergunta}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  className="px-3 py-2 bg-slate-800 rounded-md hover:bg-slate-900"
                  onClick={() =>
                    verifyAnswer("a", question.resposta, question.pergunta)
                  }
                >
                  {question.alternativas.a}
                </button>
                <button
                  className="px-3 py-2 bg-slate-800 rounded-md hover:bg-slate-900"
                  onClick={() =>
                    verifyAnswer("b", question.resposta, question.pergunta)
                  }
                >
                  {question.alternativas.b}
                </button>
                <button
                  className="px-3 py-2 bg-slate-800 rounded-md hover:bg-slate-900"
                  onClick={() =>
                    verifyAnswer("c", question.resposta, question.pergunta)
                  }
                >
                  {question.alternativas.c}
                </button>
                <button
                  className="px-3 py-2 bg-slate-800 rounded-md hover:bg-slate-900"
                  onClick={() =>
                    verifyAnswer("d", question.resposta, question.pergunta)
                  }
                >
                  {question.alternativas.d}
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>Você acertou {hits}/10 perguntas!</p>
        )}
      </ul>
    </div>
  );
}

export default Game;
