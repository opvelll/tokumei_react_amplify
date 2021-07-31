import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createComment } from "../graphql/mutations";
import { getThread } from "../graphql/queries";

export function Thread() {
  const { threadId } = useParams();
  const [thread, setThread] = useState({
    title: "",
    comments: { items: [] },
  });
  const [commentForm, setCommentForm] = useState({ title: "" });

  useEffect(() => {
    fetchThread();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // スレッド情報を取得
  const fetchThread = async () => {
    console.log(threadId);
    const { data } = await API.graphql(
      graphqlOperation(getThread, { id: threadId })
    );
    console.log(data);
    setThread(data.getThread);
  };

  // subscription
  // const commentSubscription = () => {
  //     const subscription = API.graphql(graphqlOperation(onCreateThread))
  // }

  // フォーム送信時
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.title) return;
    const newComment = await createNewComment();
    setCommentForm({ title: "" });
    setThread({
      title: thread.title,
      comments: { items: [...thread.comments.items, newComment] },
    });
  };

  // コメントの作成
  const createNewComment = async () => {
    const { data } = await API.graphql(
      graphqlOperation(createComment, {
        input: { threadId: threadId, title: commentForm.title },
      })
    );
    console.log(data);
    return data.createComment;
  };

  return (
    <div>
      <h1>{thread.title}</h1>
      {thread.comments.items.map((comment, idx) => {
        return <div key={idx}>{comment.title}</div>;
      })}
      <div>
        <form>
          <div>
            <label htmlFor="commentForm">コメント</label>
          </div>
          <input
            id="commentForm"
            value={commentForm.title}
            onChange={(event) => setCommentForm({ title: event.target.value })}
          ></input>
          <button onClick={onSubmit}>送信</button>
        </form>
      </div>
    </div>
  );
}
