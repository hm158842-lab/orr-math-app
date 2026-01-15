// src/data.js
// 학생들의 점수와 정보를 모아두는 데이터베이스입니다.

export const studentsData = {
  // 이성현 학생 (접속 ID: student_shlee_2026)
  "student_shlee_2026": { 
    name: '이성현',
    school: '오성중 1학년',
    examScores: [
      { name: '경신중', score: 100 },
      { name: '가창중', score: 100 },
      { name: '노변중', score: 100 },
      { name: '오성중', score: 95.7 },
      { name: '중간고사', score: 100, highlight: true },
      { name: '동도중', score: 100 },
      { name: '대륜중', score: 89 }
    ],
    monthlyStudy: [
      { month: '9월', hours: 16 },
      { month: '10월', hours: 18 },
      { month: '11월', hours: 16 },
      { month: '12월', hours: 14 },
      { month: '1월', hours: 18 },
      { month: '2월', hours: 20 },
      { month: '3월', hours: 16 },
      { month: '4월', hours: 18 }
    ],
    abilities: [
      { category: '이해력', value: 95 },
      { category: '문제해결', value: 95 },
      { category: '집중력', value: 90 },
      { category: '자기주도', value: 90 },
      { category: '꾸준함', value: 85 },
      { category: '실수관리', value: 75 }
    ],
    courseData: [
      { name: '중2-1', value: 45, color: '#ef4444' },
      { name: '심화', value: 25, color: '#f43f5e' },
      { name: '기출', value: 20, color: '#ec4899' },
      { name: '고난도', value: 10, color: '#f59e0b' }
    ],
    textbooks: [
      { name: 'RPM', percent: 35 },
      { name: '개념원리', percent: 25 },
      { name: '고쟁이', percent: 20 },
      { name: '기출', percent: 15 },
      { name: '블랙라벨', percent: 5 }
    ]
  },
  
  // 김철수 학생 (테스트용)
  "student_kim_2026": {
    name: '김철수',
    school: '경신중 2학년',
    examScores: [
      { name: '중간고사', score: 80, highlight: true },
      { name: '기말고사', score: 85 }
    ],
    monthlyStudy: [
      { month: '1월', hours: 10 },
      { month: '2월', hours: 12 }
    ],
    abilities: [
        { category: '이해력', value: 70 },
        { category: '문제해결', value: 60 },
        { category: '집중력', value: 80 },
        { category: '자기주도', value: 50 },
        { category: '꾸준함', value: 90 },
        { category: '실수관리', value: 60 }
    ],
    courseData: [
        { name: '중2-1', value: 50, color: '#ef4444' },
        { name: '기초', value: 50, color: '#f43f5e' }
    ],
    textbooks: [
        { name: '쎈', percent: 50 },
        { name: '교과서', percent: 50 }
    ]
  }
};