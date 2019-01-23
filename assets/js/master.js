
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
                     '%cBienvenido seas a mi pagina web personal, pasa y siéntete libre de explorar cada rincón. Que nada te impida contactar conmigo en caso de dudas o consultas, estoy a tu disposición. Muchas gracias por estar aquí y Happy Coding!' +
                     '%c-Günther';
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
      this.paintBackground(sec);
      this.viewCuerpo(this, sec);
      // this.viewSection(sec);
    }else if(!this.home && sec == 'home'){
      this.viewHome();
    }else if (!this.home && sec != 'home') {
      this.paintBackground(sec);
      this.viewSection(sec);
    }
  }

  viewHome(){
    this.home = true;
    this.section = 'home';
    $('.c-section').fadeOut(500,function(){
      $('.skw-cont').animate({left:'150vw'},1500)
    });
    $('.mm-selected').removeClass('mm-selected')
    $('#mmHome').addClass('mm-selected')
    $('.menues-backbar').css('background', 'transparent')
  }

  viewCuerpo(obj = false, sec=false){
    this.home = false;
    $('.skw-cont').animate({left:'-50vw'},1500,function(){
      if($('l-cuerpo').css('display') == 'none')
        $('.l-cuerpo').fadeIn(1000);
        $('.menues-backbar').css('background', '#000')
        if(obj && sec)
          obj.viewSection(sec)
    })
  }

  viewSection(sec){
    let newSection = '.c-' + sec;
    let newSectionId = '#mm' + sec.charAt(0).toUpperCase() + sec.slice(1);
    $('.c-section').hide();
    $(newSection).fadeIn(500);

    $('.mm-selected').removeClass('mm-selected')
    $(newSectionId).addClass('mm-selected')
    this.section = sec;
  }

  paintBackground(sec){
    if(sec == 'contact')
      $('.skw-cont').css('background', '#fafafa')
    else
      $('.skw-cont').css('background', 'rgba(0, 0, 0, 0.2)')
  }
}

//////////////////////

class FolioHandler{
  constructor(tabla, dir){
    this.tabla = $(tabla);
    this.dir   = dir;
    this.json  = [];
    // $(this.tabla).html('')
  }

  obtenerData(){
    jQuery.getJSON(this.dir, function(data){
      this.json = jQuery.parseJSON(data)
    })
  }

  crearElemento(obj){
    if(obj){
      if(obj['img'])
        var img = $('<img>',{src:obj['img']});

      var h3   = $('<h3>',{class:'ele-title'}).html(obj['titulo']);
      var p    = $('<p>',{class:'ele-desc'}).html(obj['desc']);
      var span = $('<span>',{class:'ele-leng'}).html(obj['lenguaje']);
      var verb = $('<div>',{class:'ele-verb'}).append(h3, p, span);
      var elem = $('<a>',{href:obj['link'], class:'fl-ele ele-t' + obj['tier']}).attr('data-categoria', obj['categoria']);
      if(img)
        $(elem).append(img)
      $(elem).append(verb)
    }
    return elem
  }

  cargarTabla(){
    this.obtenerData();
    var ele;
    for(ele in this.json){
      $(this.tabla).append(this.crearElemento(this.json[ele]));
    }
  }

  buscarTabla(){
    var search = $('#flSearch').val().toLowerCase()
    $('.fl-ele').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(search) > -1)
    });
  }

  filtrarTabla(){
    var search = $('#flSelect').val()

    if((search != 'cTodo') && search){
      $('.fl-ele').hide()
      $('.fl-ele[data-categoria="' +search+ '"]').show()
    }else if(search == 'cTodo'){
      $('.fl-ele').show()
    }else{
      $('.fl-ele').hide()
    }
  }
}

//READY DOCUMENT SECTION

$(document).ready(function(){
  var vHandler = new ViewHandler();
  var fHandler = new FolioHandler('#flDisplay', 'https://gtr487.github.io/data/page/cv.json')

  console.log(logMess, styMessTitle, styMess, styMessFoot)
  // fHandler.cargarTabla()
  // fHandler.ordenartabla()


  $('.verbose').hide();
  $('.c-section').hide();
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

  $('.link-contact').on('click', function(e){
    vHandler.view('contact')
  })

  $('#flSearch').keyup(function(e){
    fHandler.buscarTabla()
  })

  $('#flSelect').change(function(e){
    fHandler.filtrarTabla()
  })

});


//FUNCTIONS
