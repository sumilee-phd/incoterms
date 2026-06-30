import { IncotermsDetail, QuizQuestion } from './types';

export const incotermsData: Record<string, IncotermsDetail> = {
  EXW: {
    code: 'EXW',
    fullName: 'Ex Works',
    transportMode: '모든 운송 방식',
    freightPaidBy: '구매자',
    insurancePaidBy: '구매자',
    riskTransfer: '판매자의 사업장(공장, 창고 등)에서 물품을 구매자에게 인도하는 시점',
    exportClearance: '원칙상 구매자',
    importClearance: '구매자',
    oneLineExplanation: '판매자의 공장이나 창고에서 물건을 바로 넘겨받아 가져가는 판매자 최소 책임 조건',
    recommendedReason: '판매자의 의무와 책임을 가장 적게 가져가고 싶고, 구매자가 직접 모든 운송 및 수출입 통관을 부담할 수 있는 상황이기 때문입니다.',
    sellerBurden: ['지정된 영업장(공장, 창고 등)에서 인도할 물품 준비'],
    buyerBurden: ['수출통관 처리', '국제 운송비 일체', '수입통관 및 세금 납부', '지정 장소에서 목적지까지의 모든 위험 부담'],
    precautions: '원칙적으로 구매자가 수출통관까지 처리해야 하므로, 실무적으로 수입국 바이어가 수출국 내부 통관 면허나 네트워크가 없는 경우에는 거래가 원활하지 않을 수 있어 주의가 필요합니다.'
  },
  FCA: {
    code: 'FCA',
    fullName: 'Free Carrier',
    transportMode: '모든 운송 방식 (복합운송에 적합)',
    freightPaidBy: '구매자',
    insurancePaidBy: '구매자',
    riskTransfer: '지정된 장소에서 구매자가 지정한 운송인에게 물품을 인도하는 시점',
    exportClearance: '판매자',
    importClearance: '구매자',
    oneLineExplanation: '판매자가 수출통관을 마친 뒤, 구매자가 지정한 운송회사에 물건을 넘겨주는 조건',
    recommendedReason: '컨테이너선 또는 항공, 도로 등 다양한 수단(복합운송)을 이용하며, 판매자가 수출통관을 마친 뒤 구매자가 지정한 선사/항공사/운송인에게 화물을 인도할 때 가장 적합하기 때문입니다.',
    sellerBurden: ['수출통관 완료', '지정된 인도 장소까지 물품 운송 및 적재'],
    buyerBurden: ['지정 인도 장소 이후의 국제 운송비', '수입통관 및 관세 납부', '인도 이후의 화물 위험 부담'],
    precautions: '인도 장소가 판매자의 작업장이면 판매자가 적재 책임을 지고, 다른 장소(예: 컨테이너 야적장 CY)인 경우 판매자가 물품을 실은 상태로 준비해 가면 하역하지 않고 구매자 측 운송인의 처분 하에 두는 것으로 인도가 완료됩니다.'
  },
  FAS: {
    code: 'FAS',
    fullName: 'Free Alongside Ship',
    transportMode: '해상 및 내수로 운송',
    freightPaidBy: '구매자',
    insurancePaidBy: '구매자',
    riskTransfer: '지정 선적항에서 물품이 선측(배 옆 부두 또는 바지선)에 인도되었을 때',
    exportClearance: '판매자',
    importClearance: '구매자',
    oneLineExplanation: '선적할 배 바로 옆(선측 부두 등)에 물건을 준비해 두고 구매자에게 넘기는 조건',
    recommendedReason: '주로 벌크 화물(포장되지 않은 곡물, 광석 등)이나 대형 기계 장비를 선박의 선측(배 바로 옆 부두)에 인도하는 경우에 쓰이기 때문입니다.',
    sellerBurden: ['수출통관 완료', '지정 선적항의 배 옆(부두 또는 바지선)까지 물품 인도 및 적하 준비'],
    buyerBurden: ['부두에서 본선으로의 선적(적재) 비용', '국제 운송비 일체', '수입통관 및 세금', '선측 인도 시점 이후의 위험 부담'],
    precautions: '컨테이너 화물처럼 터미널(CY, CFS)에 미리 반입하는 표준 화물 거래에는 적합하지 않으며, 주로 정박된 배 바로 아래로 바로 물건을 대야 하는 대형 벌크 화물 무역에 한정해 사용됩니다.'
  },
  FOB: {
    code: 'FOB',
    fullName: 'Free On Board',
    transportMode: '해상 및 내수로 운송',
    freightPaidBy: '구매자',
    insurancePaidBy: '구매자',
    riskTransfer: '지정 선적항에서 물품이 지정 선박의 본선(배) 위에 적재 완료되었을 때',
    exportClearance: '판매자',
    importClearance: '구매자',
    oneLineExplanation: '해상운송에서 판매자가 배 위에 물건을 실어주는 것까지만 책임지는 표준적인 조건',
    recommendedReason: '해상운송의 가장 전통적이고 대중적인 방식으로, 판매자가 배 위에 화물을 안전하게 실어주는 것으로 책임을 다하고, 국제 운송 및 보험은 전적으로 구매자가 직접 수배/지불하고자 할 때 최적이기 때문입니다.',
    sellerBurden: ['수출통관 완료', '지정 선적항의 지정 선박 본선 상에 화물 적재 완료', '적재 시까지 발생하는 비용 및 위험 부담'],
    buyerBurden: ['국제 해상 운송비', '해상 운송 보험 가입', '수입통관 및 관세·세금 납부', '선적 후 목적지까지의 위험 부담'],
    precautions: '위험과 비용이 배 위에 완전히 안착(On Board)되는 순간 넘어가므로, 선적 작업 도중 크레인에서 화물이 떨어져 파손될 경우의 위험은 여전히 판매자가 지게 됩니다. 복합운송이나 컨테이너 거래에서는 터미널 인도 즉시 위험이 끝나는 FCA 조건의 사용이 적극 권장됩니다.'
  },
  CFR: {
    code: 'CFR',
    fullName: 'Cost and Freight',
    transportMode: '해상 및 내수로 운송',
    freightPaidBy: '판매자',
    insurancePaidBy: '구매자',
    riskTransfer: '지정 선적항에서 물품이 지정 선박의 본선(배) 위에 적재 완료되었을 때 (FOB와 위험 이전 시점 동일)',
    exportClearance: '판매자',
    importClearance: '구매자',
    oneLineExplanation: '판매자가 목적항까지의 국제 운송비는 내주지만, 운송 보험은 구매자가 직접 들어야 하는 조건',
    recommendedReason: '해상운송을 이용하고, 판매자가 물품을 본선에 실은 뒤 도착지 목적항까지의 바닷길 운송 비용(운임)까지 전적으로 지급하지만, 보험은 구매자가 개별적으로 계약 및 지불하도록 설계하려 할 때 적합하기 때문입니다.',
    sellerBurden: ['수출통관 완료', '지정 선적항에서 본선 적재', '지정 목적항까지의 선박 운임(운송비) 지불'],
    buyerBurden: ['운송 중의 리스크를 커버하기 위한 운송 보험(적하보험) 직접 가입 및 보험료 부담', '수입통관 및 수입국 내 세금', '목적항 도착 이후 하역 및 내륙 운송비'],
    precautions: '위험 이전(선적 시)과 비용 지급(목적항 도착 시)의 종결 시점이 다른 대표적인 조건입니다. 즉, 배에 화물이 실린 후 바다에서 난파될 경우 발생하는 유실 위험은 구매자가 부담(보험 미가입 시 고스란히 구매자 손실)하므로 구매자는 선적 즉시 유효한 보험을 미리 가입해 두어야 합니다.'
  },
  CIF: {
    code: 'CIF',
    fullName: 'Cost, Insurance and Freight',
    transportMode: '해상 및 내수로 운송',
    freightPaidBy: '판매자',
    insurancePaidBy: '판매자',
    riskTransfer: '지정 선적항에서 물품이 지정 선박의 본선(배) 위에 적재 완료되었을 때 (FOB/CFR과 동일)',
    exportClearance: '판매자',
    importClearance: '구매자',
    oneLineExplanation: '해상운송에서 판매자가 목적항까지의 운송비와 적하보험료를 모두 내주는 가장 인기 있는 조건',
    recommendedReason: '판매자가 목적항까지 가는데 필요한 선박 운송비와 적하보험료(운송 보험)까지 모두 세트로 가입해서 부담해주지만, 목적항에 배가 도달한 뒤 벌어지는 수입 통관 및 현지 핸들링은 구매자가 직접 수행하는 전통적인 해상 무역 최적의 조건이기 때문입니다.',
    sellerBurden: ['수출통관 완료', '선적항 내 본선 화물 적재 완료', '지정 목적항까지의 해상 운송비(운임) 지불', '해상 운송 보험(적하보험) 가입 및 보험료 납부'],
    buyerBurden: ['수입통관 수속 및 수입 관세·세금 납부', '목적항 도착 이후 물건의 하역 및 최종 도착지까지의 내륙 운송비 일체'],
    precautions: '이 조건 역시 위험은 선적할 때 이전되고, 비용만 도착지 항구까지 판매자가 내는 비동기식 조건입니다. 따라서 운송 중 사고 발생 시 구매자가 보험청구권자가 되어 판매자가 전해준 보험증권을 가지고 다이렉트로 보험사에 보상을 신청하는 실무적 절차를 거치게 됩니다.'
  },
  CPT: {
    code: 'CPT',
    fullName: 'Carriage Paid To',
    transportMode: '모든 운송 방식 (복합운송에 적합)',
    freightPaidBy: '판매자',
    insurancePaidBy: '구매자',
    riskTransfer: '판매자가 물품을 자신이 섭외한 최초 운송인에게 인도하는 시점',
    exportClearance: '판매자',
    importClearance: '구매자',
    oneLineExplanation: '컨테이너/항공 등에서 판매자가 목적지까지의 운송비만 내고, 보험은 구매자가 준비하는 조건 (해상 CFR의 복합운송 버전)',
    recommendedReason: '컨테이너, 항공, 육로, 철도 등의 복합운송을 주로 활용하며, 판매자가 구매자가 원하는 지정 목적지까지의 내륙/국제 운송비는 대신 지불해주고 보험은 구매자가 개별 준비하게 하고자 할 때 적합하기 때문입니다.',
    sellerBurden: ['수출통관 완료', '최초 운송업자에게 물품 인도', '지정 목적지까지의 모든 국제/국내 운송비 일체 지불'],
    buyerBurden: ['지정 목적지 도달 전까지 운송 도중 발생할 위험 대비 보험 가입', '수입통관 및 관세 납부', '인도 목적지 도착 차량에서 직접 하역 및 이후 비용 부담'],
    precautions: '위험은 최초의 운송인(예: 트럭 운송업자 또는 포워더 창고)에게 물건이 인도되는 바로 그 시점에 일찍이 구매자에게 넘어가지만, 비용은 멀리 떨어진 최종 목적지까지 판매자가 냅니다. 따라서 위험 이전 구간이 매우 빨라 안전사고 리스크 분기점을 명확히 알아야 합니다.'
  },
  CIP: {
    code: 'CIP',
    fullName: 'Carriage and Insurance Paid to',
    transportMode: '모든 운송 방식 (복합운송에 적합)',
    freightPaidBy: '판매자',
    insurancePaidBy: '판매자',
    riskTransfer: '판매자가 물품을 자신이 섭외한 최초 운송인에게 인도하는 시점',
    exportClearance: '판매자',
    importClearance: '구매자',
    oneLineExplanation: '복합운송에서 판매자가 지정 목적지까지의 운송비와 적하보험료를 모두 내주는 조건 (해상 CIF의 복합운송 버전)',
    recommendedReason: '컨테이너선, 항공, 도로 등을 아우르는 복합운송에 적합하며, 판매자가 지정한 목적지까지 운송 비용과 적하보험(운송 보험)까지 최대 부보 수준으로 든든하게 들어 인도해주고 싶을 때 적절하기 때문입니다.',
    sellerBurden: ['수출통관 완료', '최초 운송인에게 물품 전달', '지정 목적지까지의 운송 운임 납부', '최대 수준의 운송 보험(예: 협회적하약관 ICC A조건) 가입 및 보험료 지급'],
    buyerBurden: ['수입통관 수속 처리 및 세금 납부', '지정 인도지 도착 후 차량에서 직접 하역 및 목적지 도착 이후의 비용 부담'],
    precautions: '인코텀즈 2020 개정으로 CIP 조건의 보험 의무 수준이 가장 넓은 보장을 뜻하는 A조건(ICC A 또는 All Risks)으로 강화되었습니다. 이에 비해 CIF는 여전히 최소 보장(C조건)이 기준입니다. 따라서 판매자는 보험료 지출 규모가 해상 CIF 대비 커질 수 있습니다.'
  },
  DAP: {
    code: 'DAP',
    fullName: 'Delivered at Place',
    transportMode: '모든 운송 방식',
    freightPaidBy: '판매자',
    insurancePaidBy: '별도 합의 (판매자가 본인 위험을 위해 보통 가입)',
    riskTransfer: '지정 목적지에서 물품을 실은 운송수단이 도착하여 구매자에게 하역되지 않은 상태로 인도하는 시점',
    exportClearance: '판매자',
    importClearance: '구매자',
    oneLineExplanation: '판매자가 수입국 내부 지정 장소까지 운송 위험을 지되, 도착 후 내릴 때 하역과 수입통관은 구매자가 하는 조건',
    recommendedReason: '판매자가 수입국 내부 지정 장소까지 화물이 실린 차량 그대로 도착시키는 순간까지 모든 운송 위험과 비용을 전격 책임지고자 하되, 도착한 뒤 차에서 내리는 하역(Unloading)과 수입 통관 자체는 구매자에게 넘기고자 할 때 훌륭한 선택이기 때문입니다.',
    sellerBurden: ['수출통관 완료', '지정 목적지 도달 시점까지의 전구간 운송 비용 및 수송 위험 전담', '도착지 차량 내에 하역되지 않은 상태로 화물 배치'],
    buyerBurden: ['수입통관 대행 신청 및 관세·부가세 납부', '도착 차량에서 물건을 스스로 내리는 하역 비용과 그 이후 운송 비용'],
    precautions: '물품이 목적지에 무사 도달할 때까지 판매자가 모든 파손 리스크를 지므로, 판매자는 보험 가입 의무가 공식 규정에는 명시되지 않았으나 스스로 자사 화물 보호를 위해 반드시 운송보험을 가입하는 것이 실무상 원칙입니다.'
  },
  DPU: {
    code: 'DPU',
    fullName: 'Delivered at Place Unloaded',
    transportMode: '모든 운송 방식',
    freightPaidBy: '판매자',
    insurancePaidBy: '별도 합의 (실무적으로 판매자 가입 권장)',
    riskTransfer: '지정 목적지에서 물품을 운송수단으로부터 직접 하역(내리기)을 완료하여 인도하는 시점',
    exportClearance: '판매자',
    importClearance: '구매자',
    oneLineExplanation: '판매자가 수입국 목적지까지 가고 차에서 직접 물건을 내려주는(하역) 단계까지 완벽하게 책임지는 조건',
    recommendedReason: '판매자가 수입국의 특정 장소(예: 건설 현장이나 수입자 공장 부두)에서 화물을 그냥 넘기는 게 아니라, 전문 장비를 수배해 직접 안전하게 차에서 바닥으로 내려주는(하역, Unloaded) 일체 작업을 마친 뒤 인도를 마치고자 할 때 완벽히 적합하기 때문입니다.',
    sellerBurden: ['수출통관 완료', '지정 목적지까지의 국제/내륙 수송비 부담', '도착지에서 물품을 차량으로부터 완벽히 하역 완료(인코텀즈 중 유일한 판매자 하역 의무 조건)'],
    buyerBurden: ['수입통관 대행 수속 및 관세, 취득세 등 세금 납부', '하역이 끝난 자리에서부터 그 이후 수입국 내부 내륙 운송 일체'],
    precautions: '판매자가 수입국 현지에서 지게차나 크레인 같은 하역 기기 및 현장 가용 인력을 섭외하고 비용을 부담해야 하므로, 수입국의 하역 시스템과 비용에 익숙하지 않은 판매자는 신중히 선택해야 하는 복잡한 조건입니다.'
  },
  DDP: {
    code: 'DDP',
    fullName: 'Delivered Duty Paid',
    transportMode: '모든 운송 방식',
    freightPaidBy: '판매자',
    insurancePaidBy: '별도 합의 (실무적으로 판매자 가입)',
    riskTransfer: '수입국의 수입통관까지 다 마친 판매자가 지정 장소에서 물품을 구매자 차량에 하역할 준비 상태로 넘기는 시점',
    exportClearance: '판매자',
    importClearance: '판매자',
    oneLineExplanation: '판매자가 배송, 세금, 수입통관까지 다 해주는 판매자 최대 책임(해외직구 스타일) 조건',
    recommendedReason: '판매자가 수출통관부터 국제운송, 수입국의 수입통관 대행과 관세·부가세 납부, 그리고 수입국 최종 목적지 문 앞 배송까지 모두 한 번에 묶어 처리해주는 최고 편의 사양을 구매자에게 제공하고자 할 때 적합하기 때문입니다.',
    sellerBurden: ['수출통관 완료', '전구간 국제 및 수입국 내 내륙 운송 비용 부담', '수입 통관 대행 및 일체의 수입 관세, 부가세, 현지 세금 납부', '지정 인도 장소까지의 운송 위험 일체 전담'],
    buyerBurden: ['인도 장소 도착 시 차량으로부터의 물품 하역 및 하역 비용 (계약에 별도 기재 없는 한 구매자 몫)'],
    precautions: '판매자가 수입국 현지 세법, 인증 제도(예: KC인증, 수입 요건 승인)를 정확히 알지 못하는 상태에서 섣불리 가계약을 맺으면, 수입국 세관에서 물품 통관이 거부되거나 지연되어 막대한 체화료(Demurrage) 및 페널티가 모두 판매자 독박 책임으로 돌아가므로 조심해야 합니다.'
  }
};

