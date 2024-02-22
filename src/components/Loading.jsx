import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = (props) => {
  return (
    <View className='flex-1 justify-center items-center flex'>
      <ActivityIndicator {...props}/>
      <Text>{props.text}</Text>
    </View>
  )
}

export default Loading