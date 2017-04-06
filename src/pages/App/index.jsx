import React, { Component } from 'react';
import Graph, { Network } from 'react-graph-vis';
import axios from "axios";
import "./App.css";
class App extends Component {

  constructor() {
    super();
    this.state ={
      config: { nodes: [1,2,3], edges: [1, 2, 3] },
      tm: [],
      ps: 0,
      path: [1],
      network: 0,
      nodeColor: ["cyan","lime","lime","lime","lime"]
    }
    // axios getTm to get the transition matrix
    axios.post("/gettm",{"pm" : [[0.1,0.2,0.3,0.2,0.2],
    [0.1,0.2,0.3,0.2,0.2],[0.1,0.2,0.3,0.2,0.2],
    [0.1,0.2,0.3,0.2,0.2],[0.1,0.2,0.3,0.2,0.2]]}).then((response) => {
      this.setState( { tm: response.data.tm });
      this.getNextState();
    })
  }

  getNextState = () => {
    axios.post("/nextstate",{"tm" : this.state.tm, "ps": this.state.ps}).then((response) => {
      let prev = this.state.path[this.state.path.length - 1];
      let next = response.data.result + 1;
      let newColors = ["lime","lime","lime","lime","lime"];
      newColors[prev - 1] = "cyan";
      newColors[next - 1] = "cyan";
      this.setState({
        ps: response.data.result,
        path: [prev, next],
        nodeColor: newColors
      })
      console.log(this.state);
    });
  }
  render() {

var graph = {
  nodes: [
      {id: 1, label: 'Node 1', color: this.state.nodeColor[0]},
      {id: 2, label: 'Node 2', color: this.state.nodeColor[1]},
      {id: 3, label: 'Node 3', color: this.state.nodeColor[2]},
      {id: 4, label: 'Node 4', color: this.state.nodeColor[3]},
      {id: 5, label: 'Node 5', color: this.state.nodeColor[4]}
    ],
  edges: [
      {from: 1, to: 1},
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 1, to: 4},
      {from: 1, to: 5},
      {from: 2, to: 2},
      {from: 2, to: 3},
      {from: 2, to: 4},
      {from: 2, to: 5},
      {from: 3, to: 3},
      {from: 3, to: 4},
      {from: 3, to: 5},
      {from: 4, to: 4},
      {from: 4, to: 5},
      {from: 5, to: 5}
    ]
};

  var options = {
    layout: {
        hierarchical: false
    },
    nodes: {
      shape: "circle",
      color: {
        background: "lime",
        highlight: {
          background: "cyan"
        }
      }
    },
    edges: {
      arrows: { to: {enabled: false}}
    }
  };
  let events = {
    select: function(event) {
        var { nodes, edges } = event;
    }
  }
  let handleNetwork = (network) => {
    // network.setSelection({nodes: this.state.path}, { highlightEdges: false});
  }

    return (
      <div className="App">
        <h1>Markov Visualizations</h1>
        <button onClick={this.getNextState}>Get next step</button>
        <h2>{this.state.path[0]} to {this.state.path[1]}</h2>
        <Graph graph={graph} getNetwork={handleNetwork} options={options} events={events} />
      </div>
    );
  }
}

export default App;
