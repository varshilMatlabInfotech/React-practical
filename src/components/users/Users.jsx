import { MyContext } from 'contexts/userContext/index';
import React, { useContext, useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import { GridRow, GridColumn, Grid ,Input} from 'semantic-ui-react'
import {
  CardHeader,
  CardContent,
  Card,
  Image,
  Button
} from 'semantic-ui-react'



const Users = () => {
  const {userData, setUserData} = useContext(MyContext)
  const [query,setQuery]= useState("")

  useEffect(()=>{
    axios.get("https://api.github.com/users").then ((res)=>{

     setUserData(res.data)

    }).catch((e)=>
    console.log(e))
  },[])

  const addBooking =(id)=>{
   const data= userData.map((e)=>{
      if(e.id==id){
         return {
...e,
isBooked : true
      }
      }
      return e;
     
    })
setUserData(data)
localStorage.setItem('data', JSON.stringify(data))
  }

  const handleChange=(e)=>{
    const {value}= e.target
    console.log(value,"value");
  }

  return <div>
     <Input placeholder='Search...' value ={query} onChange ={handleChange}/>
     <Grid columns={5}>
     <GridRow >
  {userData.map((e)=>{
    if(!e.isBooked){
        return <>
      <GridColumn>
      <Card>
    <Image src={e.avatar_url} wrapped ui={false} />
    <CardContent>
      <CardHeader>{e.login}</CardHeader>
    </CardContent>
    <CardContent extra>
     <Button primary onClick ={()=> addBooking(e.id)}>Booking</Button>
    </CardContent>
  </Card>
       
      </GridColumn>
      
  

    </>
    }
  
  })}
    </GridRow>
    </Grid>


  </div>;


};

export default Users;
