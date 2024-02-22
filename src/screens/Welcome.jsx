import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated,{useSharedValue,withSpring,SlideInDown,SlideInUp,useAnimatedStyle} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
const Welcome = () => {
const navigation = useNavigation()
const ring1Padding = useSharedValue(0)
const ring2Padding = useSharedValue(0)
const turn = useSharedValue(45)
const border = useSharedValue(0)

const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${turn.value}deg` }], // Apply the rotation animation
     
    };
  });

useEffect(()=>{
    ring1Padding.value =0
    ring2Padding.value =0
   
    setTimeout(() => ring2Padding.value = withSpring(ring2Padding.value + hp(4)), 100);
    setTimeout(() => ring1Padding.value = withSpring(ring1Padding.value + hp(5)), 300);
    setTimeout(()=>turn.value = withSpring(0))
    setTimeout(()=>border.value = withSpring(200),500)
    setTimeout(()=>navigation.navigate('Home'),3000)
},[])

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-green-500/70">
        {/* <StatusBar style="light"/> */}
        <Animated.View >
<Animated.Text entering={SlideInUp.duration(1000).delay(1000)} style={{fontSize:hp(4.5)}} className='text-green-900  font-bold'>Foodie</Animated.Text>
</Animated.View>

<Animated.View className='bg-white/30  ' style={[animatedStyles,{padding:ring1Padding ,borderRadius:border}]}>
    
        <Animated.Image  source={require('../../assets/images/w.webp')}
        style={{height:hp(25),width:hp(25)}} className='rounded-full'
        />
    
</Animated.View>

<Animated.View >
  <Animated.Text entering={SlideInDown.duration(1000).delay(1000)} style={{fontSize:hp(2.5)}} className='text-white  font-semibold'> The Ultimate Food App</Animated.Text>
<Animated.Text entering={SlideInDown.duration(1000).delay(1000)} style={{fontSize:hp(1.5)}} className='text-green-900  font-semibold text-center'> 0xNunana</Animated.Text>
</Animated.View>
     
    </View>
  )
}

export default Welcome

