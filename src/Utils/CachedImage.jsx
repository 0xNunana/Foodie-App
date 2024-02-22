import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect,useState } from "react";
import Animated from "react-native-reanimated";


const CachedImage = (props) => {
    const {uri}=props;
    const [cachedSource, setCachedSource]=useState(null);

    useEffect(()=>{
const getCachedImage=async()=>{
    try {
        const cachedImageData = await AsyncStorage.getItem(uri)
        if(cachedImageData){
            setCachedSource({uri:cachedImageData})
        }else {
            const response = await fetch (uri);
            const imageBlob = await response.blob();
            const baseData = await new Promise ((resolve)=>{
                const reader = new FileReader()
                reader.readAsDataURL(imageBlob);
                reader.onloadend=()=>{
                    resolve(reader.result)
                }
            })
await AsyncStorage.setItem(uri,baseData);
setCachedSource({uri:baseData})

                }
        
    } catch (error) {
        console.log('Error caching image',error);
        setCachedSource({uri})
    }
}
getCachedImage()
    },[uri])
  return (
   <Animated.Image source={cachedSource} {...props}/>
  )
}

export default CachedImage