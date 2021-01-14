comobj = { 'cret': '0', 'lret': ''};

DEFINITIONS_types = 
            { 'dp':  
                {   'class': 'define', 
                    'titre': 'Déclarer un élément externe branché sur une broche',
                    'text' : ['Associer', 'à broche' ],
                    'elts' : [ 9, 8, 0, 0, 9, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
            'dv':  
                {   'class': 'define', 
                    'titre': 'Ajouter une variable',
                    'text' : ['Définir', 'valorisé à' ],
                    'elts' : [ 9, 0, 8, 0, 9, 0, 0, 0, 1, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            'av': 
                {   'class': 'action', 
                    'titre': 'Ajouter une action de valorisation',
                    'text' : ['Valoriser', 'à' ],
                    'elts' : [ 9, 0, 0, 2, 9, 0, 0, 0, 1, 1, 2, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            'at': 
                {   'class': 'action',
                    'titre': 'Ajouter une action de temporisation', 
                    'text' : ['Attendre', 's' ],
                    'elts' : [ 9, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            'ac':  
                {   'class': 'action',
                    'titre': 'Ajouter une action de calcul', 
                    'text' : ['Calculer', '=' ],
                    'elts' : [ 9, 0, 0, 2, 9, 0, 0, 0, 1, 1, 2, 2, 3, 3, 1, 1, 1, 2, 2, 3, 3, 0, 0]
            },
            'ae': 
                {   'class': 'define', 
                    'titre': 'Exécuter une fonction',
                    'text' : ['Associer', 'à broche' ],
                    'elts' : [ 9, 8, 0, 0, 9, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
    
            'ci': 
            {   'class': 'define', 
            'titre': 'Ajouter une condition pour exécuter un bloc',
            'text' : ['Associer', 'à broche' ],
            'elts' : [ 9, 8, 0, 0, 9, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
            'ce': 
            {   'class': 'define', 
            'titre': 'Ajouter inverse pour exécuter un bloc',
            'text' : ['Associer', 'à broche' ],
            'elts' : [ 9, 8, 0, 0, 9, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
            'cw':
            {   'class': 'define', 
            'titre': 'Ajouter une boucle pour répéter un bloc',
            'text' : ['Associer', 'à broche' ],
            'elts' : [ 9, 8, 0, 0, 9, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
            'fd': 
            {   'class': 'define', 
            'titre': 'Déclarer une nouvelle fonction',
            'text' : ['Associer', 'à broche' ],
            'elts' : [ 9, 8, 0, 0, 9, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
            'ff': 
            {   'class': 'define', 
            'titre': 'Ajouter fin de fonction',
            'text' : ['Associer', 'à broche' ],
            'elts' : [ 9, 8, 0, 0, 9, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },

            }
TEMPLATE_Ids = ['td_add_txt1', 'td_add_dev1', 'td_add_var0', 'td_add_elt0', 
                'td_add_txt2', 'td_add_opcond', 
                'td_add_pin1', 'td_add_pin2', 
                'td_add_rad_val1', 'td_add_val1',
                'td_add_rad_cst1', 'td_add_cst1', 
                'td_add_rad_elt1', 'td_add_elt1',
                'td_add_opcalc',
                'td_add_rad_val1', 'td_add_val1',
                'td_add_rad_cst1', 'td_add_cst1', 
                'td_add_rad_elt1', 'td_add_elt1'
        ]

CONSTANT_VALUES = [ 'LOW', 'HIGH', 'REVERSE' ]

ELT_EXTERNES_TYPES = {  'LED':    { 'mode': 'O', 'lmode': 'OUTPUT', 'nbpin': 1}, 
                        'BUZZER': { 'mode': 'O', 'lmode': 'OUTPUT', 'nbpin': 1}, 
                        'RELAIS': { 'mode': 'O', 'lmode': 'OUTPUT', 'nbpin': 1},
                        'SERVO' : { 'mode': 'O', 'lmode': 'OUTPUT', 'nbpin': 1}, 
                        'MOTEUR': { 'mode': 'O', 'lmode': 'OUTPUT', 'nbpin': 2}, 
                        'INTER' : { 'mode': 'I', 'lmode': 'INPUT' , 'nbpin': 1},
                        'SONAR' : { 'mode': 'I', 'lmode': 'INPUT' , 'nbpin': 1}
                    }
PIN_AUTHORIZED = {  '2': {'free':true},
                    '3': {'free':true},
                    '4': {'free':true},
                    '5': {'free':true},
                    '6': {'free':true},
                    '7': {'free':true},
                    '8': {'free':true},
                    '9': {'free':true},
                    '10': {'free':true},
                    '11': {'free':true},
                    '12': {'free':true},
                    '13': {'free':true},
                    '14': {'free':true}
                    };
CONDITIONAL_OPE = [ '=', '<>', '<', '<=', '>', '>='];
COMPUTATIONAL_OPE = [ '+', '-', '*', '/'];

elements_defined = {}

function_defined = []

instructions_defined = {
    'init' : [],
    'loop' : [],
    'fct' : []
};

function get_sel_options(trt, valmaj) {
    console.log('get_sel_options   '+trt+'   '+valmaj)
    var output = [];
    _valmaj = valmaj;
    _selected = ''
    if (valmaj == '') _selected = ' selected';
    output.push('<option value=""'+_selected+'></option>');
    // 1. Les types d'elements externes
    if (trt == 1) {
        $.each(ELT_EXTERNES_TYPES, function(key, value) {
            _valmaj = valmaj.substr(0, valmaj.indexOf('_'));
            if (_valmaj == key) _selected = ' selected';
            output.push('<option value="'+ key +'"'+_selected+'>'+ key +'</option>');
            _selected = '';
        });
    } else
    // 2. Les elements externes output et variables déclarées
    if (trt == 2) {
        $.each(elements_defined, function(key, value) {
            if (value.mode != 'I') {
                if (_valmaj == key) _selected = ' selected';
                output.push('<option value="'+ key +'"'+_selected+'>'+ key +'</option>');
                _selected = '';
            }
        });
    } else
    // 3. Les types d'elements externes input et variables déclarés
    if (trt == 3) {
        $.each(elements_defined, function(key, value) {
            if (value.mode != 'O') {
                if (_valmaj == key) _selected = ' selected';
                output.push('<option value="'+ key +'"'+_selected+'>'+ key +'</option>');
                _selected = '';
            }
        });
    } else
    // 4. Les pin non utilises
    if (trt == 4) {
        $.each(PIN_AUTHORIZED, function(key, value) {
            if (value.free || valmaj == key) {
                if (valmaj == key) _selected = ' selected';
                output.push('<option value="'+ key +'"'+_selected+'>'+ key +'</option>');
                _selected = '';
            }
        });
    } else
    // 5. Les operateurs de condition
    if (trt == 5) {
        $.each(CONDITIONAL_OPE, function(key, value) {
            if (valmaj == value) _selected = ' selected';
            output.push('<option value="'+ value +'"'+_selected+'>'+ value +'</option>');
            _selected = '';
        });
    } 
    // 6. Les operateurs de calcul
    if (trt == 6) {
        $.each(COMPUTATIONAL_OPE, function(key, value) {
            if (valmaj == value) _selected = ' selected';
            output.push('<option value="'+ value +'"'+_selected+'>'+ value +'</option>');
            _selected = '';
        });
    } 
    // 7. Tous les elements connus
    if (trt == 7) {
        $.each(elements_defined, function(key, value) {
            if (valmaj == value) _selected = ' selected';
            output.push('<option value="'+ value +'"'+_selected+'>'+ value +'</option>');
            _selected = '';
        });
    } 
    // 8. Les fonctions connues
    if (trt == 8) {
        $.each(function_defined, function(key, value) {
            if (valmaj == value) _selected = ' selected';
            output.push('<option value="'+ value +'"'+_selected+'>'+ value +'</option>');
            _selected = '';
        });
    } 
    // 9. Les constantes connues
    if (trt == 9) {
        $.each(CONSTANT_VALUES, function(key, value) {
            if (valmaj == value) _selected = ' selected';
            output.push('<option value="'+ value +'"'+_selected+'>'+ value +'</option>');
            _selected = '';
        });
    } 

    return output.join('');
}

function set_sel_number(sel_typ, sel_num, valmaj) {
    var _telt = $('#'+sel_typ).val();
    var output = [];
    if (valmaj == '') _selected = ' selected';
    else _valmaj = valmaj.substr(valmaj.indexOf('_')+1);
    for (i=1; i<10; i++) {
        if (! elements_defined.hasOwnProperty(_telt+'_'+i) || _valmaj == i ) {
            if (_valmaj == i) _selected = ' selected';
            output.push('<option value="'+ i +'"'+_selected+'>'+ i +'</option>');
            _selected = '';
        }
    }
    $('#'+sel_num).html(output.join(''));
}

function aff_spanelt(idsel) {
    //console.log($('#span_'+idsel+'_val').html())
    $('#span_'+idsel+'_val').hide();
    $('#span_'+idsel+'_cst').hide();
    $('#span_'+idsel+'_elt').hide();
    $('#span_'+idsel+'_'+$('#sel_'+idsel).val()).show();
}

function add(type, section, idelt) {
    console.log('add   '+type+'   '+section+'   '+idelt);
    $('#add_dp').hide();
    $('#add_dv').hide();
    $('#add_av').hide();
    $('#add_at').hide();
    $('#add_ac').hide();
    $('#add_ae').hide();
    $('#add_ci').hide();
    $('#add_ce').hide();
    $('#add_cw').hide();
    $('#add_fd').hide();
    $('#add_ff').hide();
    $('#maj_section').val(section);
    $('#maj_idins').val(idelt);
    if (idelt != null) {
        console.log('Modif existant '+idelt);
        _inst = instructions_defined[section][idelt];
        _type = _inst.tins;
        _maj = true;
    } else {
        console.log('Creation nouveau '+type);
        _inst = {'tins': type,
        'elt'  : '',
        'telt1' : '',
        'telt2' : '',
        'elt1' : '',
        'elt2' : '',
        'ope'  : '',
        'pin'  : '',
        'pin_mode' : '',
        'fct'  : '',
        'nbarg': 0 ,
        'block': false            
                };
        _type = type;
        _maj = false;
        $('#maj_idins').val('');
    }
    $('#add_type').val(_type);

    // type, numero et pin pout define pin
    $('#add_title').html(DEFINITIONS_types[_type].titre);
    if (_type == "dp") {
        $('#add_telt_'+_type).html(get_sel_options(1, _inst.elt));
        set_sel_number('add_telt_'+_type, 'add_idelt_'+_type, _inst.elt);
        $('#add_pin_'+_type).html(get_sel_options(4, _inst.pin));
    }
    // Element sel en maj
    if (_type == "ci" || _type == "cw")
        $('#add_elt_'+_type).html(get_sel_options(3, _inst.elt));
    // Element input
    else if (_type == "dv")
        $('#add_elt_'+_type).val(_inst.elt);
    // Element ouput
    else 
        $('#add_elt_'+_type).html(get_sel_options(2, _inst.elt));
    // Fonction
    if (_type == "ae")
        $('#add_fct_'+_type).html(get_sel_options(8, _inst.fct));
    if (_type == "fd")
        $('#add_fct_'+_type).val(_inst.fct);
    // Operateur
    console.log('_type  '+_type+"   ope  "+_inst.ope)
    if (_type == "ac")
        $('#add_ope_'+_type).html(get_sel_options(6, _inst.ope));
    else  if (_type == "ci" || _type == "cw") {
        $('#add_ope_'+_type).html(get_sel_options(5, _inst.ope));
        console.log('_type  '+_type+"valo   ope  "+_inst.ope+"   "+get_sel_options(5, _inst.ope))
    }
    // Elements en lect
    if (_inst.telt1 == 'val') $('#add_elt1_'+_type+'_val').val(_inst.elt1);
    else $('#add_elt1_'+_type+'_val').val('');

    if (_inst.telt1 == 'cst') $('#add_elt1_'+_type+'_cst').html(get_sel_options(9, _inst.elt1));
    else $('#add_elt1_'+_type+'_cst').html(get_sel_options(9, ''));

    if (_inst.telt1 == 'elt') $('#add_elt1_'+_type+'_elt').html(get_sel_options(3, _inst.elt1));
    else  $('#add_elt1_'+_type+'_elt').html(get_sel_options(3, ''));

    $('#sel_elt1_'+_type+' option[value="'+_inst.telt1+'"]').prop('selected', true);
    aff_spanelt('elt1_'+_type);
    
    if (_inst.telt2 == 'val') $('#add_elt2_'+_type+'_val').val(_inst.elt2);
    else $('#add_elt2_'+_type+'_val').val('');

    if (_inst.telt2 == 'cst') $('#add_elt2_'+_type+'_cst').html(get_sel_options(9, _inst.elt2));
    else $('#add_elt2_'+_type+'_cst').html(get_sel_options(9, ''));

    if (_inst.telt2 == 'elt')  $('#add_elt2_'+_type+'_elt').html(get_sel_options(2, _inst.elt2));
    else  $('#add_elt2_'+_type+'_elt').html(get_sel_options(3, ''));

    $('#sel_elt2_'+_type+' option[value="'+_inst.telt2+'"]').prop('selected', true);
    aff_spanelt('elt2_'+_type);

    console.log('show : '+'#add_'+_type);
    $('#add_'+_type).show();
    $('#addelt').modal('show');
}

function add_maj() {
    _sect = $('#maj_section').val();
    _type = $('#add_type').val();
    _maj_section = $('#maj_section').val();
    _maj_idins = $('#maj_idins').val();
    console.log('add_maj   '+_type+'   '+_sect+'   '+_maj_section+'   '+_maj_idins);
    _inst = {'tins': _type,
    'elt'  : '',
    'telt1' : '',
    'telt2' : '',
    'elt1' : '',
    'elt2' : '',
    'ope'  : '',
    'pin'  : '',
    'pin_mode' : '',
    'fct'  : '',
    'nbarg': 0 ,
    'block': false            
   };

    if (_type =='dp') {
        _device = $('#add_telt_dp').val();
        _inst.elt = _device+'_'+$('#add_idelt_dp').val();
        _inst.pin = $('#add_pin_dp').val();
        _inst.pin_mode = ELT_EXTERNES_TYPES[_device].lmode;
        if (_maj_idins == '' ) {
            elements_defined[_inst.elt] = {};
            elements_defined[_inst.elt].mode = ELT_EXTERNES_TYPES[$('#add_telt_dp').val()].mode;
            PIN_AUTHORIZED[_inst.pin].free = false;
        } else
        if (instructions_defined[_maj_section][_maj_idins].elt != _inst.elt ) {
            console.log('modif dp : '+_inst.elt+'  delete : '+instructions_defined[_maj_section][_maj_idins].elt);
            delete elements_defined[instructions_defined[_maj_section][_maj_idins].elt];
            elements_defined[_inst.elt] = {};
            elements_defined[_inst.elt].mode = ELT_EXTERNES_TYPES[$('#add_telt_dp').val()].mode;
            PIN_AUTHORIZED[_inst.pin].free = false;
        } else
        if (instructions_defined[_maj_section][_maj_idins].pin != _inst.pin ) {
            console.log('modif dp pin : '+_inst.pin+'  liberer : '+instructions_defined[_maj_section][_maj_idins].pin);
            PIN_AUTHORIZED[instructions_defined[_maj_section][_maj_idins].pin].free = false;
            PIN_AUTHORIZED[_inst.pin].free = false;
        } 

    } else {
        _inst.elt = $('#add_elt_'+_type).val();
        console.log('#sel_elt1_'+_type);
        _inst.telt1 = $('#sel_elt1_'+_type).val();
        _inst.elt1 = $('#add_elt1_'+_type+'_'+_inst.telt1).val();
        console.log('_inst.telt1  '+_inst.telt1+'   _inst.elt1   '+_inst.elt1);
        _inst.telt2 = $('#sel_elt2_'+_type).val();
        _inst.elt2 = $('#add_elt2_'+_type+'_'+_inst.telt2).val();
         _inst.ope = $('#add_ope_'+_type).val();
        _inst.fct  = $('#add_fct_'+_type).val();
        if (_type == 'dv') {
            if (_maj_idins == '' ) {
                elements_defined[_inst.elt] = {};
                elements_defined[_inst.elt].mode= 'IO';
            } else
            if (instructions_defined[_maj_section][_maj_idins].elt != _inst.elt ) {
                console.log('modif dv : '+_inst.elt+'  delete : '+instructions_defined[_maj_section][_maj_idins].elt);
                delete elements_defined[instructions_defined[_maj_section][_maj_idins].elt];
                elements_defined[_inst.elt] = {};
                elements_defined[_inst.elt].mode= 'IO';
            }
        } else
        if (_type =='fd') {
            if (_maj_idins == '' ) {
                function_defined.push(_inst.fct);
            } else
            if (instructions_defined[_maj_section][_maj_idins].fct != _inst.fct ) {
                console.log('modif fd : '+_inst.fct+'  delete : '+instructions_defined[_maj_section][_maj_idins].fct);
                remove_fonction(instructions_defined[_maj_section][_maj_idins].fct);
                function_defined.push(_inst.fct);
            }
        }
    }

    // Impact instruction modif ou creation
    if (_maj_idins == '')
        instructions_defined[_sect].push(_inst);
    else {
        drop_ktarget = _maj_idins;
        instructions_defined[_sect][_maj_idins] = _inst;
    }

    console.log('positionner nouveau : '+drag_korigin+'   '+drop_ktarget);
    if (drag_korigin == -1) {
        drag_korigin = instructions_defined[_sect].length -1; 
        drag_sect = _sect;
        drop_ktarget += 1;
    }

    console.log('Poser block   '+_sect+'   '+_inst.tins.substr(0,1)+'   '+drop_ktarget);
    if (_inst.tins.substr(0,1) != 'c' && drop_ktarget > 0) {
        _prec = instructions_defined[_sect][drop_ktarget-1];
        console.log('Poser block   '+_prec.tins.substr(0,1)+'   '+_prec.block);
        if ( _prec.tins.substr(0,1) == 'c' || _prec.block )
            _inst.block = true;
    }
    
    if (drop_ktarget > -1 && drag_korigin > -2 && drag_korigin != drop_ktarget) {
        move_elt(drag_sect, drag_korigin, drop_sect, drop_ktarget);
    }
    drag_korigin = -2;
    redraw();
    $('#addelt').modal('hide');
}

function add_arg_fd() {
    _prec = $('#add_zarg_fd').html();
    console.log('add_arg_fd  /'+_prec+'/');
    if (_prec == '') $('#add_zarg_fd').html(' <span class="value"> &nbsp &nbsp &nbsp </span> ');
    else $('#add_zarg_fd').html(_prec+', <span class="value"> &nbsp &nbsp &nbsp </span> ');
    $('#add_nbarg_fd').val($('#add_nbarg_fd')+1);
    console.log('add_arg_fd  /'+$('#add_zarg_fd').html()+'/   '+$('#add_nbarg_fd').val());
}

function redraw_section(section) {

    var output = [];

    $.each(instructions_defined[section], function(key, value) {
        output.push('<div class="divins" id="divins_'+section+'_'+key+'"');
        output.push(' draggable="true" ondragstart="drag(event, \''+value.tins+'\', \''+section+'\', '+key+')"');
        output.push(' ondrop="drop(event, \''+section+'\', '+key+')" ondragover="allowDrop(event, \''+section+'\')">');
        if (value.tins.substr(0,1) != 'f' && section == 'fct')
            output.push('<span class="fct tab1"> </span>');
        if (value.block)
            output.push('<span class="cond tab1"> </span>');
        if (value.tins == "dp") {
            output.push('<span class="declare" onclick="add(\'\', \''+section+'\', '+key+')"> Associer <span class="elemt">');
            output.push(value.elt);
            output.push('</span> &agrave; broche <span class="pin"> ');
            output.push(value.pin); 
            output.push(' </span></span>');
        } else
        if (value.tins == "dv") {
            output.push('<span class="declare"onclick="add(\'\', \''+section+'\', '+key+')"> Définir <span class="elemt">');
            output.push(value.elt);
            output.push('</span> valorisé &agrave; ');
            if (value.telt1 == 'elt')  output.push('<span class="elemt"> '+value.elt1+' </span>'); 
            else  output.push('<span class="value"> '+value.elt1+' </span>');
            output.push('</span>');
        } else
        if (value.tins == "av") {
            output.push('<span class="action"onclick="add(\'\', \''+section+'\', '+key+')"> Valoriser <span class="elemt"> ');
            output.push(value.elt);
            output.push(' </span> &nbsp &agrave; ');
            if (value.telt1 == 'elt')  output.push('<span class="elemt"> '+value.elt1+' </span>'); 
            else  output.push('<span class="value"> '+value.elt1+' </span>');
            output.push(' </span>');
        } else
        if (value.tins == "at") {
            output.push('<span class="action"onclick="add(\'\', \''+section+'\', '+key+')"> Attendre ');
            if (value.telt1 == 'elt')  output.push('<span class="elemt"> '+value.elt1+' </span>'); 
            else  output.push('<span class="value"> '+value.elt1+' </span>');
            output.push('  s </span>');
        } else
        if (value.tins == "ac") {
            output.push('<span class="action"onclick="add(\'\', \''+section+'\', '+key+')"> Calculer ');
            output.push('<span class="elemt"> '+value.elt+' </span>');
            output.push(' = '); 
            if (value.telt1 == 'elt')  output.push('<span class="elemt"> '+value.elt1+' </span>'); 
            else  output.push('<span class="value"> '+value.elt1+' </span>');
            output.push(value.ope);
            if (value.telt2 == 'elt')  output.push('<span class="elemt"> '+value.elt2+' </span>'); 
            else  output.push('<span class="value"> '+value.elt2+' </span>');
            output.push(' </span>');
        } else
        if (value.tins == "ae") {
            output.push('<span class="action"onclick="add(\'\', \''+section+'\', '+key+')"> Exécuter ');
            output.push('<span class="fct"> '+value.fct+' </span>');
            output.push(' ( '); 
            if (value.nbarg > 0) {
                if (value.telt1 == 'elt')  output.push('<span class="elemt"> '+value.elt1+' </span>'); 
                else  output.push('<span class="value"> '+value.elt1+' </span>');
                    }
            if (value.nbarg > 1) {
                if (value.telt2 == 'elt')  output.push('<span class="elemt"> '+value.elt2+' </span>'); 
                else  output.push('<span class="value"> '+value.elt2+' </span>');
                    }
            output.push(' ) </span>');
        } else
        if (value.tins == "ci") {
            output.push('<span class="cond"onclick="add(\'\', \''+section+'\', '+key+')"> Quand ');
            output.push('<span class="elemt"> '+value.elt+' </span>');
            output.push(value.ope); 
            if (value.telt1 == 'elt')  output.push('<span class="elemt"> '+value.elt1+' </span>'); 
            else  output.push('<span class="value"> '+value.elt1+' </span>');
            output.push(' Faire : </span>');
        } 
        if (value.tins == "cw") {
            output.push('<span class="cond"onclick="add(\'\', \''+section+'\', '+key+')"> Tant que ');
            output.push('<span class="elemt"> '+value.elt+' </span>');
            output.push(value.ope); 
            if (value.telt1 == 'elt')  output.push('<span class="elemt"> '+value.elt1+' </span>'); 
            else  output.push('<span class="value"> '+value.elt1+' </span>');
            output.push(' Faire : </span>');
        } 
        if (value.tins == "ce") {
            output.push('<span class="cond"onclick="add(\'\', \''+section+'\', '+key+')"> Sinon Faire : </span>');
        } else
        if (value.tins == "fd") {
            output.push('<span class="fct"onclick="add(\'\', \''+section+'\', '+key+')"> Fonction ');
            output.push('<span class="fct"> '+value.fct+' </span>');
            output.push(' ( '); 
            if (value.nbarg > 0) {
               output.push(' <span class="value"> &nbsp &nbsp &nbsp  </span>');
            }
            if (value.nbarg > 1) {
                output.push(' <span class="value"> &nbsp &nbsp &nbsp  </span>');
            }
            output.push(' ) </span>');
        } else

        if (value.tins == "ff") {
            output.push('<span class="fct"onclick="add(\'\', \''+section+'\', '+key+')"> Fin fonction </span>');
        } 
       
        _1c = value.tins.substr(0,1);
       if ( _1c != 'c' && _1c != 'f') {
            if (value.block)
                output.push(' <img class="block" src="../img/arrowleft.png" onclick="toggle_block(\''+section+'\', '+key+')"/>');
            else if ( key >0 && (instructions_defined[section][key-1].tins.substr(0,1) == 'c' || instructions_defined[section][key-1].block))
                output.push(' <img class="block" src="../img/arrowright.png" onclick="toggle_block(\''+section+'\', '+key+')"/>');
        }
        output.push('</span>');
        if (value.lerr != '') {
            output.push(' <span class="error" data-toggle="tooltip" title="'+value.lerr+'"><img class="error" src="../img/error.jpg" /></span>');            
        }
        output.push('</div>');
    });
    $('#sect_'+section).html(output.join(''));
}

function redraw(section) {

    verify_instructions();
    redraw_section('init');
    redraw_section('loop');
    redraw_section('fct');
}

function  verify_instructions() {
    $.each(instructions_defined, function(_sect, _instructions) {
        $.each(_instructions, function(_idinst, _inst) {
            _inst.lerr = '';
            if (_inst.elt != '' && typeof _inst.elt !== 'undefined' && ! elements_defined.hasOwnProperty(_inst.elt)) {
                _inst.lerr += _inst.elt + ' : Element non déclaré \n';
            }
            if (_inst.elt1 != '' && typeof _inst.elt1 !== 'undefined' && _inst.telt1 == 'elt' && ! elements_defined.hasOwnProperty(_inst.elt1)) {
                _inst.lerr += _inst.elt1 + ' : Element non déclaré \n';
            }
            if (_inst.elt2 != '' && typeof _inst.elt2 !== 'undefined' && _inst.telt2 == 'elt' && ! elements_defined.hasOwnProperty(_inst.elt2)) {
                _inst.lerr += _inst.elt2 + ' : Element non déclaré \n';
            }
            if (_inst.fct != '' && typeof _inst.fct !== 'undefined' && ! function_defined.includes(_inst.fct)) {
                _inst.lerr += _inst.fct + ' : Fonction non déclarée \n';
            }
        });    
    });
}
function toggle_block(section, idelt) {
    instructions_defined[section][idelt].block = ! instructions_defined[section][idelt].block;
    redraw();
}

function remove_fonction(fct) {
    _new_array = [];
    // Supprimer ancien
    $.each(function_defined, function(key, value) {
        if (value != fct) {
            _new_array.push(value);
        }
    });
    function_defined = _new_array;
}

function move_elt(sect, idelt, sectnew, idnew) {
    console.log('move_elt   '+sect+'   '+idelt+'   '+sectnew+'   '+idnew);
    _elt = instructions_defined[sect][idelt];
    if (sectnew == "suppr") {
        if (_elt.tins == 'dp' && _elt.pin != '') PIN_AUTHORIZED[_elt.pin].free = true;
        if (_elt.tins == 'dp' || _elt.tins == 'dv') {
            console.log('delete elements_defined   '+sect+'   '+idelt+'   '+sectnew+'   '+idnew);
            delete elements_defined[_elt.elt];
        }
        if (_elt.tins == 'fd') {
            console.log('delete function_defined   '+sect+'   '+idelt);
            delete function_defined[_elt.fct];
        }
    }
    _new_array = [];
    // Supprimer ancien
    $.each(instructions_defined[sect], function(key, value) {
        if (key != idelt) {
            _new_array.push(value);
        }
    });
    instructions_defined[sect] = _new_array;
    // Ajouter nouveau si pas poubelle
    if (sectnew != 'suppr') {
        _new_array = [];
        $.each(instructions_defined[sectnew], function(key, value) {
            if (key == idnew) {
                _new_array.push(_elt);
            }
            _new_array.push(value);
        });
        if (idnew > instructions_defined[sectnew].length -1)
            _new_array.push(_elt);
        instructions_defined[sectnew] = _new_array;
    }
}

var drag_tins;
var drag_sect;
var drag_korigin;
var drop_sect;
var drop_ktarget;

function drag(ev, tins, sect, korigin) {
    console.log("drag "+tins+'   '+sect+'   '+korigin);
    drag_tins = tins;
    drag_sect = sect,
    drag_korigin = korigin;
}
function drop(ev, sect, ktarget) {
    console.log('drop  to '+sect+'   '+ktarget);
    if (drag_korigin == -2)
        return;
    if (sect == "suppr") {
        move_elt(drag_sect, drag_korigin, sect, -1);
        redraw();
        return;
    }
    drop_sect = sect;
    drop_ktarget = ktarget;
    ev.preventDefault();
    if (drag_sect != "palette") {
        _inst = instructions_defined[drag_sect][drag_korigin];
        if (_inst.tins.substr(0,1) != 'c' && drop_ktarget > 0) {
            _prec = instructions_defined[drop_sect][drop_ktarget-1];
            if ( _prec.tins.substr(0,1) == 'c' || _prec.block )
                _inst.block = true;
        }
        if (drop_ktarget == -1)
            drop_ktarget = 0;
        move_elt(drag_sect, drag_korigin, drop_sect, drop_ktarget);
        drag_korigin = -2;
        redraw_section();
    
    } else {
        add(drag_tins, sect, null);
    }
    //var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
}
function allowDrop(ev, sect) {
    if (drag_tins == "dp" && sect != "init"  && sect != "trash") return false;
    if ((drag_tins == "fd"  || drag_tins == "fd") && sect != "fct"  && sect != "trash") return false;
    ev.preventDefault();
  }

function initpage() {
    $('#projet_name').val('');
}
function get_projet() {
    comobj = {}
    comobj.projet = {}
    comobj.projet.name = $('#projet_name').val();
    comobj.projet.device = $('#sel_device').val();
    comobj.projet.firmware = $('#sel_firmware').val();
    comobj.projet.port = $('#sel_port').val();
    comobj.projet.instructions = instructions_defined;
    comobj.projet.elements_defined = elements_defined;
    comobj.projet.function_defined = function_defined;
    comobj.projet.PIN_AUTHORIZED = PIN_AUTHORIZED;
    return comobj;
}

function set_projet(comobj) {
    console.log('set_projet  '+comobj.projet.name);
    console.log('set_projet  '+comobj.name);
    $('#projet_name').val(comobj.projet.name);
    $('#sel_device option[value="'+comobj.projet.device+'"]').prop('selected', true);
    $('#sel_firmware option[value="'+comobj.projet.firmware+'"]').prop('selected', true);
    $('#sel_port option[value="'+comobj.projet.port+'"]').prop('selected', true);
    instructions_defined = comobj.projet.instructions;
    elements_defined = comobj.projet.elements_defined;
    function_defined = comobj.projet.function_defined;
    PIN_AUTHORIZED = comobj.projet.PIN_AUTHORIZED;
}
  
function list() {
    comobj = {}
    comobj.projet = {}

    send_cmd('list', comobj);
}
  
function read() {
    comobj = {}
    comobj.projet = {}
    comobj.projet.name = $('#liste_projets').val();
    $('#zliste_projets').modal('hide');
    send_cmd('read', comobj);
}

function save() {
    console.log('projet_name   '+$('#projet_name').val())
    if ($('#projet_name').val() == "") {
        erreur("Vous devez renseigner le nom du projet pour l'enregistrer");
        return;
    }
    send_cmd('save', get_projet());   
}

function run_app() {
    if ($('#sel_device').val() == "" ||$('#sel_firmware').val() == "" ||$('#sel_port').val() == "" ) {
        erreur("Vous devez renseigner les caractéristiques du microcontroleur pour demander le téléversement");
        return;
    }
   send_cmd('run', get_projet());
}

function stop_app() {
    send_cmd('stop', get_projet());
}

function send_cmd(cmd, data) {
    document.body.style.cursor = 'wait';
    var xhr = new XMLHttpRequest();
    var url = "/"+cmd;
    xhr.open("POST", url, true);
    xhr.setRequestHeader('contentType', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            comobj = JSON.parse(this.responseText);
            document.body.style.cursor = 'auto';
            $('#detailerr').show();
            if (comobj.cret != '0') {
                erreur(comobj.lret);
                return;
            }
            if (comobj.cmd == 'list') {
                redraw_list(comobj);
                return;
            }
            if (comobj.cmd == 'read') {
                set_projet(comobj);
                redraw();
            }
            message(comobj.lret);
        }
        if (xhr.readyState === 4 && xhr.status != 200) {
            document.body.style.cursor = 'auto';
            erreur('Erreur technique : Le serveur n\'est pas disponible ...');
        }
    };
    data.cmd = cmd;
    xhr.send(JSON.stringify(data));
}

function redraw_list(comobj) {
    var output = [];
    $.each(comobj.projets, function(key, value) {
       output.push('<option value="'+ value +'">'+ value +'</option>');
    });
    $('#liste_projets').html(output.join(''));
    $('#zliste_projets').modal('show');
}

function erreur(msg) {
    $('#lerr').html(msg);
    $('#zmsg').hide();
    $('#zerr').show();
    $('#detailerr').hide();
    if (comobj.logerr != '') {
        $('#detailerr').html(comobj.logerr);
        $('#detailerr').show();
    } else {
        setTimeout(function () { $("#message").modal("hide"); }, 2000);
    }
    $('#message').modal('show');
}

function message(msg) {
    $('#lmsg').html(msg);
    $('#zmsg').show();
    $('#zerr').hide();
    $('#detailerr').hide();
    $('#message').modal('show');
    setTimeout(function () { $("#message").modal("hide"); }, 2000);
}
