import React from 'react';
import { useRecoilState } from 'recoil';
import { BookInfoTabAtom } from './../../recoil/book/BookAtom';

const Tab = () => {
  const [selectedTab, setSelectedTab] = useRecoilState(BookInfoTabAtom);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div style={{ display: 'flex', margin: '20px 0' }}>
      <span
        onClick={() => handleTabClick('statistics')}
        style={{
          paddingRight: '10px',
          textDecoration: selectedTab === 'statistics' ? 'underline' : 'none',
          cursor: 'pointer'
        }}
      >
        통계
      </span>
      <span> | </span>
      <span
        onClick={() => handleTabClick('history')}
        style={{
          padding: '0 10px',
          textDecoration: selectedTab === 'history' ? 'underline' : 'none',
          cursor: 'pointer',
        }}
      >
        내 히스토리 보기
      </span>
    </div>
  );
};

export default Tab;