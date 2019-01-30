
/* ################################################### */
/*
*  [ @Master ] - Personal Page (v1.0)
*    Author: Gunther Molina
*    Modificacion:
*        09/01/19 - [/alpha]
*        30/01/19 - [/v1.0]
*/
/* ################################################### */

//CONSTANTS
const AJAX_DIR = 'https://gtr487.github.io/data/page/folio.json';

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
  }

  obtenerData(callback){
    var self = this;
      try{
        jQuery.getJSON(self.dir, function(data){
          self.actualizarFreelance(data['freelance']);
          self.json = data['folio'];
        })
        .then(callback, () => {
          self.getFolioError(
            {title:'ERROR EN CONSULTA AJAX', desc:'No se pudo realizar la consulta con exito.'}, callback
          )
        })
        }catch(err){}
  }

  actualizarFreelance(val){
    if(val){
      $('#abt-freelance').show()
    }else{
      $('#abt-freelance').hide()
    }
  }

  crearElemento(obj){
    if(obj){
      var tier = '2';

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
      case 'Html':
        return '#E34C26';
        break;
      case 'Error':
        return 'transparent';
        break;
    }
  }

  cargarTabla(){
    $(this.tabla).html('')
    var self = this;
    var t_json = [{"titulo":"CARGANDO CONTENIDO",
                  "desc":"Si estas leyendo este mensaje, tranquilo, se esta cargando el conteido",
                  "lenguaje":"Bash",
                  "link":"#",
                  "categoria":"varios"}];
    $(self.tabla).append(self.crearElemento(t_json));

    this.obtenerData(function(){
      $(self.tabla).html('')
      var ele;
      for(ele in self.json){
        $(self.tabla).append(self.crearElemento(self.json[ele]));
      }
    });
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

  getFolioError(err, callback){
    console.error(err['title'] + '\n', err['desc'] );
    this.json = [{"titulo":err['title'],
                  "desc":err['desc'],
                  "lenguaje":"Error",
                  "link":"#",
                  "categoria":"varios"}];

    callback();
  }
}

//////////////////////

class MessageHandler{
    constructor(){
      if(window.location.search.substring(1).length > 0){
        if(this.getTnksMessage()){
          this.crearModal();
        }
      }

    }

    crearModal(){
      var title = $('<h3>', {class:'modal-title'}).html(this.title);
      var verb  = $('<p>', {class:'modal-verbose'}).html(this.msg);
      var btn   = $('<button>', {class:'btn modal-btn'}).html('ACEPTAR')

      var win = $('<div>', {class:'modal-window'}).append(title, verb, btn)
      var back  = $('<div>', {class:'modal-background'}).append(win)

      $('.cont').append(back)

      $(back).find('.modal-btn').on('click', function(){
        $(back).remove()
        window.location.replace('index.html')
      })
    }

    getTnksMessage(){
      if(this.getURLValue('msg_ID') == 'tnksContact'){
        this.title = 'GRACIAS!';
        this.msg  = 'Mensaje enviado con éxito, pronto me estaré comunicando con usted!'
        return true;
      }
      return false;
    }

    getURLValue(key){
      var res = false;
      var arrQuery = window.location.search.substring(1).split('&');
      arrQuery.forEach(function(palabra){
        var par = palabra.split('=');
        if(par[0] == key)
          res = par[1];
      })
      return res;

    }
}

//READY DOCUMENT SECTION

$(document).ready(function(){
  console.log(logMess, styMessTitle, styMess, styMessFoot)
  var vHandler   = new ViewHandler();
  var msgHandler = new MessageHandler();
  var fHandler   = new FolioHandler('#flDisplay', AJAX_DIR)

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
});


//FUNCTIONS
