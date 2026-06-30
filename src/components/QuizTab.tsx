import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { quizQuestions } from '../data';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  RefreshCw, 
  ArrowRight, 
  BookOpen, 
  Trophy 
} from 'lucide-react';

export default function QuizTab() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [history, setHistory] = useState<{ questionId: number; chosenIdx: number; isCorrect: boolean }[]>([]);

  const currentQuestion = quizQuestions[currentIdx];

  const handleOptionClick = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleNext = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setHistory([]);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setHistory((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        chosenIdx: selectedOption,
        isCorrect
      }
    ]);

    setIsSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6" id="quiz-tab-root">
      {/* Quiz Progress & Score Header */}
      {!quizFinished && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 flex items-center justify-between" id="quiz-progress-header">
          <div className="flex items-center space-x-3">
            <span className="bg-blue-100 text-brand-primary px-3 py-1 rounded-full text-xs font-black">
              문제 {currentIdx + 1} / {quizQuestions.length}
            </span>
            <div className="w-36 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
              <div 
                className="bg-brand-primary h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
            <span>현재 점수:</span>
            <span className="text-brand-primary text-base font-black">{score}</span>
            <span className="text-slate-400">/ {quizQuestions.length}</span>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 md:p-8 space-y-6"
            id={`quiz-card-${currentIdx}`}
          >
            {/* Question description */}
            <div className="space-y-3" id="quiz-question-box">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-brand-primary shrink-0" />
                <span className="text-xs font-black tracking-wider text-brand-primary uppercase">INCOTERMS 실무 퀴즈</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Multiple choice list */}
            <div className="space-y-3" id="quiz-options-group">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectAns = idx === currentQuestion.correctAnswerIndex;

                let btnStyle = 'border-slate-200 hover:border-blue-200 hover:bg-slate-50/50';
                let icon = null;

                if (isSubmitted) {
                  if (isCorrectAns) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    icon = <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />;
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
                    icon = <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
                  } else {
                    btnStyle = 'border-slate-200 opacity-60';
                  }
                } else {
                  if (isSelected) {
                    btnStyle = 'border-brand-primary bg-blue-50/50 text-brand-primary ring-2 ring-brand-primary/20 font-bold';
                  }
                }

                return (
                  <button
                    key={idx}
                    id={`btn-option-${idx}`}
                    onClick={() => handleOptionClick(idx)}
                    disabled={isSubmitted}
                    className={`w-full py-4 px-5 text-left rounded-xl border text-base transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        isSelected 
                          ? 'bg-brand-primary text-white' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {idx + 1}
                      </span>
                      <span>{option}</span>
                    </div>
                    {icon}
                  </button>
                );
              })}
            </div>

            {/* Submission & Next Controllers */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between" id="quiz-controllers">
              <div>
                {isSubmitted && (
                  <div className={`flex items-center gap-1.5 font-bold text-base ${
                    selectedOption === currentQuestion.correctAnswerIndex ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {selectedOption === currentQuestion.correctAnswerIndex ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>정답입니다! 🎉</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5" />
                        <span>오답입니다. 다시 공부해 볼까요?</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {!isSubmitted ? (
                <button
                  id="btn-quiz-submit"
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className={`py-3 px-6 rounded-xl font-bold transition-all text-base flex items-center gap-2 cursor-pointer ${
                    selectedOption !== null
                      ? 'bg-brand-primary hover:bg-blue-800 text-white shadow-md'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  답안 제출하기
                </button>
              ) : (
                <button
                  id="btn-quiz-next"
                  onClick={handleNext}
                  className="bg-brand-primary hover:bg-blue-800 text-white py-3 px-6 rounded-xl font-bold transition-all text-base flex items-center gap-2 shadow-md cursor-pointer"
                >
                  {currentIdx === quizQuestions.length - 1 ? '퀴즈 결과 보기' : '다음 문제 이동'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Explanation box */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2.5"
                id="quiz-explanation-box"
              >
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <BookOpen className="w-4 h-4 text-brand-primary" />
                  <span>실무 교육 해설</span>
                </div>
                <p className="text-slate-700 text-base leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* FINAL QUIZ REPORT CARD */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6"
            id="quiz-report-card"
          >
            <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center border-4 border-blue-100" id="trophy-wrapper">
              <Trophy className="w-12 h-12 text-brand-primary" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-800">퀴즈 학습 완료!</h2>
              <p className="text-slate-500 font-medium text-lg">인코텀즈 2020 실무 조건 퀴즈 성적표</p>
            </div>

            {/* Score ring */}
            <div className="inline-block bg-slate-50 border border-slate-200 rounded-2xl p-6" id="score-block">
              <div className="text-6xl font-black text-brand-primary">
                {score} <span className="text-slate-400 text-3xl font-normal">/ {quizQuestions.length}</span>
              </div>
              <p className="text-sm font-bold text-slate-600 mt-2">
                {score === 5 
                  ? '🏆 축하합니다! 무역 실무 우등생 등극! 만점입니다.' 
                  : score >= 3
                    ? '👍 아주 훌륭합니다! 기본기가 탄탄하군요.'
                    : '💡 아직 헷갈리시나요? 본 비교표를 보며 복습해 보세요!'}
              </p>
            </div>

            {/* Incorrect summaries list for reviewing */}
            <div className="text-left space-y-3 max-w-xl mx-auto" id="review-panel">
              <h4 className="text-sm font-bold text-slate-600 tracking-wider uppercase border-b pb-2">나의 퀴즈 오답 복습</h4>
              <div className="space-y-2">
                {quizQuestions.map((q, qidx) => {
                  const submission = history.find((h) => h.questionId === q.id);
                  const isCorrect = submission?.isCorrect || false;

                  return (
                    <div 
                      key={q.id} 
                      className={`p-3 rounded-lg border text-sm flex items-center justify-between gap-3 ${
                        isCorrect ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'
                      }`}
                    >
                      <span className="truncate font-semibold text-slate-700">
                        {q.id}번. {q.question.substring(0, 35)}...
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isCorrect ? '정답' : '오답'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              id="btn-quiz-reset"
              onClick={handleReset}
              className="mt-4 inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md text-base cursor-pointer"
            >
              <RefreshCw className="w-5 h-5" />
              퀴즈 다시 도전하기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
