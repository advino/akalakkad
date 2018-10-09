var nodes = [{
    id: "work",
    group: 1,
    label: "Work",
    level: 2
  },
  {
    id: "blog",
    group: 3,
    label: "Blog",
    level: 2
  },
  {
    id: "empower",
    group: 3,
    label: "Empower",
    level: 1
  },
  {
    id: "potluck",
    group: 3,
    label: "Potluck",
    level: 1
  },
  {
    id: "shoppler",
    group: 3,
    label: "Shoppler",
    level: 1
  },
  {
    id: "greetingstreet",
    group: 3,
    label: "Greeting Street",
    level: 2
  },
  {
    id: "interactiondesign",
    group: 2,
    label: "UI/UX"
  },
  {
    id: "computation",
    group: 2,
    label: "Code",
    level: 2
  },
  {
    id: "overlay",
    group: 3,
    label: "O/R",
    level: 2
  }
]
var links = [
  {
    target: "work",
    source: "computation",
    strength: .8
  },
  {
    target: "work",
    source: "blog",
    strength: .8
  },
  {
    target: "work",
    source: "interactiondesign",
    strength: .8
  },
  {
    target: "shoppler",
    source: "interactiondesign",
    strength: .7
  },
  {
    target: "empower",
    source: "interactiondesign",
    strength: .7
  },
  {
    target: "potluck",
    source: "interactiondesign",
    strength: .7
  },
  {
    target: "computation",
    source: "greetingstreet",
    strength: .8
  },
  {
    target: "computation",
    source: "overlay",
    strength: .9
  }
]

var width = 500
var height = 500

var clicked = false;

var svg = d3.select('#graphBlock').append("svg")
svg.attr('width', width).attr('height', height)

// simulation setup with all forces
var linkForce = d3
  .forceLink()
  .id(function(link) {
    return link.id
  })
  .strength(function(link) {
    return link.strength
  })


var dragDrop = d3.drag().on('start', function(node) {
  node.fx = node.x
  node.fy = node.y
}).on('drag', function(node) {
  simulation.alphaTarget(.5).restart()
  node.fx = d3.event.x
  node.fy = d3.event.y
}).on('end', function(node) {
  if (!d3.event.active) {
    simulation.alphaTarget(0)
  }
  node.fx = null
  node.fy = null
})



var simulation = d3
  .forceSimulation()
  .force('link', linkForce)
  .force('charge', d3.forceManyBody().strength(-475))
  .force('center', d3.forceCenter(width/2, height/2))


var linkElements = svg.append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(links)
  .enter().append("line")
  .attr("stroke-width", 1)
  .attr("stroke", "rgba(0, 0, 0, 0.6)")

var nodeElements = svg.append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(nodes)
  .enter().append("circle")
  .attr("r", 5)
  .style("fill", 'black')
  .call(dragDrop)
  .on('click', selectNode)
  .on('mouseover', mouseover)
  .on('mouseout', mouseout)

nodeElements.append("circle")
  .attr("r", 15)

var textElements = svg.append("g")
  .attr("class", "texts")
  .selectAll("text")
  .data(nodes)
  .enter().append("text")
  .text(function(node) {
    return node.label
  })
  .attr("color", "rbga(0,0,0,1)")
  .attr("font-size", 12)
  .attr("font-weight", 100)
  .style("font-family", "Maison Neue")
  .style('fill', 'black')
  .attr("dx", 10)
  .attr("dy", 4)

simulation.nodes(nodes).on('tick', () => {
  nodeElements
    .attr('cx', function(node) {
      return node.x
    })
    .attr('cy', function(node) {
      return node.y
    })
  textElements
    .attr('x', function(node) {
      return node.x
    })
    .attr('y', function(node) {
      return node.y
    })
  linkElements
    .attr('x1', function(link) {
      return link.source.x
    })
    .attr('y1', function(link) {
      return link.source.y
    })
    .attr('x2', function(link) {
      return link.target.x
    })
    .attr('y2', function(link) {
      return link.target.y
    })

})



function selectNode() {

  var name2 = d3.select(this).datum()
  console.log(name2.label);

  switch (name2.label) {

    case "Empower":

      window.location.href = "Empower.html";
      break;

    case "Potluck":
      // console.log("Going to Potluck");
      window.location.href = "Potluck.html";
      break;

    case "Shoppler":
      window.location.href = "Shoppler.html";
      break;

    case "Greeting Street":
      window.location.href = 'GreetingStreet.html';
      break;

    case "WeatherLogo":
      window.location.href = "WeatherLogo.html";
      break;

    case "O/R":
      window.location.href = "OR.html";
      break;

    case "Blog":
      window.location.href = 'https://soupmetaphors.tumblr.com/';
      break;

  }
}

function mouseover() {
  // console.log("hovering");
  // console.log()
  d3.select(this)
    .transition()
    .duration(250)
    .attr("r", 10)

  let projectTitle = document.getElementById('projectTitle');
  if(d3.select(this).datum().group === 3) {
    let label = d3.select(this).datum().label;
    projectTitle.innerHTML = label.toLowerCase();
  } else {
    projectTitle.innerHTML = 'hey!';
  }


}

function mouseout() {
  // console.log("left")
  d3.select(this)
    .transition()
    .duration(250)
    .attr("r", 5)

    let projectTitle = document.getElementById('projectTitle');

    projectTitle.innerHTML = 'hey!';
}

simulation.force("link").links(links)
