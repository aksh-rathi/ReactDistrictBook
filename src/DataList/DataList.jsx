import { useEffect } from "react";

function DataList(){
    const [userList, setUserList] = useState([]);

    useEffect(()=>{
        fetch('https;/jsonplaceholder.typicode.com/users')
        .then(res=>res.json())
        .then(result=setUserList(result))
        .catch(err=>console.log(err))
    },[])


    return <div>
        <table>
            <th>Id</th>
        </table>
    </div>
}

export default DataList;    