let total = 100;
const PICTURES = ["banana.png", "bell.png","cherries.png","joker.png", "money-bag.png", "orange.png", "poker.png", "start-up.png"];
const STARTBTN = document.getElementById("startButton");
const ADDPOINTSBTN = document.getElementById("addPointsButton");
const BALANCE =document.getElementById("balanceID");
STARTBTN.addEventListener("click",main);

const POINTS = [
    {
        "pts":2,
        "bonus":50
    },
    {
        "pts":2,
        "bonus":70
    },
    {
        "pts":3,
        "bonus":70
    },
    {
        "pts":3,
        "bonus":90
    },
    {
        "pts":4,
        "bonus":110
    },
    {
        "pts":4,
        "bonus":150
    },
    {
        "pts":5,
        "bonus":170
    },
    {
        "pts":6,
        "bonus":250
    },
];
const COLS = document.querySelectorAll(".col");
const WINELEMENT = document.getElementById("win");
// TODO maybe later ?
// const WINTEXT = document.getElementById("wintext");

setup();

function setup() {
    for(let i = 0; i < COLS.length; i++) {

        item = COLS[i].children;
        item = Array.from(item);
        for (let j = 0; j < item.length; j++) {


            item[j].children[0].setAttribute('src', "images/" + PICTURES[randInt()]);
        }
    }
}

STARTBTN.addEventListener("click",function () {
    WINELEMENT.style.left = "0px";
    WINELEMENT.style.opacity = 0;
});

// TODO ADD POINTS FUNCTION, BLOCK CLICKING START WHILE PLAYING, CALCULATE WON
ADDPOINTSBTN.addEventListener("click",add_points);


function randInt()
{
    return Math.floor(Math.random()*PICTURES.length)
}

function add_points() {
    STARTBTN.style.pointerEvents = "auto";
    STARTBTN.style.background = "#01af00";
    total+=100;
    update_points()
}

function update_points() {
    BALANCE.innerHTML = total
}

function if_enough(){
    if(total >= 20){
        total -= 20;
        update_points();
        STARTBTN.style.pointerEvents = "none";
        return true
    }
    return false
}

function reset_elements() {
    WINELEMENT.innerText = "YOU WIN";
    WINELEMENT.style.color = "white";
    WINELEMENT.style.fontSize = "150px";

}

function main(){
    reset_elements();
    roll();
}
function roll() {
    STARTBTN.style.background = "red";
    reset_elements();
    if(if_enough()){
        for(let i =0; i < COLS.length; i++)
        {    COLS[i].children[1].style.background = "none";

            setTimeout(function () {
                single_roll(COLS[i])
            },  i*123 );
            setTimeout(function () {

                COLS[i].children[1].style.transition="background 250ms ease";
                COLS[i].children[1].style.backgroundColor = "rgba(255,70,252,0.3)";
                COLS[i].children[1].style.border="black";
                COLS[i].children[1].style.borderRadius="20px";


            }, 3800)
        }
        setTimeout(function () {
            res = calculate_result();
            if(!res)
            {
                WINELEMENT.innerText = "YOU LOSE";
                WINELEMENT.style.left="350px";
                WINELEMENT.style.color = "red";

            }
            else {
                WINELEMENT.innerText = "YOU WIN "+res+" POINTS"
                WINELEMENT.style.fontSize = "115px";
                WINELEMENT.style.color = "green";
                WINELEMENT.style.left="150px";

            }
            WINELEMENT.style.opacity=1;
        }, 3800);


        setTimeout(function () {
            let won =calculate_result();
            total += won;
            update_points();

            WINELEMENT.style.opacity = 0;
            WINELEMENT.style.left = "1400px";
            STARTBTN.style.pointerEvents = "auto";
            STARTBTN.style.background = "#01af00";
        }, 6000)
    }
}

function single_roll(col){
    let times = 20;
    for(let i = 0; i < times; i++)
    {

        setTimeout(function () {
            step(col)
        }, i*140)
    }
    setTimeout(function () {
        col.style.transition = null;
        col.style.top ="0px"
    },140*times)
}

function step(col){
    let item = col.children;
    item = Array.from(item);
    col.style.transition = null;
    col.style.top = "-64px";

    requestAnimationFrame(function () {
        col.style.transition = 'top 140ms linear';
        col.style.top = "128px";

            for(let i = item.length-1; i>0; i--)
            {
                item[i].children[0].setAttribute('src', item[i-1].children[0].src)
            }

            item[0].children[0].setAttribute('src', "images/"+PICTURES[randInt()])

    })
}

function calculate_result(){
    let counts = [0,0,0,0,0,0,0,0];
    let res = 0;
    let two_any= false;
    let three_any = false;
    for(let i = 0; i < COLS.length; i++)
    {
        let attribue = COLS[i].children[1].children[0].getAttribute('src');
        attribue = attribue.substring(42,);
        counts[PICTURES.indexOf(attribue)] += 1;
    }


    for(let i = 0; i < 8; i++)
    {
        if(counts[i]===5)
        {
            return POINTS[i].bonus
        }
        if(counts[i] == 2)// true === 1
        {
            res += (2*POINTS[i].pts);
            two_any = true

        }
        if(counts[i] == 3){
            console.log("Here");
            res += 3*(POINTS[i].pts);
            three_any = true
        }
        if(counts[i] == 4)
        {
            res += 4*(POINTS[i].pts*POINTS[i].pts)
        }
    }
    if(!res)
    {
        res =0
    }
    if(two_any && three_any)
    {
        res += 3
    }
    return res
}
