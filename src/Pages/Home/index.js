import { useState } from 'react'
import './home.css'

import { Link } from 'react-router-dom'

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

function Home() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault();
        if(email !== '' && password !== ''){
            
            await signInWithEmailAndPassword(auth, email, password)
            .then( ()=>{
                //navegar para /admin
                navigate( '/admin', {replace: true} )
                toast.success('Bem-vindo a suas tarefas!', {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            } )
            .catch( ()=>{
                toast.error('Login inválido!', {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                    setEmail('')
                    setPassword('')
            } )
        }else{
            toast.warn('Por favor preencha os campos!', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        
    }


    return (
      <div className='home-container'>
        <h1>Lista de tarefas</h1>
        <span>Gerencie sua agenda de forma fácil.</span>

        <form className='form' onSubmit={handleLogin}>
            <input 
            type='text' 
            placeholder='Digite seu email...'
            value={email}
            onChange={ (e)=> setEmail(e.target.value) }
            />
            <input 
            type='password' 
            placeholder='Digite sua senha...'
            value={password}
            onChange={ (e)=> setPassword(e.target.value) }
            />
            <button type='submit'>Acessar</button>
        </form>

        <Link className='button-link' to='/register'>
            Nâo possui uma conta? Cadastre-se
        </Link>
      </div>
    );
  }
  
  export default Home;
  