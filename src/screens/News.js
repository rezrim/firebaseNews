import React from 'react';
import { Image } from 'react-native';
import { Container, Header, H1, Content, Card, CardItem, Thumbnail, Fab, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {db} from '../database/DBconfig'

function News(props) {
    const [data, setData] = React.useState([])
    const newsRef = db.ref('/news')

    React.useEffect(()=>{
        newsRef.on('value', dataSnap => {
            let news = []
            dataSnap.forEach(child => {
                news.push({
                    judul:child.val().judul,
                    deskripsi:child.val().deskripsi,
                    gambar:child.val().gambar,
                    tanggal:child.val().tanggal,
                    urlGambar:child.val().urlGambar,
                    key:child.key
                })
            })
            setData(news)
        })
    },[])

    return (
        <Container>
        
            <Content>
                { data.map((val,key) => {
                    console.log(val.urlGambar)
                    return (
                        <Card key={key}>

                            <CardItem>
                                <Body>
                                    <H1>{val.judul}</H1>
                                    <Text note>{val.tanggal}</Text>
                                </Body>
                            </CardItem>
                            {val.urlGambar != null &&
                            <CardItem> 
                                <Image source={{uri:val.urlGambar}} style={{height: 200, width: null, resizeMode:'stretch' ,flex: 1}}/>
                            </CardItem>
                            }

                            <CardItem>
                                <Text>
                                    {val.deskripsi}
                                </Text>
                            </CardItem>

                            <CardItem footer bordered>
                                <Left>
                                    <Text>4 Comments</Text>
                                </Left>

                                <Right>
                                    <Button onPress={() => props.navigation.navigate("DetailNews",{id:val.key})}><Text>Read More</Text></Button>
                                </Right>
                            </CardItem>

                        </Card>
                    )
                }) }
                
                
            </Content>

            <Fab
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => props.navigation.navigate("AddNews")}>
                <Text>+</Text>
            </Fab>
        </Container>
    );
}

export default News;