const dotenv = require('dotenv').config()

const {WebClient } = require('@slack/web-api')

const token = process.env.BOT_TOKEN

const client =new WebClient (token)

const channelId = process.env.CHANNEL_ID;


async function sendMessage() {
  try {
    
    const res = await client.chat.postMessage({
      channel: channelId,
      text: 'to delete',
    });

    console.log('Message sent successfully. Timestamp:', res.ts);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
sendMessage();

// // Find conversation ID using the conversations.list method
// async function findConversation(name) {
//   try {
   
//     const result = await client.conversations.list({
//     token: token
//     });

//     for (const channel of result.channels) {
//       if (channel.name === name) {
//         conversationId = channel.id;

//         // Print result
//         console.log("Found conversation ID: " + conversationId);
//         // Break from for loop
//         break;
//       }
//     }
//   }
//   catch (error) {
//     console.error(error);
//   }
// }

// // Find conversation with a specified channel `name`
// findConversation("test");



//shedule meassgae

async function sheduleMeassage(){

    const postAt  = Math.floor(Date.now()/1000) + 60;
    try {
      const result = await client.chat.scheduleMessage({
      channel: channelId,
      text: '⏰ This message was scheduled for 1 minute later!',
      post_at: postAt,
        })

       console.log(result); 
    } catch (error) {
        console.log("error occured", error);
    }
}

sheduleMeassage();


//retrive messages

async function retriveMeassage(){

    try {
        const result = await client.conversations.history({
            channel:channelId,
            limit:5,
        })

        console.log("latest meassages");
        // console.log(result);
console.log(result)
        for(let msg of result.messages){
            console.log(msg.text)
        }

    } catch (error) {
console.log("error is " , error);        
    }
}
retriveMeassage();

//edit message
async function editMessage(){
  const messageTs = '1748925664.634179';
    try {
        const result = await client.chat.update({
            channel:channelId,
            ts:messageTs,
            text:"edited from hi to good morning"
        })

        console.log("succesfully updated", result.ts);
    } catch (error) {
      console.log("error is " , error);      
    }
}
editMessage();

//delete bot msgs

async function deleteMessage(){
    const messageTs = '1748926050.362729';

    try {
        const result = await client.chat.delete({
            channel:channelId,
            ts:messageTs,
        })

        console.log("deleted succesfulyy" , result);
    } catch (error) {
      console.log("error is " , error)  
    }
}

deleteMessage();