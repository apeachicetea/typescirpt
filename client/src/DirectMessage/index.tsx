import axios from "axios";
import gravatar from "gravatar";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import { Container, Header } from "../Channel/styles";
import ChatBox from "../ChatBox";
import ChatList from "../ChatList";
import fetcher from "../utils/fetcher";
import makeSection from "../utils/makeSection";

export interface IWorkspace {
  id: number;
  name: string;
  url: string; // 주소 창에 보이는 주소
  OwnerId: number; // 워크스페이스 만든 사람 아이디
}

export interface IUser {
  id: number;
  nickname: string;
  email: string;
  Workspaces: IWorkspace[];
}

export interface IDM {
  // DM 채팅
  id: number;
  SenderId: number; // 보낸 사람 아이디
  Sender: IUser;
  ReceiverId: number; // 받는 사람 아이디
  Receiver: IUser;
  content: string;
  createdAt: Date;
}

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const {
    data: userData,
    error: userError,
    mutate: userMutate,
  } = useSWR(`api/workspaces/${workspace}/members/${id}`, fetcher);
  const { data: myData, error, mutate } = useSWR(`api/users`, fetcher);
  const [chat, setChat] = useState("");
  const { data: chatData, mutate: mutateChat } = useSWR<IDM[]>(
    `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`,
    fetcher
  );

  const onChangeChat = (e: ChangeEvent<HTMLInputElement>): void => {
    setChat(e.target.value);
  };

  const onSubmitForm = useCallback(
    async (e) => {
      e.preventDefault();
      if (chat?.trim()) {
        try {
          await axios.post(`api/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
          });
          setChat("");
        } catch (error: any) {}
      }
    },
    [chat, id, workspace]
  );

  if (!userData || !myData) {
    return null;
  }

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container>
      <Header>
        <img
          src={gravatar.url(userData.email, { s: "24px", d: "robohash" })}
          alt=""
        />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList chatSections={chatSections} />
      <ChatBox
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitForm={onSubmitForm}
        placeholder=""
      />
    </Container>
  );
};

export default DirectMessage;
