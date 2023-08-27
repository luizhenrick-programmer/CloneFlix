import { Text, View } from "react-native";
import { styles } from "./styles";
import { BookmarksSimple } from "phosphor-react-native";
import { useState, useEffect } from "react"; // Importe o useEffect para carregar a lista de filmes quando o componente for montado

export function MyList() {
  const [listMovies, setListMovies] = useState([]);
  useEffect(() => {}, []); 

  return (
    <View style={styles.container}>
      <BookmarksSimple size={48} color="white" />
      {listMovies.length === 0 ? (
        <Text style={styles.teste}>Nenhum filme salvo no momento...</Text>
      ) : (
        <View>
          {listMovies.map((movie) => (
            <Text key={movie.id}>{movie.title}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

export default MyList;
