import React, { useEffect, useState } from 'react';
import { Body, Button, Form, Templates, Header, Input } from '../styledComponents/styles';
import image from '../assets/emoji.png'
import env from 'dotenv'
import axios from 'axios'

env.config()

interface IMeme {
    id: string,
    name: string,
    url?: string,
}

function App() {

    const [meme, setMeme] = useState<IMeme[]>([])
    const [boxCount, setBoxCount] = useState<number>(0)
    const [boxes, setBoxes] = useState<Array<string>>([])
    const [id, setId] = useState<number>()
    const [selectedImage, setSelectedImage] = useState<string>()
    const [memeName, setMemeName] = useState<string>()

    const { REACT_APP_URL, REACT_APP_USER, REACT_APP_PASSWORD } = process.env

    useEffect(() => {
        (async () => {
            try {
                const resp = await axios.get(`${REACT_APP_URL}`)
                setMeme(resp.data)

            } catch (error) {
                console.log(error)
            }
        })()
    }, [REACT_APP_URL])

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
            if (!memeName) {
                alert('Escolha uma imagem!')
            } else {
                const params = {
                    template_id: id,
                    username: REACT_APP_USER,
                    password: REACT_APP_PASSWORD,
                    boxes: boxes.map(text => ({ text }))
                }

                const resp = await axios.post(`${REACT_APP_URL}/getmeme`, params)
                setSelectedImage(resp.data.data.url)
            }

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
                            <p style={{ textAlign: 'center', marginBottom: '2.5em', fontSize: '1.2em' }}>Clique com botão direito do mouse e depois selecione <b>Salvar
                                imagem como</b> para salvar a imagem em seu dispositivo.</p>
                            <img src={selectedImage} width='300em' height='300em' alt='' style={{ marginBottom: '2em' }} />
                            <Button onClick={handleReset}>Criar novo meme</Button>
                        </>
                    )}

                    {!selectedImage && (
                        <>
                            <Templates>
                                {meme.map((meme, index) => {
                                    return (
                                        <button style={{ marginRight: '10px', border: 'none', padding: 0 }} onClick={() => handleClickImage(meme)} key={index}>
                                            <img width='150em' height='150em' src={meme.url} alt={meme.name} />
                                        </button>
                                    )
                                })}
                            </Templates>
                            <Form onSubmit={handleSubmit}>
                                <div style={{
                                    fontSize: '30px',
                                    position: 'relative',
                                    flex: 1,
                                    textAlign: 'center',
                                    marginTop: '0.4em'
                                }}>Textos
                                <div style={{
                                        fontSize: '0.7em'
                                    }}>{memeName}</div>
                                </div>
                                {!boxCount && (
                                    <div style={{
                                        color: '#000',
                                        fontSize: '1.1em',
                                        position: 'absolute',
                                        textAlign: 'center'
                                    }}>Escolha uma imagem<div>e crie seu texto</div></div>
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
