import axiosInstance from './axiosConfig';

// 로그 조회하기
export const getBookHistory = async (userBookPk, page) => {
  try {
    const res = await axiosInstance.get(`/historys/userBook`, {
      params: {
        userBookPk: userBookPk,
        page: page,
      },
    });
    return res.data;
  } catch (err) {
    return err
  }
};

// 로그 수정하기
export const editBookHistory = async (historyPk, startTime, endTime, comment) => {
  try {
    const res = await axiosInstance.patch(`/historys/${historyPk}`, null, {
      params: {
        startTime,
        endTime,
        comment,
      },
    })
    console.log(res.data)
    return res.data;
  } catch (err) {
    return err
  }
};

// 로그 삭제하기
export const deleteBookHistory = async (historyPk) => {
  try {
    const res = await axiosInstance.delete(`/historys/${historyPk}`)
    return res.data;
  } catch (err) {
    return err
  }
};