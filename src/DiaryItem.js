import { useState, useRef } from "react";

const DiaryItem = ({
  author,
  content,
  created_date,
  emotion,
  id,
  onRemove,
  onEdit,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);

  //삭제핸들러
  const handleRemove = () => {
    if (window.confirm(`${id}번째 게시물을 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  //수정핸들러
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const localContentInput = useRef();

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 게시물을 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 :{author} | 감정점수 :{emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            ></textarea>
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제</button>
          <button onClick={toggleIsEdit}>수정</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
