import React, { useEffect, useState } from "react";

import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { images } from "../../assets/images/images";
import icons, { COLORS } from "../../constants/icons";
const CreateScreen = () => {
  const [visible, setVisible] = useState(false);
  const [editAdd, setEdiAdd] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [objEdit, setobjEdit] = useState({});
  const [selectImg, setSelectImg] = useState(images[0].img);
  const objData = { name: name, description: description, img: selectImg };
  const [listCreate, setListCreate] = useState([]);
  const addEditPokemon = () => {
    if (editAdd) {
      setEdiAdd(false);
      const editPo = listCreate.map((poke) =>
        poke === objEdit ? objData : poke
      );
      setListCreate(editPo);
      setDescription("");
      setName("");
    } else {
      setEdiAdd(false);
      setListCreate([...listCreate, objData]);
      setDescription("");
      setName("");
    }
  };
  const editPoke = (item) => {
    setEdiAdd(true);
    setobjEdit(item);
    setDescription(item?.description);
    setName(item?.name);
    setSelectImg(item.img);
    setVisible(true);
  };
  const clearPokemon = (objData) => {
    const newList = listCreate?.filter((data) => data !== objData);
    setListCreate(newList);
  };
  const setPoke = async () => {
    try {
      if (listCreate.length != 0)
        AsyncStorage.setItem("@Pokemon", JSON.stringify(listCreate));
    } catch (error) {
      // Error saving data
    }
  };

  const getPoke = async () => {
    try {
      const value = await AsyncStorage.getItem("@Pokemon");
      console.log("stoeee", JSON.parse(value));
      //  JSON.parse(value);
      setListCreate(JSON.parse(value));
    } catch (e) {
      console.log(e);
      // return null;
    }
  };
  useEffect(() => {
    setPoke();
  }, [listCreate]);
  useEffect(() => {
    getPoke();
  }, []);
  const createCard = ({ item }) => {
    return (
      <View style={style.card}>
        <Image
          source={{
            uri: item.img,
          }}
          style={style.imgPoke}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View>
            <Text style={style.nam}>{item?.name}</Text>
            <Text style={style.des}>{item?.description}</Text>
          </View>
          <View>
            <Pressable onPress={() => editPoke(item)}>
              <Text style={style.editar}>Editar</Text>
            </Pressable>
            <Pressable onPress={() => clearPokemon(item)}>
              <Text style={style.editar}>Eliminar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  const imageView = ({ item }) => {
    return (
      <View
        style={[
          style.cardSelect,
          selectImg == item.img ? style.selected : null,
        ]}
      >
        <Pressable onPress={() => setSelectImg(item.img)}>
          <Image
            source={{
              uri: item.img,
            }}
            style={style.imgPokeSelect}
          />
        </Pressable>
      </View>
    );
  };
  return (
    <>
      <View>
        <View style={style.create}>
          <Text style={style.textCreate}>CREAR POKEMONES</Text>

          <Pressable
            onPress={() => {
              setVisible(true);
            }}
          >
            <Text style={style.texC}>+ crear</Text>
          </Pressable>
        </View>
        {listCreate ? (
          <FlatList
            data={listCreate}
            renderItem={createCard}
            keyExtractor={(item, i) => `product_${i}`}
          />
        ) : (
          <Text>No tienes Pokemon regitrado</Text>
        )}
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
              padding: 10,
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
            <Text style={{ fontWeight: "bold", fontSize: 16, marginRight: 10 }}>
              Seleccione la imagen:
            </Text>
            <FlatList
              horizontal
              data={images}
              renderItem={imageView}
              keyExtractor={(item, i) => `product_${i}`}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                marginRight: 10,
                marginBottom: 10,
              }}
            >
              Ingrese Nombre:
            </Text>
            <TextInput
              onChangeText={(e) => setName(e)}
              placeholder="Nombre"
              value={name}
              style={{
                fontWeight: "bold",
                fontSize: 15,
                height: 50,
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 5,
                paddingHorizontal: 5,
              }}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                marginRight: 10,
                marginBottom: 10,
              }}
            >
              Ingrese Descripción:
            </Text>
            <TextInput
              onChangeText={(e) => setDescription(e)}
              placeholder="Descripción"
              value={description}
              style={{
                fontWeight: "bold",
                fontSize: 15,
                height: 50,
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 5,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                addEditPokemon();

                setVisible(false);
              }}
            >
              <Text style={style.agregar}>
                {editAdd ? "ACTUALIZAR" : "Agregar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
const style = StyleSheet.create({
  create: {
    flexDirection: "row",
    display: "flex",
    margin: 20,
  },
  textCreate: {
    flex: 1,
    fontWeight: "bold",
    marginVertical: 24,
    color: COLORS.orange,
    fontSize: 18,
  },
  imgPoke: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  imgPokeSelect: { width: 50, height: 50 },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    margin: 5,
    borderRadius: 20,
    borderColor: COLORS.orange,
  },
  selected: {
    backgroundColor: COLORS.orange,
  },
  cardSelect: {
    borderWidth: 2,
    marginHorizontal: 5,
    borderRadius: 20,
    marginVertical: 10,
  },
  agregar: {
    marginVertical: 10,
    fontSize: 20,
    textAlign: "center",
    color: COLORS.white,
    backgroundColor: COLORS.orange,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 5,
    width: 150,
    alignSelf: "center",
    marginTop: 15,
  },
  texC: {
    backgroundColor: COLORS.orange,
    padding: 10,
    marginTop: 18,
    borderRadius: 10,
    paddingHorizontal: 50,
  },
  editar: {
    backgroundColor: COLORS.lightOrange3,
    marginVertical: 5,
    marginRight: 28,
    padding: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    textAlign: "center",
  },
  nam: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  des: {
    fontSize: 16,
    textAlign: "center",
  },
});
export default CreateScreen;
