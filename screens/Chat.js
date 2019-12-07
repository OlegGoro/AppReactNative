import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {View} from "react-native";
import {SafeAreaView} from "react-navigation";

const int = ExampleChat =>{};

var REQUEST_URL = "http://192.168.0.107:8000/api/v1/messages/?myname=Slava&chatsession=87"

var previousCount

export default class ExampleChat extends React.Component {

    state = {
        messages: [],
    }

     _fetchData = () => {
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseJson) => {
         objBeforeTrasnform = responseJson
         newObj = []
         for (let k in objBeforeTrasnform) {
           imagefile = objBeforeTrasnform[k].image.split('/').slice(9,10)
           trueimage = "http://192.168.0.107:8000/static/media/" + imagefile
           var messegeuserid
           if (objBeforeTrasnform[k].sender == "Olga"){
             messegeuserid = 2
           } else {
             messegeuserid = 1
           }
           newObj.push({_id: k, text: objBeforeTrasnform[k].message, createdAt: objBeforeTrasnform[k].timestamp, user: {_id: messegeuserid, name: objBeforeTrasnform[k].sender, avatar: trueimage}});
         }
          previousCount = 0;
          for(var prop in newObj) {
              previousCount++;
          }
         this.setState({
           messages: newObj,
         });
        })
        .catch((error) =>{
         //this.closemyclaim()
        });
    }

    _updateData = () => {
       fetch(REQUEST_URL)
       .then((response) => response.json())
       .then((responseJson) => {
        objBeforeTrasnform = responseJson
        newObj = []
        for (let k in objBeforeTrasnform) {
          imagefile = objBeforeTrasnform[k].image.split('/').slice(9,10)
          trueimage = "http://192.168.0.107:8000/static/media/" + imagefile
          var messegeuserid
          if (objBeforeTrasnform[k].sender == "Olga"){
            messegeuserid = 2
          } else {
            messegeuserid = 1
          }

          newObj.push({_id: k, text: objBeforeTrasnform[k].message, createdAt: objBeforeTrasnform[k].timestamp, user: {_id: messegeuserid, name: objBeforeTrasnform[k].sender, avatar: trueimage}});
        }

        //const filteredObj = newObj.filter((item) => item._id > previousCount);
        var filteredObj = newObj.filter(function (el) {
          return el._id >= previousCount
        });
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, filteredObj),
        }))
        previousCount = 0;
        for(var prop in newObj) {
            previousCount++;
        }
       })
       .catch((error) =>{
        //this.closemyclaim()
       });
   }

    _sendMessage = async (messages) => {
        const data = new FormData();
        data.append("message", "messages")
        data.append("sender", "Slava")
        data.append("receiver", "Olga")
        data.append("chatsession", 87)
        fetch("http://192.168.0.107:8000/api/v1/addmessage/", {
          method: "POST",
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        }).then(res => {
    console.log(res)
  });
  }

    componentWillMount() {
         this._fetchData()
         setInterval(this._updateData, 2000)

    }




    onSend(messages = []) {
        this._sendMessage(messages)
        this._updateData()
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        )
    }
}
