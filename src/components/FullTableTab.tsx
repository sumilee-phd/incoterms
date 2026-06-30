import React, { useState } from 'react';
import { incotermsData } from '../data';
import { Grid, Filter, Shield, Info, Ship, ArrowRight, CheckCircle } from 'lucide-react';

export default function FullTableTab() {
  const [activeGroup, setActiveGroup] = useState<string>('all');

  const groups = [
    { id: 'all', label: '전체 조건 (11개)' },
    { id: 'E', label: 'E조건 (출발지 인도 - EXW)' },
    { id: 'F', label: 'F조건 (주운송비 구매자 부담 - FCA, FAS, FOB)' },
    { id: 'C', label: 'C조건 (주운송비 판매자 부담 - CFR, CIF, CPT, CIP)' },
    { id: 'D', label: 'D조건 (도착지 인도 - DAP, DPU, DDP)' }
  ];

  const getIncotermGroup = (code: string): string => {
    if (code.startsWith('E')) return 'E';
    if (code.startsWith('F')) return 'F';
    if (code.startsWith('C')) return 'C';
    if (code.startsWith('D')) return 'D';
    return '';
  };

  const filteredCodes = Object.keys(incotermsData).filter((code) => {
    if (activeGroup === 'all') return true;
    return getIncotermGroup(code) === activeGroup;
  });

  const getGroupBadgeStyle = (group: string) => {
    switch (group) {
      case 'E': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'F': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'C': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'D': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getGroupLabel = (group: string) => {
    switch (group) {
      case 'E': return 'E그룹 (출발지)';
      case 'F': return 'F그룹 (주운송비미지급)';
      case 'C': return 'C그룹 (주운송비지급)';
      case 'D': return 'D그룹 (도착지)';
      default: return '';
    }
  };

  return (
    <div className="space-y-6" id="table-tab-root">
      {/* Educational Guide Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" id="table-guide-card">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Grid className="w-5 h-5 text-brand-primary" />
            인코텀즈 2020 마스터 비교표
          </h2>
          <p className="text-sm text-slate-500">
            인코텀즈의 11개 핵심 조건을 한눈에 보며 의무와 인도 책임 분기점을 직관적으로 비교 분석할 수 있는 종합 그리드입니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> E조건: 공장인도</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> F조건: 수출지선적인도</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span> C조건: 운송비부담인도</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span> D조건: 도착지인도</span>
        </div>
      </div>

      {/* Group Filters */}
      <div className="flex flex-wrap gap-2" id="table-filters">
        {groups.map((group) => (
          <button
            key={group.id}
            id={`btn-filter-${group.id}`}
            onClick={() => setActiveGroup(group.id)}
            className={`py-2 px-4 rounded-full text-sm font-semibold border transition-all cursor-pointer ${
              activeGroup === group.id
                ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* Main Grid Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden" id="full-table-wrapper">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm" id="full-incoterms-table">
            <thead>
              <tr className="bg-brand-primary text-white border-b border-blue-900 font-bold text-base">
                <th className="py-4 px-4 text-center w-[10%]">그룹 / 조건</th>
                <th className="py-4 px-4 w-[12%]">사용 운송방식</th>
                <th className="py-4 px-4 w-[10%]">운송비 부담</th>
                <th className="py-4 px-4 w-[10%]">보험 부담</th>
                <th className="py-4 px-4 w-[20%]">위험 이전 시점 (인도 장소)</th>
                <th className="py-4 px-4 w-[9%] text-center">수출통관</th>
                <th className="py-4 px-4 w-[9%] text-center">수입통관</th>
                <th className="py-4 px-4 w-[20%]">설명 및 실무 핵심</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filteredCodes.map((code) => {
                const item = incotermsData[code];
                const group = getIncotermGroup(code);

                return (
                  <tr key={code} className="hover:bg-slate-50/70 transition-colors" id={`row-${code}`}>
                    {/* 조건 코드 & 그룹 배지 */}
                    <td className="py-4 px-4 text-center font-bold border-r border-slate-100">
                      <div className="flex flex-col items-center justify-center space-y-1">
                        <span className="text-xl font-black text-slate-900 tracking-tight">{item.code}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getGroupBadgeStyle(group)}`}>
                          {group}조건
                        </span>
                      </div>
                    </td>

                    {/* 사용 운송방식 */}
                    <td className="py-4 px-4 font-semibold text-slate-900 text-sm">
                      <span className="inline-flex items-center gap-1">
                        {item.transportMode.includes('해상') ? '🚢' : '📦'} {item.transportMode}
                      </span>
                    </td>

                    {/* 운송비 부담 */}
                    <td className="py-4 px-4 text-sm font-semibold">
                      <span className={`px-2.5 py-1 rounded-full text-xs ${
                        item.freightPaidBy === '판매자' 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : item.freightPaidBy === '구매자'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-50 text-slate-600'
                      }`}>
                        {item.freightPaidBy}
                      </span>
                    </td>

                    {/* 보험 부담 */}
                    <td className="py-4 px-4 text-sm font-semibold">
                      <span className={`px-2.5 py-1 rounded-full text-xs ${
                        item.insurancePaidBy === '판매자' 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : item.insurancePaidBy === '구매자'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-50 text-slate-600'
                      }`}>
                        {item.insurancePaidBy}
                      </span>
                    </td>

                    {/* 위험 이전 시점 */}
                    <td className="py-4 px-4 text-xs font-medium leading-relaxed text-slate-800">
                      {item.riskTransfer}
                    </td>

                    {/* 수출통관 */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                        item.exportClearance === '판매자' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.exportClearance}
                      </span>
                    </td>

                    {/* 수입통관 */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                        item.importClearance === '판매자' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.importClearance}
                      </span>
                    </td>

                    {/* 한 줄 설명 */}
                    <td className="py-4 px-4 text-xs font-medium text-slate-600 leading-relaxed border-l border-slate-100">
                      <div className="font-semibold text-slate-900 text-[13px] mb-0.5">{item.oneLineExplanation}</div>
                      <div className="text-[11px] text-brand-primary font-normal">※ {item.fullName}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
