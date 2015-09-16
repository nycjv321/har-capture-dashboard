$(document).ready ->
  $.ajax
    url: '/performance_timings/simple_phases.json'
    dataType: 'json'
    error: (jqXHR, textStatus, errorThrown) ->
      $('body').append "AJAX Error: #{textStatus}"
    success: (data, textStatus, jqXHR) ->
      $("#ex16b").slider({
        ticks: Object.keys(data),
        ticks_labels: Object.keys(data).map((key) -> data[key]),
        value: [0, 5],
        range: false,
        tooltip: 'hide'
      });
  i = 0
  length = localStorage.length
  while i < length
    if localStorage.key(i).startsWith("records")
      localStorage.removeItem(i)
    ++i

$("#ex16b").on "slide", (event) ->
  start_date = $($(".slider-tick-label")[event.value[0]]).text()
  end_date = $($(".slider-tick-label")[event.value[1]]).text()

  # todo clean this up
  performanceTimings
  if (typeof localStorage['records.' + Number(window.location.pathname.match(/\/records\/\d+/)[0].replace(/\/records\//,
    '')) + '.performance_timings'] == 'undefined')
    $.ajax
      url: window.location.pathname.match(/\/records\/\d+/)[0] + "/performance_timings.json"
      dataType: 'json'
      error: (jqXHR, textStatus, errorThrown) ->
        $('body').append "AJAX Error: #{textStatus}"
      success: (data, textStatus, jqXHR) ->
        localStorage['records.' + Number(window.location.pathname.match(/\/records\/\d+/)[0].replace(/\/records\//,
          '')) + '.performance_timings'] = JSON.stringify(data)
        performanceTimings = JSON.parse(localStorage['records.' + Number(window.location.pathname.match(/\/records\/\d+/)[0].replace(/\/records\//,
          '')) + '.performance_timings'])

        $("td.start_date_time").each (index) ->
          if end_date != "afterloadeventend"
            if $(this).text() >= performanceTimings[start_date] and $(this).text() <= performanceTimings[end_date]
              $("#detailed_har_entries").bootstrapTable('showRow',
                {index: Number($(this).parent().attr('data-index'))});
            else
              $("#detailed_har_entries").bootstrapTable('hideRow',
                {index: Number($(this).parent().attr('data-index'))});
          else
            if $(this).text() >= performanceTimings[start_date]
              $("#detailed_har_entries").bootstrapTable('showRow',
                {index: Number($(this).parent().attr('data-index'))});
            else
              $("#detailed_har_entries").bootstrapTable('hideRow',
                {index: Number($(this).parent().attr('data-index'))});

  else
    performanceTimings = JSON.parse(localStorage['records.' + Number(window.location.pathname.match(/\/records\/\d+/)[0].replace(/\/records\//,
      '')) + '.performance_timings'])

    $("td.start_date_time").each (index) ->
      if end_date != "afterloadeventend"
        if $(this).text() >= performanceTimings[start_date] and $(this).text() <= performanceTimings[end_date]
          $("#detailed_har_entries").bootstrapTable('showRow', {index: Number($(this).parent().attr('data-index'))});
        else
          $("#detailed_har_entries").bootstrapTable('hideRow', {index: Number($(this).parent().attr('data-index'))});
      else
        if $(this).text() >= performanceTimings[start_date]
          $("#detailed_har_entries").bootstrapTable('showRow', {index: Number($(this).parent().attr('data-index'))});
        else
          $("#detailed_har_entries").bootstrapTable('hideRow', {index: Number($(this).parent().attr('data-index'))});