import Modal from "../Modal/index";
import { Button, Input, Label } from "../Workspace/styles";
import { IUser } from "../CreateChannelModal/index";
import fetcher from "../utils/fetcher";
import axios from "axios";
import React, { ChangeEvent, FC, useCallback, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import useSWR from "swr";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteChannelModal: (flag: boolean) => void;
}
const InviteChannelModal: FC<Props> = ({
  show,
  onCloseModal,
  setShowInviteChannelModal,
}) => {
  const { workspace, channel } = useParams<{
    workspace: string;
    channel: string;
  }>();
  const [newMember, setNewMember] = useState("");
  const { data: userData } = useSWR<IUser>("/api/users", fetcher);
  const { mutate } = useSWR<IUser[]>(
    userData && channel
      ? `/api/workspaces/${workspace}/channels/${channel}/members`
      : null,
    fetcher
  );

  const onInviteMember = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) {
        return;
      }
      try {
        const response = await axios.post(
          `/api/workspaces/${workspace}/channels/${channel}/members`,
          {
            email: newMember,
          }
        );

        mutate(response.data, false);
        setShowInviteChannelModal(false);
        setNewMember("");
      } catch (error: any) {
        toast.error(error.response?.data, { position: "bottom-center" });
      }
    },
    [newMember, channel, mutate, setShowInviteChannelModal, workspace]
  );

  const onChangeNewMember = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMember(e.target.value);
  };

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>채널 멤버 초대</span>
          <Input id="member" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteChannelModal;
