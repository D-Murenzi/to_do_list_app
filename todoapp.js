import {task} from '/taskModel.js';

const width =  window.innerWidth;
const height = window.innerHeight;

const header = document.querySelector('header');
const section = header.querySelector('section');
const division = header.querySelector(':scope > div');

const butsection = section.cloneNode(true);
const butdivision = division.cloneNode(true);

/*setting the butholder elements.*/
const butholder = document.getElementById('butholder');

butholder.appendChild(butsection);
butholder.appendChild(butdivision);
butholder.style.cssText = 'height:100px; padding:10px;';


/*setting the elements depending on the screen size.*/

widthAdjuster();

/*listening to the change in screen.*/

window.addEventListener('resize', (e)=>{
    console.log(`Hey this event was fired:{e}`);
    console.log(window.innerWidth);
});

window.addEventListener('resize', widthAdjuster);

/*defining the width adjuster function */

function widthAdjuster() {
    if ( window.innerWidth <= 768 ) {
	butholder.style.display = 'block';
	if (butholder.style.display !== 'none'){
	    section.style.display = 'none';
	    division.style.display='none';
	}
	else {
	    section.style.display = 'block';
	    division.style.display='block';
	}
    }
    else {
	butholder.style.display = 'none';
	console.log('hey, the event was fired and I am going to reload the page.');
	if (butholder.style.display === 'none'){
	    console.log('i did it');
	    section.style.display = 'block';
	    division.style.display = 'block';
	    butholder.style.display = 'none';
	}
	else {
	    section.style.display = 'none';
	    division.style.display='none';
	}
    }
}
