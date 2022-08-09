//Create SVG element
var svg = d3.select("#chart-1 .chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var tooltip = d3.select(".d3-container").append("div")
  .attr("class", "my-tooltip")
  .style("visibility", 'hidden')
var colorScale
//Load in data
d3.csv("data.csv")
  .then(function(csv) {
    // Add X scale
    colorScale = d3.scaleOrdinal()
      .domain(csv.map(d => d.race))
      .range(['#646f8c', '#d5563a', '#6ba292', '#5b1933', '#faa916', '#56a9de', '#654f6f', '#c2c1c2'])

    // Define X axis
    var yAxis1 = d3.axisLeft(yScale1)
      .tickFormat(d => d === 'pop' ? 'General population' : 'Attorneys')

    // Add Y scale
    var xScale1 = d3.scaleLinear()
      .domain([0, 100])
      .range([margin.left, width - margin.right])

    // Define Y axis and format tick marks
    var xAxis1 = d3.axisBottom(xScale1)
      .ticks(tickNums)
      .tickFormat(d => d + '%')

    var xGrid1 = d3.axisBottom(xScale1)
      .tickSize(-height + margin.top + margin.bottom, 0, 0)
      .tickFormat('')
      .ticks(tickNums)

    // Render Y grid
    svg.append("g")
      .attr("transform", `translate(0,${height-margin.bottom})`)
      .attr("class", "grid")
      .style('color', 'black')
      .style('opacity', '0.2')
      .call(xGrid1)

    var races = csv.map(d => d.race)
    var popRaces = csv.filter(d => d.race != 'mideast')
    var attyRaces = csv.filter(d => d.race != 'other')

    svg.selectAll("bars")
      .data(attyRaces)
      .enter()
      .append("rect")
      .attr('class', (d) => {
        return `race race-${d.race} atty`
      })
      .attr("y", function(d) {
        return yScale1('atty') + margin.top;
      })
      .attr("x", function(d) {
        return xScale1(d.attyOffset)
      })
      .attr("width", function(d) {
        return xScale1(d.atty) - margin.left;
      })
      .attr("height", yScale1.bandwidth())
      .attr("fill", (d) => {
        return colorScale(d.race)
      })
    // .on('mouseover mousemove', (d) => {
    //   var text = tipText(d)
    //   return mouseover(text)
    // })
    // .on('mouseout', mouseout)

    svg.selectAll("bars")
      .data(popRaces)
      .enter()
      .append("rect")
      .attr('class', (d) => {
        return `race race-${d.race} pop`
      })
      .attr("y", function(d) {
        return yScale1('pop') + margin.top;
      })
      .attr("x", function(d) {
        return xScale1(d.popOffset)
      })
      .attr("width", function(d) {
        return xScale1(d.pop) - margin.left;
      })
      .attr("height", yScale1.bandwidth())
      .attr("fill", (d) => {
        return colorScale(d.race)
      })
    // .on('mouseover mousemove', (d) => {
    //   var text = tipText(d)
    //   return mouseover(text)
    // })
    // .on('mouseout', mouseout)

    svg.selectAll("bars")
      .data(attyRaces)
      .enter()
      .append("rect")
      .attr('class', (d) => {
        return `numberholder race-${d.race} atty`
      })
      .attr("y", function(d) {
        return yScale1('atty') + (yScale1.bandwidth() / 2) + margin.top - 9.5;
      })
      .attr("x", function(d) {
        return xScale1(d.attyOffset) + (xScale1(d.atty) / 2) - 30 - (margin.left / 2)
      })
      .attr("width", 60)
      .attr("height", 24)
      .attr("fill", (d) => {
        return colorScale(d.race)
      })
      .style('opacity', 0)

    svg.selectAll("bars")
      .data(popRaces)
      .enter()
      .append("rect")
      .attr('class', (d) => {
        return `numberholder race-${d.race} pop`
      })
      .attr("y", function(d) {
        return yScale1('pop') + (yScale1.bandwidth() / 2) + margin.top - 9.5;
      })
      .attr("x", function(d) {
        return xScale1(d.popOffset) + (xScale1(d.pop) / 2) - 30 - (margin.left / 2)
      })
      .attr("width", 60)
      .attr("height", 24)
      .attr("fill", (d) => {
        return colorScale(d.race)
      })
      .style('opacity', 0)

    var pointsOffset = 8

    svg.selectAll("bars")
      .data(attyRaces)
      .enter()
      .append('text')
      .text(d => numeral(d.atty).format('0,0[.]0') + '%')
      .attr('class', (d) => {
        return `race text race-${d.race.replaceAll('.', '').toLowerCase()} atty`
      })
      .attr("y", yScale1('atty') + 9 + margin.top + yScale1.bandwidth() / 2)
      .attr("x", function(d) {
        return xScale1(d.attyOffset) + (xScale1(d.atty) / 2) - (margin.left / 2)
      })
      .attr('fill', d => d.race === 'mideast' || d.race === 'amerindian' || d.race === 'other' ? 'black' : 'white')

      .style('display', 'none')

    svg.selectAll("bars")
      .data(popRaces)
      .enter()
      .append('text')
      .text(d => numeral(d.pop).format('0,0[.]0') + '%')
      .attr('class', (d) => {
        return `race text race-${d.race.replaceAll('.', '').toLowerCase()} pop`
      })
      .attr("y", yScale1('pop') + 9 + margin.top + yScale1.bandwidth() / 2)
      .attr("x", function(d) {
        return xScale1(d.popOffset) + (xScale1(d.pop) / 2) - (margin.left / 2)
      })
      .attr('fill', d => d.race === 'mideast' || d.race === 'amerindian' || d.race === 'other' ? 'black' : 'white')
      .style('display', 'none')

    svg.selectAll("svg text.race")
      .attr("font-family", "sans-serif")
      .attr("font-size", () => {
        return document.querySelector('#article').offsetWidth >= 640 ? "14pt" : '14pt'
      })
      .attr("text-anchor", "middle")

      .style('pointer-events', 'none')
      .raise()

    // Render Y axis
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr('class', 'y-axis')
      .call(yAxis1)
      .style('color', 'black')
      .selectAll("text")
      .attr("font-size", "9pt")
      .style("text-anchor", "middle")
      .style("transform", 'translate(-20px,0) rotate(270deg)')

    //Render X axis
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .attr('class', 'x-axis')
      .style('color', 'black')
      .call(xAxis1)
      .selectAll("text")
      .attr("font-size", "9pt")
      // .attr("transform", () => {
      //   return winWidth > 640 ? null : `translate(-5, 0) rotate(-45)`
      // })
      .style("text-anchor", 'middle')

    d3.selectAll('rect.race, span.race')
      .on('mouseover', () => {
        var raceClass = event.target.classList[1].replaceAll('race-', '')

        d3.selectAll('rect.race')
          .style('opacity', .3)

        d3.selectAll(`rect.race-${raceClass}`)
          .style('opacity', 1)

        d3.selectAll(`span.race`)
          .style('box-shadow', 'none')
          .style('opacity', .6)

        d3.selectAll(`span.${raceClass}`)
          .style('box-shadow', '0px 0px 0px 2px black inset')
          .style('opacity', 1)

        d3.selectAll(`text.race`)
          .style('display', 'none')

        d3.selectAll(`text.race-${raceClass}`)
          .style('display', 'block')

      })
      .on('mouseout', () => {
        d3.selectAll('rect.race')
          .style('opacity', 1)

        d3.selectAll('rect.numberholder')
          .style('opacity', 0)

        d3.selectAll(`span.race`)
          .style('box-shadow', 'none')
          .style('opacity', 1)

        d3.selectAll(`text.race`)
          .style('display', 'none')

      })
  });