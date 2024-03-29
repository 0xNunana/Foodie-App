import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { categoryData,mealData } from '../Utils/data'
import { heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Animated,{FadeInRight} from 'react-native-reanimated'
import CachedImage from '../Utils/CachedImage'




const Categories = ( {active,handleChange,Categories}) => {
    console.log("Fetched",Categories)

  return (
    <Animated.View entering={FadeInRight.springify(3000)}>
     <ScrollView
     horizontal
     showsHorizontalScrollIndicator={false}
     contentContainerStyle={{paddingHorizontal:15}}
     className='space-x-4'

     >
      
        {
            Categories?.map((category,index)=>{
                let isActive = category.strCategory === active;
                let activebg= isActive ? 'bg-green-400/50':'bg-black/10'
             
                return(
                <TouchableOpacity key={category.idCategory} 
                onPress={()=>handleChange(category.strCategory)}
                className=' flex items-center'>
                  < View className={`p-[10px] rounded-full ${activebg}`} >
                
                {/* uncached images */}
                  {/* <Image 
  source={{ uri: category.strCategoryThumb }}
  style={{ height: hp(7), width: hp(7) }}
  className='rounded-full'

/> */}

<CachedImage   uri= {category.strCategoryThumb }
  style={{ height: hp(7), width: hp(7) }}
  className='rounded-full'/>
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