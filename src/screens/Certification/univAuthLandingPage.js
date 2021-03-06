import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, Button, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { GRAY0, GRAY1, GRAY2, GRAY3, GRAY4, PRIMARY, WHITE } from "../../styles/color";
import { Bold17 } from "../../styles/typography";
import { useRecoilState } from "recoil-react-native";
import { userInfoState } from "../../states/UserInfo";

const UnivAuthLandingPage = ({ route, navigation }) => {
  const [email, setEmail] = useState('');
  const [secret, setSecret] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const useInput = initialValue => {
    const [value, setValue] = useState(initialValue)
  
    const onChange = text => {
      setValue(text)
    }
  
    return { value, onChange, setValue }
  }

  const CertHeader = () => {
    return (
      <HeaderWrapper>
        <View>
          <TitleGrayTxt>λν μΈμ¦</TitleGrayTxt>
        </View>
        <View style={{position: "absolute", right: 40}}>
          <TitlePrimaryTxt>3/4</TitlePrimaryTxt>
        </View>
      </HeaderWrapper>
    )
  }

  const NextButton = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const onPressOutHandler = async () => {
      axios.
        patch(
          "https://us-central1-sumsum-af3c7.cloudfunctions.net/api/users/auth/univauth"
        )
        .then((res) => {
          let {uid, token, isPhoneAuthDone, isUnivAuthDone, isNicknameSettingDone, photoURL} = userInfo;
          let data = {
            uid,
            token,
            isPhoneAuthDone: true,
            isUnivAuthDone: true,
            isNicknameSettingDone: false,
            photoURL
          }
          console.log(data)
          setUserInfo(data);

          console.log(data)
          navigation.navigate("NicknameSettingPage");
        })
        .catch((error) => {
          console.log(error)
        })
    }

    return (
      <View style={{width: '100%', marginBottom:10}}>
        <ButtonWrapper
          disabled={!isConfirmed}
          onPressOut={() => onPressOutHandler()}
        >
          <TitleWhiteTxt>
            λ€μ
          </TitleWhiteTxt>
        </ButtonWrapper>
      </View>
    );
  }
  const SendBtn = ({text}) => {
    return (
      <SendBtnWrapper isEmailSent={isEmailSent}>
        <TouchableOpacity onPress={() => {
            axios.post(
              "https://us-central1-sumsum-af3c7.cloudfunctions.net/api/users/auth/secretmail",
              {
                email,
              }
            )
            .then((res) => {
              setIsEmailSent(true)
            })
            .catch((err) => {
              console.log(err)
            })
        }}>
          <TitleWhiteTxt>
            {text}
          </TitleWhiteTxt>
        </TouchableOpacity>
      </SendBtnWrapper>
    )
  }
  const ConfiremBtn = ({text}) => {
    return (
      <ConfirmBtnWrapper isConfirmed={isConfirmed}>
        <TouchableOpacity onPress={() => {
            axios.post(
              "https://us-central1-sumsum-af3c7.cloudfunctions.net/api/users/auth/confirmsecret",
              {
                secret,
              }
            )
            .then((res) => {
              let flag = res.data.data
              if(flag){
                setIsConfirmed(true)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }}>
          <TitleWhiteTxt>
            {!isConfirmed ? text : "μΈμ¦ μλ£"}
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
            μ¨μ¨μ§μ μμ ν κ±°λλ₯Ό μν΄
          </TitleGrayTxt>
          <View style={{width: '100%'}}>
            <View style={{flexDirection: "row"}}>
              <TitlePrimaryTxt>
                λνμ μΈμ¦
              </TitlePrimaryTxt>
              <TitleGrayTxt>
                μ μ§ννκ³  μμ΅λλ€
              </TitleGrayTxt>
            </View>
            <TitleGrayTxt navigation={navigation}>
              μ¬ν μ€μΈ λν μΉ λ©μΌμ μλ ₯ν΄μ£ΌμΈμ
            </TitleGrayTxt>
          </View>
        </TextWrapper>
        <View>
          <View style={{flexDirection: "row", paddingTop: 20, paddingBottom: 10}}>
            <InputWrapperTop>
              <TextInput value={email} onChangeText={(value) =>setEmail(value)} placeholder={"μ΄λ©μΌμ μλ ₯ν΄μ£ΌμΈμ"}/>
            </InputWrapperTop>
            <SendBtn text={"λ°μ‘"}/>
          </View>
          <View style={{flexDirection: "row"}}>
            <InputWrapperBottom>
              <TextInput value={secret} onChangeText={(value) => setSecret(value)} placeholder={"μΈμ¦λ²νΈλ₯Ό μλ ₯ν΄μ£ΌμΈμ"}/>
            </InputWrapperBottom>
            <ConfiremBtn text={"μΈμ¦"}/>
          </View>
        </View>
      </View>
      <NextButton/>
    </Wrapper>
  );
}
const SendBtnWrapper = styled.View`
  background-color: ${props => !props.isEmailSent ? PRIMARY : GRAY3};
  width: 100px;
  padding: 15px 20px 15px 20px;
  align-items: center;
`;
const ConfirmBtnWrapper = styled.View`
  background-color: ${props => !props.isConfirmed ? PRIMARY : GRAY3};
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

export default UnivAuthLandingPage;


/*
  return (
    <Wrapper>
      <View>
        <Text>
          λν μΈμ¦ λλ© νμ΄μ§
        </Text>
        <Button
          title="λλ€μ μ€μ νκΈ°"
          onPress={()=>{
            navigation.navigate("NicknameSettingPage");
          }}
        />
      </View>
    </Wrapper>
  );
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: white;
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
  align-items: center;
`;
const TitleGrayTxt = styled.Text`
  ${Bold17};
  color: ${GRAY4};
`;
const TitlePrimaryTxt = styled.Text`
  ${Bold17};
  color: ${PRIMARY};
`;


export default UnivAuthLandingPage;
*/