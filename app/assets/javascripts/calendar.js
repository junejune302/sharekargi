$(document).ready(function() {
   $('#calendar').fullCalendar({
            header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
            editable: true,
            events: '/users/<%= current_user.id %>/events.json',
            eventLimit: true, // allow "more" link when too many events
            eventLimitText:'その他',
            defaultView: 'agendaWeek',
            lang:'ja',

//ヘッダーの書式
columnFormat: {
    month: 'ddd',    // 月
    week: 'D[(]ddd[)]', // 7(月)
    day: 'D[(]ddd[)]' // 7(月)
 
},
// タイトルの書式
titleFormat: {
    month: 'YYYY年 M月',                             // 2014年9月
    week: 'YYYY年 M月 D日', 
    day: 'YYYY年 M月 D日[(]ddd[)]',                  // 2014年9月7日(火)
},
//more表示の書式
dayPopoverFormat:'YYYY年 M月 D日[(]ddd[)]',
// 月名称
monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
// 月略称
monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
// 曜日名称
dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
// 曜日略称
dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
// スロットの時間の書式
axisFormat: 'H:mm',
// 時間の書式
timeFormat: 'H:mm',
 
// ボタン文字列
buttonText: {
    prev: '前',
    next: '次',
    prevYear: '前年',
    nextYear: '翌年',
    today: '今日',
    month: '月',
    week: '週',
    day: '日'
},
//月曜日開始
firstDay:1,
//土日表示
weekends:true,
//終日スロットル表示
allDaySlot:true,
//終日スロットルタイトル
allDayText:'終日',
//agendaWeek、agendaDayの1時間4セル（15分間隔）で表示
slotDuration:'00:15:00',
//開始（終了）時間がない場合の設定
defaultTimedEventDuration:'03:00:00',
//スクロール開始時間
scrollTime:'09:00:00',
//スクロール時間の最大、最小の設定
minTime:'00:00:00',
maxTime:'24:00:00',
//日付クリック
    dayClick: function(date, allDay, jsEvent, view) {
        // change the day's background color just for fun
        $(this).css('background-color', 'powderblue');
 
    },
//イベントクリック
    eventClick: function(calEvent, jsEvent, view) {
        alert('Event: ' + calEvent.title);
        // change the border color just for fun
        $(this).css('border-color', 'red');
   
    },
//ドラッグ可能
selectable:true,
selectHelper:true,
//ドラッグ後処理
select: function(start, end) {
    var title = prompt('イベントタイトル:');
    var eventData;
    if (title) {
        eventData = {
            title: title,
            start: start,
            end: end
        };
        $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
    }
    $('#calendar').fullCalendar('unselect');
},
 
            events: [
                {
                    title: '終日イベント',
                    start: '2014-09-01'
                },
                {
                    title: 'イベント',
                    start: '2014-09-07',
                    end: '2014-09-10'
                },
                {
                    id: 999,
                    title: '繰り返しイベント',
                    start: '2014-09-09T16:00:00'
                },
                {
                    id: 999,
                    title: '繰り返しイベント',
                    start: '2014-09-16T16:00:00'
                },
                {
                    title: '会議',
                    start: '2014-09-11',
                    end: '2014-09-13',
                    startEditable:false,
                    backgroundColor:'green',
                    textColor:'black'
                },
                {
                    title: 'ミーティング',
                    start: '2014-09-12T10:30:00',
                    end: '2014-09-12T12:30:00',
                    durationEditable:false,
                    color:'red'
                },
                {
                    title: '昼会議',
                    start: '2014-09-12T12:00:00'
                },
                {
                    title: '出張',
                    start: '2014-09-12T14:30:00',
                    start: '2014-09-15T17:30:00'
                },
                {
                    title: '誕生日',
                    start: '2014-09-13T07:00:00',
                    allDay:true
                },
                {
                    title: 'グーグルにアクセス',
                    url: 'http://google.com/',
                    start: '2014-09-28'
                }
            ]
        });
         
    });
$(document).ready(function() {
    $('#calendar').fullCalendar({
        events: '/users/<%= current_user.id %>/events.json',
        selectable: true,
        selectHelper: true,
        select: function(start, end, allDay) {
            console.log('start:' + start);
            console.log('end:' + end);
            console.log('allDay:' + allDay);
            alert('selected');
        }
    });
});
$(document).ready(function() {
    var select = function(start, end, allDay) {
        var title = window.prompt("title");
        var data = {event: {title: title,
                            start: start,
                            end: end, 
                            allDay: allDay}};
        $.ajax({
            type: "POST",
            url: "/events.json",
            data: data,
            success: function() {
                calendar.fullCalendar('refetchEvents');
            }
        });
        calendar.fullCalendar('unselect');
    };

    var calendar = $('#calendar').fullCalendar({
        events: '/users/<%= current_user.id %>/events.json',
        selectable: true,
        selectHelper: true,
        ignoreTimezone: false,
        select: select
    });
});