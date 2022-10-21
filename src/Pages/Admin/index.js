import './admin.css'
import { useState, useEffect } from 'react'

import { signOut } from 'firebase/auth'
import { auth, db } from '../../firebaseConnection'
   
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc 
} from 'firebase/firestore'

import { AiFillEdit } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { toast } from 'react-toastify'

function Admin(){
    
    const [ tarefaInput, setTarefaInput ] = useState('')
    const [ user , setUser] = useState({})
    const [ tarefas, setTarefas ] = useState([])
    const [ edit, setEdit ] = useState({})
    

    useEffect( ()=>{
        async function loadTarefas(){
            const userDatail = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDatail))

            if(userDatail){
                const data = JSON.parse(userDatail)
                const tarefaRef = collection(db, 'tarefas')
                const q = query(tarefaRef, orderBy('created', 'desc'), where('userUid', '==', data?.uid ))

                const unsub = onSnapshot(q, (snapshot) => {
                    var lista = []

                    snapshot.forEach((doc)=>{
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid,
                            status: doc.data().status
                        })
                    })

                    setTarefas(lista)
                    
                })
            }

        }
        loadTarefas()
    },[] )

    async function handleRegister(e){
        e.preventDefault()

        if(tarefaInput === ''){
            toast.warn('Por favor digite sua tarefa.', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return
        }
        
        if(edit?.id){
            handleUpdateTarefa()
            return
        }

        await addDoc(collection(db, 'tarefas'),{
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid,
            status: false
        })
        .then( ()=>{
            toast.success('Tarefa registrada!', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            setTarefaInput('')
        } )
        .catch( (error)=>{
            console.log(error)
            toast.error('Error ao registrar tarefa, por favor tente novamente.', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        } )

    }

    //deslogar
    async function handleLogout(){
        await signOut(auth)
    }

    //deletar tarefa
    async function deleteTarefa(id){
        const docRef = doc(db, 'tarefas', id)
        await deleteDoc(docRef)
    }
    //editar tarefa
    function editTarefa(item){
        setTarefaInput(item.tarefa)
        setEdit(item)
        
    }
   
    
    async function handleUpdateTarefa(){
        const docRef = doc(db, 'tarefas', edit?.id)
        await updateDoc( docRef,{
            tarefa: tarefaInput
        })
        .then( ()=>{
            toast.info('Tarefa atualizada!', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            setTarefaInput('')
            setEdit({})
        })
        .catch( ()=>{
            toast.error('Error ao atualizar tarefa, por favor tente novamente.', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            setTarefaInput('')
            setEdit({})
        } )
    }

    let concluido = false
    let border = 'border'
    let borderNone = 'border-none'
    
   async function actived(item){
    if(item.status){
        concluido = false
    }else{
        concluido = true
    }
    const docRef = doc(db , 'tarefas', item.id)
    await updateDoc(docRef,{
        status: concluido
    })
   }
    

    return(
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>
            <form className='form'  onSubmit={handleRegister}>
                <textarea
                placeholder='Digite sua tarefa...'
                value={tarefaInput}
                onChange={(e) => setTarefaInput(e.target.value)}
                />
                {   Object.keys(edit).length > 0 ?
                    (<button className='btn-register' style={{backgroundColor:'#ffff42'}} type='submit'>Atualizar tarefa</button>) : (<button className='btn-register' type='submit'>Registrar tarefa</button>) 
                }
                
            </form>
            
            
           {tarefas.map((item)=>
             <article key={item.id} className={ `list ${item.status ? border : borderNone }` } >

                <div className='list-btn' >
                    <button onClick={ ()=> editTarefa(item) }> <AiFillEdit/> </button>
                    <button onClick={ ()=> deleteTarefa(item.id)} className='btn-delete'> <BiTrash/> </button>
                </div>
                <div className='concluido' onClick={()=>actived(item)}>
                    <p>{item.tarefa}</p>
                </div>
                
             
            </article>
           )}
          

            <button onClick={handleLogout} className='btn-logout'>Sair</button>
        </div>
    )
}

export default Admin