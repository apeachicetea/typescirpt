import React, { ChangeEvent, useCallback, useState, VFC } from "react";
import gravatar from "gravatar";
import { Route, Routes } from "react-router";
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

const Channel = loadable(() => import("../Channel/index"));
const DirectMessage = loadable(() => import("../DirectMessage/index"));

// const UserProfileMenu = styled.div`
//   position: absolute;
//   top: 38px;
//   right: 0px;
// `;

const Workspace: VFC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);
  const [newWorkspace, setNewWorkspace] = useState("");
  const [newUrl, setNewUrl] = useState("");
  toast.configure();

  // const { data, error, revalidate, mutate } = useSWR(
  //   "서버주소/api/users",
  //   fetcher
  // );

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
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>menu scroll</MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="/channel/:channel" element={<Channel />} />
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
    </>
  );
};

export default Workspace;
