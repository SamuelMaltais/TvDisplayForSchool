import React, { Component } from "react";
import "./Delete.css"

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }
  state = {};
  fetchImages = () => {
    fetch("https://server-for-mcgill-display.herokuapp.com/delete")
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        let elementstring = body.message;
        this.setState({ images: elementstring.trim().split(/\s+/) });
        console.log(this.state.images)

      })
      .catch((error) => {
        console.log("Error");
      });
  }
  render() {
    return (
      <div className="delete-page-container">
        <h1 style={{textAlign: "center"}}>View and delete current posts</h1>
        <button onClick={this.fetchImages} style={{width:"30%", height:"10%"}}>See images</button>
        <div className="card-container">
          <CardsForDisplay images = {this.state.images} />
        </div>
        
      </div>
    );
  }
}
function deleteCard(element){
  console.log(element)
  const fd = new FormData();
  fd.append("specialCode", "McGill is the best!");
  fd.append("deletedFile", element)
  fetch("https://server-for-mcgill-display.herokuapp.com/deleteRequest", {
        method: 'POST',
        body: fd
      })
        .then(response => {
          return response.json()
        })
        .then(body => {
          console.log(body.message)
        })
        .catch(error => {
          console.log(error)
        });
}

function CardsForDisplay(props){
  let cardList = []
  let images = props.images;
    images.forEach(element => {
    console.log(element)
    cardList.push(
      <div className="card">
        <p style={{textAlign: "center"}}>Info</p>
        <ul>
        <li>Start date year: {element[0] + element[1] + element[2] + element[3]}</li>
        <li>Start date month: {element[5] + element[6]}</li>
        <li>Start date day: {element[8] + element[9]}</li>
        </ul>
        <ul>
        <li>End date year: {element[0] + element[1] + element[2] + element[3]}</li>
        <li>End date month: {element[5] + element[6]}</li>
        <li>End date day: {element[8] + element[9]}</li>
        </ul>
        <img src={"https://server-for-mcgill-display.herokuapp.com/" + element} width={200} height={150} style={{justifyContent: "center"}}></img>
        <button style={{textAlign: "center"}} onClick={() => deleteCard(element)}>Delete</button>
      </div>
    )
  });
  return cardList;
}
export default Delete;