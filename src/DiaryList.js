import React, { useContext } from "react";
import DiaryItem from "./DiaryItem";
import { DiaryDispatchContext, DiaryStateContext } from "./App";

const DiaryList = () => {
  const { onRemove } = useContext(DiaryDispatchContext);
  const { onEdit } = useContext(DiaryDispatchContext);
  const diaryList = useContext(DiaryStateContext);
  return (
    <div className="DiaryList">
      <h2>일기 리스트 </h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
