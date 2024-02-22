import { View, Text, StatusBar, ScrollView } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <View className='flex-1 bg-white'>
        <StatusBar style='dark'/>
    <ScrollView showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom:50}}
    className='space-y-6 pt-14'
    >

    </ScrollView>
    </View>
  )
}

export default HomeScreen