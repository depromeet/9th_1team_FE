import styled from 'styled-components'
import { RelayEnvironmentProvider } from "react-relay/hooks"
import environment from "../relay-env"
import TestComponent from '../TestComponent'

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

export default function Home() {
  return (
  <RelayEnvironmentProvider environment={environment}>
    <Title>My page</Title>
    <TestComponent />
  </RelayEnvironmentProvider>
  )
  
}
