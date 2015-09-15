group = size = color = ''

start = (type) ->
  $.ajax
    'async': false
    'global': false
    'url': '/records/1/detailed_har_entries.json',
    #'dataType': 'jsonp'
    #'jsonpCallback': 'data'
    'success': (data) ->
      create data
      return
  return

create = (data) ->
  colors =
    timeCategory:
      VERY_SLOW: 'red'
      SLOW: 'orange'
      FAST: 'lightgreen'
      VERY_FAST: 'green'
    sizeCategory:
      LARGE: 'mediumorchid'
      MEDIUM: 'cornflowerblue'
      SMALL: 'gold'
#    lastPriceCategory:
#      Top: 'aqua'
#      Middle: 'chartreuse'
#      Bottom: 'crimson'
#    standardDeviationCategory:
#      Top: 'slateblue'
#      Middle: 'darkolivegreen'
#      Bottom: 'orangered'
    default: '#4CC1E9'
  radius = 75
  width = Math.max(document.documentElement.clientWidth, window.innerWidth or 0)
  height = Math.max(document.documentElement.clientHeight, window.innerHeight or 0)
  fill = d3.scale.ordinal().range([
    '#FF00CC'
    '#FF00CC'
    '#00FF00'
    '#00FF00'
    '#FFFF00'
    '#FF0000'
    '#FF0000'
    '#FF0000'
    '#FF0000'
    '#7F0000'
  ])
  svg = d3.select('#chart').append('svg').attr('width', width).attr('height', height)

  getDataMapping = (data, vname) ->
    max = d3.max(_.pluck(data, vname))
    j = 0
    while j < data.length
      data[j].radius = if vname != '' then radius * data[j][vname] / max else 15
      data[j].x = if data[j].x then data[j].x else Math.random() * width
      data[j].y = if data[j].y then data[j].y else Math.random() * height
      data[j].timeCategory = getCategory('time', data[j])
      j++
    data

  getCategory = (type, d) ->
    max = d3.max(_.pluck(data, type))
    val = d[type] # / max
    if val > 600
      'VERY_SLOW'
    else if val > 400
      'SLOW'
    else if val > 100
      'FAST'
    else
      'VERY_FAST'

  changeColor = (val) ->
    console.log val
    d3.selectAll('circle').transition().style('fill', (d) ->
      if val then colors[val][d[val]] else colors['default']
    ).duration 1000
    $('.colors').empty()
    if val
      for label of colors[val]
        $('.colors').append '<div class="col-xs-1 color-legend" style="background:' + colors[val][label] + ';">' + label + '</div>'
    return

  draw = (varname) ->
    centers = getCenters(varname, [
      width
      height
    ])
    force.on 'tick', tick(centers, varname)
    labels centers
    force.start()
    return

  tick = (centers, varname) ->
    foci = {}
    i = 0
    while i < centers.length
      foci[centers[i].name] = centers[i]
      i++
    (e) ->
      `var i`
      i = 0
      while i < data.length
        o = data[i]
        f = foci[o[varname]]
        o.y += (f.y + f.dy / 2 - (o.y)) * e.alpha
        o.x += (f.x + f.dx / 2 - (o.x)) * e.alpha
        i++
      nodes.each(collide(.11)).attr('cx', (d) ->
        d.x
      ).attr 'cy', (d) ->
        d.y
      return

  labels = (centers) ->
    svg.selectAll('.label').remove()
    svg.selectAll('.label').data(centers).enter().append('text').attr('class', 'label').text((d) ->
      d.name
    ).attr 'transform', (d) ->
      'translate(' + d.x + d.dx / 2 + ', ' + d.y + 20 + ')'
    return

  removePopovers = ->
    $('.popover').each ->
      $(this).remove()
      return
    return

  showPopover = (d) ->
    $(this).popover
      placement: 'auto top'
      container: 'body'
      trigger: 'manual'
      html: true
      content: ->
        'URL: ' + d.URL+ '<br />' +
        'Source: ' + d.Source + '<br />' +
        'Header Size: ' + d.headerssize / 1000.0 + '<br />' +
        'Body Size: ' + d.bodysize / 1000.0  + '<br />' +
        'Time: ' + (d.time / 1000.0)
    $(this).popover 'show'
    return

  collide = (alpha) ->
    quadtree = d3.geom.quadtree(data)
    (d) ->
      r = d.radius + maxRadius + padding
      nx1 = d.x - r
      nx2 = d.x + r
      ny1 = d.y - r
      ny2 = d.y + r
      quadtree.visit (quad, x1, y1, x2, y2) ->
        `var r`
        if quad.point and quad.point != d
          x = d.x - (quad.point.x)
          y = d.y - (quad.point.y)
          l = Math.sqrt(x * x + y * y)
          r = d.radius + quad.point.radius + padding
          if l < r
            l = (l - r) / l * alpha
            d.x -= x *= l
            d.y -= y *= l
            quad.point.x += x
            quad.point.y += y
        x1 > nx2 or x2 < nx1 or y1 > ny2 or y2 < ny1
      return

  data = getDataMapping(data, size)
  padding = 5
  maxRadius = d3.max(_.pluck(data, 'radius'))
  maximums =
    time: d3.max(_.pluck(data, 'time'))
    #lasPrice: d3.max(_.pluck(data, 'body'))

  getCenters = (vname, size) ->
    centers = undefined
    map = undefined
    centers = _.uniq(_.pluck(data, vname)).map((d) ->
      {
      name: d
      value: 1
      }
    )
    map = d3.layout.treemap().size(size).ratio(1 / 1)
    map.nodes children: centers
    centers

  nodes = svg.selectAll('circle').data(data)
  nodes.enter().append('circle').attr('class', 'node').attr('cx', (d) ->
    d.x
  ).attr('cy', (d) ->
    d.x
  ).attr('r', (d) ->
    d.radius
  ).style('fill', (d, i) ->
    colors['default']
  ).on('mouseover', (d) ->
    showPopover.call this, d
    return
  ).on 'mouseout', (d) ->
    removePopovers()
    return
  $('#board').change ->
    $('#chart').empty()
    start @value
    return
  $('#group').change ->
    group = @value
    draw group
    return
  $('#size').change ->
    val = @value
    max = d3.max(_.pluck(data, val))
    d3.selectAll('circle').data(getDataMapping(data, @value)).transition().attr('r', (d, i) ->
      if val then radius * data[i][val] / max else 15
    ).attr('cx', (d) ->
      d.x
    ).attr('cy', (d) ->
      d.y
    ).duration 1000
    size = @value
    force.start()
    return
  $('#color').change ->
    color = @value
    changeColor @value + "Category"
    return
  force = d3.layout.force()
  changeColor color
  draw group
  return

start 'active'
