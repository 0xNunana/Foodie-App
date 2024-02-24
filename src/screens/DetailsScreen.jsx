import { View, Text,ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CachedImage from '../Utils/CachedImage'
import { heightPercentageToDP  as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UserIcon,ExclamationCircleIcon} from 'react-native-heroicons/outline'
import {HeartIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import Loading from '../components/Loading'
import Animated,{FadeInDown,FadeIn, FadeInRight} from 'react-native-reanimated'
import YoutubeIframe from 'react-native-youtube-iframe'

const DetailsScreen = (props) => {
    let item =props.route.params
    const navigation = useNavigation()
    const [isFav,setIsFav]=useState(false)
    const [mealinfo,setMealInfo]=useState([])

    const getMeal=async(id)=>{ 
        try {
      
          const res = await axios.get (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          if (!res) {
            throw new Error('Failed to fetch meal data');
          }
        
          if (!res.data ) {
            throw new Error(`meal with id:${id} not found`);
          }
          setMealInfo(res.data.meals[0])
         
        } catch (error) {
          throw new Error('couldnt fetch data')
        }
      }
useEffect(()=>{
getMeal(item.idMeal)
},[item.idMeal])
const ingredientsInfo =(mealinfo)=>{
if(!mealinfo) return []
let indexes = []
for(let i=0; i <=20;i++){
    if(mealinfo['strIngredient'+i]){
        indexes.push(i)
    }
}
return indexes
}


const getYoutubeId=(url)=>{
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex)
    if(match && match[1]){
        return match[1]
    }
    return null
}

  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom:30}}
    className='bg-white flex-1'
    >
        <StatusBar style={'light'}/>
   <View  className='flex-row justify-center'>
    <CachedImage uri={item.strMealThumb}
    sharedTransitionTag={item.strMeal}
    style={{width:wp(98),height:hp(50)}}
    className='rounded-b-[40px]'
    />
   </View>
   {/* back button */}
   <Animated.View entering={FadeIn.delay(200).duration(1000)}  className='w-full absolute flex-row justify-between items-center pt-7'>
    <TouchableOpacity onPress={()=>navigation.goBack()}
    className='p-2 rounded-full bg-white ml-5'
    >
        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color='rgb(20,83,45)'/>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>setIsFav(!isFav)}
    className='p-2 rounded-full bg-white mr-5'
    >
        <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFav ? 'rgb(20,83,45)':'gray'}/>
    </TouchableOpacity>
   </Animated.View>

