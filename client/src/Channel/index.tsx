import { ChangeEvent, useCallback, useState } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import ChatBox from "../ChatBox";
import ChatList from "../ChatList";
import fetcher from "../utils/fetcher";
import makeSection from "../utils/makeSection";
import { Container, Header } from "./styles";

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

const Channel = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const [chat, setChat] = useState("");
  const { data: chatData, mutate: mutateChat } = useSWR<IDM[]>(
    `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`,
    fetcher
  );

  const onChangeChat = (e: ChangeEvent<HTMLInputElement>): void => {
    setChat(e.target.value);
  };

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log("Channel");
    setChat("");
  }, []);

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);
  return (
    <Container>
      <Header>채널!</Header>
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

export default Channel;
