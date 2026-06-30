import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RecommendationInput } from './types';
import RecommendationTab from './components/RecommendationTab';
import ContrastTab from './components/ContrastTab';
import FullTableTab from './components/FullTableTab';
import QuizTab from './components/QuizTab';
import { 
  Compass, 
  ArrowRightLeft, 
  Grid, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  Info,
  Ship
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'recommend' | 'contrast' | 'table' | 'quiz'>('recommend');

  // Default demo settings requested:
  // - 거래 방향: 수출 (export)
  // - 운송 방식: 해상운송 (ocean)
  // - 판매자가 국제 운송비 부담: 예 (true)
  // - 판매자가 운송 보험 가입: 예 (true)
  // - 판매자가 목적항까지 책임: 예 (true)
  // - 판매자가 수입통관까지 책임: 아니오 (false)
  const [input, setInput] = useState<RecommendationInput>({
    direction: 'export',
    transportMode: 'ocean',
    sellerPaysFreight: true,
    sellerPaysInsurance: true,
    sellerResponsibleToDestination: true,
    sellerPaysImportClearance: false,
  });

  const tabs = [
    { id: 'recommend', label: '맞춤 추천', icon: Compass },
    { id: 'contrast', label: '조건 대조', icon: ArrowRightLeft },
    { id: 'table', label: '전체 비교표', icon: Grid },
    { id: 'quiz', label: '기초 퀴즈', icon: Award },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between" id="app-wrapper">
      {/* HEADER SECTION - Styled with Brand Primary (#1E3A8A) */}
      <header className="bg-brand-primary text-white py-5 px-4 md:px-8 shadow-md" id="app-header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3.5" id="header-branding">
            <div className="bg-white text-brand-primary p-3 rounded-2xl shadow-md" id="icon-brand-wrapper">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black text-brand-primary bg-blue-50 px-2 py-0.5 rounded tracking-wide uppercase">초급 무역 실무 교육</span>
                <span className="text-xs text-blue-200 font-medium">Incoterms® 2020 Standard</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                인코텀즈 조건 추천 실무 앱
              </h1>
            </div>
          </div>

          {/* Sub description / Info banner */}
          <div className="hidden lg:flex items-center space-x-2 bg-blue-900/40 border border-blue-700/50 px-4 py-2.5 rounded-xl text-blue-100 text-sm max-w-md" id="header-info">
            <Info className="w-4 h-4 text-amber-300 shrink-0" />
            <p className="leading-normal font-light text-xs">
              해상 수출입의 핵심인 <strong className="text-white font-bold">FOB·CFR·CIF</strong> 차이와 11개 무역 거래 규정을 한눈에 정복합니다!
            </p>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex-1 space-y-6" id="app-main">
        
        {/* TABS CONTROLLER - minimal border aesthetic */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-1.5 flex flex-wrap md:flex-nowrap gap-1 w-full" id="tab-bar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3.5 px-4 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer select-none ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-md shadow-blue-100 font-extrabold'
                    : 'text-slate-500 hover:text-brand-primary hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB ACTIVE PANEL */}
        <div id="tab-panel-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'recommend' && (
                <RecommendationTab input={input} setInput={setInput} />
              )}
              {activeTab === 'contrast' && (
                <ContrastTab />
              )}
              {activeTab === 'table' && (
                <FullTableTab />
              )}
              {activeTab === 'quiz' && (
                <QuizTab />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* FOOTER ADVICE CLAUSE */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-6 px-4 md:px-8 mt-12 text-center text-sm md:text-base leading-relaxed" id="app-footer">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2" id="footer-content">
          <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
          <p className="font-medium text-slate-300">
            이 앱은 교육용 참고자료입니다. 실제 계약 전에는 거래 조건, 보험, 통관 책임을 전문가와 확인하세요.
          </p>
        </div>
        <p className="text-xs text-slate-500 mt-2">© 2026 인코텀즈 조건 추천 실무 교육 시스템. All rights reserved.</p>
      </footer>
    </div>
  );
}
