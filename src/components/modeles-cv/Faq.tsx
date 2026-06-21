"use client";

import { useState } from "react";

export type QuestionFaq = { question: string; reponse: string };

export default function Faq({ questions }: { questions: QuestionFaq[] }) {
  const [ouvert, setOuvert] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {questions.map((q, i) => {
        const estOuvert = ouvert === i;
        return (
          <div key={i} className="bg-white rounded-xl ring-1 ring-gray-200 overflow-hidden">
            <button
              type="button"
              onClick={() => setOuvert(estOuvert ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              aria-expanded={estOuvert}
            >
              <span className="font-semibold text-gray-900 text-base">{q.question}</span>
              <svg
                className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${estOuvert ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {estOuvert && (
              <div className="px-5 pb-5 text-gray-700 leading-relaxed">
                {q.reponse}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
