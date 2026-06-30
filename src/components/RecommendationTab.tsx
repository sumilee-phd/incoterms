import React from 'react';
import { motion } from 'motion/react';
import { RecommendationInput, IncotermsDetail } from '../types';
import { incotermsData } from '../data';
import { 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  Ship, 
  Plane, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Scale, 
  Compass,
  ArrowRightLeft
} from 'lucide-react';

interface RecommendationTabProps {
  input: RecommendationInput;
  setInput: React.Dispatch<React.SetStateAction<RecommendationInput>>;
}

export function recommendIncoterms(input: RecommendationInput): string {
  const {
    transportMode,
    sellerPaysFreight,
    sellerPaysInsurance,
    sellerResponsibleToDestination,
    sellerPaysImportClearance
  } = input;

  // 1. 판매자가 수입통관까지 책임지면 -> DDP
  if (sellerPaysImportClearance) {
    return 'DDP';
  }

  // 2. 해상운송 + 판매자 운송비 부담 + 판매자 보험 가입 + 수입통관 미부담 -> CIF 1순위 추천
  // (유저 시연 기본 입력값을 만족시키며 CIF 추천)
  if (transportMode === 'ocean' && sellerPaysFreight && sellerPaysInsurance && !sellerPaysImportClearance) {
    return 'CIF';
  }

  // 3. 해상운송 + 판매자 운송비 부담 + 보험 미부담 -> CFR
  if (transportMode === 'ocean' && sellerPaysFreight && !sellerPaysInsurance && !sellerPaysImportClearance) {
    return 'CFR';
  }

  // 4. 목적지까지 판매자 위험/책임이 크고 수입통관은 구매자 책임 -> DAP (또는 DPU)
  if (sellerResponsibleToDestination) {
    return 'DAP';
  }

  // 5. 운송비 판매자 부담인 경우
  if (sellerPaysFreight) {
    if (transportMode === 'ocean') {
      return sellerPaysInsurance ? 'CIF' : 'CFR';
    } else {
      return sellerPaysInsurance ? 'CIP' : 'CPT';
    }
  }

  // 6. 운송비 구매자 부담인 경우 (판매자 책임 최소화 계열)
  if (transportMode === 'ocean') {
    return 'FOB';
  } else {
    // 복합/항공 등
    // 모든 운송에서 운송비 구매자 부담이고 판매자 책임을 최소화(수출통관은 판매자가 함)하면 FCA
    // 만약 판매자가 수출통관마저 안 하고 마당에서 다 해결하면 EXW 이지만, 기본 FCA 권장
    return 'FCA';
  }
}