{/* discription */}
{mealinfo ? (
    <View className='px-4 flex justify-between space-y-4 pt-8'> 
    <Animated.View entering={FadeInDown.delay(500).duration(1000).springify()} className='space-y-2'>
       <Text style={{fontSize:hp(3)}} className='flex-1 font-bold text-green-800'>
           {mealinfo?.strMeal}
       </Text>
       <Text style={{fontSize:hp(2)}} className='flex-1 font-semibold text-neutral-500'>
           {mealinfo?.strArea}
       </Text>
    </Animated.View>

    {/* Timing */}
    <>
    {mealinfo?.strMeal && <Animated.View  entering={FadeInDown.delay(700).duration(1000).springify().damping(7)} className="flex-row justify-around pt-3">
    <View className='flex rounded-full bg-green-400 p-2'>
        <View style={{height:hp(6.5),width:hp(6.5)}}
        className='bg-white rounded-full flex items-center justify-center'
        >
            <ClockIcon size={hp(4)} color={'gray'} strokeWidth={2.5}/>
        </View>
        <View className='flex items-center py-2 space-y-1'>
            <Text style={{fontSize:hp(2)}} 
            className='font-bold text-neutral-700'
            >35</Text>
            <Text 
            style={{fontSize:hp(1.3)}} 
            className='font-bold text-neutral-700'>Mins</Text>
        </View>
    </View>
    <View className='flex rounded-full bg-green-400 p-2'>
        <View style={{height:hp(6.5),width:hp(6.5)}}
        className='bg-white rounded-full flex items-center justify-center'
        >
            <UserIcon size={hp(4)} color={'gray'} strokeWidth={2.5}/>
        </View>
        <View className='flex items-center py-2 space-y-1'>
            <Text style={{fontSize:hp(2)}} 
            className='font-bold text-neutral-700'
            >03</Text>
            <Text 
            style={{fontSize:hp(1.3)}} 
            className='font-bold text-neutral-700'>Servings</Text>
        </View>
    </View>
    <View className='flex rounded-full bg-green-400 p-2'>
        <View style={{height:hp(6.5),width:hp(6.5)}}
        className='bg-white rounded-full flex items-center justify-center'
        >
            <FireIcon size={hp(4)} color={'gray'} strokeWidth={2.5}/>
        </View>
        <View className='flex items-center py-2 space-y-1'>
            <Text style={{fontSize:hp(2)}} 
            className='font-bold text-neutral-700'
            >135</Text>
            <Text 
            style={{fontSize:hp(1.3)}} 
            className='font-bold text-neutral-700'>Calories</Text>
        </View>
    </View>
    <View className='flex rounded-full bg-green-400 p-2'>
        <View style={{height:hp(6.5),width:hp(6.5)}}
        className='bg-white rounded-full flex items-center justify-center'
        >
            <Square3Stack3DIcon size={hp(4)} color={'gray'} strokeWidth={2.5}/>
        </View>
        <View className='flex items-center py-2 space-y-1'>
            <Text style={{fontSize:hp(2)}} 
            className='font-bold text-neutral-700'
            >Easy</Text>
            
        </View>
    </View>


</Animated.View>}
    </>

{/* ingredients */}
<View className='space-y-4 '>
    <Text style={{fontSize:hp(2.5)}} className='font-bold flex-1 text-neutral-700'>Ingredients</Text>
   {ingredientsInfo(mealinfo) ? (
    <View className='space-y-2 ml-3'>
{
    ingredientsInfo(mealinfo).map(i=>{
        return(
            <Animated.View entering={FadeInRight.duration(1000).delay(500*i).springify()} key={i} className='flex-row space-x-4'>
                <View style={{height:hp(1.5),width:hp(1.5)} }
                className='bg-amber-300 rounded-full'
                />
<View className='flex-row space-x-2'>
    <Text style={{fontSize:hp(1.7)}} className='font-extrabold text-neutral-700'>{mealinfo['strMeasure'+i]}</Text>
    <Text style={{fontSize:hp(1.7)}} className='font-medium text-neutral-600'>{mealinfo['strIngredient'+i]}</Text>
    </View>
             
                </Animated.View>
        )
    })
}
    </View>):(
        <Loading text='Loading ingredients' size='large'/>
    )}
</View>



{/* instructions */}

<Animated.View className='space-y-4'>
    <Text style={{fontSize:hp(2.5)}} className='font-bold flex-1 text-neutral-700'>Instructions</Text>
    <Animated.View  className='space-y-2 ml-3'>
        {mealinfo.strInstructions ? (<Animated.Text  entering={FadeInDown.duration(5000).delay(2000)} style={{fontSize:hp(1.6)}} className='text-neutral-700'>
    {mealinfo?.strInstructions}
</Animated.Text>):(
            <Loading text='Loading instructions ...' size='large'/>
        )}

    </Animated.View>
</Animated.View>

{/* recipe video */}

   
        <View className='space-y-4'>
<Text style={{fontSize:hp(2.5)}} className='font-bold flex-1 text-medium'>Video</Text>
{mealinfo.strYoutube ? (
        <View>
        <YoutubeIframe
         videoId={getYoutubeId(mealinfo.strYoutube)}
        // videoId='Ot-dmfBaZrA'
        height={hp(30)}
        />
        </View>):(
               <View className='w-full flex-row space-x-4 bg-black/50 rounded-md flex justify-center items-center'>
            <ExclamationCircleIcon size={hp(5)} color='white'/>
            <Text className=' py-10 text-white' >No recipe video available</Text>
        </View>
        )}



        </View>
    
        
     
    



<View>

</View>   


   </View>
):
(
    <Loading size='large' className='mt-16' text='loading description...'/>
)

}


    </ScrollView>
  )
}

export default DetailsScreen