import React from 'react';
import {View} from 'react-native'
import { Container, Button, Text, Title, Content, Card, H1, Body } from 'native-base';
import {db} from '../database/DBconfig'

function Home(props) {
    const [data, setData] = React.useState(0)
    const newsRef = db.ref('/news')

    React.useEffect(()=>{
        newsRef.on('value', dataSnap => {
            let count = 0
            dataSnap.forEach(child => {
               count++
            })
            setData(count)
        })
    },[])

    return (
       <Container>
            <View style={{width:300, height:300, alignSelf:'center', marginTop:20}}>
                <Button onPress={() => props.navigation.navigate("News")} style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Body>
                        <Title style={{fontSize:25}}>TOTAL DATA NEWS</Title>
                        <Title style={{fontSize:40}}>{data}</Title>
                    </Body>
                </Button>
            </View>
       </Container>
    );
}

export default Home;