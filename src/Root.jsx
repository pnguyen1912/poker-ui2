import React from 'react';
// import injectTapEventPlugin from 'react-tap-event-plugin';


import socket from './socket';
// injectTapEventPlugin()

export default class Root extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      host: null,
      code: "",
      client: socket(),
      correctCode: false,
      point: 0,
      submitted: false,
      hostCode: '',
      rooms: []
    }
    this.updateCode=this.updateCode.bind(this);
    this.updatePoint=this.updatePoint.bind(this);
    this.updateSubmit=this.updateSubmit.bind(this);
    this.searchSucessful=this.searchSucessful.bind(this);
    this.CorrectRoom=this.CorrectRoom.bind(this);
    this.Room=this.Room.bind(this);
    this.Successed=this.Successed.bind(this);
    this.isHost=this.isHost.bind(this);
    this.onRoomReceived=this.onRoomReceived.bind(this)
  }

  componentDidMount(){
    this.state.client.joinRoom(this.onRoomReceived)
  }

  onRoomReceived(entry){
    this.setState({ rooms: this.state.rooms.concat(entry)})
  }

  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toUpperCase();
  }


  joinHost(key){
    console.log(this.state.rooms)
        if (this.state.rooms.map(i=> i.key).includes(key)){
          return true
        } else {
          return false
        }
  }

  


  isHost(e){
    if (e === true) {
      let key = this.makeid(5);
      this.setState({ hostCode: key})
      this.state.client.handleHost(key);
    }
    this.setState({host: e})
  }

  updateCode(e){
    this.setState({ code: e })
  }

  updatePoint(e){
    this.setState({ point: e })
  }

  updateSubmit(){
    this.setState({ submitted: true })
  }

  searchSucessful(){
    if (this.joinHost(this.state.code) === true){

    this.setState({ correctCode: true })
    } else {
      this.setState({ correctCode: false})
    }
  }

  CorrectRoom(props){
    const pointArray = [3, 5, 8, 13, 21, 34];
    return (
      <div>
        <div className="ui segment" style={{ textAlign: "center", width: "50%", marginLeft: "25%" }}>
          <form onSubmit={e => e.preventDefault()} className="ui form" action="">
            <div className="field">
              <label>{props.code}</label>
            </div>
          </form>
        </div>
        <div className="ui segment" style={{ textAlign: "center", width: "50%", marginLeft: "25%" }}>
          <form onSubmit={e => e.preventDefault()} className="ui form" action="">
            <div className="field">
              <label>Please select your vote:</label>
              {pointArray.map(i =>
                <button onClick={() => props.updatePoint(i)} style={{ margin: '5px', width: '50px', height: '50px' }}>{i}</button>
              )}
              <br />
              <label>Your vote:</label>
              <h2>{props.point}</h2>
              <button onClick={props.updateSubmit}>Submit</button>
            </div>
          </form>
        </div>
      </div>
  
    )
  }

  Room(props){
    return (
    <div className="ui segment" style={{ textAlign: "center", width: "50%", marginLeft: "25%" }}>
      <form onSubmit={e => e.preventDefault()} className="ui form">
        <div className="field">
          <label>Room code:</label>
          <input
            type="text"
            value={props.code}
            onChange={e => props.updateCode(e.target.value.toUpperCase())}
          />
          <button onClick={props.searchSucessful}>Join</button>
        </div>
      </form>
    </div>
  )}

  Successed(props){
    return (
      <div className="ui segment" style={{ textAlign: "center", width: "50%", marginLeft: "25%" }}>
        <form onSubmit={e => e.preventDefault()} className="ui form">
          <div className="field">
            <label>You have successedfully vote {props.point} for {props.code}</label>
          </div>
        </form>
      </div>
    )
  }
  

  render() {
    return (
   <div>
     {this.state.host === null && (
     <div className="ui segment" style={{ textAlign: "center", width: "50%", marginLeft: "25%" }} >
       <form onSubmit={e => e.preventDefault()} className="ui form"></form>
       <button onClick={()=>this.isHost(true)}>Host</button>  
       <button onClick={()=>this.isHost(false)}>Join</button>
       </div>
       )}
       {this.state.host === true && (
         <div className="ui segment" style={{ textAlign: "center", width: "50%", marginLeft: "25%" }}>
           <form onSubmit={e => e.preventDefault()} className="ui form">
           Code: {this.state.hostCode}
           </form>
         </div>
       )}
{this.state.host === false && (
  <div style={{ paddingTop: '100px' }}>
       {!this.state.correctCode &&
          <this.Room updateCode={this.updateCode} searchSucessful={this.searchSucessful} code={this.state.code} />
        }
        {this.state.correctCode && this.state.submitted === false &&
          <this.CorrectRoom updateSubmit={this.updateSubmit} point={this.state.point} updatePoint={this.updatePoint} code={this.state.code} />
        }
        {this.state.submitted
          && <this.Successed code={this.state.code} point={this.state.point} />
        }
     </div>
)}
</div>
    )
  }
}