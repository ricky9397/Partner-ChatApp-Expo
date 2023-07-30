import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
// import { Typography } from './components/Typography';

export const SplashView:React.FC<{onFinishLoad:()=>void}> = (props)=>{

    useEffect(() =>{
        setTimeout(() => {
            props.onFinishLoad();
        }, 1000);
    }, [])

    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
            <Image
                    style={{height:'100%',width:'100%',resizeMode:'contain'}}
                    source={require('../assets/logo.png')}/>
            {/* <Typography fontSize={36}>짝궁 베이비~</Typography> */}
        </View>
    )

}