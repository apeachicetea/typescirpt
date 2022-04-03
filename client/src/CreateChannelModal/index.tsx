import Modal from "../Modal/index";
import { Button, Input, Label } from "../Workspace/styles";
import fetcher from "../utils/fetcher";
import axios from "axios";
import React, { ChangeEvent, useCallback, useState, VFC } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import useSWR from "swr";

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

export interface IChannel {
  id: number;
  name: string;
  private: boolean; // 비공개 채널 여부, 여기에서는 모두 false(공개)
  WorkspaceId: number;
}

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateChannelModal: (flag: boolean) => void;
}

const CreateChannelModal: VFC<Props> = ({
  show,
  onCloseModal,
  setShowCreateChannelModal,
}) => {
  const [newChannel, setNewChannel] = useState("");
  const { workspace, channel } = useParams<{
    workspace: string;
    channel: string;
  }>();

  //   const {
  //     data: userData,
  //     error,
  //     revalidate,
  //   } = useSWR<IUser | false>("/api/users", fetcher, {
  //     dedupingInterval: 2000, // 2초
  //   });

  //   const {
  //     data: channelData,
  //     mutate,
  //     revalidate: revalidateChannel,
  //   } = useSWR<IChannel[]>(
  //     userData ? `/api/workspaces/${workspace}/channels` : null,
  //     fetcher
  //   );

  const onChangeNewChannel = (e: ChangeEvent<HTMLInputElement>) => {
    setNewChannel(e.target.value);
  };

  const onCreateChannel = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await axios.post(
          `/api/workspaces/${workspace}/channels`,
          {
            name: newChannel,
          },
          {
            withCredentials: true,
          }
        );

        setShowCreateChannelModal(false);
        //   revalidateChannel();
        setNewChannel("");
      } catch (error: any) {
        toast.error(error.response?.data, { position: "bottom-center" });
      }
    },
    [newChannel, setShowCreateChannelModal, workspace]
  );
  if (!show) return null;

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="channel-label">
          <span>채널</span>
          <Input
            id="channel"
            value={newChannel}
            onChange={onChangeNewChannel}
          />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
