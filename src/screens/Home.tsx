import React, { useEffect, useState } from 'react';
import { Body, Button, Form, Templates, Header, Input } from '../styledComponents/styles';
import qs from 'qs'
import image from '../assets/emoji.png'
import 'dotenv/config'

interface IMeme {
    id: string,
    name: string,
    url?: string,
}

function App() {

    const [meme, setMeme] = useState<IMeme[]>([])
    const [boxCount, setBoxCount] = useState<number>(0)
    const [boxes, setBoxes] = useState<IMeme[]>([])
    const [id, setId] = useState<number>()
    const [selectedImage, setSelectedImage] = useState<string>()
    const [memeName, setMemeName] = useState<string>()


    useEffect(() => {
        (async () => {
            try {
                const resp = await (await fetch(`https://api.imgflip.com/get_memes`)).json()
                setMeme(resp.data.memes)

            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const handleClickImage = (image: any) => {
        setBoxCount(image.box_count)
        setId(image.id)
        setMemeName(image.name)
    }

    const handleChangeText = (index: number) => (e: any) => {
        const newValue = boxes
        newValue[index] = e.target.value
        setBoxes(newValue)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const params = qs.stringify({
                template_id: id,
                username: process.env.REACT_APP_USERNAME,
                password: process.env.REACT_APP_PASSWORD,
                boxes: boxes.map(text => ({ text }))
            })

            const resp = await fetch(`https://api.imgflip.com/caption_image?${params}`)
            const json = await resp.json()
            const { data: { url } } = json
            setSelectedImage(url)

        } catch (error) {
            console.log(error)
        }
    }

    const handleReset = () => {
        setSelectedImage('')
        setBoxes([])
        setBoxCount(0)
        setMemeName('')
    }

    return (
        <div style={{
            margin: 0,
            padding: 0,
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            background: 'linear-gradient(to right, rgba(218, 210, 153, 0.3), rgba(176, 218, 185, 0.3))',
        }}>
            <Header>
                Crie seu Meme
                <img src={image} alt='Logo' width='80vw' height='80vh' />
            </Header>
            <div style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
            }}>
                <Body>
                    {selectedImage && (
                        <>
                            <img src={selectedImage} width='auto' height='auto' alt='' />
                            <Button onClick={handleReset}>Criar novo meme</Button>
                        </>
                    )}

                    {!selectedImage && (
                        <>
                            <Templates>
                                {meme.map((meme, index) => {
                                    return (
                                        <button style={{ marginRight: '10px' }} onClick={() => handleClickImage(meme)} key={index}>
                                            <img width='180vw' height='170vh' src={meme.url} alt={meme.name} />
                                        </button>
                                    )
                                })}
                            </Templates>
                            <Form onSubmit={handleSubmit}>
                                <div style={{
                                    fontSize: '30px',
                                    position: 'relative',
                                    flex: 1,
                                    textAlign: 'center'
                                }}>Textos
                                <div style={{
                                    fontSize: '0.7em'
                                    }}>{memeName}</div>
                                </div>
                                {!boxCount && (
                                    <div style={{
                                        color: '#000',
                                        fontSize: '150%',
                                        position: 'absolute'
                                    }}>Escolha uma imagem e crie seu texto</div>
                                )}
                                {(new Array(boxCount).fill('').map((_, index) => (
                                    <Input
                                        key={index}
                                        placeholder={`Text # ${index + 1}`}
                                        onChange={handleChangeText(index)}
                                    />
                                )))}
                                <Button type='submit'>Criar Meme</Button>
                            </Form>
                        </>
                    )}
                </Body>
            </div>
        </div>
    );
}

export default App;