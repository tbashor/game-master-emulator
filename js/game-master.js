
// DOM elements
var form = document.querySelector('#odds')
var actingRank = document.querySelector('#actingRank')
var actingRS = document.querySelector('#actingRS')
var difficultyRank = document.querySelector('#difficultyRank')
var difficultyRS = document.querySelector('#difficultyRS')
var output = document.querySelector('#output')

// Game Master
var gm = {
  // multidimensional array of odds
  odds: [
    [50,25,10,5,5,0,0,-20,-20,-40,-40,-55,-65], //miniscule 2+
    [75,50,25,15,10,5,5,0,0,-20,-20,-35,-45], //miniscule
    [90,75,50,35,25,15,10,5,5,0,0,-15,-25], //weak
    [95,85,65,50,45,25,15,10,5,5,5,-5,-15], //low
    [100,90,75,55,50,35,20,15,10,5,5,0,-10], //below average
    [105,95,85,75,65,50,35,25,15,10,10,5,-5], //average
    [110,95,90,85,80,65,50,45,25,20,15,5,0], //above average
    [115,100,95,90,85,75,55,50,35,25,20,10,5], //high
    [120,105,95,95,90,85,75,65,50,45,35,15,5], //exceptional
    [125,115,100,95,95,90,80,75,55,50,45,20,10], //incredible
    [130,125,110,95,95,90,85,80,65,55,50,25,10], //awesome
    [150,145,130,100,100,95,95,90,85,80,75,50,25], //superhuman
    [170,165,150,120,120,100,100,95,95,90,90,75,50] //superhuman 2+
  ],
  // Get array of answer values
  getAnswer: function(actingRank, difficultyRank) {
    var odds = gm.getOdds(actingRank, difficultyRank)
    if (odds === 'ERROR') return 'ERROR'

    var roll = gm.roll()
    return {
      roll: roll,
      answer: gm.calculateAnswer(odds, roll),
      odds: odds}

  },
  // Get array of odds
  getOdds: function(actingRank, difficultyRank) {
    try {
      var yes = gm.getYes(actingRank, difficultyRank)
      var YES = gm.getYES(yes)
      var NO = gm.getNO(yes)
      return {
        YES: YES,
        yes: yes,
        NO: NO
      }
    } catch (e) {
      return 'ERROR'
    }
  },
  // Get odds for yes
  getYes: function(actingRank, difficultyRank) {
    return gm.odds[actingRank][difficultyRank]
  },
  // Get odds for exceptional yes
  getYES: function(odds) { // exceptional yes
    return Math.floor((odds/100)*.2*100)
  },
  // Get odds for exceptional no
  getNO: function(odds) { // exceptional no
    return Math.floor(100-((100-(odds))*.2)+1)
  },
  // Get random value between 0 and 100
  roll: function() {
    return Math.floor(Math.random() * 100) + 0
  },
  // Get textual value for answer
  calculateAnswer: function(odds, roll) {
    var answer = 'no answer'
    if (roll < odds.YES) {
      answer = 'Exceptional Yes'
    } else if (roll < odds.yes) {
      answer = 'Yes'
    } else if (roll < odds.NO) {
      answer = 'No'
    } else {
      answer = 'Exceptional No'
    }
    return answer
  },
  // Write answer to DOM
  logAnswer: function(answer, targetEl) {
    var child = document.createElement('p')
    var color = randomColor({luminosity: 'dark'})
    if (answer !== 'ERROR') {
      child.innerText = answer.answer + ' (' +
          answer.roll + ' [' +
          answer.odds.YES + ',' +
          answer.odds.yes + ',' +
          answer.odds.NO +
          '])'
      child.style = 'color:' + color
    } else {
      child.innerText = answer
    }
    targetEl.appendChild(child)
  }

}

// Form controller
form.addEventListener('submit', function(e){
  e.preventDefault();
  var actingValue = Number(actingRank.value) + Number(actingRS.value)
  var difficultyValue = Number(difficultyRank.value) + Number(difficultyRS.value)
  var answer = gm.getAnswer(actingValue, difficultyValue)
  gm.logAnswer(answer, output)
})
