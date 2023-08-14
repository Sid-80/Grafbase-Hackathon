const axios = require("axios")


const graphbaseEndpoint = "http://127.0.0.1:4000/graphql"

// const makeQuery = async (query) => {
//     axios({
//         url: graphbaseEndpoint,
//         method: 'post',
//         data: {
//             query: query
//         }
//     }).then((result) => {
//         // if(result['data']["errors"]){
//         //     console.log("error occured")
//         //     console.log(result.data)
//         //     return 0;
//         // }
//         // else{
//         //     console.log(result.data)
//         //     return result.data
//         // }
//         console.log(result.data)
//         return result.data
//     });
// }

const makeQuery = async (query) => {
  try {
    const response = await axios.post(graphbaseEndpoint, { query });

    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};

// makeQuery(`mutation UserCreate {
//     userCreate(input: {
//       email:"newuser@gmail.com"
//     }) {
//       user{
//         id,
//         email
//       }
//     }
//   }`)

const createUser = async (email) => {

  query = `
    mutation UserCreate {
        userCreate(input: {
          email: "${email}"
        }) {
          user{
            id,
            email
          }
        }
      }
      `

  const res = await makeQuery(query)

  if (res === null) {
    console.log("apiError");
    return "apiError"
  }
  // console.log(res)

  if (res?.errors?.length && res?.errors[0]?.message == `The value "${email}" is already taken on field "email"`) {
    console.log("Email exists");
    return "emailExists"
  }
  console.log("userCreated");
  return "userCreated"

}


const getUserByEmail = async (email) => {

  query = `
    query User {
      user(by: {email: "${email}"}){
        id
        email
        chats(first: 20){
          edges{
            node{
              id
              chatName
            }
          }
        }
      }
    }
      `

  const res = await makeQuery(query)

  if (res === null) {
    console.log("apiError");
    return "apiError"
  }
  // console.log(res.data.user.id)
  // console.log(res.data.user.email)

  chats = []

  res.data.user.chats.edges.forEach(element => {
    // console.log(element.node);
    chats.push(element.node)
  });

  response = {
    userId: res.data.user.id,
    email: res.data.user.email,
    chats: chats
  }
  console.log(response);
  return response

}


const getChatById = async (chatId) => {

  query = `
    query Chat {
      chat(by: {id: "${chatId}"}) {
        id
        chatName
        conversations(last: 50, orderBy: {createdAt:DESC}){
          edges{
            node{
              id
              request
              response
              createdAt
            }
          }
        }
      }
    }
      `

  const res = await makeQuery(query)

  if (res === null) {
    console.log("apiError");
    return "apiError"
  }
  // console.log(res.data.chat.id)
  // console.log(res.data.chat.chatName)
  // console.log(res.data.chat.conversations.edges)

  chats = []

  res.data.chat.conversations.edges.forEach(element => {
    // console.log(element.node);
    chats.push(element.node)
  });

  response = {
    chatId: res.data.chat.id,
    email: res.data.chat.chatName,
    chats: chats
  }
  console.log(response);
  return response

}




// createUser("fadkeabhi4@gmail.com")
// getUserByEmail("newuser@gmail.com")

// getChatById("chat_01H7T1NEJX93ARRQ701RF7MCD3")