import Modal from "../Modal/index";
import { Button, Input, Label } from "../Workspace/styles";
import { IChannel, IUser } from "../CreateChannelModal/index";
import fetcher from "../utils/fetcher";
import axios from "axios";
import React, { ChangeEvent, FC, useCallback, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import useSWR from "swr";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteWorkspaceModal: (flag: boolean) => void;
}
const InviteWorkspaceModal: FC<Props> = ({
  show,
  onCloseModal,
  setShowInviteWorkspaceModal,
}) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const [newMember, setNewMember] = useState("");
  const { data: userData } = useSWR<IUser>("/api/users", fetcher);
  const { mutate } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
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
          `/api/workspaces/${workspace}/members`,
          {
            email: newMember,
          }
        );

        mutate(response.data, false);
        setShowInviteWorkspaceModal(false);
        setNewMember("");
      } catch (error: any) {
        toast.error(error.response?.data, { position: "bottom-center" });
      }
    },
    [workspace, newMember, mutate, setShowInviteWorkspaceModal]
  );

  const onChangeNewMember = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewMember(e.target.value);
  }, []);

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>이메일</span>
          <Input
            id="member"
            type="email"
            value={newMember}
            onChange={onChangeNewMember}
          />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
