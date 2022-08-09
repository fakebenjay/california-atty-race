function tipText(values) {
  return `<div class="tooltip-container">
  <h2>${values.year}</h2>
  <div><strong>Resident transactions</strong>: <span style="background-color:#6ba292;color:white;">&nbsp;${numeral(values.residentDollar).format('$0[.]0')}B&nbsp;</span>
  <br/>
  <span><strong>${numeral(parseFloat(values.residentDollar) / (parseFloat(values.residentDollar) + parseFloat(values.nonresidentDollar))).format('0[.]0%')}</strong> of total deal volume</span><br/>
  <span><strong>${numeral(values.residentUnit).format('0,0')}K</strong> units (${numeral((parseFloat(values.residentUnit)/(parseFloat(values.residentUnit)+parseFloat(values.nonresidentUnit)))).format('0[.]0%')} of units)</span><br/>
  <span>Average transaction <strong>${numeral((values.residentDollar/values.residentUnit)*1000).format('$0[.]0')}K</strong></span>
  </div>
  <br/>
  <div><strong>Nonresident transactions</strong>: <span style="background-color:#654f6f;color:white;">&nbsp;${numeral(values.nonresidentDollar).format('$0[.]0')}B&nbsp;</span>
  <br/>
  <span><strong>${numeral(parseFloat(values.nonresidentDollar) / (parseFloat(values.residentDollar) + parseFloat(values.nonresidentDollar))).format('0[.]0%')}</strong> of total deal volume</span><br/>
  <span><strong>${numeral(values.nonresidentUnit).format('0,0')}K</strong> units (${numeral((parseFloat(values.nonresidentUnit)/(parseFloat(values.residentUnit)+parseFloat(values.nonresidentUnit)))).format('0[.]0%')} of units)</span><br/>
  <span>Average transaction <strong>${numeral((values.nonresidentDollar/values.nonresidentUnit)*1000).format('$0[.]0')}K</strong></span></div>
<br/>
  <div><strong>Total transactions</strong>: <strong>${numeral(values.totalDollar).format('$0[.]0')}B</strong>
  <br/>
<span><strong>${numeral(values.totalUnit).format('0,0')}K</strong> units</span><br/>
  <span>Average transaction <strong>${numeral((values.totalDollar/values.totalUnit)*1000).format('$0[.]0')}K</strong></span></div>
  </div>`
}

function mouseover(tipText) {
  var html = tipText

  d3.select(`.my-tooltip`)
    .html(html)
    .attr('display', 'block')
    .style("visibility", "visible")
    .style('top', topTT)
    .style('left', leftTT)
}

function mousemove() {
  if (window.innerWidth > 767) {
    d3.select(`.my-tooltip`)
      .style("visibility", "visible")
      .style('top', topTT(i))
      .style('left', leftTT(i))
  }
}

function mouseout() {
  d3.select(`.my-tooltip`)
    .html("")
    .attr('display', 'none')
    .style("visibility", "hidden")
    .style("left", null)
    .style("top", null);
}

function topTT() {
  var offsetParent = document.querySelector(`#chart-1 .chart`).offsetParent
  var offY = offsetParent.offsetTop
  var cursorY = 5

  var windowWidth = window.innerWidth
  var ch = document.querySelector(`.my-tooltip`).clientHeight
  var cy = d3.event.pageY - offY
  var windowHeight = window.innerHeight
  if (windowWidth > 767) {
    if (ch + cy >= windowHeight) {
      return cy - (ch / 2) + "px"
    } else {
      return cy - 28 + "px"
    }
  }
}

function leftTT() {
  var offsetParent = document.querySelector(`#chart-1 .chart`).offsetParent
  var offX = offsetParent.offsetLeft
  var cursorX = 5

  var windowWidth = window.innerWidth
  var cw = document.querySelector(`.my-tooltip`).clientWidth
  var cx = d3.event.pageX - offX
  var bodyWidth = document.querySelector(`#chart-1 .chart`).clientWidth

  if (windowWidth > 767) {
    if (cw + cx >= bodyWidth) {
      document.querySelector(`.my-tooltip`).className = 'my-tooltip box-shadow-left'
      return cx - cw - cursorX + "px"
    } else {
      document.querySelector(`.my-tooltip`).className = 'my-tooltip box-shadow-right'
      return cx + cursorX + "px"
    }
  }
}