$(function () {

    // init feather icons
    feather.replace();

    // init tooltip & popovers
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    //page scroll
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 20
        }, 1000);
        event.preventDefault();
    });

    // slick slider
    $('.slick-about').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false
    });

    //toggle scroll menu
    var scrollTop = 0;
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        //adjust menu background
        if (scroll > 80) {
            if (scroll > scrollTop) {
                $('.smart-scroll').addClass('scrolling').removeClass('up');
            } else {
                $('.smart-scroll').addClass('up');
            }
        } else {
            // remove if scroll = scrollTop
            $('.smart-scroll').removeClass('scrolling').removeClass('up');
        }

        scrollTop = scroll;

        // adjust scroll to top
        if (scroll >= 600) {
            $('.scroll-top').addClass('active');
        } else {
            $('.scroll-top').removeClass('active');
        }
        return false;
    });

    // scroll top top
    $('.scroll-top').click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000);
    });

    /**Theme switcher - DEMO PURPOSE ONLY */
    $('.switcher-trigger').click(function () {
        $('.switcher-wrap').toggleClass('active');
    });
    $('.color-switcher ul li').click(function () {
        var color = $(this).attr('data-color');
        $('#theme-color').attr("href", "css/" + color + ".css");
        $('.color-switcher ul li').removeClass('active');
        $(this).addClass('active');
    });
});

