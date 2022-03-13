import React from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useMutation,
} from "@apollo/client";

import dotenv from "dotenv";
dotenv.config();

import { Container, Row, Col, FormInput, Button } from "shards-react";

const client = new ApolloClient({
  uri: process.env.serverUrl,
  cache: new InMemoryCache(),
});

const GET_MESSAGES = gql`
  query {
    messages {
      content
      id
      user
    }
  }
`;

const POST_MESSAGE = gql`
  mutation ($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const Messages = ({ user }) => {
  const { data } = useQuery(GET_MESSAGES);
  if (!data) {
    return null;
  }

  return (
    <>
      {data.messages.map(({ id, user: messageUser, content }) => (
        <div
          key={id}
          style={{
            display: "flex",
            justifyContent: user === messageUser ? "flex-end" : "flex-start",
            paddingBottom: "1em",
          }}
        >
          {user !== messageUser && (
            <div
              style={{
                height: 50,
                width: 50,
                marginRight: "0.5em",
                border: "2px solid #e5e6ea",
                borderRadius: 25,
                textAlign: "center",
                fontSize: "18pt",
                paddingTop: 5,
              }}
            >
              {messageUser.slice(0, 2).toUpperCase()}
            </div>
          )}

          <div
            style={{
              background: user === messageUser ? "#58bf56" : "#e5e6ea",
              color: user === messageUser ? "white" : "#black",
              padding: "1em",
              borderRadius: "1em",
              maxWidth: "60%",
            }}
          >
            {content}
          </div>
        </div>
      ))}
    </>
  );
};
const Chat = () => {
  const [state, stateSet] = React.useState({
    user: "Olasumbo",
    content: "",
  });

  const [postMessage] = useMutation(POST_MESSAGE);

  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state,
      });
    }
    stateSet({
      ...state,
      content: "",
    });
  };
  return (
    <Container>
      <Messages user={state.user} />
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <FormInput
            label="User"
            value={state.user}
            onChange={(evt) =>
              stateSet({
                ...state,
                user: evt.target.value,
              })
            }
          />
        </Col>
        <Col xs={8}>
          <FormInput
            label="Content"
            value={state.content}
            onChange={(evt) =>
              stateSet({
                ...state,
                content: evt.target.value,
              })
            }
            onKeyUp={(evt) => {
              let ENTER_KEY_CODE = 13;
              if (evt.keyCode === ENTER_KEY_CODE) {
                onSend();
              }
            }}
          />
        </Col>
        <Col xs={2}>
          <Button onClick={onSend}>Send</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default function MyComponent() {
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>;
}
