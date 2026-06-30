import React, { useState } from 'react';
import { motion } from 'motion/react';
import { incotermsData, comparisonItems } from '../data';
import { Scale, ArrowRightLeft, BookOpen, AlertCircle } from 'lucide-react';

export default function ContrastTab() {
  const [cond1, setCond1] = useState<string>('FOB');
  const [cond2, setCond2] = useState<string>('CIF');

  const data1 = incotermsData[cond1];
  const data2 = incotermsData[cond2];

  // Generate a dynamic, easy-to-understand educational summary
  const generateSummaryText = (c1: string, c2: string) => {
    if (c1 === 'FOB' && c2 === 'CIF') {
      return 'FOB는 구매자(수입자)가 운송선박과 보험을 직접 준비하고 운임을 부담하며, CIF는 반대로 판매자(수출자)가 목적항까지 가는데 필요한 운송과 보험을 모두 준비하고 지급합니다. 단, 두 조건 모두 해상운송 전용이며 물건 파손 시의 위험 책임 자체는 동일하게 선적항에서 배 위에 적재 완료되는 시점에 이전됩니다.';
    }
    if (c1 === 'CIF' && c2 === 'FOB') {
      return 'CIF는 판매자(수출자)가 목적항까지 가는데 필요한 운송과 보험을 모두 준비하고 지급하며, FOB는 반대로 구매자(수입자)가 운송선박과 보험을 직접 준비하고 운임을 부담합니다. 단, 두 조건 모두 해상운송 전용이며 물건 파손 시의 위험 책임 자체는 동일하게 선적항에서 배 위에 적재 완료되는 시점에 이전됩니다.';
    }

    const item1 = incotermsData[c1];
    const item2 = incotermsData[c2];

    let freightText = '';
    if (item1.freightPaidBy === item2.freightPaidBy) {
      freightText = `두 조건 모두 운송비 부담 주체는 [${item1.freightPaidBy}]로 동일합니다.`;
    } else {
      freightText = `운송비의 경우, ${c1}은 [${item1.freightPaidBy}]가 부담하지만, ${c2}는 [${item2.freightPaidBy}]가 지불합니다.`;
    }

    let insuranceText = '';
    if (item1.insurancePaidBy === item2.insurancePaidBy) {
      insuranceText = `보험 가입의 경우, 두 조건 모두 [${item1.insurancePaidBy}]의 책임입니다.`;
    } else {
      insuranceText = `보험 부담은 ${c1}이 [${item1.insurancePaidBy}] 책임인 반면, ${c2}는 [${item2.insurancePaidBy}] 책임으로 다릅니다.`;
    }

    let riskText = '';
    if (item1.riskTransfer === item2.riskTransfer) {
      riskText = `위험 이전 시점은 두 조건 모두 "${item1.riskTransfer}"로 같습니다.`;
    } else {
      riskText = `리스크 분기점(위험 이전)은 다른데요, ${c1}은 [${item1.riskTransfer}]에 이전되지만, ${c2}는 [${item2.riskTransfer}]에 이전됩니다.`;
    }

    return `${c1}과 ${c2} 조건을 대조해 드립니다. ${freightText} ${insuranceText} ${riskText} 실제 무역 거래 시 두 조건의 특징을 명확히 대조하여 알맞은 인코텀즈를 고르는 것이 분쟁을 예방하는 지름길입니다.`;
  };

  const codeList = Object.keys(incotermsData);

  return (
    <div className="space-y-6" id="contrast-tab-root">
      {/* Tab Header with visual explanation */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6" id="contrast-selector-card">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6" id="contrast-selector-row">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-slate-800 flex items-center justify-center md:justify-start gap-2">
              <ArrowRightLeft className="w-5 h-5 text-brand-primary" />
              조건 대조 분석기
            </h2>
            <p className="text-sm text-slate-500">인코텀즈 11개 조건 중 2개를 자유롭게 골라 책임 영역과 실무 차이를 즉시 대조해 보세요.</p>
          </div>

          {/* Selective Dropdowns */}
          <div className="flex items-center space-x-4 w-full md:w-auto justify-center" id="selectors-container">
            {/* Condition 1 */}
            <div className="flex flex-col space-y-1.5" id="group-cond1">
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">조건 A</span>
              <select
                id="select-cond1"
                value={cond1}
                onChange={(e) => setCond1(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 font-bold text-slate-800 text-lg focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
              >
                {codeList.map((code) => (
                  <option key={code} value={code}>
                    {code} ({incotermsData[code].fullName})
                  </option>
                ))}
              </select>
            </div>

            {/* Vs icon */}
            <div className="text-slate-400 font-extrabold text-lg pt-5" id="vs-separator">VS</div>

            {/* Condition 2 */}
            <div className="flex flex-col space-y-1.5" id="group-cond2">
              <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">조건 B</span>
              <select
                id="select-cond2"
                value={cond2}
                onChange={(e) => setCond2(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 font-bold text-slate-800 text-lg focus:outline-none focus:ring-2 focus:ring-brand-accent cursor-pointer"
              >
                {codeList.map((code) => (
                  <option key={code} value={code}>
                    {code} ({incotermsData[code].fullName})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Narrative Summary Area */}
        <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start space-x-3" id="contrast-summary-box">
          <BookOpen className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" id="icon-book" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-brand-primary">초급자를 위한 한눈에 정리하는 차이점</h4>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {generateSummaryText(cond1, cond2)}
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Detailed Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" id="comparison-table-wrapper">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left" id="comparison-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-700">
                <th className="py-4 px-6 w-1/4">비교 항목</th>
                <th className="py-4 px-6 bg-blue-50/30 text-brand-primary border-x border-slate-200/60 text-base font-black text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-extrabold">{cond1}</span>
                    <span className="text-xs font-normal text-slate-500">{data1.fullName}</span>
                  </div>
                </th>
                <th className="py-4 px-6 bg-purple-50/30 text-brand-accent text-base font-black text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-extrabold">{cond2}</span>
                    <span className="text-xs font-normal text-slate-500">{data2.fullName}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {comparisonItems.map((item) => {
                const val1 = data1[item.id as keyof typeof data1];
                const val2 = data2[item.id as keyof typeof data2];
                const isDifferent = val1 !== val2;

                return (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-slate-50/50 transition-colors ${
                      isDifferent ? 'bg-slate-50/20' : ''
                    }`}
                  >
                    {/* Item label */}
                    <td className="py-4 px-6 font-bold text-slate-700 border-r border-slate-100 text-base flex flex-col justify-center">
                      <span>{item.label}</span>
                      {isDifferent && (
                        <span className="inline-block self-start mt-1 text-[10px] font-semibold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">
                          차이 있음 ⚠️
                        </span>
                      )}
                    </td>

                    {/* Condition 1 Value */}
                    <td className="py-4 px-6 border-r border-slate-200 text-slate-800 font-medium text-base leading-relaxed bg-blue-50/5">
                      {item.id === 'precautions' ? (
                        <div className="p-3 bg-white border border-slate-150 rounded-lg shadow-sm text-sm text-slate-600">
                          {val1}
                        </div>
                      ) : (
                        <span className={item.id === 'riskTransfer' ? 'text-sm font-semibold' : ''}>
                          {Array.isArray(val1) ? val1.join(', ') : (val1 as string)}
                        </span>
                      )}
                    </td>

                    {/* Condition 2 Value */}
                    <td className="py-4 px-6 text-slate-800 font-medium text-base leading-relaxed bg-purple-50/5">
                      {item.id === 'precautions' ? (
                        <div className="p-3 bg-white border border-slate-150 rounded-lg shadow-sm text-sm text-slate-600">
                          {val2}
                        </div>
                      ) : (
                        <span className={item.id === 'riskTransfer' ? 'text-sm font-semibold' : ''}>
                          {Array.isArray(val2) ? val2.join(', ') : (val2 as string)}
                        </span>
                      )}
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
