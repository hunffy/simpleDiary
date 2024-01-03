import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useRef, useState } from "react";

function App() {
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

  return (
    <div className="App">
      <h2>일기장</h2>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
