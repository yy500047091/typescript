import React ,{useState,useEffect}from 'react'
import { IUsers } from '../models/IUsers';
import { UserService } from '../Services/UserService';
interface IState{
    loading:boolean,
    users:IUsers[],
    errorMsg:string
}

const User: React.FC = () => {

    const [state,setState] = useState<IState>({
        loading:false,
        users:[] as IUsers[],
        errorMsg: ''

    })

//network request

useEffect(() => {


    setState({...state,loading:true})
    UserService.getAllUsers()
    .then((res)=>setState({...state,loading:false,users:res.data}))
    .catch(err=>setState({
        ...state,loading:false,errorMsg:err.message
    }));
    //eslint-disable-next-line
}, []);


//DESTRUCTURE THE STATE
const{loading,users,errorMsg}= state


  return (
    <div className="container">
        <h2>DATA FROM API</h2>
        {errorMsg && (<p>{errorMsg}</p>)}
        {loading && <h1>Loading...</h1>}

    <table  className ="table table-bordered table-striped">
        <thead>
            <tr>
                <td>ID</td>
                <td>NAME</td>
                <td>USERNAME</td>
                <td>EMAIL</td>
            </tr>
            
        </thead>
        <tbody>
            {
                users.length>0 && users.map(user=>(
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                    </tr>
                ))
            }

        </tbody>
    </table>

    </div>
  )
}

export default User;