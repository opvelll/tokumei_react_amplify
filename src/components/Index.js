import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { byCreatedAt } from "../graphql/queries.js";
import { createComment, createThread } from "../graphql/mutations.js";
import { Link } from "react-router-dom";

export function Index() {
  const formFirstValue = { title: "", firstComment: "" };
  const [formState, setFormState] = useState(formFirstValue);
  const [threadList, setThreadList] = useState([]);

  useEffect(() => {
    fetchThreadList();
  }, []);

  // 起動時スレッドの一覧を取得
  const fetchThreadList = async () => {
    const { data } = await API.graphql(
      graphqlOperation(byCreatedAt, {
        type: "t",
        sortDirection: "DESC",
      })
    );
    console.log(data);
    setThreadList(data.byCreatedAt.items);
  };

  // フォームをクリック時の動作
  const onSubmitForm = async (e) => {
    e.preventDefault();
    // フォームが空なら終了
    if (!formState.title || !formState.firstComment) return;
    const newThread = await createNewThread();
    await createFirstComment(newThread.id);
    setThreadList([newThread, ...threadList]);
    setFormState(formFirstValue);
  };

  // スレッドの作成
  const createNewThread = async () => {
    const newThread = { title: formState.title, type: "t" };
    const { data } = await API.graphql(
      graphqlOperation(createThread, { input: newThread })
    );
    console.log(data);
    return data.createThread;
  };

  // 最初のコメントを作成
  const createFirstComment = async (threadId) => {
    const newComment = { threadId: threadId, title: formState.firstComment };
    const { data } = await API.graphql(
      graphqlOperation(createComment, { input: newComment })
    );
    console.log(data);
  };

  // フォームに入力時、formStateを更新する
  const onChange = (event, propaty) => {
    setFormState({ ...formState, [propaty]: event.target.value });
  };

  return (
    <div>
      <div>匿名掲示板(Amplify + React)</div>
      <div>
        {threadList.map((thread, index) => {
          return (
            <div key={index}>
              <Link to={thread.id}>{thread.title}</Link>
            </div>
          );
        })}
      </div>
      <div>
        <form>
          <div>
            <div>
              <label htmlFor="threadTitle">スレッドタイトル</label>
            </div>
            <input
              id="threadTitle"
              value={formState.title}
              onChange={(event) => onChange(event, "title")}
            ></input>
          </div>
          <div>
            <div>
              <label htmlFor="threadFirstComment">最初のコメント</label>
            </div>
            <input
              id="threadFirstComment"
              value={formState.firstComment}
              onChange={(event) => onChange(event, "firstComment")}
            ></input>
          </div>
          <button onClick={onSubmitForm}>送信</button>
        </form>
      </div>
    </div>
  );
}
