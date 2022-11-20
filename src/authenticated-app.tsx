import React from "react"
import ProjectListScreen from "screens/project-list"
import { useAuth } from "context/auth-context"
import styled from "@emotion/styled"
import Row from "components/lib"

const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return (
    <Container>
      <Header between>
        <HeaderLeft gap>
          <h2>Logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <button type="button" onClick={logout}>
            退出
          </button>
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

const Header = styled(Row)``

const Main = styled.main``
