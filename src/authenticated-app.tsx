import React from "react"
import ProjectListScreen from "screens/project-list"
import { useAuth } from "context/auth-context"
import styled from "@emotion/styled"
import Row from "components/lib"
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg"
import { Button, Dropdown, Menu } from "antd"

const AuthenticatedApp = () => {
  const { logout, user } = useAuth()
  return (
    <Container>
      <Header between>
        <HeaderLeft gap>
          <SoftwareLogo width="18rem" color="rgb(38,132,255)" />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          {/* overlay把鼠标放在上面他会给我们显示下拉框 */}
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="logout">
                  <Button
                    onClick={() => {
                      void logout()
                    }}
                    type="link"
                  >
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            {/* 防止页面重新刷新 */}
            <Button onClick={(e) => e.preventDefault()}>Hi,{user?.name}</Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}
export default AuthenticatedApp

const Container = styled.div``

const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`

const HeaderRight = styled.div``

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`

const Main = styled.main``
