// 새로고침 후 첫페이지 화면으로 애니메이션 실행하면서 돌아옴
// $('html, body').stop().animate({
//     scrollTop : 0
// }, 1000)

// gotop 버튼 일정 거리 스크롤하면 나타남 & 클릭 시 부드럽게 스크롤시키기
$(window).on('scroll', function(){
    var sct = $(this).scrollTop()
    
    if (sct>500 && !$('html').hasClass('gotopflag')) {
        $('html').addClass('gotopflag')
        $('body').append('<div class="gotop"><a href="javascript:;"><img src="./img/smileflower.png" alt="맨위로" /></a></div>')
        $('.gotop').css({
            position:'fixed',
            right:'55px',
            bottom:'30px',
            zIndex:999,
            opacity:'0'
        }).animate({opacity:1}, 300)
    } else if (sct<=500 && $('html').hasClass('gotopflag')) {
        $('html').removeClass('gotopflag')
        $('.gotop').animate({opacity:0}, 300, function(){
            $(this).remove()
        })
    }
    
})


$('body').on('click', '.gotop', function(){
    $('html').animate({
        scrollTop:0
    }, 500)
})

// 메뉴 클릭하면 불 들어오게 하기
$('#menu li a').on('click', function(){
    var index = $(this).parent().index()
    $(this).parent().addClass('on').siblings().removeClass('on')
    var offTop = $('#wrap section').eq(index).offset().top
    $('html').animate({
        scrollTop:offTop
    }, 1000)
    return false;
})

// 메뉴 스크롤시 불 들어오게 하기
var wh0 = $('section').eq(0).offset().top
var wh1 = $('section').eq(1).offset().top
var wh2 = $('section').eq(2).offset().top
var wh3 = $('section').eq(3).offset().top

$(window).on('scroll', function(){
    var sct = $(this).scrollTop()
    if (sct>=wh0 && sct<wh1) {
        $('#menu li').eq(0).addClass('on').siblings().removeClass('on')
    } else if (sct>=wh1 && sct<wh2) {
        $('#menu li').eq(1).addClass('on').siblings().removeClass('on')
    } else if (sct>=wh2 && sct<wh3) {
        $('#menu li').eq(2).addClass('on').siblings().removeClass('on')
    } else {
        $('#menu li').eq(3).addClass('on').siblings().removeClass('on')
    }
})


// 두번째 박스 이지파이 파트 스크롤하면 차트 채워짐
var flag = true;
$(window).on('scroll', function(){
    var sct = $(this).scrollTop();
    if (sct>0 && flag ) {
        $('.skills').each(function(idx){
            $(this).data('easyPieChart').disableAnimation().update(0).enableAnimation().update(arrPercent[idx]);
         })
        flag = false

    } else if (sct==0 && !flag ) {
        $('.skills').each(function(idx){
            $(this).attr({'data-percent':0})
        })
        flag = true
    }  
})

var arrChartColor = ['#e8670c', '#ff9e5a', '#ff710d', '#7f4f2d', '#cc5b0b', '#cc3a1a'];
var arrPercent = [90, 90, 70, 80, 80]
$('.skills').each(function(idx){ // 매개변수 써도 안써도 ok, 매개변수는 자동으로 인덱스번호를 담아
    $(this).attr({'data-percent':arrPercent[idx]})
    $(this).easyPieChart({
        animate: 2000,       // 진행시간
        easing: 'easeOutBounce', // 속도함수
        barColor: arrChartColor[idx],   // 채워지는 색상
        trackColor: '#efefef', // 트랙 색상
        scaleColor: false, // 눈금선 색상
        lineCap:'round', // 선의 끝 모양(butt, round, square)
        lineWidth: 20, // 선의 폭
        size:180, // 원형차트의 크기
        onStart:$.noop,
        onStop:$.noop,
        onStep: function(from, to, percent) {  
            $(this.el).find('.percent').text(Math.round(percent));
        }
    })
}) 


// contents 애니메이션
AOS.init();








