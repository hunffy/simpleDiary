import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useReducer,
} from "react";
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE":
      const created_date = new Date().getTime();
      const newItem = { ...action.data, created_date };
      return [newItem, ...state];

    case "REMOVE":
      return state.filter((e) => e.id !== action.targetId);

    case "EDIT":
      return state.map((e) =>
        e.id === action.targetId ? { ...e, content: action.newContent } : e
      );
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();

export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);
  //추가될 일기 데이터 목록상태 관리
  // const [data, setData] = useState([]);

  //추가되는 일기의 고유아이디
  const dataId = useRef(0);

  //추가 일기 함수
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    alert(`${targetId}번째 게시물이 삭제되었습니다.`);
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    alert(`${targetId}게시물이 수정되었습니다.`);
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  //useMemo를 사용하여 묶지않게되면 App컴포넌트가 재생성될때 Memodispatches객체가 재생성되기때문에
  const memoizeDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  //useMemo : 최적화 연산결과 재사용
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((e) => e.emotion >= 3).length;
    const badCount = data.length - goodCount;

    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizeDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>전체일기:{data.length}</div>
          <div>기분 좋은 일기 갯수:{goodCount}</div>
          <div>기분 안좋은 일기 갯수:{badCount}</div>
          <div>기분 좋은 일기 비율:{goodRatio} </div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
