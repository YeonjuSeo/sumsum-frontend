import React from "react";
import axios from "axios";
import getEnvVars from "../../settings/environment";

import { SafeAreaView } from "react-native";
import Postcode from "@actbase/react-daum-postcode";
import { wishAddrState, wishCoorState } from "../../states/User";
import { useRecoilState, useSetRecoilState } from "recoil-react-native";

export function LocationSearchScreen({ route, navigation }) {
  const [wishAddr, setWishAddr] = useRecoilState(wishAddrState);
  const [wishCoor, setWishCoor] = useRecoilState(wishCoorState);
  const { kakaoApiKey } = getEnvVars();

  const request = (addr, prev) => {
    axios
      .get(
        `https://dapi.kakao.com//v2/local/search/address.json?query=${addr}`,
        {
          headers: {
            Authorization: `KakaoAK ${kakaoApiKey}`,
          },
        }
      )
      .then(function (resp) {
        if (prev == "Home") {
          setWishCoor({
            x: resp.data?.documents[0].x,
            y: resp.data?.documents[0].y,
          });
        } else if (prev == "WritePost") {
          route.params.setCoor({
            x: resp.data?.documents[0].x,
            y: resp.data?.documents[0].y,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Postcode
        style={{ flex: 1, paddingTop: 33 }}
        jsOptions={{ animation: true }}
        onSelected={async (data) => {
          await request(data.roadAddress, route.params.prev);
          if (route.params.prev == "Home") await setWishAddr(data.bname);
          // console.log("POstcode: ", JSON.stringify(data.roadAddress));
          else if (route.params.prev == "WritePost")
            await route.params.setLocation(data.roadAddress);
          await navigation.navigate(route.params.prev);
        }}
      />
    </SafeAreaView>
  );
}

export default LocationSearchScreen;
