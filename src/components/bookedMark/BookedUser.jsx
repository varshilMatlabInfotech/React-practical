import { MyContext } from 'contexts/userContext/index'
import React, { useContext, useEffect } from 'react'
import { GridRow, GridColumn, Grid ,Input} from 'semantic-ui-react'
import {
  CardHeader,
  CardContent,
  Card,
  Image,
  Button
} from 'semantic-ui-react'
const BookedUser = () => {
  const {userData, setUserData} = useContext(MyContext)
  console.log(userData,"userData");
  

  useEffect(()=>{
    const data= JSON.parse(localStorage.getItem("data"))
    setUserData(data)
  },[])

  const unBooking =(id)=>{
    const data= userData.map((e)=>{
      if(e.id==id){
         return {
...e,
isBooked : false
      }
      }
      return e;
     
    })
setUserData(data)
localStorage.setItem('data', JSON.stringify(data))
  }

  return (
    <div>
     
     <Grid columns={5}>
     <GridRow >
  {userData.map((e)=>{
    if(e.isBooked==true){
       return <>
  
      <GridColumn>
      <Card>
    <Image src={e.avatar_url} wrapped ui={false} />
    <CardContent>
      <CardHeader>{e.login}</CardHeader>
    </CardContent>
    <CardContent extra>
     <Button primary onClick ={()=> unBooking(e.id)}>UnBooking</Button>
    </CardContent>
  </Card>
       
      </GridColumn>
    
    </>
    }
   
  })}
    </GridRow>
    </Grid>


  </div>
  )
}

export default BookedUser

