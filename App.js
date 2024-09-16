import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, Switch } from 'react-native';
import cardData from './assets/data.json';

export default function App() {

  const [flipped, setFlipped] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isDarkMode, setIsDarkMode] = useState(true);

  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    Animated.timing(flipAnimation, {
      toValue: flipped ? 0 : 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    setFlipped(!flipped);

  };

  const goNext = () => {

    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.cards.length);

    setFlipped(false);

  };

  const goPrevious = () => {

    setCurrentIndex((prevIndex) => (prevIndex - 1 + cardData.cards.length) % cardData.cards.length);

    setFlipped(false);

  };

  const frontInterpolate = flipAnimation.interpolate({

    inputRange: [0, 1],

    outputRange: ['0deg', '180deg'],

  });

  const backInterpolate = flipAnimation.interpolate({

    inputRange: [0, 1],

    outputRange: ['180deg', '360deg'],

  });

  const [cardContent, setCardContent] = useState({

    frontText: '',
    backText: '',
    description: '',

  });

  useEffect(() => {

    setCardContent(cardData.cards[currentIndex]);

  }, [currentIndex]);

  const toggleDarkMode = () => {

    setIsDarkMode((prevMode) => !prevMode);

  };

  const c_Style = isDarkMode ? styles.c_darkMode : styles.c_lightMode;

  const dT_Style = isDarkMode ? styles.d_darkMode : styles.d_lightMode;
  
  const lT_Style = isDarkMode ? styles.lT_darkMode : styles.lT_lightMode;

  return (
    <View style={c_Style}>
      <View style={styles.logoContainer}>
        <Text style={lT_Style}>
          Lingy
        </Text>
      </View>
      
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? '#fff' : '#000'}
          trackColor={{ false: '#fff', true: '#000' }}
        />
      </View>
      
      <View style={styles.cardContainer_All}>
        <TouchableOpacity onPress={flipCard} style={styles.cardContainer}>
          <Animated.View
            style={[
              styles.card,
              { transform: [{ rotateY: frontInterpolate }] },
            ]}
          >
            <Text style={styles.text}>{cardContent.frontText}</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              { transform: [{ rotateY: backInterpolate }] },
            ]}
          >
            <Text style={styles.text}>{cardContent.backText}</Text>
          </Animated.View>
        </TouchableOpacity>

        <Text style={dT_Style}>{cardContent.description}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={goPrevious} style={styles.button}>
            <Text style={styles.buttonText}>PREVIOUS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goNext} style={styles.button}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  c_darkMode: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272727',
  },
  c_lightMode: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  logoContainer: {
    position: 'absolute',
    top: 50,
    left: 30,
  },
  lT_darkMode: {
    fontSize: 48,
    fontWeight: '500',
    color: 'white',
    fontFamily: 'Roboto',
  },
  lT_lightMode: {
    fontSize: 48,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Roboto',
  },
  switchContainer: {
    position: 'absolute',
    top: 50,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#00ccff',
  },
  switchText: {
    fontSize: 16,
    color: '#black',
    marginRight: 10,
  },
  cardContainer_All: {
    alignItems: 'center',
  },
  cardContainer: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  card: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a579e8',
    borderRadius: 12,
    backfaceVisibility: 'hidden',
    position: 'absolute',
    shadowColor: 'black',
    shadowOffset: 
    { 
      width: 0, 
      height: 12 
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  cardBack: {
    backgroundColor: '#00ccff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  d_darkMode: {
    marginTop: 30,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  d_lightMode: {
    marginTop: 30,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#17cf85',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowOffset: 
    {
       width: 0, 
      height: 8 
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
