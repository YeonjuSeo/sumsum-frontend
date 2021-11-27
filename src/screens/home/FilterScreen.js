import React, { useState } from "react";
import styled from "styled-components";
import {
  buildingType,
  floorsType,
  roomType,
  roomFeatureType,
} from "./ItemOptionData";
import { useRecoilState } from "recoil-react-native";
// import { dateState } from "../../states/Filter";
import axios from "axios";
import getEnvVars from "../../settings/environment";

// styles
import { SemiBold14, Regular14, Regular12 } from "../../styles/typography";
import { GRAY0, GRAY1, PRIMARY } from "../../styles/color";

// components
import {
  ScrollView,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Progress, Slider } from "@ant-design/react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectButton from "../../components/atoms/SelectButton";
import HeaderTemplate from "../../components/template/HeaderTemplate";

export default function FilterScreen({ navigation }) {
  const [date, setDate] = useState({
    startDate: +new Date(),
    finishDate: +new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState({
    start: false,
    finish: false,
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [location, setLocation] = useState("동 또는 도로명까지 입력해주세요");
  const [coor, setCoor] = useState();
  const [pictures, setPictures] = useState([]);
  const [rentalFeeMin, setRentalFeeMin] = useState();
  const [rentalFeeMax, setRentalFeeMax] = useState();
  const [myBuildingType, setMyBuildingType] = useState();
  const [myFloorsType, setMyFloorsType] = useState();
  const [myRoomType, setMyRoomType] = useState();
  const [myRoomFeature, setMyRoomFeature] = useState();
  const [myRoomOption, setMyRoomOption] = useState();
  const [gender, setGender] = useState();
  const [smoking, setSmoking] = useState();
  // const [imgArr, setImgArr] = useState([]);
  const { apiUrl } = getEnvVars();
  return (
    <View style={{ flex: 1 }}>
      <HeaderTemplate navigation={navigation} title={"필터"} left={true} />
      <Wrapper>
        <SectionWrapper>
          <Title>기간</Title>
          <SectionContentWrapper>
            {/* <FlexRowCenterWrppaer
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          > */}
            <BorderButton
              onPress={() => setShowDatePicker({ start: true, finish: false })}
              onCancel={() =>
                setShowDatePicker({ start: false, finish: false })
              }
            >
              <BorderButtonTxt>
                {new Date(date.startDate).getMonth() + 1}월{" "}
                {new Date(date.startDate).getDate()}일
              </BorderButtonTxt>
            </BorderButton>

            <DateTimePickerModal
              isVisible={showDatePicker.start}
              mode="date"
              onCancel={() =>
                setShowDatePicker({ start: false, finish: false })
              }
              onConfirm={(value) => {
                setDate({ startDate: value, finishDate: date.finishDate });
                setShowDatePicker({ start: false, finish: false });
              }}
            />

            <Text>~</Text>
            <BorderButton
              onPress={() => {
                setShowDatePicker({ start: false, finish: true });
                setShowDatePicker({ start: false, finish: false });
              }}
              onCancel={() =>
                setShowDatePicker({ start: false, finish: false })
              }
            >
              <BorderButtonTxt>
                {new Date(date.finishDate).getMonth() + 1}월{" "}
                {new Date(date.finishDate).getDate()}일
              </BorderButtonTxt>
            </BorderButton>

            <DateTimePickerModal
              isVisible={showDatePicker.finish}
              mode="date"
              onCancel={() =>
                setShowDatePicker({ start: false, finish: false })
              }
              onConfirm={(value) =>
                setDate({ startDate: date.startDate, finishDate: value })
              }
            />
            {/* </FlexRowCenterWrppaer> */}
          </SectionContentWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <RowBetweenWrapper>
            <Title>가격</Title>
            <Title style={{ color: PRIMARY }}>단위: 만 원</Title>
          </RowBetweenWrapper>
          <RowBetweenWrapper>
            <StyledTextinput
              placeholder={"10"}
              onChangeText={setRentalFeeMin}
              placeholderTextColor={GRAY1}
            />
            <Text style={{ marginLeft: 20, marginRight: 20 }}>~</Text>
            <StyledTextinput
              placeholder={"50"}
              onChangeText={setRentalFeeMax}
              placeholderTextColor={GRAY1}
            />
          </RowBetweenWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <Title>건물 유형</Title>
          <ButtonWrapper>
            {buildingType?.map((type) => (
              <SelectButton
                onPress={() => {
                  setMyBuildingType(type);
                }}
                txt={type}
                txt={type}
              />
            ))}
          </ButtonWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <Title>층수 옵션</Title>
          <ButtonWrapper>
            {floorsType?.map((type) => (
              <SelectButton
                onPress={() => {
                  setMyFloorsType(type);
                }}
                txt={type}
              />
            ))}
          </ButtonWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <Title>방 종류</Title>
          <ButtonWrapper>
            {roomType?.map((type) => (
              <SelectButton
                flag={1}
                onPress={() => {
                  setMyRoomType(type);
                }}
                txt={type}
              />
            ))}
          </ButtonWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <RowBetweenWrapper>
            <Title>방 특징</Title>
            <NoticeTxt>중복선택가능</NoticeTxt>
          </RowBetweenWrapper>

          <ButtonWrapper>
            {roomFeatureType?.map((type) => (
              <SelectButton
                flag={1}
                onPress={() => {
                  setMyRoomFeature(i);
                }}
                txt={`#${type}`}
              />
            ))}
          </ButtonWrapper>
        </SectionWrapper>
      </Wrapper>
      <FixedFooter
        onPress={() => {
          // let result = new Object();
          // result.rentalFeeMin = rentalFeeMax;
          // result.rentalFeeMax = rentalFeeMax;
          // result.buildingType = myBuildingType;
          // result.floors = myFloorsType;
          // result.roomType = myRoomType;
          // result.residentStartDate = new Date(date.startDate).getTime();
          // result.residentFinishDate = new Date(date.finishDate).getTime();
          // result.gender = gender;
          // result.smoking = smoking;
          // result.pictures = pictures;
          // result.features = [myRoomFeature];
          // result.options = [myRoomOption];

          // console.log("result:", result);
          navigation.navigate("Result", {
            keyword: "원룸",
          });
        }}
      >
        <FooterTxt>설정완료</FooterTxt>
      </FixedFooter>
    </View>
  );
}

const Wrapper = styled.ScrollView`
  padding: 30px 21px 0 21px;
  flex: 1;
  background-color: white;
`;
const SectionWrapper = styled.View`
  margin-bottom: 37px;
`;
const SectionContentWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const RowBetweenWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Title = styled.Text`
  ${SemiBold14};
  margin-bottom: 13px;
`;
const FixedFooter = styled.TouchableOpacity`
  background-color: ${PRIMARY};
  height: 48px;
  margin: 0 16px 22px 16px;
  justify-content: center;
  align-items: center;
  color: white;
`;
const FooterTxt = styled.Text`
  color: white;
  ${SemiBold14}
`;
const BorderButton = styled.TouchableOpacity`
  height: 44px;
  border: 1px solid ${GRAY0};
  justify-content: center;
  width: 133px;
  align-items: center;
`;
const BorderButtonTxt = styled.Text`
  ${Regular14};
`;
const StyledTextinput = styled.TextInput`
  height: 44px;
  border: 1px solid ${GRAY0};
  padding: 0 16px;
  flex: 1;
  margin: 5px 0;
`;
const NoticeTxt = styled.Text`
  ${Regular12};
  color: ${GRAY1};
`;
