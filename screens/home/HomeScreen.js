import { useNavigation } from '@react-navigation/core'
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import React, {useContext} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { auth } from '../../firebase/config'
import Card from '../../components/BingeCard';
import users from '../../assets/data/users';
import AnimatedStack from '../../components/AnimatedStack';
import Swiper from 'react-native-deck-swiper';

const HomeScreen = () => {
  const onSwipeLeft = user => {
    console.warn('swipe left', user.name);
  };

  const onSwipeRight = user => {
    console.warn('swipe right: ', user.name);
  };

  return (
    // <View style={styles.pageContainer}>
    //   <AnimatedStack
    //     data={users}
    //     renderItem={({item}) => <Card user={item} />}
    //     onSwipeLeft={onSwipeLeft}
    //     onSwipeRight={onSwipeRight}
    //   />
    // </View>

    <View style={styles.swiperContainer}>
        <Swiper
          containerStyle={{backgroundColor: 'transparent'}}
          cards={users}
          renderCard={(card) => { return (
            <View key={card.id} style={styles.cardView}> 
              {/* , tailwind('bg-red-500 h-3/4 rounded-xl') */}
              {/* <Text style={styles.cardText}>{card.name}</Text> */}
              <Image style={styles.cardImg} source={{uri: card.image}} />
            </View>
          )
          }}
        />
      </View>

  );
};

export default HomeScreen

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  swiperContainer: {
    flex: 1,
    marginTop: 15,
  },
  cardView: {
    flex: 1,
    position: "relative",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 100,
  },
  cardImg: {
    // position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: 15,
    alignSelf: 'center'
  },
  cardText: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
})