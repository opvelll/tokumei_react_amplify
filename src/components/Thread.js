import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createComment } from "../graphql/mutations";
import { getThread } from "../graphql/queries";
import { onCommentByThreadId } from "../graphql/subscriptions";

export function Thread() {
  const { threadId } = useParams();
  const [thread, setThread] = useState({
    title: "",
    comments: { items: [] },
  });
  const [commentForm, setCommentForm] = useState({ title: "" });
  const subscriptionRef = useRef();

  useEffect(() => {
    fetchThread();
    createSubscription();
    return () => {
      if (subscriptionRef) subscriptionRef.current.unsubscribe();
    };
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
  const createSubscription = () => {
    subscriptionRef.current = API.graphql(
      graphqlOperation(onCommentByThreadId, { threadId: threadId })
    ).subscribe({
      next: (data) => {
        console.log(data);
        addComment(data.value.data.onCommentByThreadId);
      },
      error: (error) => console.warn(error),
    });
  };

  // コメントのリストに新たに追加
  const addComment = (newComment) => {
    setThread((thread) => {
      // リスト内に既にあったら追加しない
      const idx = thread.comments.items.findIndex(
        (comment) => comment.id === newComment.id
      );
      if (idx !== -1) return thread;
      console.log("update comment list", thread);
      return {
        title: thread.title,
        comments: { items: [...thread.comments.items, newComment] },
      };
    });
  };

  // フォーム送信時
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.title) return;
    const newComment = await createNewComment();
    setCommentForm({ title: "" });
    setThread((thread) => {
      return {
        title: thread.title,
        comments: { items: [...thread.comments.items, newComment] },
      };
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
