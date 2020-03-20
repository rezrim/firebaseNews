import React, { useEffect } from 'react';
import { Image, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Fab, Thumbnail, Text, Button, Icon, Left, Body, H1 } from 'native-base';
import {db, str} from '../database/DBconfig'


function DetailNews(props) {
    const [active, setActive] = React.useState(false)
    const [key, setKey] = React.useState("")
    const [data, setData] = React.useState("")
    const [gambar, setGambar] = React.useState([])
    const detailRef = db.ref('/news').child(props.route.params.id)
    
    React.useEffect(()=> {
        detailRef.once('value', dataSnap => {
            let val = dataSnap.val()

            setData(val)
            setKey(dataSnap.key)
        })
        console.log('sudah')
    }, [])

    const deleteNews = () => {
        detailRef.once("value", function(dataSnap){
            dataSnap.forEach(function(child){
                child.ref.remove()
            })
        })

        str.ref(data.gambar).delete().then(function(){
            alert("data telah dihapus")
        })
    }

    return (
        <Container>
            <Content>
                <Card style={{flex: 0}}>
                    <CardItem>
                        <Left>
                            <H1>{data.judul}</H1>
                        </Left>
                    </CardItem>

                    {data.urlGambar !=null &&
                    <CardItem cardBody>
                            <Image source={{uri:data.urlGambar}} style={{height: 200, width: '100%', flex: 1}}/>
                    </CardItem>
                    }

                    <CardItem>
                        <Body>
                            <Text note>{data.tanggal}</Text>
                            <Text>{data.deskripsi}</Text>
                        </Body>
                    </CardItem>

                </Card>
            </Content>

            <Fab
                active={active}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => setActive(!active)}>
                    <Text>+</Text>
                <Button style={{ backgroundColor: '#34A34F' }} onPress={() => props.navigation.navigate("EditNews", {id:key})}>
                    <Image style={{width:20,height:20}} source={require('../images/icon/edit.png')}></Image>
                </Button>
                <Button style={{ backgroundColor: '#3B5998' }} onPress={() => {
                    Alert.alert(
                        'Alert Title',
                        'Yakin Ingin Menghapus Data Ini ?',
                        [
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                          {text: 'OK', onPress: () => {
                                deleteNews()
                                props.navigation.navigate("Home")
                            }},
                        ],
                        { cancelable: false }
                    )
                }}>
                    <Image style={{width:20,height:20}} source={require('../images/icon/trash.png')}></Image>
                </Button>
                
            </Fab>

        </Container>
    );
}

export default DetailNews;