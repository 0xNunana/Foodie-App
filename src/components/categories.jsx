import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Animated,{FadeInRight} from 'react-native-reanimated'




const Categories = ( {active,setActive,categories}) => {
   

  return (
    <Animated.View entering={FadeInRight.springify(3000)}>
     <ScrollView
     horizontal
     showsHorizontalScrollIndicator={false}
     contentContainerStyle={{paddingHorizontal:15}}
     className='space-x-4'

     >
       
        {
            categories.categories.map((category)=>{
                let isActive = category.strCategory === active;
                let activebg= isActive ? 'bg-green-400/50':'bg-black/10'
             
                return(
                <TouchableOpacity key={category.idCategory} 
                onPress={()=>setActive(category.strCategory)}
                className=' flex items-center'>
                  < View className={`p-[10px] rounded-full ${activebg}`} >
                  <Image 
  source={{ uri: category.strCategoryThumb }}
  style={{ height: hp(8), width: hp(8) }}
  className='rounded-full'

/>
                  </View>


                    <Text className='text-neutral-600' style={{fontSize:hp(1.6)}}>{category.strCategory}</Text>
              </TouchableOpacity>)
})
        }

     </ScrollView>
    </Animated.View>
  )
}

export default Categories