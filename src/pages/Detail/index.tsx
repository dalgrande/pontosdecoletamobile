import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Linking,
} from "react-native";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import * as api from "../../services/api";
import * as MailComposer from "expo-mail-composer";

interface Params {
  point_id: string;
}

interface Data {
  serializedPoint: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: number;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState<Data>({} as Data);

  const routeParams = route.params as Params;

  useEffect(() => {
    api.local.get(`points/${routeParams.point_id}`).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: "Interesse na coleta de resíduos",
      recipients: [data.serializedPoint.email],
    });
  }

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${data.serializedPoint.whatsapp}&text=Tenho interesse sobre coleta de resíduos`
    );
  }

  if (!data.serializedPoint) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>
        <Image
          style={styles.pointImage}
          source={{
            uri: data.serializedPoint.image_url,
          }}
        />
        <Text style={styles.pointName}>{data.serializedPoint.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map((item) => item.title).join(",")}
        </Text>
        <View style={styles.address}>
          <Text style={styles.addressTitle}>{data.serializedPoint.city}</Text>
          <Text style={styles.addressContent}>{data.serializedPoint.uf}</Text>
        </View>
        <View style={styles.footer}>
          <RectButton style={styles.button}>
            <FontAwesome name="whatsapp" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Whatsapp</Text>
          </RectButton>
          <RectButton style={styles.button} onPress={handleComposeMail}>
            <Icon name="mail" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Email</Text>
          </RectButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: "#322153",
    fontSize: 28,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
  },

  pointItems: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: "#322153",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },

  addressContent: {
    fontFamily: "Roboto_400Regular",
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

  footer: {
    marginTop: 25,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#999",
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    width: "48%",
    backgroundColor: "#34CB79",
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Roboto_500Medium",
  },
});
