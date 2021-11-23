import React, { useState } from "react";
import styled from "styled-components";
import { View, Text, Image, Button } from "react-native";
import CamIcon from "../../assets/camera.png";

import { PRIMARY } from "../../styles/color";
import { SemiBold14 } from "../../styles/typography";

export default function ChatInput({ setInput }) {
  const [content, setContent] = useState("");
  return (
    <Wrapper>
      <Image source={CamIcon} />
      <ChatInputBox
        onChangeText={(text) => {
          setContent(text);
        }}
      />
      {/* </ChatInputBox> */}
      <SubmitButton>
        <SubmitTxt
          onPress={() => {
            setInput(content);
          }}
        >
          전송
        </SubmitTxt>
      </SubmitButton>
    </Wrapper>
  );
}
const Wrapper = styled.View`
  min-height: 81px;
  background-color: #f2f3f6;
  padding: 7px 16px 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ChatInputBox = styled.TextInput`
  background-color: white;
  width: 304px;
  height: 39px;
  border-radius: 30px;
  border-color: #eaeaea;
  padding: 0 25px;
`;
const SubmitButton = styled.TouchableOpacity`
  z-index: 500;
  position: absolute;
  right: 30px;
  top: 20px;
`;
const SubmitTxt = styled.Text`
  color: ${PRIMARY};
  ${SemiBold14};
`;
