import React, { useState } from 'react';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const StudentDashboard = ({ data }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // 데이터가 없을 때 안전장치
  if (!data) return <div className="p-10 text-center text-gray-500">데이터를 불러오는 중입니다...</div>;

  // 데이터 풀기 (없으면 원본 디자인을 유지하기 위해 기본값 사용)
  const { 
    name, 
    school, 
    examScores, 
    monthlyStudy, 
    abilities, 
    courseData, 
    textbooks 
  } = data;

  // 원본 디자인 복구를 위한 고정 데이터들 (나중에 data.js로 옮길 수 있음)
  const improvementData = [
    { topic: '일차방정식 활용', before: 60, after: 75, target: 90 },
    { topic: '원가정가', before: 55, after: 70, target: 90 },
    { topic: '거리속력시간', before: 65, after: 78, target: 90 },
    { topic: '실수 줄이기', before: 70, after: 75, target: 95 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 pb-20">
      
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">{name}</h1>
            <p className="text-white text-sm opacity-90">{school} · 의대 지망</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-2xl p-4 text-center">
            <div className="text-4xl font-black text-white">
               {/* 점수 표시 로직 복구 */}
               {examScores.find(s => s.highlight)?.score || 100}
            </div>
            <div className="text-xs text-white opacity-90 mt-1">중간고사</div>
          </div>
        </div>
        
        {/* KPI 미니 카드 */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-xs text-white opacity-80">평균</div>
            <div className="text-xl font-bold text-white">97.5</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-xs text-white opacity-80">만점</div>
            <div className="text-xl font-bold text-white">4회</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-xs text-white opacity-80">진도</div>
            <div className="text-xl font-bold text-white">중2-1</div>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="sticky top-0 z-10 bg-white shadow-md px-3 py-3 flex space-x-2 overflow-x-auto">
        {[
          { id: 'overview', icon: '📊', label: '종합' },
          { id: 'performance', icon: '📈', label: '성적' },
          { id: 'ability', icon: '💪', label: '역량' },
          { id: 'improvement', icon: '🎯', label: '개선' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 컨텐츠 */}
      <div className="p-4 space-y-4">
        
        {activeTab === 'overview' && (
          <>
            {/* 주요 지표 2칸 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl shadow-lg p-4">
                <div className="text-xs text-gray-500 mb-1">총 수업</div>
                <div className="text-3xl font-bold text-red-600">25회</div>
                <div className="text-xs text-green-600 mt-1">출석률 96%</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-4">
                <div className="text-xs text-gray-500 mb-1">평균 점수</div>
                <div className="text-3xl font-bold text-rose-600">97.5</div>
                <div className="text-xs text-gray-500 mt-1">최상위권</div>
              </div>
            </div>

            {/* 월별 학습 시간 */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">📅 월별 학습 시간</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={monthlyStudy}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{fontSize: 11}} />
                  <YAxis tick={{fontSize: 11}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="hours" stroke="#ef4444" fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* 과정별 비중 */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">📚 과정별 학습 비중</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={courseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {courseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 교재 사용 */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">📖 주요 교재</h3>
              <div className="space-y-3">
                {textbooks.map((book, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-gray-700">{book.name}</span>
                      <span className="text-red-600 font-bold">{book.percent}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-rose-500"
                        style={{width: `${book.percent}%`}}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

             {/* ★★★ 누락됐던 강점 섹션 복구 ★★★ */}
             <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">⭐ 핵심 강점</h3>
              <div className="space-y-2">
                {[
                  { title: '높은 학습 능력', desc: '고난도 독립 해결', color: 'bg-green-100 text-green-700' },
                  { title: '자기주도 학습', desc: '스스로 계획 실천', color: 'bg-blue-100 text-blue-700' },
                  { title: '문제 해결 끈기', desc: '끝까지 포기 안함', color: 'bg-rose-100 text-rose-700' },
                  { title: '빠른 학습 속도', desc: '1년 선행 진행', color: 'bg-red-100 text-red-700' }
                ].map((item, idx) => (
                  <div key={idx} className={`${item.color} rounded-xl p-3`}>
                    <div className="font-bold text-sm">{item.title}</div>
                    <div className="text-xs opacity-80 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ★★★ 누락됐던 개선 필요 영역 (오렌지 박스) 복구 ★★★ */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-lg p-4 border-2 border-orange-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3">🎯 개선 필요 영역</h3>
              <div className="space-y-3">
                {[
                  { icon: '📐', title: '활용 문제', progress: 75 },
                  { icon: '💰', title: '원가정가', progress: 70 },
                  { icon: '✏️', title: '실수 관리', progress: 75 },
                  { icon: '📚', title: '교재 관리', progress: 60 }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{item.icon}</span>
                        <span className="font-semibold text-sm">{item.title}</span>
                      </div>
                      <span className="text-xs text-orange-600 font-bold">{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500"
                        style={{width: `${item.progress}%`}}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'performance' && (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">📊 시험 성적</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={examScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{fontSize: 10}} angle={-20} textAnchor="end" height={60} />
                  <YAxis domain={[80, 100]} tick={{fontSize: 11}} />
                  <Tooltip />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                    {examScores.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.highlight ? '#ef4444' : entry.score === 100 ? '#10b981' : '#f59e0b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === 'ability' && (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">🎯 역량 분석</h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={abilities}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" tick={{fontSize: 11}} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{fontSize: 10}} />
                  <Radar name="현재 수준" dataKey="value" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* ★★★ 누락됐던 개선 탭 (Progress Bar) 디자인 전체 복구 ★★★ */}
        {activeTab === 'improvement' && (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">📊 약점 개선 현황</h3>
              <div className="space-y-4">
                {improvementData.map((item, idx) => (
                  <div key={idx} className="border-b pb-3 last:border-b-0">
                    <div className="text-sm font-bold text-gray-800 mb-2">{item.topic}</div>
                    <div className="text-xs text-gray-600 mb-2">
                      {item.before}점 → <span className="text-red-600 font-bold">{item.after}점</span> → 목표 {item.target}점
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 w-12">초기</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-400" style={{width: `${(item.before/item.target)*100}%`}} />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-red-600 font-semibold w-12">현재</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500" style={{width: `${(item.after/item.target)*100}%`}} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 단기/중장기 목표 리스트 복구 */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl shadow-lg p-4 border border-red-200">
              <h3 className="text-base font-bold text-red-800 mb-3">🎯 단기 목표 (1개월)</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start"><span className="text-red-600 mr-2">✓</span><span>일차방정식 활용 100문제 풀이</span></li>
                <li className="flex items-start"><span className="text-red-600 mr-2">✓</span><span>원가·정가 개념 완전 정복</span></li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl shadow-lg p-4 border border-rose-200">
              <h3 className="text-base font-bold text-rose-800 mb-3">🚀 중장기 목표 (3개월)</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start"><span className="text-rose-600 mr-2">✓</span><span>중2-1 과정 완전 마스터</span></li>
                <li className="flex items-start"><span className="text-rose-600 mr-2">✓</span><span>중3-1 과정 진입 및 선행</span></li>
              </ul>
            </div>
          </>
        )}

        {/* ★★★ 누락됐던 검은색 종합 평가 카드 복구 ★★★ */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-3">🏆 종합 평가</h2>
          <p className="text-sm leading-relaxed opacity-90 mb-4">
            {name} 학생은 <span className="text-yellow-300 font-bold">의대를 목표로 하는 성실하고 우수한 학생</span>입니다.
            중1 과정을 뛰어넘어 중2-1 과정을 순조롭게 진행하고 있으며,
            중간고사에서 100점을 받는 등 <span className="text-green-300 font-bold">뛰어난 학업 성취도</span>를 보이고 있습니다.
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white bg-opacity-10 rounded-xl p-3 text-center">
              <div className="text-xs opacity-80">종합 등급</div>
              <div className="text-3xl font-black text-yellow-300 my-1">S+</div>
              <div className="text-xs opacity-70">최상위권</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-3 text-center">
              <div className="text-xs opacity-80">의대 가능성</div>
              <div className="text-3xl font-black text-green-300 my-1">95%</div>
              <div className="text-xs opacity-70">매우 높음</div>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="text-center text-xs text-gray-500 py-4">
          <p>오르라 수학전문학원 | 학생 분석 리포트</p>
          <p className="mt-1">{new Date().toLocaleDateString('ko-KR')}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;