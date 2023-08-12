import React, { useState, useEffect } from 'react';
import { AverageStatistics } from "../components/common";
import { BookCharacter, TotalStatistic, WeeklyStatistic } from './../components/userStatistics';
import { getUserStatistics,getWeeklyStatistics } from '../api/statisticsApi';
import { motion } from 'framer-motion';
import { styled } from 'styled-components';


const StatisticsPage = () => {
  const username = "zaru"

  // 유저 통계 api 요청
  const [userStatisticsValue, setUserStatisticValue] = useState({});

  useEffect(()=>{
    try {
      updateUserStatistics()
        .then(val => {
          setUserStatisticValue(val);
        });
    } catch (err) {
      console.log("에러남 ㄱ-");
    }
  }, []);

  const updateUserStatistics = async ()=> {
    const res = await getUserStatistics();
    return res;
  };

  // 주간 통계 api 요청
  const [weeklyStatisticsValue, setWeeklyStatisticValue] = useState({});

  useEffect(()=>{
    try {
      updateWeeklyStatistics()
        .then(val => {
          setWeeklyStatisticValue(val);
        });
    } catch (err) {
      console.log("에러남 ㄱ-");
    }
  }, []);

  const updateWeeklyStatistics = async ()=> {
    const res = await getWeeklyStatistics();
    return res;
  };

  const weeklyStatistics = weeklyStatisticsValue?.weeks

  // 평균 통계 데이터
  const pagePerHour = userStatisticsValue?.pagePerHour;
  const timePerRead = userStatisticsValue?.timePerRead;

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >
      {username} 님의 독서 유형은..
      <BookCharacter />
      <TotalStatistic val={userStatisticsValue}  />
      <WeeklyStatistic weeklyData={weeklyStatistics}/>
      <AverageStatistics readingTime={timePerRead} readSpeed={pagePerHour} />
    </motion.div>
  );
}

// const StatisticsContainer = styled.div`
//   overflow-y: auto;
//   scrollbar-width: none;
//   -ms-overflow-style: none;
//   &::-webkit-scrollbar {
//     width: 0;
//   }
  /* display: flex;
  justify-content: center; */
// `;

export default StatisticsPage;