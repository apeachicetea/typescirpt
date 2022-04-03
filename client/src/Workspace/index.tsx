import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  VFC,
} from "react";
import gravatar from "gravatar";
import { Route, Routes, useNavigate, useParams } from "react-router";
import loadable from "@loadable/component";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
  Label,
  Input,
  Button,
} from "./styles";

import Menu from "../Menu";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import CreateChannelModal from "../CreateChannelModal";
import InviteWorkspaceModal from "../InviteWorkspaceModal";
import InviteChannelModal from "../InviteChannelModal";
import fetcher from "../utils/fetcher";
import useSocket from "../hooks/useSocket";

const Channel = loadable(() => import("../Channel/index"));
const DirectMessage = loadable(() => import("../DirectMessage/index"));
const ChannelList = loadable(() => import("../ChannelList/index"));
const DMList = loadable(() => import("../DMList/index"));

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
  private: boolean; // 비공개 채널 여부, 강좌에서는 모두 false(공개)
  WorkspaceId: number;
}

const Workspace: VFC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] =
    useState(false);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const navigate = useNavigate();
  toast.configure();

  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | false>("/api/users", fetcher, {
    dedupingInterval: 2000, // 2초
  });
  // console.log(userData);

  //userEmails, workspaceList DB에서 받아야와함
  const userEmails = "eodbszla@naver.com";
  const workspaceList = [
    {
      id: 1,
      name: "Sleact",
      url: "sleact",
      createAt: "2020.1.13",
    },
    {
      id: 2,
      name: "Sleact2",
      url: "sleact2",
      createAt: "2020.1.14",
    },
    {
      id: 3,
      name: "apeachicetea",
      url: "apeach",
      createAt: "2020.1.15",
    },
  ];
  const { workspace } = useParams<{ workspace: string }>();
  const { data: channelData } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/channels` : null,
    fetcher
  );
  const { data: memberData } = useSWR<IUser[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher
  );
  const [socket, disconnect] = useSocket(workspace);

  useEffect(() => {
    if (channelData && userData && socket) {
      socket.emit("login", {
        id: userData,
        channels: channelData.map((v) => v.id),
      });
    }
  }, [socket, channelData, userData]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [workspace, disconnect]);

  const onLogout = useCallback(async () => {
    await axios.post(
      "/api/users/logout",
      {},
      {
        withCredentials: true,
      }
    );
    // mutate(false, false);
  }, []);

  const onClickUserProfile = useCallback((e) => {
    e.stopPropagation();
    setShowUserMenu((prev) => !prev);
  }, []);

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const onCreateWorkspace = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newWorkspace || !newWorkspace.trim()) return;
      if (!newUrl || !newUrl.trim()) return;
      try {
        await axios.post(
          "서버주소",
          { workspace: newWorkspace, url: newUrl },
          { withCredentials: true }
        );
        // revalidate();
        setShowCreateWorkspaceModal(false);
        setNewWorkspace("");
        setNewUrl("");
      } catch (error: any) {
        toast.error(error.response?.data, { position: "bottom-center" });
      }
    },
    [newWorkspace, newUrl]
  );

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
    setShowInviteChannelModal(false);
  }, []);

  const onChangeNewWorkspace = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewWorkspace(e.target.value);
    },
    []
  );

  const onChangeNewUrl = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewUrl(e.target.value);
  }, []);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  // if (!userData) {
  //   return navigate("/login");
  // }

  return (
    <>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg
              src={gravatar.url(userEmails, {
                s: "28px",
                d: "robohash",
              })}
            />
            {showUserMenu && (
              <Menu
                style={{ right: "0", top: "38" }}
                show={showUserMenu}
                onCloseModal={onClickUserProfile}
              >
                <ProfileModal>
                  <img
                    src={gravatar.url(userEmails, {
                      s: "36px",
                      d: "robohash",
                    })}
                    alt=""
                  />
                  <div>
                    <span id="profile-name">유저닉네임</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {workspaceList.map((ws) => {
            return (
              <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                <WorkspaceButton>
                  {ws.name.slice(0, 1).toUpperCase()}
                </WorkspaceButton>
              </Link>
            );
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>Sleact</WorkspaceName>
          <MenuScroll>
            <Menu
              show={showWorkspaceModal}
              onCloseModal={toggleWorkspaceModal}
              style={{ top: 95, left: 80 }}
            >
              <WorkspaceModal>
                <h2>Sleact</h2>
                <button onClick={onClickInviteWorkspace}>
                  워크스페이스에 사용자 초대
                </button>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button onClick={onLogout}>로그아웃</button>
              </WorkspaceModal>
            </Menu>
            <ChannelList />
            <DMList />
          </MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="/channels/:channel" element={<Channel />} />
            <Route path="/dm/:id" element={<DirectMessage />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
      <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWorkspace}>
          <Label id="workspace-label">
            <span>워크스페이스 이름</span>
            <Input
              id="workspace"
              value={newWorkspace}
              onChange={onChangeNewWorkspace}
            />
          </Label>
          <Label id="workspace-url-label">
            <span>워크스페이스 url</span>
            <Input id="workspace" value={newUrl} onChange={onChangeNewUrl} />
          </Label>
          <Button type="submit">생성하기</Button>
        </form>
      </Modal>
      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateChannelModal={setShowCreateChannelModal}
      />
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
    </>
  );
};

export default Workspace;
