import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { categoryData,mealData } from '../Utils/data'
import { heightPercentageToDP as hp} from 'react-native-responsive-screen'

const Categories = ( {active,setActive}) => {

  return (
    <View>
     <ScrollView
     horizontal
     showsHorizontalScrollIndicator={false}
     contentContainerStyle={{paddingHorizontal:15}}
     className='space-x-4'
     >
        {
            categoryData.map((category,index)=>{
                let isActive = category.name === active;
                let activebg= isActive ? 'bg-green-400/50':'bg-black/10'
             
                return(
                <TouchableOpacity key={index} 
                onPress={()=>setActive(category.name)}
                className=' flex items-center'>
                  <View className={`p-[10px] rounded-full ${activebg}`} >
                  <Image 
  source={{ uri: category.image }}
  style={{ height: hp(8), width: hp(8) }}
  className='rounded-full'

/>
                  </View>


                    <Text className='text-neutral-600' style={{fontSize:hp(1.6)}}>{category.name}</Text>
              </TouchableOpacity>)
})
        }

     </ScrollView>
    </View>
  )
}

export default Categories