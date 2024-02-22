import { View, Text, StatusBar, ScrollView,Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import {BellIcon, MagnifyingGlassIcon, NellIcon} from 'react-native-heroicons/outline'
import { heightPercentageToDP as hp ,widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Categories from '../components/categories'
import axios from 'axios'
import Recipes from '../components/recipes'
import Loading from '../components/Loading'



const HomeScreen = () => {
  const [activeCat,setActiveCat]= useState('Beef')
  const [categories,setCategories]=useState([])
  const [recipes,setRecipes]=useState([])


const handleChangeCategory=(category)=>{
  setRecipes([])
  getRecipes(category);
  setActiveCat(category)
 
}


const getCategories=async()=>{
  try {
    const res = await axios.get ('https://www.themealdb.com/api/json/v1/1/categories.php')
   
    if (!res) {
      throw new Error('Failed to fetch categories');
    }
  
    if (!res.data ) {
      throw new Error('Data or categories not found');
    }
    setCategories(res.data.categories)
  } catch (error) {
    throw new Error('couldnt fetch data')
  }
}

const getRecipes=async(category = 'Beef')=>{
  try {

    const res = await axios.get (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    if (!res) {
      throw new Error('Failed to fetch recipes');
    }
  
    if (!res.data ) {
      throw new Error(`${category} meals not found`);
    }
    setRecipes(res.data.meals)
  } catch (error) {
    throw new Error('couldnt fetch data')
  }
}





useEffect(()=>{
  getCategories()
  getRecipes()
},[])




  return (
    <View className='flex-1 bg-white'>
        <StatusBar style='dark'/>
    <ScrollView showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom:50}}
    className='space-y-6 pt-4'
    >
      {/* Avatar and bell icon*/}
      <View className="mx-4 flex-row justify-between items-center mb-2 ">
        <Image source={require('../../assets/images/me.png')}
        style={{height:hp(5), width:hp(5), borderRadius:100}}
        />
  <Text style={{fontSize:hp(1.8)}} className='text-neutral-600'>Hello, Xing!</Text>
        <BellIcon size={hp(4)} color="rgb(20,83,45)"/>
      </View>

{/* Greetings*/ }
<View className="mx-4 space-y-2 mb-2">

  <View>
    <Text style={{fontSize:hp(2.5)}} className=" font-bold">Find Popular Recipes</Text>
  </View>
  <Text style={{fontSize:hp(2.3)}} className='text-green-900 '>Carefully curated recipes for <Text style={{fontSize:hp(3)}} className='text-amber-400 font-bold'>You!</Text></Text>
</View>

      {/* search bar */}
      <View className='mx-4 flex-row bg-black/5 p-[6px] rounded-full'>
<TextInput 
placeholder='Search recipe here'
placeholderTextColor={'gray'}
style={{fontSize:hp(1.7)}}
className='flex-1 text-base tracking-wider px-3'
/>

<View className='bg-white rounded-full p-3'>
  <MagnifyingGlassIcon size={hp(2.7)} strokeWidth={3} color='rgb(20,83,45)'/>
</View>

      </View>


       {/* categories */}
    
       <View >
       {categories.length > 0 ?
        <Categories active={activeCat} handleChange={handleChangeCategory} Categories={categories}/>
      :<Loading size='large' className='my-5' text='Fetching Categories ...'/>
      }
         </View>


         {/* recipes */}
         <View>
          <Recipes Categories={categories} Recipes={recipes}/>
         </View>


    </ScrollView>
    </View>
  )
}

export default HomeScreen