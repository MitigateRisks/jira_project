import React from "react"
import styled from "@emotion/styled"
import { Spin, Typography } from "antd"
import { DevTools } from "jira-dev-tool"

export const Row = styled.div<{
  gap?: number | boolean
  between?: boolean
  marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => `${props.marginBottom || ""}rem`};
  //如果摸个子元素有margin-top或者margin-bottom的话
  //会影响这个元素的垂直居中
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      // eslint-disable-next-line no-nested-ternary
      typeof props?.gap === "number"
        ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${props.gap}rem`
        : props.gap
        ? "2rem"
        : undefined};
  }
`

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large" />
  </FullPage>
)

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <Typography.Text type="danger">{error?.message}</Typography.Text>
  </FullPage>
)
