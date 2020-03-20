import React from 'react';
import {View, Image} from 'react-native'
import { Container, Header, Text, Content, Form, Item, Input, Button, CardItem, Body } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {str,db} from '../database/DBconfig'

function EditNews(props) {
    const [gambar, setGambar] = React.useState("")
    const [gambarResponse, setGambarResponse] = React.useState(null)
    const [judul, setJudul] = React.useState("")
    const [deskripsi, setDeskripsi] = React.useState("")
    const [namaGambar, setNamaGambar] = React.useState("")

    const id = props.route.params.id
    const detailRef = db.ref('/news').child(props.route.params.id)

    const ref = str.ref();

    const options = {
        title: 'Select Image',
    };

    React.useEffect(()=> {
        detailRef.once('value', dataSnap => {
            let val = dataSnap.val()

            setJudul(val.judul)
            setDeskripsi(val.deskripsi)
            setGambar(val.urlGambar)
            setNamaGambar(val.gambar)
        })
    }, [])

    const clear = () => {
        setGambarResponse(null)
        setGambar("")
        setJudul("")
        setDeskripsi("")
    }

    const pilihGambar =() => {
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = 'data:image/jpeg;base64,' + response.data ;
                setGambar(source)
                setGambarResponse(response)
            }
        });
    }

    const saveNews = async() => {
        const tanggal = new Date().getDate();
        const bulan = new Date().getMonth();
        const tahun = new Date().getFullYear();

        if(judul !== "" && deskripsi !== ""){
            let query = db.ref('/news').orderByKey().equalTo(id)
            
            if(gambarResponse!=null){
                str.ref(namaGambar).delete()

                const res = await fetch(gambarResponse.uri);
                const blob = await res.blob();
                let imgRef = ref.child(gambarResponse.fileName)

                imgRef.put(blob).then(function(params) {
                    imgRef.getDownloadURL().then(function(url){
                        query.once("value", function(dataSnap){
                            dataSnap.forEach(function(child){
                                child.ref.update({
                                    judul,
                                    deskripsi,
                                    gambar : gambarResponse.fileName,
                                    urlGambar : url,
                                    tanggal : tanggal+'-'+bulan+'-'+tahun
                                }).then( async () => {
                                        clear()
                                        alert("Data Berhasil di Ubah")
                                        props.navigation.navigate("News")
                                })
                            })
                        })
                    })
                    
                })
            }else{
                query.once("value", function(dataSnap){
                    dataSnap.forEach(function(child){
                        child.ref.update({
                            judul,
                            deskripsi,
                            tanggal : tanggal+'-'+bulan+'-'+tahun
                        }).then( async () => {
                                clear()
                                alert("Data Berhasil di Ubah")
                                props.navigation.navigate("News")
                        })
                    })
                })
            }
        }else{
          alert("Ada Data yang belum di isi")
        }
      }

    return (
        <Container>
            <Content>
                <Form>
                    <Item>
                        <Input placeholder="Judul Berita" value={judul} onChangeText={(val) => setJudul(val)}/>
                    </Item>
                    <Item>
                        <Input placeholder="Deskripsi" value={deskripsi} onChangeText={(val) => setDeskripsi(val)}/>
                    </Item>
                </Form>
                <CardItem>
                    <Body>
                        <Button onPress={pilihGambar} block info> 
                            <Text>Pilih Gambar</Text>
                        </Button>
                            <Image source={{uri : gambar}} style={{width:'100%', alignSelf:'center', marginTop:10, height:200, resizeMode:'stretch'}}/>
                    </Body>
                </CardItem>

                <CardItem>
                    <Body>
                        <Button block onPress={saveNews}> 
                                <Text>Simpan</Text>
                        </Button>
                    </Body>
                </CardItem>
                
            </Content>
        </Container>
    );
}

export default EditNews;