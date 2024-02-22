import { View, Text } from 'react-native'
import React from 'react'
import { heightPercentageToDP  as hp} from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '../Utils/data';
import RecipeCard from './RecipeCard';




const Recipes = ({Categories,Recipes}) => {
  return (
    <View className='mx-4 space-y-3'>
      <Text style={{fontSize:hp(3)}} className='font-semibold text-neutral-600'>Recipe</Text>
      <View className=''>
        {Categories.length == 0 ? null : 
      <MasonryList
  data={Recipes}
  keyExtractor={(item) => item.idMeal}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  renderItem={({item,i}) => <RecipeCard item={item} index={i}/>}

 
/>}
      </View>
    </View>
  )
}

export default Recipes