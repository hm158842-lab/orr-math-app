import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';

// 데이터를 가져오는 동안 보여줄 로딩 화면 & 에러 처리
const DashboardLoader = () => {
  const { studentId } = useParams(); // 주소창에서 '이성현'을 가져옴
  const [data, setData] = useState(null); // 받아온 데이터를 담을 그릇
  const [loading, setLoading] = useState(true); // "로딩 중인가요?"
  const [error, setError] = useState(null); // "에러가 났나요?"

  useEffect(() => {
    // 1. 심부름꾼(Function)에게 이름표를 주고 다녀오라고 시킴
    // 주의: .netlify 앞의 점(.)과 슬래시(/)가 중요합니다.
    fetch(`/.netlify/functions/get-student?id=${studentId}`)
      .then(res => {
        // 2. 심부름꾼이 "못 찾겠는데요?" 하면 에러 처리
        if (!res.ok) {
          throw new Error("노션에서 해당 학생을 찾을 수 없습니다.");
        }
        return res.json(); // 가져온 데이터를 포장을 뜯음
      })
      .then(resultData => {
        // 3. 성공하면 데이터를 그릇에 담고 로딩 끝!
        setData(resultData);
        setLoading(false);
      })
      .catch(err => {
        // 4. 실패하면 에러 메시지를 띄움
        console.error("데이터 가져오기 실패:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [studentId]);

  // 로딩 중일 때 보여줄 화면
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-xl font-bold text-gray-600 animate-pulse">
        노션에서 데이터를 불러오는 중입니다...
      </div>
    </div>
  );

  // 에러 났을 때 보여줄 화면
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center border-l-4 border-red-500">
        <h1 className="text-2xl font-bold text-red-600 mb-2">데이터 연동 오류</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <p className="text-sm text-gray-400">
          1. 노션에 '{studentId}'라는 StudentId가 있는지 확인하세요.<br/>
          2. 오타나 띄어쓰기가 없는지 확인하세요.
        </p>
      </div>
    </div>
  );

  // 성공하면 대시보드 보여줌!
  return <StudentDashboard data={data} />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 학생 ID가 있는 주소로 들어왔을 때 */}
        <Route path="/student/:studentId" element={<DashboardLoader />} />
        
        {/* 그냥 들어왔을 때 (첫 화면) */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">오르라 수학전문학원</h1>
            <p className="text-gray-600 mb-6">노션(Notion) 데이터베이스 연동 시스템</p>
            <div className="bg-white p-6 rounded-lg shadow text-sm text-gray-500">
              <p>주소창 뒤에 <b>/student/학생ID</b>를 입력하세요.</p>
              <p className="mt-2 bg-gray-100 p-2 rounded">예: /student/이성현</p>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;