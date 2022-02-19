var answer,test,num_of_answers,index
var correct=0,wrong=0
let test_number=1
let corrects=['','3', '1', '5', '5', '2', '1', '2', '2', '2', '6', '4', '1', '4', '7', '2', '3','1',
 '6', '5', '8', '4', '4', '7', '6', '4', '7', '7', '3', '2', '8']

let section=document.querySelector('section')

 //adding every sheet on-by-one to html
for (let i=1;i<=30;i++){
    //debugger
    test=document.createElement('div')
    
    answer=document.createElement('img')
    answer.src=`./iq/${i}/test${i}.png`
    answer.alt=''
    answer.className='question'
    test.appendChild(answer)
    
    i<13 ? num_of_answers=6 : num_of_answers=8
    for(let j=1;j<=num_of_answers;j++){
        answer=document.createElement('img')
        answer.src=`./iq/${i}/${i}-${j}.png`
        answer.alt=''
        answer.className='answer'
        test.appendChild(answer)
    }
    
    i==1 ? test.className='test current' : test.className='test'

    document.body.insertBefore(test,section)
    
}

//let tests=document.querySelectorAll('.test')
let answers=document.querySelectorAll('.answer')
let h1=document.querySelector('h1')
document.getElementById('number').innerHTML=test_number

//after clicking on each answer
// answers.forEach(function(index){index.addEventListener('click',function(e){
//     const that = this;
//     correction(e);
//     next_test();
//     console.log(this);
// })})
answers.forEach(index=>index.addEventListener('click',correction))
answers.forEach(index=>index.addEventListener('click',next_test))
//to be ready for the next test
function next_test(){
    let current_test=document.querySelector('.current')
    current_test.classList.remove('current');
    current_test.nextElementSibling.classList.add('current')

    test_number++
    document.getElementById('number').innerHTML=test_number
    if(current_test.nextElementSibling.tagName=='SECTION') {
        h1.classList.add('hidden')
        calc_score()
    }
}

//correction of the answer
function correction(){
    //to extract the order of the test class in all classes
    //console.log(this)
    let parent1=this.parentNode.parentNode;
    let test_index= Array.prototype.indexOf.call(parent1.children, this.parentNode);
    //to extract the order of the img tag in all tags in a test
    let parent2=this.parentNode;
    let mySelect= Array.prototype.indexOf.call(parent2.children, this);

    if (mySelect==corrects[test_index]) correct++
    else wrong++
    //console.log(correct,'  ',wrong)
}

//score calculation
function calc_score(){
    let score=Math.floor((correct/30)*130+10)
    let corrects_percentage=Math.floor((correct/30)*100)
    document.getElementById('num_of_corrects').innerHTML=correct
    document.getElementById('num_of_wrongs').innerHTML=wrong
    document.getElementById('corrects_percentage').innerHTML=corrects_percentage
    document.getElementById('score').innerHTML=score
}