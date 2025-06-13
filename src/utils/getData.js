import axios from 'axios'

const getData = async() => {
   const api = 'https://api.github.com/users'
   const data =  await axios.get(api)

   return data.data
}

export default getData