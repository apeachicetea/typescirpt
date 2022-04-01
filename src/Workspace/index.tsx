import React, { VFC } from "react";
import gravatar from "gravatar";
import { Route, Routes } from "react-router";
import loadable from "@loadable/component";
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
} from "./styles";

const Channel = loadable(() => import("../Channel/index"));
const DirectMessage = loadable(() => import("../DirectMessage/index"));

const userEmails = "eodbszla@naver.com";

const Workspace: VFC = () => {
  return (
    <>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg
              src={gravatar.url(userEmails, {
                s: "28px",
                d: "robohash",
              })}
            />
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
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
    </>
  );
};

export default Workspace;
