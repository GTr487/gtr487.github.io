
/* ################################################### */
/*
*  [ @Master ] - Personal Page (alpha 0.1)
*    Author: Gunther Molina
*    Modificacion:
*        09/01/19 - [/alpha]
*/
/* ################################################### */

//LOG MESSAGE

const emRobot= String.fromCodePoint(0x1F916)

const logMess      = '%c' + emRobot + ' Hola!' +
                     '\n%cBienvenido seas a mi pagina web personal, pasa y siéntete libre de explorar cada rincón. Que nada te impida contactar conmigo en caso de dudas o consultas, estoy a tu disposición. Muchas gracias por estar aquí y \nHappy Coding!' +
                     '\n%c-Günther';
const styMessTitle = ['color: #fff',
                     'font-weight: bold',
                     'background: #000',
                     'font-size:1.3em',
                     'padding: .5em 1em'].join(';');

const styMess   = ['color: black',
                     'background: #fafafa',
                     'font-size:1.1em',
                     'padding: .5em 1em',
                     'border: 1px solid #bbb'].join(';');

const styMessFoot  = ['color: white',
                     'background: black',
                     'font-size:1em',
                     'padding: .2em 1em',
                     'font-weight: bold'].join(';');


//CLASSES
class ViewHandler {
  constructor(){
    this.section  = 'home';
    this.home     = true;
  }

  view(sec){
    if(sec == this.section)
      return;

    $('#mm-toggle').prop('checked', false)

    if (this.home && sec != 'home'){
      this.viewCuerpo();
      this.viewSection(sec);
    }else if(!this.home && sec == 'home'){
      this.viewHome();
    }else if (!this.home && sec != 'home') {
      this.viewSection(sec);
    }
  }

  viewHome(){
    this.home = true;
    this.section = 'home';
    $('.skw-cont').animate({left:'150vw'},1500)
    $('.mm-selected').removeClass('mm-selected')
    $('#mmHome').addClass('mm-selected')
  }

  viewCuerpo(){
    this.home = false;
    $('.skw-cont').animate({left:'-50vw'},1500,function(){
      if($('l-cuerpo').css('display') == 'none')
        $('.l-cuerpo').fadeIn(1000);
    })
  }

  viewSection(sec){
    let newSection = '.c-' + sec;
    let newSectionId = '#mm' + sec.charAt(0).toUpperCase() + sec.slice(1);
    $('.c-section').hide();
    $(newSection).show();

    $('.mm-selected').removeClass('mm-selected')
    $(newSectionId).addClass('mm-selected')
    this.section = sec;

  }

}

//READY DOCUMENT SECTION

$(document).ready(function(){
  var vHandler = new ViewHandler();
  console.log(logMess, styMessTitle, styMess, styMessFoot)

  $('.verbose').hide();
  $('.c-about').hide();
  logoWidth   = $('.backlogo').css('width')
  logoHeight  = $('.backlogo').css('height')
  $('.backlogo').hide()
             .css('height','60vmin')
             .css('width', '60vmin')
             .fadeIn(1000,function(){
                $(this).animate({height:logoHeight, width:logoWidth}, 1000, function(){
                  $('.verbose').slideDown();
                });
              });

  //Listeners
  $('.mm-menu ul li a').on('click', function(e){
    e.preventDefault()
    if(!$(e.target).attr('data-target'))
      return;

    let section = $(e.target).attr('data-target');
    vHandler.view(section);
  })

  $('#vb-contact').on('click', function(e){
    vHandler.view('contact')
  })
});
