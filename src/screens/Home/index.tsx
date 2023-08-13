import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { styles } from './styles';
import { api } from '../../services/api';
import { CardMovies } from "../../components/CardsMovies";


interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

export function Home() {
    const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
    const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [noResult, setNoResult] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        LoadMoreData();
    }, [])

    const LoadMoreData = async () => {
        setLoading(true);
        const response = await api.get("/movie/popular", {
            params: {
                page,
            },
        });
        setDiscoveryMovies([...discoveryMovies, ...response.data.results]);
        setPage(page + 1);
        setLoading(false);
    }

    const searchMovies = async (query: string) => {
        setLoading(true);
        const response = await api.get("/search/movie", {
          params: {
            query,
          },
        });
    
        if (response.data.results.length === 0) {
          setNoResult(true);
          setLoading(false);
          setSearchResultMovies([]);
        } else {
          setNoResult(false);
          setSearchResultMovies(response.data.results);
          setLoading(false);
        }
      };
    
      const handleSearch = (text: string) => {
        setSearch(text);
        if (text.length > 2) {
          searchMovies(text);
        } else {
          setSearchResultMovies([]);
        }
      };
    
      const movieData = search.length > 2 ? searchResultMovies : discoveryMovies;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>O que você quer assistir hoje?</Text>
                <View style={styles.containerInput}>
                    <TextInput placeholderTextColor={"#FFF"} placeholder="Buscar" style={styles.input} value={search} onChangeText={handleSearch}/>
                    <MagnifyingGlass color={"#FFF"} size={25} weight='light' />
                </View>
                {noResult && (
                    <Text style={styles.nosearch}>
                        Nenhum filme encontrado para "{search}"
                    </Text>
                )}
            </View>
            <View style={styles.Movies}>
               <FlatList 
                    data={movieData} 
                    renderItem={({item}) => <CardMovies 
                    data={item}/>}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingBottom: 100,
                    }}
                    numColumns={3}
                    onEndReached={() => LoadMoreData()}
                    onEndReachedThreshold={0.5}
                />
                {loading && <ActivityIndicator size={50} color={'#0296e5'}/>}
            </View>
        </View>
    );
}
