window.onscroll = function(){
    const nav = document.querySelector('#nav');
    const fixedNav = nav.offsetTop;

    if (window.pageYOffset > fixedNav){
        nav.classList.add('navbar-fixed');
    }else {
        nav.classList.remove('navbar-fixed');
    }
}

// const imgAbout = document.querySelector('#home .imgmain img');
// const imgsAbout = ['main1', 'main2', 'main3', 'main4', 'main5', 'main6', 'sekolah'];
// let i = 0;
// let now = new Date().getTime();
// setInterval(() => {
//     if(new Date().getTime() - now > 5000){
//         now = new Date().getTime();
//         imgAbout.setAttribute("src", "img/" + imgsAbout[i++] + ".jpg")
//     }
//     if(i == imgsAbout.length) i = 0;
//     // console.log('1');
// }, Infinity);



const cursor = document.querySelector('#cursor'),
        html = document.querySelector('html');
html.addEventListener('mousemove', function(event){
    setTimeout(function(){
    let x = event.clientX;
    let y = event.clientY;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    }, 100);
});


const burger = document.querySelector('.burger');
const navLinks = document.querySelector('nav .nav-links')

burger.addEventListener('click', function(){
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
})


// umkm
const umkmCards = document.querySelectorAll('.umkm-card')

umkmCards.forEach(card=>card.addEventListener('click', function(){
    this.classList.toggle('open-view');  
}));

// extrakulikuler section
const cardlists = document.querySelectorAll('#ekstrakulikuler .card-lists .card');

cardlists.forEach(e=>e.addEventListener('click', function(event){
    e.classList.toggle('card-open');
}));


// intersection obeserver animation

// let navObj = document.querySelectorAll('nav > *');
// let homeObject = document.querySelectorAll('#home > *');
let about = document.querySelector('.about-content');
let headings = document.querySelectorAll('.heading');
let ikondesaCards = document.querySelectorAll('#ikondesa .image');
let extraCards = document.querySelectorAll('#potensi .card');
let newsCards = document.querySelectorAll('#potensi .card-news');
let footerCols = document.querySelectorAll('.footer .footer-col');

let observer1 = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if (entry.isIntersecting){
            entry.target.classList.add('animate');
        }
        if (entry.isIntersecting) observer1.unobserve(entry.target);
    });
}, {
    threshold: .25,
});

observer1.observe(about);

let object = [headings, umkmCards, ikondesaCards, extraCards, newsCards, footerCols];

object.forEach(obj=>{
    obj.forEach(element => {
        observer1.observe(element);
    });
})

// give delay for each extra cards

let objectTransition = [extraCards, newsCards, footerCols];
objectTransition.forEach(objT=>{
    objT.forEach((obj, id)=>{
        obj.style.transition = `.3s linear ${.2 + id*.2}s`;
    });
})


// for active links
let homeSection = document.querySelector('#home');
let aboutSection = document.querySelector('#tentang');
let umkmSection = document.querySelector('#umkm');
let ikondesaSection = document.querySelector('#ikondesa');
let extraSection = document.querySelector('#extra');
let potensiSection = document.querySelector('#potensi');
const navLinksLi = document.querySelectorAll('nav .nav-links li');
let navLinksLiInNavigation = document.querySelector('nav .nav-links li.inNavigate');

function inNavigate(link){
    link.classList.add('inNavigate');
    navLinksLiInNavigation = link;
}
function giveClickEventLi(li, index, sections){
    li.addEventListener('click', function(){
        sections.forEach(section=>{
            observerSection.unobserve(section.target);
        })

        // kita akan observe lagi supaya pas scroll bisa active lagi, tapi dllm delay tertentu.
        setTimeout(()=>{
            sections.forEach(section=>{
                observerSection.observe(section.target);
            })
        }, index * 300);

        navLinksLiInNavigation.classList.remove('inNavigate');
        inNavigate(li);
    })
}

const sectionObserverObjects = [homeSection, aboutSection, umkmSection, ikondesaSection, extraSection, potensiSection];
const observerSection = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            navLinksLi.forEach((li, index)=>{
                giveClickEventLi(li, index, entries);
                if(li.firstElementChild.innerHTML.toLowerCase().includes(entry.target.id.toLowerCase())){
                    navLinksLiInNavigation.classList.remove('inNavigate');
                    inNavigate(li);
                }
                
            });
        }
    })
}, 
{
    threshold: .5,
});

sectionObserverObjects.forEach(obj=>{
    observerSection.observe(obj);
})


