import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Axios from "axios";
import ItemPoke from "../components/ItemPoke";
import icons, { COLORS } from "../../constants/icons";
const HomeScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [query, setQuery] = useState("");
  const [ListPokemon, setLisPokemon] = useState([]);
  const [pagina, setPagina] = useState(
    "https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=8"
  );
  const getPoke = async (reload) => {
    reload ? setReloading(true) : setLoading(true);

    try {
      const res = await Axios.get(pagina, {
        headers: { authorization: `Bearer s` },
      });
      setPagina(res.data.next);
      if (ListPokemon.length === 0 || reload) {
        setLisPokemon(res.data.results);
      } else {
        setLisPokemon([...ListPokemon, ...res?.data?.results]);
      }
      reload ? setReloading(false) : setLoading(false);
    } catch (error) {
      console.log("error", error);
      reload ? setReloading(false) : setLoading(false);
    }
  };
  useEffect(() => {
    getPoke(false);
  }, []);
  const refresh = async () => {
    setPagina("https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=8");

    console.log("pokeee", ListPokemon);
    getPoke(true);
  };

  let listSearch = ListPokemon?.filter(
    (item) => item?.name?.toLowerCase().search(query?.toLowerCase()) !== -1
  );
  const clearPokemon = (data) => {
    console.log("dataaa", data);
    const newList = listSearch?.filter((item) => item !== data);

    setLisPokemon(newList);
  };

  const cardPokemon = ({ item }) => {
    return <ItemPoke data={item} clearPokemon={clearPokemon} />;
  };
  return (
    <View style={{ display: "flex", flex: 1 }}>
      <Image source={icons.poke} style={style.poke} />
      <View style={style.containerSearch}>
        <View style={style.inputSearch}>
          <Image source={icons.search} style={style.imgPoke} />
          <TextInput
            onChangeText={(e) => setQuery(e)}
            placeholder="Buscar..."
            style={{ fontWeight: "bold", fontSize: 15, flex: 1 }}
          />
        </View>
        <View style={style.search} onStartShouldSetResponder={() => null}>
          <Image source={icons.search} style={style.iconH} />
        </View>
      </View>
      <FlatList
        refreshing={reloading}
        onRefresh={refresh}
        data={listSearch}
        numColumns={2}
        renderItem={cardPokemon}
        keyExtractor={(item, i) => `product_${i}`}
        onEndReached={() => getPoke(false)}
      />

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};
export default HomeScreen;

const style = StyleSheet.create({
  search: {
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  inputSearch: {
    height: 50,
    backgroundColor: COLORS.lightGray1,
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  containerSearch: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  imgPoke: {
    tintColor: COLORS.gray,
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  iconH: {
    tintColor: COLORS.gray,
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
  poke: {
    margin: 10,
    width: 100,
    height: 40,
    marginBottom: -10,
    marginLeft: 20,
  },
});