export default function RecommendationTab({ input, setInput }: RecommendationTabProps) {
  const recommendedCode = recommendIncoterms(input);
  const detail: IncotermsDetail = incotermsData[recommendedCode] || incotermsData['CIF'];

  const handleToggle = (key: keyof RecommendationInput) => {
    setInput((prev) => ({
      ...prev,
      [key]: !prev[key] as any,
    }));
  };

  const handleSelectDirection = (direction: 'export' | 'import') => {
    setInput((prev) => ({ ...prev, direction }));
  };

  const handleSelectMode = (transportMode: RecommendationInput['transportMode']) => {
    setInput((prev) => ({ ...prev, transportMode }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="rec-tab-root">
      {/* LEFT: Input Panel */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 space-y-6" id="input-panel">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100" id="input-panel-header">
          <Compass className="w-5 h-5 text-brand-primary" id="icon-compass" />
          <h2 className="text-xl font-bold text-slate-800" id="input-panel-title">거래 조건 입력</h2>
        </div>

        {/* 1. 거래 방향 */}
        <div className="space-y-2" id="input-direction-group">
          <label className="text-base font-semibold text-slate-700 flex items-center justify-between">
            <span>1. 거래 방향 (수출입)</span>
            <span className="text-xs text-brand-primary bg-blue-50 px-2 py-0.5 rounded font-normal">필수</span>
          </label>
          <div className="grid grid-cols-2 gap-3" id="input-direction-buttons">
            <button
              id="btn-direction-export"
              onClick={() => handleSelectDirection('export')}
              className={`py-3 px-4 rounded-xl font-semibold border transition-all text-base text-center cursor-pointer ${
                input.direction === 'export'
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm shadow-blue-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              수출 (Export)
            </button>
            <button
              id="btn-direction-import"
              onClick={() => handleSelectDirection('import')}
              className={`py-3 px-4 rounded-xl font-semibold border transition-all text-base text-center cursor-pointer ${
                input.direction === 'import'
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm shadow-blue-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              수입 (Import)
            </button>
          </div>
          <p className="text-xs text-slate-500" id="desc-direction">※ 수출자(판매자)와 수입자(구매자) 중 사용자의 소속 기준을 설정합니다.</p>
        </div>

        {/* 2. 운송 방식 */}
        <div className="space-y-2" id="input-mode-group">
          <label className="text-base font-semibold text-slate-700 flex items-center justify-between">
            <span>2. 운송 방식</span>
            <span className="text-xs text-brand-primary bg-blue-50 px-2 py-0.5 rounded font-normal">필수</span>
          </label>
          <div className="grid grid-cols-2 gap-2" id="input-mode-buttons">
            {(['ocean', 'air', 'multimodal', 'undecided'] as const).map((mode) => {
              const labelMap = {
                ocean: '해상운송 🚢',
                air: '항공운송 ✈️',
                multimodal: '복합운송 🚛',
                undecided: '미정 ❓',
              };
              return (
                <button
                  key={mode}
                  id={`btn-mode-${mode}`}
                  onClick={() => handleSelectMode(mode)}
                  className={`py-2.5 px-3 rounded-xl font-medium border text-sm transition-all text-center cursor-pointer ${
                    input.transportMode === mode
                      ? 'bg-brand-primary text-white border-brand-primary shadow-sm shadow-blue-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {labelMap[mode]}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-slate-500" id="desc-mode">※ 인코텀즈는 운송수단 종류에 따라 쓸 수 있는 조건이 나뉩니다.</p>
        </div>

        {/* 3. 판매자 국제 운송비 부담 */}
        <div className="space-y-2" id="input-freight-group">
          <label className="text-base font-semibold text-slate-700 flex items-center justify-between">
            <span>3. 판매자가 국제 운송비를 부담하는가?</span>
          </label>
          <div className="grid grid-cols-2 gap-3" id="input-freight-buttons">
            <button
              id="btn-freight-yes"
              onClick={() => setInput(prev => ({ ...prev, sellerPaysFreight: true }))}
              className={`py-2 px-4 rounded-xl font-medium border text-sm transition-all cursor-pointer ${
                input.sellerPaysFreight
                  ? 'bg-blue-50 text-brand-primary border-blue-300 font-bold ring-2 ring-brand-primary/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              예 (판매자 부담)
            </button>
            <button
              id="btn-freight-no"
              onClick={() => setInput(prev => ({ ...prev, sellerPaysFreight: false }))}
              className={`py-2 px-4 rounded-xl font-medium border text-sm transition-all cursor-pointer ${
                !input.sellerPaysFreight
                  ? 'bg-blue-50 text-brand-primary border-blue-300 font-bold ring-2 ring-brand-primary/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              아니오 (구매자 부담)
            </button>
          </div>
          <p className="text-xs text-slate-500">
            {input.sellerPaysFreight 
              ? "👉 C조건(CFR, CIF, CIP, CPT) 또는 D조건(DAP, DDP) 계열로 유도됩니다." 
              : "👉 F조건(FOB, FCA) 또는 E조건(EXW) 계열로 유도됩니다."}
          </p>
        </div>

        {/* 4. 판매자 운송 보험 가입 */}
        <div className="space-y-2" id="input-insurance-group">
          <label className="text-base font-semibold text-slate-700 flex items-center justify-between">
            <span>4. 판매자가 운송 보험을 가입하는가?</span>
          </label>
          <div className="grid grid-cols-2 gap-3" id="input-insurance-buttons">
            <button
              id="btn-insurance-yes"
              onClick={() => setInput(prev => ({ ...prev, sellerPaysInsurance: true }))}
              className={`py-2 px-4 rounded-xl font-medium border text-sm transition-all cursor-pointer ${
                input.sellerPaysInsurance
                  ? 'bg-blue-50 text-brand-primary border-blue-300 font-bold ring-2 ring-brand-primary/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              예 (보험 포함)
            </button>
            <button
              id="btn-insurance-no"
              onClick={() => setInput(prev => ({ ...prev, sellerPaysInsurance: false }))}
              className={`py-2 px-4 rounded-xl font-medium border text-sm transition-all cursor-pointer ${
                !input.sellerPaysInsurance
                  ? 'bg-blue-50 text-brand-primary border-blue-300 font-bold ring-2 ring-brand-primary/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              아니오 (보험 미포함)
            </button>
          </div>
          <p className="text-xs text-slate-500">※ CIF, CIP 등은 판매자가 구매자를 위해 운송 보험을 들 의무가 부여됩니다.</p>
        </div>

        {/* 5. 판매자 목적지까지 책임 */}
        <div className="space-y-2" id="input-responsibility-group">
          <label className="text-base font-semibold text-slate-700 flex items-center justify-between">
            <span>5. 판매자가 목적지 또는 목적항까지 책임(위험)을 지는가?</span>
          </label>
          <div className="grid grid-cols-2 gap-3" id="input-responsibility-buttons">
            <button
              id="btn-responsibility-yes"
              onClick={() => setInput(prev => ({ ...prev, sellerResponsibleToDestination: true }))}
              className={`py-2 px-4 rounded-xl font-medium border text-sm transition-all cursor-pointer ${
                input.sellerResponsibleToDestination
                  ? 'bg-blue-50 text-brand-primary border-blue-300 font-bold ring-2 ring-brand-primary/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              예 (목적지 인도)
            </button>
            <button
              id="btn-responsibility-no"
              onClick={() => setInput(prev => ({ ...prev, sellerResponsibleToDestination: false }))}
              className={`py-2 px-4 rounded-xl font-medium border text-sm transition-all cursor-pointer ${
                !input.sellerResponsibleToDestination
                  ? 'bg-blue-50 text-brand-primary border-blue-300 font-bold ring-2 ring-brand-primary/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              아니오 (출발지/선적항 인도)
            </button>
          </div>
          <p className="text-xs text-slate-500">
            {input.sellerResponsibleToDestination 
              ? "👉 D조건(DAP, DPU, DDP)으로 분류되어 운송 도중 사고 위험을 판매자가 끝까지 집니다." 
              : "👉 E/F/C조건으로 분류되어 선적을 완료하면 위험 부담이 구매자에게 넘어갑니다."}
          </p>
        </div>

        {/* 6. 판매자 수입통관까지 책임 */}
        <div className="space-y-2" id="input-clearance-group">
          <label className="text-base font-semibold text-slate-700 flex items-center justify-between">
            <span>6. 판매자가 수입통관까지 책임지는가?</span>
          </label>
          <div className="grid grid-cols-2 gap-3" id="input-clearance-buttons">
            <button
              id="btn-clearance-yes"
              onClick={() => setInput(prev => ({ ...prev, sellerPaysImportClearance: true }))}
              className={`py-2 px-4 rounded-xl font-medium border text-sm transition-all cursor-pointer ${
                input.sellerPaysImportClearance
                  ? 'bg-blue-50 text-brand-primary border-blue-300 font-bold ring-2 ring-brand-primary/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              예 (수입 관세/부가세 해결)
            </button>
            <button
              id="btn-clearance-no"
              onClick={() => setInput(prev => ({ ...prev, sellerPaysImportClearance: false }))}
              className={`py-2 px-4 rounded-xl font-medium border text-sm transition-all cursor-pointer ${
                !input.sellerPaysImportClearance
                  ? 'bg-blue-50 text-brand-primary border-blue-300 font-bold ring-2 ring-brand-primary/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              아니오 (수입자 자체 통관)
            </button>
          </div>
          <p className="text-xs text-slate-500">
            {input.sellerPaysImportClearance 
              ? "👉 가장 강력한 의무인 DDP 조건으로 결정됩니다." 
              : "👉 수입지 통관 및 세금 납부는 구매자가 전담합니다."}
          </p>
        </div>
      </div>

      {/* RIGHT: Recommendation Results & Comparison Grid */}
      <div className="lg:col-span-7 space-y-8" id="result-panel">
        
        {/* BEST MATCH CARD */}
        <motion.div 
          layout
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-brand-primary to-slate-900 text-white rounded-2xl shadow-xl border border-slate-800 overflow-hidden"
          id="best-match-card"
        >
          {/* Header Bar */}
          <div className="bg-white/10 px-6 py-3.5 flex justify-between items-center border-b border-white/10" id="match-card-header">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span className="text-sm font-bold tracking-wider text-amber-300 uppercase">BEST MATCH 추천 조건</span>
            </div>
            <span className="text-xs font-mono bg-black/30 px-2.5 py-1 rounded-full text-blue-200 border border-white/10">
              Incoterms 2020
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-6" id="match-card-body">
            {/* Title & Abbreviation */}
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 border-b border-white/10 pb-5">
              <div>
                <h1 className="text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
                  {detail.code}
                </h1>
                <p className="text-lg text-blue-200 font-medium mt-1">
                  {detail.fullName}
                </p>
              </div>
              <span className="text-sm px-3 py-1.5 bg-white/15 rounded-lg text-white font-semibold backdrop-blur-sm self-start md:self-auto">
                🚢 {detail.transportMode}
              </span>
            </div>

            {/* 추천 이유 */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                추천 이유
              </h3>
              <p className="text-base leading-relaxed text-slate-100 bg-white/5 p-4 rounded-xl border border-white/5">
                {detail.recommendedReason}
              </p>
            </div>

            {/* 비용 및 위험 분담 구조 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 판매자 부담 */}
              <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-4 space-y-2">
                <span className="inline-block text-xs font-bold text-blue-200 bg-blue-500/20 px-2 py-0.5 rounded">판매자 부담 (Seller)</span>
                <ul className="text-sm space-y-1.5 text-slate-200">
                  {detail.sellerBurden.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 구매자 부담 */}
              <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-4 space-y-2">
                <span className="inline-block text-xs font-bold text-amber-200 bg-amber-500/20 px-2 py-0.5 rounded">구매자 부담 (Buyer)</span>
                <ul className="text-sm space-y-1.5 text-slate-200">
                  {detail.buyerBurden.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 위험 이전 시점 */}
            <div className="bg-black/20 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-blue-300 block uppercase tracking-wider">위험 이전 시점 (Risk Transfer)</span>
                <p className="text-sm font-semibold text-white mt-1">{detail.riskTransfer}</p>
              </div>
              <span className="text-xs font-mono bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded text-amber-300 shrink-0 self-start sm:self-auto">
                위험 이전 분기점 ⚡
              </span>
            </div>

            {/* 주의사항 */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-1.5">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                초급자 실무 주의사항
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed">
                {detail.precautions}
              </p>
            </div>
          </div>
        </motion.div>

        {/* COMPARISON CARDS (FOB, CFR, CIF) */}
        <div className="space-y-4" id="essential-trio-section">
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-brand-primary" />
            <h3 className="text-lg font-bold text-slate-800">해상 핵심 3대 조건 한눈에 비교 (FOB · CFR · CIF)</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="essential-trio-grid">
            {/* FOB */}
            <div className={`p-5 rounded-xl border bg-white shadow-sm transition-all flex flex-col justify-between ${
              recommendedCode === 'FOB' ? 'border-brand-primary ring-2 ring-brand-primary/10 font-medium' : 'border-slate-200'
            }`}>
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <h4 className="text-xl font-black text-slate-800 flex items-center gap-1.5">
                    FOB
                    <span className="text-xs font-normal text-slate-400 font-mono">Free On Board</span>
                  </h4>
                  {recommendedCode === 'FOB' && (
                    <span className="text-xs font-bold text-brand-primary bg-blue-50 px-2 py-0.5 rounded">추천됨</span>
                  )}
                </div>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-start gap-1">
                    <span className="text-brand-primary font-bold">•</span>
                    <span>판매자는 <strong>선적항에서 본선(배)에 물품을 싣는 것</strong>까지만 책임집니다.</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-brand-primary font-bold">•</span>
                    <span><strong>국제 운송비와 보험료는 구매자가 전부 부담</strong>하고 스스로 준비해야 합니다.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100/50 text-xs text-brand-primary bg-blue-50/50 p-2 rounded text-center font-semibold">
                구매자가 배편을 주도할 때 적합!
              </div>
            </div>

            {/* CFR */}
            <div className={`p-5 rounded-xl border bg-white shadow-sm transition-all flex flex-col justify-between ${
              recommendedCode === 'CFR' ? 'border-brand-primary ring-2 ring-brand-primary/10 font-medium' : 'border-slate-200'
            }`}>
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <h4 className="text-xl font-black text-slate-800 flex items-center gap-1.5">
                    CFR
                    <span className="text-xs font-normal text-slate-400 font-mono">Cost & Freight</span>
                  </h4>
                  {recommendedCode === 'CFR' && (
                    <span className="text-xs font-bold text-brand-primary bg-blue-50 px-2 py-0.5 rounded">추천됨</span>
                  )}
                </div>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-start gap-1">
                    <span className="text-brand-primary font-bold">•</span>
                    <span><strong>판매자가 목적항까지 운송비(운임)를 부담</strong>하여 배를 섭외합니다.</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-brand-primary font-bold">•</span>
                    <span><strong>보험 가입은 구매자</strong>가 직접 해야 하며, 사고 리스크도 선적 후 구매자 몫입니다.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100/50 text-xs text-amber-700 bg-amber-50/50 p-2 rounded text-center font-semibold">
                운송비만 판매자가 낼 때 적합!
              </div>
            </div>

            {/* CIF */}
            <div className={`p-5 rounded-xl border bg-white shadow-sm transition-all flex flex-col justify-between ${
              recommendedCode === 'CIF' ? 'border-brand-primary ring-2 ring-brand-primary/10 font-medium' : 'border-slate-200'
            }`}>
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <h4 className="text-xl font-black text-slate-800 flex items-center gap-1.5">
                    CIF
                    <span className="text-xs font-normal text-slate-400 font-mono">Cost, Ins. & Freight</span>
                  </h4>
                  {recommendedCode === 'CIF' && (
                    <span className="text-xs font-bold text-brand-primary bg-blue-50 px-2 py-0.5 rounded">추천됨</span>
                  )}
                </div>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-start gap-1">
                    <span className="text-brand-primary font-bold">•</span>
                    <span><strong>판매자가 목적항까지 운송비와 보험을 모두 부담</strong>합니다.</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-brand-primary font-bold">•</span>
                    <span>해상운송의 최고 인기 조건으로 <strong>보험까지 포함된 편리한 거래</strong> 방식입니다.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100/50 text-xs text-emerald-700 bg-emerald-50/50 p-2 rounded text-center font-semibold">
                전통적인 해상 종합 완결형!
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
