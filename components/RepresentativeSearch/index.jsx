import React, { Component } from 'react';

const RepresentativesByName = ({ json_input}) => (
  <div>
    {
      json_input.officials.map((value,idx) => <li key={idx}>{value.name}</li>)       
    }   
  </div>
);

const Coordinates = ({coordinates}) => (
  <div>
    {
      "lat: "+coordinates.lat+"\nlng: "+coordinates.lng
      //coordinates.map((value,idx) => <li key={idx}>{value}</li>)       
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

class RepresentativeSearch extends Component {
  constructor(props){
      super(props); 
      this.state = {
        address: "",
        coordinates: {lat:"",lng:""},
        reports: {offices:[""],officials:[""]},
      };        

      this.setAddress = this.setAddress.bind(this);
      this.setCoordinates = this.setCoordinates.bind(this);
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
        fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_BOOTSTRAP_URL}&address=${this.state.address}`,{
            method: "GET",
            dataType: "JSON",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then(response => response.json())
        .then(data => { 
          // console.log(data);          
          //console.log("coordinates",this.state.coordinates)
          this.setState({ reports: data})
          this.setCoordinates();
        });
    }
  }
  

  setCoordinates(){    
    if(this.state.address !== ""){             
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_BOOTSTRAP_URL}&address=${this.state.address}`,{
            method: "GET",
            dataType: "JSON",
            // headers: {
            //   "Content-Type": "application/json; charset=utf-8",
            // }
        })
        .then(response => response.json())
        .then(data => { 
          console.log("data",data);
          this.setState({ coordinates: {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng}});
          console.log("coordinates",this.state.coordinates)
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
      <Coordinates coordinates = {this.state.coordinates}/>      
      
    </div>

  );
}
}

export default RepresentativeSearch;