import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import icons, { COLORS } from "../../constants/icons";

const ItemPoke = ({ data, clearPokemon }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  return (
    <View style={style.list}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={style.clear}
          onPress={() => {
            setVisible(true);
          }}
        >
          <Image source={icons.clear} style={style.iconClear} />
        </TouchableOpacity>

        <Image
          source={{
            uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${data.name}.png`,
          }}
          style={style.imgPoke}
        />
        <Text style={style.namePoke}>{data.name}</Text>
        <Pressable
          onPress={() =>
            navigation.navigate("Profile", {
              data: data,
            })
          }
        >
          <Text style={style.textDetail}>Ver Detalles</Text>
        </Pressable>
      </View>
      <Modal transparent visible={visible}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              width: "80%",
              borderRadius: 10,
              elevation: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 25, marginRight: 10 }}
              >
                x
              </Text>
            </TouchableOpacity>

            <Image
              source={icons.clear}
              style={{
                tintColor: COLORS.red,
                alignSelf: "center",
                width: 50,
                height: 50,
              }}
            />

            <Text
              style={{
                marginVertical: 30,
                fontSize: 20,
                textAlign: "center",
              }}
            >
              ¿Esta seguro de eliminar el Pokemon?
            </Text>
            <TouchableOpacity
              onPress={() => {
                clearPokemon(data);
                setVisible(false);
              }}
            >
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 20,
                  textAlign: "center",
                  color: COLORS.white,
                  backgroundColor: COLORS.orange,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 5,
                  width: 150,
                  alignSelf: "center",
                }}
              >
                SI
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const style = StyleSheet.create({
  textDetail: {
    fontSize: 13,
    color: COLORS.white,
    backgroundColor: COLORS.orange,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  namePoke: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#000",
  },
  imgPoke: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  list: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 15,
    padding: 10,
  },

  clear: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  iconClear: {
    width: 20,
    height: 20,
  },
});

export default ItemPoke;