/**Form message-telegram */
"use strict"
//==========================================
const TELEGRAM_BOT_TOKEN = '7197428593:AAGH0-I9WHzFygK7ahttSInz-oARa45_6IU';
const TELEGRAM_CHAT_ID = '-1002092707472';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`


async function sendEmailTelegram(event) {
    event.preventDefault();

    const form = event.target;
    const formBtn = document.querySelector('.form__submit-button button')
    const formSendResult = document.querySelector('.form__send-result')
    formSendResult.textContent = '';


    const { name, email, phone, pass } = Object.fromEntries(new FormData(form).entries());
    
    const text = `Сообщение с сайта Agatjewelry от ${name}!\nEmail: ${email}\nТелефон: ${phone}\nСообщение: ${pass}`;


    try {
        formBtn.textContent = 'Loading...';

        const response = await fetch(API, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            })
        })
        
        if (response.ok) {
            formSendResult.textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
            form.reset()
        } else {
            throw new Error(response.statusText);
        }

    } catch (error) {
        console.error(error);
        formSendResult.textContent = 'Сообщение не отправлено! Попробуйте позже.';
        formSendResult.style.color = 'red';

    } finally {
        formBtn.textContent = 'Отправить';
    }
}


/*Search image by text*/
const imageDatabase = [
    { src: '', alt: 'Мужское кольцо', pageUrl: 'mensrings.html', tags: ['os3055', 'os3085', 'os3082','os3034','os3060','os3056','os3086','os3015','os3029',] },
    { src: '', alt: 'Мужское кольцо', pageUrl: 'mensrings-1.html', tags: ['700750', '700770', 'bk050','bk238','bk192','os3003','30080','30077','os3089',] },
    { src: '', alt: 'Мужское кольцо', pageUrl: 'mensrings-2.html', tags: ['700470', '700490', '700500','700510','700540','700670','700680','700720','700730',] },
    { src: '', alt: 'Мужское кольцо', pageUrl: 'mensrings-3.html', tags: ['700260', '700270', '700290','700300','700310','700320','700390','700370','700460',] },
    { src: '', alt: 'Мужское кольцо', pageUrl: 'mensrings-4.html', tags: ['700100', '700110', '700160','700180','700190','700210','700220','700230','vc1032',] },
    { src: '', alt: 'Мужское кольцо', pageUrl: 'mensrings-5.html', tags: ['700020', '700030', '700040','700070','700080','700030','700090','30089','30094',] },
    { src: '', alt: 'Мужское кольцо', pageUrl: 'mensrings-6.html', tags: ['700010', '300200', '300208','30210','30276','30247','30258','30370','30376',] },
    { src: '', alt: 'Мужское кольцо', pageUrl: 'mensrings-7.html', tags: ['30174', '30141', '30125','301117','30136',] },
    { src: '', alt: 'Замок', pageUrl: 'locks.html', tags: ['коробка6', 'коробка5', 'коробка7','коробка4','коробка3','3ph102','3ph101','3ph104','3ph100','езм013','езм003','езм006','замок17','замок15','замок16','замок14',] },
    { src: '', alt: 'Шарм-бусины', pageUrl: 'sharm-beads.html', tags: ['610100', '610120', '610180','610110','610190','610200','610210','610010','610020',] },
    { src: '', alt: 'Шарм-бусины', pageUrl: 'sharm-beads-1.html', tags: ['610270', '610220', '610260','610300','610330','610310','610420','610350','610360',] },
    { src: '', alt: 'Шарм-бусины', pageUrl: 'sharm-beads-2.html', tags: ['610470', '610440', '610480','610430','610490','b228r','b238-r','b237-r','b225-r',] },
    { src: '', alt: 'Шарм-бусины', pageUrl: 'sharm-beads-3.html', tags: ['b283-r', 'b281-r', 'b250r','b312-r','b317-r','b307-r','b324-r',] },
    { src: '', alt: 'Брошь', pageUrl: 'brooches.html', tags: ['823', '824', '821','822','819','820','818','817','815','829','830','826','825','827','828',] },
    { src: '', alt: 'Сувенир', pageUrl: 'souvenirs.html', tags: ['os8012', 'os8013', 'os8014','os8006','вч031',] },
    { src: '', alt: 'Брелок', pageUrl: 'keychains.html', tags: ['bk-1', 'bk-16','bk-17','bk-11','bk-18','bk-19','bk-23','bk-22','bk-26',] },
    { src: '', alt: 'Брелок', pageUrl: 'keychains-1.html', tags: ['bk-27', 'bk-36', 'bk-28','bk-47','bk-48','bk-6','bk-8','bk-31','bk-30','bk-33','bk-39','bk-42','bk-32','bk-43',] },
    { src: '', alt: 'Колье', pageUrl: 'necklace.html', tags: ['810', '809', '807','806','805','804','803','800','801',] },
    { src: '', alt: 'Колье', pageUrl: 'necklace-1.html', tags: ['797', '796', '795','794','793','792','781','780','779'] },
    { src: '', alt: 'Колье', pageUrl: 'necklace-2.html', tags: ['778', '777', '776','70003','70001','7002-2','7002-1','7005','7004',] },
    { src: '', alt: 'Колье', pageUrl: 'necklace-3.html', tags: ['790', '789', '788','787','786','785','784','783','782',] },
    { src: '', alt: 'Гарнитур', pageUrl: 'sets.html', tags: ['110210', '110215', '110330','110390','110395','110040','110045','110150','110155',] },
    { src: '', alt: 'Гарнитур', pageUrl: 'sets-1.html', tags: ['110620', '110625', '110420','110425','110445','110440','110450','110455','110700',] },
    { src: '', alt: 'Гарнитур', pageUrl: 'sets-2.html', tags: ['112240', '112245', '110805','110800','111160','111165','110995','110990','110705',] },
    { src: '', alt: 'Гарнитур', pageUrl: 'sets-3.html', tags: ['112265', '112250', '112255','112330','112335','112370','112375','112400','112405',] },
    { src: '', alt: 'Гарнитур', pageUrl: 'sets-4.html', tags: ['112450', '112455', '112477','112475','112470','111790','111795','111530','111535',] },
    { src: '', alt: 'Гарнитур', pageUrl: 'sets-5.html', tags: ['112270', '112275', '111665','111660','111715','111710','111890','111895','110900','110905','111410','111415',] },
    { src: '', alt: 'Цепь', pageUrl: 'chains-and-bracelets.html', tags: ['бисмарк', 'якорное', 'панцирное','лисий хвост','510410','бр-196','бр-137','бр-131','бр-162'] },
    { src: '', alt: 'Цепь', pageUrl: 'chains-and-bracelets-1.html', tags: ['бр-80', 'vc1032', 'vc1033','vc1046','vc1051','vc1007','os6540',',бр-90','бр-161',] },
    { src: '', alt: 'Цепь', pageUrl: 'chains-and-bracelets-2.html', tags: ['итальянка', 'm-1124', '510690','510460','510640','os6504','510420','510340','бр-131',] },
    { src: '', alt: 'Цепь', pageUrl: 'chains-and-bracelets-3.html', tags: ['510090', '510040', '500390','500070','500480','510260','510270','510330','510320',] },
    { src: '', alt: 'Цепь', pageUrl: 'chains-and-bracelets-4.html', tags: ['m-762', 'm-543', 'm-65','8001','8003','8018','8025','8044','8045',] },
    { src: '', alt: 'Цепь', pageUrl: 'chains-and-bracelets-5.html', tags: ['105.308-r', '105.309-r', '105.307-r','m-450','80139','80067','6000040.d3.5','6000050.d5','os6529',] },
    { src: '', alt: 'Цепь', pageUrl: 'chains-and-bracelets-6.html', tags: ['m-460', 'шопард', '510590',] },
    { src: '', alt: 'Крест', pageUrl: 'crosses.html', tags: ['os5503', 'os5508', 'os5000','os5001','os5002','os5003','os5004','os5007','os5009',] },
    { src: '', alt: 'Крест', pageUrl: 'crosses-1.html', tags: ['вкр-11', 'вкр-25', 'os5645','os5656','os5622','os5634','os5587','os5588','вкр-39',] },
    { src: '', alt: 'Крест', pageUrl: 'crosses-2.html', tags: ['кр-101(ю)', 'вкр050', '60112','60113','вкр-38','вкр-24','вкр-33','вкр-25','вкр-31',] },
    { src: '', alt: 'Крест', pageUrl: 'crosses-3.html', tags: ['50140', '50032', '50179','50125','50024','50025','50026','50027','50028',] },
    { src: '', alt: 'Крест', pageUrl: 'crosses-4.html', tags: ['50225', '50217', '50037','50034','50031','50029','410890',] },
    { src: '', alt: 'Крест', pageUrl: 'crosses-5.html', tags: ['410880', '410500', '054','055','057','001','002','028','411190',] },
    { src: '', alt: 'Помолвочное кольцо', pageUrl: 'engagement-rings.html', tags: ['os2747', 'os2688', 'os2689','os2698','os2699','os2696','os2724','os2692','os2677',] },
    { src: '', alt: 'Помолвочное кольцо ', pageUrl: 'engagement-rings-1.html', tags: ['os2664', 'os2668', 'os2610','os2594','os2615','os2606','os2663','os2669','os2667'] },
    { src: '', alt: 'Помолвочное кольцо', pageUrl: 'engagement-rings-2.html', tags: ['os2579', 'os2559', 'os2566','os2525','os2555','os2520','os2515','os2504',] },
    { src: '', alt: 'Серьги', pageUrl: 'earrings.html', tags: ['сц-631', 'сц-633', '310970','сб-420','св-635','сц-563','сц-566','сц-567','сц-573',] },
    { src: '', alt: 'Серьги', pageUrl: 'earrings-1.html', tags: ['40453', '40299', '40300','40325','40352','40291','311020','311120','311210',] },
    { src: '', alt: 'Серьги', pageUrl: 'earrings-2.html', tags: ['40970', '40999', '40826','40710','40762','40624','40514','40519','40428',] },
    { src: '', alt: 'Серьги', pageUrl: 'earrings-3.html', tags: ['41105', '41011', '41010','41084','41110','41078','40952','40965','40969',] },
    { src: '', alt: 'Серьги', pageUrl: 'earrings-4.html', tags: ['41330', '41227', '41241','41251','41256','41259','41260','41310','41328',] },
    { src: '', alt: 'Серьги', pageUrl: 'earrings-5.html', tags: ['m26650', '41322', '41324','41325','41327','41328',] },
    { src: '', alt: 'Подвеска', pageUrl: 'pendants.html', tags: ['300024', '60049', '60046','410690','410700','60076','os5189','610115','610345',] },
    { src: '', alt: 'Подвеска', pageUrl: 'pendants-1.html', tags: ['410390', '410770', '410750','еп113','еп112','еп111','еп107','410650','410400',] },
    { src: '', alt: 'Подвеска', pageUrl: 'pendants-2.html', tags: ['s60087', 's60088', 's60082','s60004','s60007','s60018','s60020','еп040','s60039',] },
    { src: '', alt: 'Подвеска', pageUrl: 'pendants-3.html', tags: ['610345', '610365', 'l1062','s60002','s60003','610235','os5101','os5154','os5130',] },
    { src: '', alt: 'Подвеска', pageUrl: 'pendants-4.html', tags: ['60190', '60187', '60175','60174','60182','60184','610025','610115','60202',] },
    { src: '', alt: 'Подвеска', pageUrl: 'pendants-5.html', tags: ['60131', '60142', '60100','60048','411880','411910','411330', '60134', '60132','60148','60072','60046',] },
    { src: '', alt: 'Обручальное кольцо', pageUrl: 'wedding-rings.html', tags: ['os2314', 'os2320', 'os2321','os2308','os2283','os2274','os2328','os2206','os2277',] },
    { src: '', alt: 'Обручальное кольцо', pageUrl: 'wedding-rings-1.html', tags: ['os2272', 'os2157', 'os2168','os2140','os2153','os2158','os2159','os2160','os2138',] },
    { src: '', alt: 'Обручальное кольцо', pageUrl: 'wedding-rings-2.html', tags: ['os2064', 'os2099', 'os2098','os2100','os2092','os2127','os2065','os2066','os2072',] },
    { src: '', alt: 'Обручальное кольцо', pageUrl: 'wedding-rings-3.html', tags: ['os2051', 'os2021', 'os2025','os2018','os2050','os2036','os2052','os2049','os2048',] },
    { src: '', alt: 'Обручальное кольцо', pageUrl: 'wedding-rings-4.html', tags: ['bk421', 'bk420','bk433','bk435','bk430','bk445','bk441','bk476','mk4160',] },
    { src: '', alt: 'Обручальное кольцо', pageUrl: 'wedding-rings-5.html', tags: ['bk430', 'bk421', 'bk420','bk419_17','bk416_17.75','bk414_16.5','bk412_19.25','bk407_18','bk402_15.5',] },
    { src: '', alt: 'Обручальное кольцо', pageUrl: 'wedding-rings-6.html', tags: ['bk400_18', 'bk391_15', 'os2667','bk382_15.5','bk357','bk355','bk335_16.5','bk333_18.5','bk329_17',] },
    { src: '', alt: 'Обручальное кольцо', pageUrl: 'wedding-rings-7.html', tags: ['bk326_22.5', 'bk289_15.5', ' bk271_20','bk270','bk217','bk209_15','bk188_3','bk187_7',' bk187',] },
    { src: '', alt: 'Обручальное кольцо', pageUrl: 'wedding-rings-8.html', tags: ['bk183', 'bk165', 'bk021','bk128','bk124','bk052',] },
];   
   

function searchImages() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('searchResults');
    
    // Очистка предыдущих результатов
    resultsDiv.innerHTML = '';

    const filteredImages = imageDatabase.filter(image => 
        image.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    if (filteredImages.length > 0) {
        filteredImages.forEach(image => {
            const linkElement = document.createElement('a');
            linkElement.href = image.pageUrl;
            linkElement.textContent = `-> ${image.alt}`;
            linkElement.target = '_blank';  // Открыть в новой вкладке
            resultsDiv.appendChild(linkElement);
            resultsDiv.appendChild(document.createElement('br'));  // Добавить перенос строки
        });
    } else {
        resultsDiv.innerHTML = '<p>Такого изделия нет</p>';
    }
}