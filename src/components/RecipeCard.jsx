import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, { FadeInDown } from 'react-native-reanimated'
import CachedImage from '../Utils/CachedImage'




const RecipeCard = ({item,index}) => {
    let isEven = index%2==0
  return (
    <Animated.View entering={FadeInDown.delay(index*100).duration(1000).springify().damping(12)}>
  <Pressable style={{width:'100%',paddingLeft:isEven ? 0:8,paddingRight:isEven ? 8:0}}
  className="flex justify-center mb-4 space-y-1"
  >

    {/* uncached images  */}
    {/* <Image source={{uri:item.strMealThumb}}
    style={{width:'100%', height: index%3==0 ? hp(15) :hp(25),borderRadius:35}}
    className='bg-black/5'
    /> */}

{/* cached images */}
<CachedImage
uri={item.strMealThumb}
style={{width:'100%', height: index%3==0 ? hp(15) :hp(25),borderRadius:35}}
className='bg-black/5'
/>

    <Text style={{fontSize:hp(1.5)}} className='font-semibold ml-2 text-neutral-600'>
        {item.strMeal.length > 20 ? item.strMeal.slice(0,20)+'...' : item.strMeal}
    </Text>

  </Pressable>
    </Animated.View>
  )
}

export default RecipeCard