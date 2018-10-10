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
  },
  {
    id:"google",
    group: 3,
    label: "Google",
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
  },

  {
    target: "interactiondesign",
    source: "google",
    strength: .5
  }
]

var blurbs = {
  potluck: "Food tastes better with others! Creating online communities around food.",
  shoppler: "Exploring behavior change design with grocery shoppers.",
  empower: "Designing intellgent services for long-term investments.",
  overlay: "Creating urgency around Climate Change through Augmented Reality.",
  greetingstreet: "Creating interactive and connected experiences for commuters.",
  google: "Artificial Intelligence and You! A summer with AIY Projects.",
  blog: "Writing, Process, and Inspiration!"
}

var width = 550
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
  d3.select(this)
    .transition()
    .duration(250)
    .attr("r", 10)

  let projectTitle = document.getElementById('projectTitle');
  if(d3.select(this).datum().group === 3) {
    let label = d3.select(this).datum().label;
    let id = d3.select(this).datum().id;
    let projectBlurb = document.getElementById('projectBlurbs');
    let introDescription = document.getElementById('introDescription');
    projectTitle.innerHTML = label.toLowerCase();
    introDescription.innerHTML = blurbs[id];



  } else {
    projectTitle.innerHTML = 'hey!';
    introDescription.innerHTML = "I'm <a href='About.html'>Advait</a>. I'm an Industrial Designer studying at <a href='https://www.risd.edu'>RISD</a>.</br>I like to answer cool questions.";
  }


}

function mouseout() {
  d3.select(this)
    .transition()
    .duration(250)
    .attr("r", 5)

    let projectTitle = document.getElementById('projectTitle');
    let introDescription = document.getElementById('introDescription');
    projectTitle.innerHTML = 'hey!';
    introDescription.innerHTML = "I'm Advait. I'm an Industrial Designer studying at RISD.</br>I like to answer cool questions.";

}

simulation.force("link").links(links)
