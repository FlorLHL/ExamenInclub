import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/icons";
import Axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
export const Profile = (props) => {
  const {
    route: {
      params: { data },
    },
  } = props;
  const [isLoading, setLoading] = useState(false);
  const [ListDesc, setLisDesc] = useState([]);
  const navigation = useNavigation();
  const getDescription = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(data.url, {
        headers: { authorization: `Bearer s` },
      });

      setLisDesc(res.data);

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  let descES = ListDesc?.flavor_text_entries?.filter(
    (item) => item.language?.name == "es"
  );
  let descGen = ListDesc?.genera?.filter((item) => item.language?.name == "es");
  useEffect(() => {
    getDescription();
  }, []);
  return (
    <View style={style.colorsFondo}>
      <View style={style.cFondo}>
        <TouchableOpacity
          style={style.Atras}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={30} style={{ color: "black" }} />
        </TouchableOpacity>
        <View style={style.ability}>
          <Text style={style.textPoke}>{data.name}</Text>
          <Image
            source={{
              uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${data.name}.png`,
            }}
            style={style.imagePoke}
          />
        </View>
      </View>
      <View style={style.description}>
        <Text style={style.textDescription}>Descripción</Text>
        <ScrollView style={style.scroll}>
          <View style={style.textGen}>
            <Text style={style.genero}>Genero</Text>
            <Text style={style.desGenero}>{descGen && descGen[0]?.genus}</Text>
          </View>
          <Text style={style.desAbility}>Habilidades</Text>

          {descES &&
            descES.map((item) => (
              <View style={style.descritionAbility}>
                <View style={style.Abili}>
                  <Text style={style.abilitys}>* </Text>
                  <Text style={style.desc}>{descGen && item?.flavor_text}</Text>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  // ability: {
  //   backgroundColor: COLORS.orange,
  // },
  cFondo: {
    backgroundColor: COLORS.orange,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
  },
  Atras: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    top: 10,
    left: 10,
    borderRadius: 20,
    backgroundColor: "#FFF",
    zIndex: 2,
  },
  colorsFondo: {
    display: "flex",
    flex: 1,
    backgroundColor: COLORS.white,
  },
  textPoke: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    marginTop: "-10%",
    marginBottom: "10%",
  },
  imagePoke: {
    width: 320,
    height: 320,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: "-20%",
  },
  // description: {
  //   backgroundColor: "#fff",
  //   marginTop: "-5%",
  //   flex: 1,
  // },
  textDescription: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: "5%",
    color: COLORS.gray,
  },
  scroll: {
    display: "flex",
  },
  textGen: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    backgroundColor: COLORS.lightOrange3,
    padding: 6,
    borderBottomStartRadius: 10,
    borderTopRightRadius: 10,
  },
  genero: {
    textAlign: "center",
    fontWeight: "bold",
  },
  desGenero: {
    textAlign: "center",
  },
  desAbility: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.gray,
    textAlign: "center",
  },
  descritionAbility: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  abilitys: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.lightOrange,
    fontSize: 23,
  },
  desc: {
    textAlign: "justify",
    color: COLORS.lightOrange,
  },
  Abili: {
    flexDirection: "row",
  },
});
export default Profile;
