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
      nodeColor: ["cyan","lime","lime","lime","lime"],
      edgeColor: ["black","black","black","black","black","black","black","black","black","black","black","black","black","black","black"]
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
      let newEdgeColors = ["black","black","black","black","black","black","black","black","black","black","black","black","black","black","black"];

      let combos = ["11", "12", "13", "14", "15", "22", "23", "24", "25", "33", "34", "35", "44", "45", "55"];
      newColors[prev - 1] = "cyan";
      newColors[next - 1] = "cyan";
      let combo = prev.toString() + next.toString();
      let comboReverse = next.toString() + prev.toString();
      for(let i = 0; i < combos.length; ++i) {
        if(combos[i] === combo || combos[i] == comboReverse) {
          newEdgeColors[i] = "red";
        }
      }
      this.setState({
        ps: response.data.result,
        path: [prev, next],
        nodeColor: newColors,
        edgeColor: newEdgeColors
      })
      console.log(this.state);
    });
  }
  render() {

var graph = {
  nodes: [
      {id: 1, label: 'Node 1', color: this.state.nodeColor[0], x: 0, y: 0, fixed: true},
      {id: 2, label: 'Node 2', color: this.state.nodeColor[1], x: 50, y: 150, fixed: true},
      {id: 3, label: 'Node 3', color: this.state.nodeColor[2], x: 300, y: 0, fixed: true},
      {id: 4, label: 'Node 4', color: this.state.nodeColor[3], x: 400, y: 300, fixed: true},
      {id: 5, label: 'Node 5', color: this.state.nodeColor[4], x: 500, y: 100, fixed: true}
    ],
  edges: [
      {from: 1, to: 1, color: this.state.edgeColor[0]},
      {from: 1, to: 2, color: this.state.edgeColor[1]},
      {from: 1, to: 3, color: this.state.edgeColor[2]},
      {from: 1, to: 4, color: this.state.edgeColor[3]},
      {from: 1, to: 5, color: this.state.edgeColor[4]},
      {from: 2, to: 2, color: this.state.edgeColor[5]},
      {from: 2, to: 3, color: this.state.edgeColor[6]},
      {from: 2, to: 4, color: this.state.edgeColor[7]},
      {from: 2, to: 5, color: this.state.edgeColor[8]},
      {from: 3, to: 3, color: this.state.edgeColor[9]},
      {from: 3, to: 4, color: this.state.edgeColor[10]},
      {from: 3, to: 5, color: this.state.edgeColor[11]},
      {from: 4, to: 4, color: this.state.edgeColor[12]},
      {from: 4, to: 5, color: this.state.edgeColor[13]},
      {from: 5, to: 5, color: this.state.edgeColor[14]}
    ]
};

  var options = {
    layout: {
        hierarchical: false,
        imporvedLayout: true
    },
    nodes: {
      fixed: true,
      shape: "circle",
      color: {
        background: "lime",
        highlight: {
          background: "cyan"
        }
      }
    },
    edges: {
      arrows: { to: {enabled: false}},
      width: 4
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
      <div className="App" style={{textAlign: "center", margin: "0 auto"}}>
        <h1>Markov Visualizations</h1>
        <button onClick={this.getNextState}>Get next step</button>
        <h2>{this.state.path[0]} to {this.state.path[1]}</h2>
        <Graph graph={graph} getNetwork={handleNetwork} options={options} events={events} />
      </div>
    );
  }
}

export default App;
