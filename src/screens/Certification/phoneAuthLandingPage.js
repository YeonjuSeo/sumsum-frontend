
import React, { useEffect } from "react";
import { Text, View, Button, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { GRAY0, GRAY1, GRAY4, PRIMARY, WHITE } from "../../styles/color";
import { Bold17 } from "../../styles/typography";

const PhoneAuthLandingPage = ({ route, navigation }) => {

  const CertHeader = () => {
    return (
      <HeaderWrapper>
        <View>
          <TitleGrayTxt>본인 인증</TitleGrayTxt>
        </View>
        <View style={{position: "absolute", right: 40}}>
          <TitlePrimaryTxt>1/4</TitlePrimaryTxt>
        </View>
      </HeaderWrapper>
    )
  }

  const PurpleButton = () => {
    return (
      <View style={{width: '100%', marginBottom:10}}>
        <ButtonWrapper 
          onPressOut={() =>{
            navigation.navigate("UnivAuthLandingPage");
          }}
        >
          <TitleWhiteTxt>
            다음
          </TitleWhiteTxt>
        </ButtonWrapper>
      </View>
    );
  }
  const ConfiremBtn = ({text}) => {
    return (
      <ConfirmBtnWrapper>
        <TouchableOpacity>
          <TitleWhiteTxt>
            {text}
          </TitleWhiteTxt>
        </TouchableOpacity>
      </ConfirmBtnWrapper>
    )
  }

  return (
    <Wrapper>
      <CertHeader />
      <View style={{marginBottom: 180}}>
        <TextWrapper>
          <TitleGrayTxt>
            숨숨집은 안전한 거래를 위해
          </TitleGrayTxt>
          <View style={{width: '100%'}}>
            <View style={{flexDirection: "row"}}>
              <TitlePrimaryTxt>
                대학생 인증
              </TitlePrimaryTxt>
              <TitleGrayTxt>
                을 진행하고 있습니다
              </TitleGrayTxt>
            </View>
            <TitleGrayTxt navigation={navigation}>
              재학 중인 대학 웹 메일을 입력해주세요
            </TitleGrayTxt>
          </View>
        </TextWrapper>
        <View>
          <View style={{flexDirection: "row", paddingTop: 20, paddingBottom: 10}}>
            <InputWrapperTop>
              <TextInput placeholder={"이메일을 입력해주세요"}/>
            </InputWrapperTop>
            <ConfiremBtn text={"발송"}/>
          </View>
          <View style={{flexDirection: "row"}}>
            <InputWrapperBottom>
              <TextInput placeholder={"인증번호를 입력해주세요"}/>
            </InputWrapperBottom>
            <ConfiremBtn text={"인증"}/>
          </View>
        </View>
      </View>
      <PurpleButton/>
    </Wrapper>
  );
}
const ConfirmBtnWrapper = styled.View`
  background-color: ${PRIMARY};
  width: 100px;
  padding: 15px 20px 15px 20px;
  align-items: center;
`;

const InputWrapperTop = styled.View`
  width: 66%; 
  border: 1px solid ${GRAY0};
  padding: 15px 20px 15px 20px;
  margin: 0px 5px 0px 20px;
`;
const InputWrapperBottom = styled.View`
  width: 66%; 
  border: 1px solid ${GRAY0};
  padding: 15px 20px 15px 20px;
  margin: 0 5px 0px 20px;
`;

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  justify-content: space-between;
`;
const HeaderWrapper = styled.View`
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const UpperWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;
const DownerWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 50px;
`;
const TextWrapper = styled.View`
  align-items: flex-start;
  margin: 0 0 0 30px;
`;
const TitleGrayTxt = styled.Text`
  ${Bold17};
  color: ${GRAY4};
`;
const TitleWhiteTxt = styled.Text`
  ${Bold17};
  color: ${WHITE};
`;
const TitlePrimaryTxt = styled.Text`
  ${Bold17};
  color: ${PRIMARY};
`;
const ButtonWrapper = styled.TouchableOpacity`
  background-color: ${PRIMARY};
  padding: 15px 20px 15px 20px;
  margin: 0px 40px 0px 40px;
  align-items: center;
`;

export default PhoneAuthLandingPage;
