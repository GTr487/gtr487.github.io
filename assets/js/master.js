
/* ################################################### */
/*
*  [ @Master ] - Personal Page (alpha 0.1)
*    Author: Gunther Molina
*    Modificacion:
*        09/01/19 - [/alpha]
*/
/* ################################################### */

//CONSTANTS
const AJAX_DIR = '';

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
    $('.mm-menu ul li a').addClass('grabado').removeClass('mm-hover-box')
    $('.social i').addClass('grabado')
    $('.mm-selected').addClass('mm-selected-resp')
  }

  viewCuerpo(obj = false, sec=false){
    this.home = false;
    $('.skw-cont').animate({left:'-50vw'},1500,function(){
      if($('l-cuerpo').css('display') == 'none')
        $('.l-cuerpo').fadeIn(1000);
        $('.menues-backbar').css('background', '#000')
        $('.mm-menu ul li a').removeClass('grabado').addClass('mm-hover-box')
        $('.social i').removeClass('grabado')
        $('.mm-selected').removeClass('mm-selected-resp')
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
    $(this.tabla).html('')
  }

  obtenerData(){
    var jsonRes
      try{
        jQuery.getJSON(this.dir, function(data){
          this.json = jQuery.parseJSON(data)})
              .fail(this.getFolioError())
          }catch(err){console.log('Error de portafolio')}

    // })
    // this.json = [{
    //   "titulo":"primer articulo",
    //   "desc":"esto es un texto de prueba",
    //   "lenguaje":"Python",
    //   "img": false,
    //   "link":"#primer",
    //   "categoria":"practica"
    // },{
    //   "titulo":"segundo articulo",
    //   "desc":"esto es una prueba2",
    //   "lenguaje":"Javascript",
    //   "img": false,
    //   "link":"#segundo",
    //   "categoria":"challenge"
    // },{
    //   "titulo":"tercer",
    //   "desc":"desc desc desc",
    //   "lenguaje":"Java",
    //   "img": 'assets/img/example.png',
    //   "link":"#tercero",
    //   "categoria":"trabajo"
    // },{
    //   "titulo":"cuarto",
    //   "desc":"desc dessssc desc",
    //   "lenguaje":"Php",
    //   "img": false,
    //   "link":"#cuarto",
    //   "categoria":"codecamp"
    // },{
    //   "titulo":"tercer",
    //   "desc":"desc desc desc",
    //   "lenguaje":"Bash",
    //   "img": false,
    //   "link":"#tercero",
    //   "categoria":"varios"
    // }];
  }

  crearElemento(obj){
    if(obj){
      var tier = '2';
      // if(obj['img']){
      //   var img = $('<img>',{src:obj['img']});
      //   tier = '1';
      // }

      var icon = $('<i>',{class:this.getIconClass(obj['categoria'])});
      var anc  = $('<a>',{href:obj['link'], class:'ele-title'}).html(obj['titulo']);
      var cab  = $('<div>',{class:'ele-cab'}).append(icon, anc);

      var desc = $('<p>',{class:'ele-desc'}).html(obj['desc']);

      var lCol = $('<span>',{class:'ele-leng-color'}).css('background', this.getLenguajeColor(obj['lenguaje']));
      var lNam = $('<span>',{class:'ele-leng-name'}).html(obj['lenguaje']);
      var leng = $('<p>',{class:'ele-leng'}).append(lCol, lNam);

      var verb = $('<div>',{class:'ele-verb'}).append(cab, desc, leng);
      var elem = $('<div>',{class:'fl-ele ele-t' + tier}).attr('data-categoria', obj['categoria']);

      $(elem).append(verb)
      // if(img)
      //   $(elem).append(img)
    }
    return elem
  }

  getIconClass(val){
    var icoClass = '';
    switch (val){
      case 'trabajo':
        icoClass = 'fas fa-code';
        break;
      case 'codecamp':
        icoClass = 'fab fa-free-code-camp';
        break;
      case 'practica':
        icoClass = 'fas fa-book';
        break;
      case 'challenge':
        icoClass = 'fas fa-medal';
        break;
      case 'varios':
        icoClass = 'fas fa-ellipsis-h';
        break;
    }
    icoClass += ' ele-icon'
    return icoClass;
  }

  getLenguajeColor(lenguaje){
    switch (lenguaje) {
      case 'Python':
        return '#F7C037';
        break;
      case 'Java':
        return '#E42C2E';
        break;
      case 'Javascript':
        return '#EFD81D';
        break;
      case 'Php':
        return '#7478AF';
        break;
      case 'Bash':
        return '#000000';
        break;
      case 'Error':
        return 'transparent';
        break;
    }
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

    if((search != 'todo') && search){
      $('.fl-ele').hide()
      $('.fl-ele[data-categoria="' +search+ '"]').show()
    }else if(search == 'todo'){
      $('.fl-ele').show()
    }else{
      $('.fl-ele').hide()
    }
  }

  getFolioError(){
    console.error('ERROR AL CARGAR EL PORTAFOLIO', 'Peticion Ajax fallida');
    this.json = [{
                  "titulo":"Error",
                  "desc":"Ocurrio un error al cargar el contenido",
                  "lenguaje":"Error",
                  "link":"#",
                  "categoria":"varios"}];
  }
}

//READY DOCUMENT SECTION

$(document).ready(function(){
  var vHandler = new ViewHandler();
  var fHandler = new FolioHandler('#flDisplay', AJAX_DIR)

  console.log(logMess, styMessTitle, styMess, styMessFoot)
  fHandler.cargarTabla()


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

  $('#viewPortafolio').on('click',function(e){
    vHandler.view('folio')
  })
  // $(window).resize(function(){
  //
  //        if ($('header').width() >= 1366 ){
  //           console.log('>1366')
  //        }else{console.log('<1366')}
  //
  // });
});


//FUNCTIONS
