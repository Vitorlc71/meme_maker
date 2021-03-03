import styled from 'styled-components'

export const Body = styled.div`
    width: 70vw;
    height: 75vh;
    background-color: #fff;
    justify-content: center;
    padding-top: 1em;
    padding-bottom: 20px;
    display: flex;
    border-radius: 10px;
    box-shadow: 3px 3px 5px gray;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    margin-top: 30px;
    padding-left: 1em;
    padding-right: 1em;
`

export const Templates = styled.div`
    width: 95%;
    height: 30vh;
    background-color: #DCDCDC;
    display: flex;
    flex-direction: row;
    overflow-y: auto;
    align-items: center;
    border-radius: 10px;
`

export const Form = styled.form`
    width: 95%;
    height: 60%;
    background-color: #DCDCDC;
    margin-top: 10px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    align-content: center;
    display: flex;
    flex-direction: column;
`

export const Button = styled.button`
    width: 90%;
    height: 40px;
    background-color: #0000FF;
    outline: none;
    border: none;
    border-radius: 7px;
    margin-top: 10px;
    margin-bottom: 10px;
    color: white;
    font-size: 20px;
    padding: 5px;
    

    &: hover {
        opacity: 0.7;
    }
`

export const Header = styled.header`
    width: windowWidth;
    height: 10vh;
    background-color: #0078D4;
    box-shadow: 0 2px 5px gray;
    font-family: Impact;
    color: white;
    padding-left: 14vw;
    font-size: 1.8em;
    display: flex;
    align-items: center;
    text-shadow: 2px 2px 2px black;
`

export const Input = styled.input`
    width: 90%;
    height: 2em;
    border-radius: 7px;
    margin-bottom: 10px;
    text-align: center;
    border: none;
    outline: none;
`