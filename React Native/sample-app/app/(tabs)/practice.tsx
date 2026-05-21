import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

type Movie = {
  id: string;
  title: string;
  releaseYear: string;
};

export default function PracticeScreen() {
  const colors = [
    'red',
    'blue',
    'green',
    'red',
    'blue',
    'black',
    'red',
    'blue',
    'green',
    'red',
    'blue',
    'black',
    'red',
    'blue',
    'green',
    'red',
    'blue',
    'black',
    'red',
    'blue',
    'green',
    'red',
    'blue',
    'black',
  ];

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    setTimeout(async () => {
      try {
        const response = await fetch('https://reactnative.dev/movies.json');
        const moviesJson = await response.json();
        console.log(moviesJson);
        setMovies(moviesJson.movies);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 5000);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const [name, setName] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 200 }}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          {colors.map((color, index) => (
            <View
              key={index}
              style={[styles.rectangle, { backgroundColor: color }]}
            />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          margin: 16,
          gap: 20,
          alignItems: 'center',
        }}
      >
        <Text style={styles.label}>Enter your name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={movies}
          style={{ height: 200 }}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 20 }}>{item.title}</Text>
          )}
        />
      )}
      <SectionList
        sections={[
          { title: 'Title1', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 9] },
          { title: 'Title2', data: [1, 2, 3, 5, 1, 1, 1, 1, 1, 1] },
        ]}
        keyExtractor={(item, index) => item.toString() + index}
        renderItem={({ item }) => (
          <View style={styles.label}>
            <Text style={styles.label}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.label}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    width: 100,
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 4,
    width: 100,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
  },
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 15,
  },
});
