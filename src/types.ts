export type QuestionsType = Array<QuestionType>;

export type QuestionType = {
  pergunta: string;
  resposta: string;
  alternativas: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
};
