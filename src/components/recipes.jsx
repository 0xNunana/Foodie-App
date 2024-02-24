import { View, Text } from 'react-native'
import React from 'react'
import { heightPercentageToDP  as hp} from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '../Utils/data';
import RecipeCard from './RecipeCard';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';




const Recipes = ({Categories,Recipes}) => {
  const navigation = useNavigation()
  return (
    <View className='mx-4 space-y-3'>
      <Text style={{fontSize:hp(3)}} className='font-semibold text-[rgb(20,83,45)]'>Recipe</Text>
      <View className=''>
        {Categories.length==0 || Recipes.length == 0 ? (
            <Loading  size='large' className='mt-20' text='Fetching Recipes ...'/>
        ) : 
      <MasonryList
  data={Recipes}
  keyExtractor={(item) => item.idMeal}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  renderItem={({item,i}) => <RecipeCard item={item} index={i} navigation={navigation}/>}

 
/>}
      </View>
    </View>
  )
}

export default Recipes