import React, { useState, useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as api from "../../services/api";

interface UF {
  array: States[];
}

interface States {
  id: number;
  sigla: string;
  nome: string;
}

interface Cities {
  array: City[];
}

interface City {
  id: number;
  nome: string;
}

const Home = () => {
  const navigation = useNavigation();
  const [ufs, setUfs] = useState<States[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [ufId, setUfId] = useState<String>("0");
  const [cityId, setCityId] = useState<String>("0");

  function handleNavigateToPoints() {
    navigation.navigate("Points", {
      ufId,
      cityId,
    });
  }

  useEffect(() => {
    api.ibge
      .get<States[]>("/localidades/estados?orderBy=nome")
      .then((response) => {
        setUfs(response.data);
      });
  }, []);

  useEffect(() => {
    if (ufId === "0") {
      return;
    }
  }, [ufId]);

  useEffect(() => {
    api.ibge
      .get<City[]>(`localidades/estados/${ufId}/municipios?orderBy=nome`)
      .then((response) => {
        setCities(response.data);
      });
  }, [ufId]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ImageBackground
        source={require("../../assets/home-background.png")}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require("../../assets/logo.png")} />
          <View>
            <Text style={styles.title}>
              Seu marketplace de coletas de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Picker
            selectedValue={String(ufId)}
            style={styles.input}
            onValueChange={(itemValue) => setUfId(String(itemValue))}
          >
            <Picker.Item label="Selecione o Estado" value={0} />
            {ufs.map((uf) => (
              <Picker.Item key={uf.id} label={uf.nome} value={uf.sigla} />
            ))}
          </Picker>
          <Picker
            selectedValue={String(cityId)}
            style={styles.input}
            onValueChange={(itemValue) => setCityId(String(itemValue))}
          >
            <Picker.Item label="Selecione o Município" value={0} />
            {cities.map((city) => (
              <Picker.Item key={city.id} label={city.nome} value={city.nome} />
            ))}
          </Picker>

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#fff" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});