export const comparisonItems = [
  { id: 'transportMode', label: '운송 방식' },
  { id: 'freightPaidBy', label: '운송비 부담' },
  { id: 'insurancePaidBy', label: '보험 부담' },
  { id: 'riskTransfer', label: '위험 이전 시점' },
  { id: 'exportClearance', label: '수출통관 책임' },
  { id: 'importClearance', label: '수입통관 책임' },
  { id: 'precautions', label: '실무 주의사항' }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'CIF(Cost, Insurance and Freight) 조건에서 해상 운송에 필요한 "보험(적하보험)"을 준비하고 보험료를 납부하는 주체는 누구인가요?',
    options: ['구매자 (수입자)', '판매자 (수출자)', '해상 운송 선사', '세관 공무원'],
    correctAnswerIndex: 1,
    explanation: 'CIF 조건에서는 판매자가 목적항까지의 운송비와 적하보험료(보험)를 부담하고 가입해야 할 의무가 공식 규정상 존재합니다.'
  },
  {
    id: 2,
    question: 'FOB(Free On Board) 조건에서 물품의 파손이나 멸실 위험이 판매자로부터 구매자에게 이전(패스)되는 시점은 언제인가요?',
    options: [
      '판매자의 공장에서 트럭에 실었을 때',
      '선적항에서 지정한 본선(선박) 위에 물품이 정상적으로 적재 완료되었을 때',
      '수입국 목적항에 선박이 안전하게 접안하여 밧줄을 묶었을 때',
      '수입자 공장의 창고 선반에 적재가 완료되었을 때'
    ],
    correctAnswerIndex: 1,
    explanation: 'FOB 조건에서 위험 이전 분기점은 선적항에서 구매자가 지정한 선박의 본선 상에 화물이 제대로 적재(On Board) 완료된 시점입니다.'
  },
  {
    id: 3,
    question: 'CFR 조건과 CIF 조건의 가장 결정적인 차이점은 무엇인가요?',
    options: [
      '국제 운송비(운임)를 누가 지불하는지의 여부',
      '수출통관 업무를 누가 전담하는지의 차이',
      '판매자(수출자)가 해상 운송 보험(적하보험)에 가입해 주어야 하는지의 의무 유무',
      '물건을 실어 나르는 수송선박의 종류 차이'
    ],
    correctAnswerIndex: 2,
    explanation: 'CFR과 CIF는 둘 다 해상운송 전용 조건이고 비용도 판매자가 목적항까지 내지만, CIF는 판매자가 보험(Insurance) 가입 및 보험료 납부 의무가 필수적으로 더해진 조건이라는 점이 차이입니다.'
  },
  {
    id: 4,
    question: '인코텀즈 2020 11개 조건 중, 판매자가 수입 통관 수속은 물론 수입국 관세 및 각종 부가세 세금까지 가장 전폭적으로 부담하는 최고 책임을 지는 조건은 무엇인가요?',
    options: ['EXW (Ex Works)', 'FOB (Free On Board)', 'DAP (Delivered at Place)', 'DDP (Delivered Duty Paid)'],
    correctAnswerIndex: 3,
    explanation: 'DDP(관세지급인도) 조건은 판매자가 수입통관과 관세, 현지 세금까지 전부 다 내어 인도하는 조건으로 판매자의 의무와 비용이 가장 큽니다. 반대로 EXW는 판매자 책임이 가장 작은 조건입니다.'
  },
  {
    id: 5,
    question: '컨테이너를 사용하는 철도, 항공, 복합운송 실무에서 선적선 본선 적재가 기준인 해상 전용 FOB 조건 대신에 사용하기에 가장 적절하고 권장되는 조건은 무엇인가요?',
    options: ['EXW (Ex Works)', 'FCA (Free Carrier)', 'FAS (Free Alongside Ship)', 'CIF (Cost, Insurance and Freight)'],
    correctAnswerIndex: 1,
    explanation: '컨테이너선이나 복합운송에서는 선박에 적재하기 전에 선사 야적장(CY)이나 컨테이너 터미널에 입고하여 운송인에게 인도하는 시점에 손길을 떼게 되므로, 본선 적재를 의무화하는 FOB 대신 운송인 인도 조건인 FCA를 쓰는 것이 실무상 적법하고 타당합니다.'
  }
];
