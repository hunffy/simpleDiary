import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useEffect, useRef, useState, useMemo } from "react";

function App() {
  //
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    console.log(res);

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);
  //추가될 일기 데이터 목록상태 관리
  const [data, setData] = useState([]);

  //추가되는 일기의 고유아이디
  const dataId = useRef(0);

  //추가 일기 함수
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    alert(`${targetId}번째 게시물이 삭제되었습니다.`);
    const newData = data.filter((e) => e.id !== targetId);
    setData(newData);
  };

  const onEdit = (targetId, newContent) => {
    alert(`${targetId}게시물이 수정되었습니다.`);
    setData(
      data.map((e) =>
        e.id === targetId ? { ...data, content: newContent } : e
      )
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작");
    const goodCount = data.filter((e) => e.emotion >= 3).length;
    const badCount = data.length - goodCount;

    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체일기:{data.length}</div>
      <div>기분 좋은 일기 갯수:{goodCount}</div>
      <div>기분 안좋은 일기 갯수:{badCount}</div>
      <div>기분 좋은 일기 비율:{goodRatio} </div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
