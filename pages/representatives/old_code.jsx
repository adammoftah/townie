import React, { Component } from 'react';
import useSwr from 'swr';

import { MapMarkersContext } from 'components/MapMarkersContext';
import { getLayout } from 'components/MapLayout';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const RepresentativesByName = ({ json_input }) => (
  <div>
    {
      json_input.officials.map((value,idx) => <li key={idx}>{value.name}</li>)
      //<button value ="*" onClick={this.calculate}>*</button>
    }
  </div>
);

// function RepresentativesPage() {
//   const { setState: setMapMarkers } = React.useContext(MapMarkersContext);
//   const { data, error } = useSwr('/api/testing-sites', fetcher);
//   if (error) {
//     console.error('Error loading data from API for /api/testing-sites: ', error);
//   }

//   useEffect(() => {
    
//   });
// }

class SimpleMap extends Component {
  constructor(props){
      super(props); 
      this.state = {
        address: "",
        reports: {offices:[""],officials:[""]},
      };        

      this.setAddress = this.setAddress.bind(this);
      this.findRepresentatives = this.findRepresentatives.bind(this);
      // this.state = { isEmptyState: true, isAddTripState: false  }
      // this.triggerAddTripState = this.triggerAddTripState.bind(this);
  }

  setAddress(e){
    e.preventDefault();
    //if(Number(event.target.value) != NaN)
        this.setState({address: e.target.value})
}

  findRepresentatives(e){
    e.preventDefault();
    if(this.state.address !== ""){ 
        fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBe7_ta_1zNod6CsCJI6ssWk64kyO14HZo&address=${this.state.address}`,{
            method: "GET",
            dataType: "JSON",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then(response => response.json())
        .then(data => { 
          console.log(data);
          this.setState({ reports: data})
        });
    }
  }

render() {
  // var representatives = "";
  // if(!this.state.reports == []){
  //   representatives = <RepresentativesByName json_input = {this.state.reports}/>;
  // }

  return (
    
    <div>
      <h1>Enter your Address: {this.state.answer}</h1>
      <input value={this.state.address} onChange={this.setAddress}></input>
      <button onClick={this.findRepresentatives}>Find</button>
      <RepresentativesByName json_input = {this.state.reports}/>
    </div>

  );
}
}

export default SimpleMap;