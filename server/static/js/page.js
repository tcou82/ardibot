
ELT_EXTERNES_TYPES = {  'LED': { 'mode': 'O', 'lmode': 'OUTPUT'}, 
                        'BUZZER': { 'mode': 'O', 'lmode': 'OUTPUT'}, 
                        'RELAIS': { 'mode': 'O', 'lmode': 'OUTPUT'},
                        'SERVO' : { 'mode': 'O', 'lmode': 'OUTPUT'}, 
                        'MOTEUR': { 'mode': 'O', 'lmode': 'OUTPUT'}, 
                        'INTER' : { 'mode': 'I', 'lmode': 'INPUT'},
                        'SONAR' : { 'mode': 'I', 'lmode': 'INPUT'}
                    }
PIN_AUTHORIZED = {  '3': {'free':true},
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
CONDITIONAL_OPE = [ '=', '&lt;&gt;', '&lt', '&lt=', '&gt', '&gt='];
COMPUTATIONAL_OPE = [ '+', '-', '*', '/', 'mod'];

elements_defined = {}

function_defined = {}

instructions_defined = {
    'fct' : [],
    'init' : [],
    'loop' : []
}

function get_sel_options(trt, valmaj) {
    console.log('get_sel_options   '+trt+'   '+valmaj)
    var output = [];
    _valmaj = valmaj;
    _selected = ''
    if (valmaj == '') _selected = ' selected';
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
    if (trt == 6) {
        $.each(elements_defined, function(key, value) {
            if (valmaj == value) _selected = ' selected';
            output.push('<option value="'+ value +'"'+_selected+'>'+ value +'</option>');
            _selected = '';
        });
    } 
    // 8. Les fonctions connues
    if (trt == 6) {
        $.each(function_defined, function(key, value) {
            if (valmaj == value) _selected = ' selected';
            output.push('<option value="'+ value +'"'+_selected+'>'+ value +'</option>');
            _selected = '';
        });
    } 

    return output.join('');
}

function set_sel_number(sel_typ, sel_num, valmaj) {
    _type = $('#'+sel_typ).val();
    var output = [];
    if (valmaj == '') _selected = ' selected';
    else _valmaj = valmaj.substr(valmaj.indexOf('_')+1);
    for (i=1; i<10; i++) {
        if (! elements_defined.hasOwnProperty(_type+'_'+i) || _valmaj == i ) {
            if (_valmaj == i) _selected = ' selected';
            output.push('<option value="'+ i +'"'+_selected+'>'+ i +'</option>');
            _selected = '';
        }
    }
    $('#'+sel_num).html(output.join(''));
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
        console.log('Creation nouveau ');
        _inst = {'tins': type,
             'word1': '',
             'word2': '',
             'word3': '',
             'elt1' : '',
             'elt2' : '',
             'elt3' : '',
             'ope'  : '',
             'val1' : '',
             'val2' : '',
             'val3' : '',
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
    if (_type =='dp') {
        $('#add_title').html('Déclarer un élément externe branché sur une broche');
        $('#add_sel_elt_dp').html(get_sel_options(1, _inst.elt1));
        set_sel_number('add_sel_elt_dp', 'add_sel_id_dp', _inst.elt1);
        $('#add_sel_pin_dp').html(get_sel_options(4, _inst.pin));
        $('#add_dp').show();
    } else
    if (_type =='dv') {
        $('#add_title').html('Ajouter une variable ');
        $('#add_var_dv').val(_inst.elt1)
        $('#add_val_dv').val(_inst.val1)
        $('#add_dv').show();
    } else
    if (_type =='av') {
        $('#add_title').html('Ajouter une action de valorisation');
        $('#add_sel_elt1_av').html(get_sel_options(2, _inst.elt1));
        $('#add_sel_elt2_av').html(get_sel_options(3, _inst.elt2));
        $('#add_val_av').val(_inst.val1)
        $('#add_av').show();
    } else
    if (_type =='at') {
        $('#add_title').html('Ajouter une action de temporisation');
        $('#add_sel_elt1_at').html(get_sel_options(3, _inst.elt1));
        $('#add_val_at').val(_inst.val1)
        $('#add_at').show();
    } else
    if (_type =='ac') {
        $('#add_title').html('Ajouter une action de calcul');
        $('#add_sel_elt1_ac').html(get_sel_options(2, _inst.elt1));
        $('#add_sel_ope_ac').html(get_sel_options(6, _inst.ope));
        $('#add_sel_elt2_ac').html(get_sel_options(3, _inst.elt2));
        $('#add_sel_elt3_ac').html(get_sel_options(3, _inst.elt3));
        $('#add_val_ac').val(_inst.val1);
        $('#add_ac').show();
    } else
    if (_type =='ae') {
        $('#add_title').html('Exécuter une fonction');
        $('#add_sel_fct_ae').html(get_sel_options(2, _inst.elt1));
        $('#add_nbarg_ae').val(0);
        $('#add_zarg_ae').html('');
        $('#add_ae').show();
    } else
    if (_type =='ci') {
        $('#add_title').html('Ajouter une condition pour exécuter un bloc');
        $('#add_sel_elt1_ci').html(get_sel_options(3, _inst.elt1));
        $('#add_sel_ope_ci').html(get_sel_options(5, _inst.ope));
        $('#add_sel_elt2_ci').html(get_sel_options(3, _inst.elt2));
        $('#add_val_ci').val(_inst.val1);
        $('#add_ci').show();
    } else
    if (_type =='ce') {
        $('#add_title').html('Ajouter inverse pour exécuter un bloc');
        $('#add_sel_section').html('<option value="loop" selected>Séquence traitement</option>');
        $('#add_ce').show();
    } else
    if (_type =='cw') {
        $('#add_title').html('Ajouter une boucle pour répéter un bloc');
        $('#add_sel_elt1_cw').html(get_sel_options(3, _inst.elt1));
        $('#add_sel_ope_cw').html(get_sel_options(5, _inst.ope));
        $('#add_sel_elt2_cw').html(get_sel_options(3, _inst.elt2));
        $('#add_val_cw').val(_inst.val1);
        $('#add_cw').show();
    }else
    if (_type =='fd') {
        $('#add_title').html('Déclarer une nouvelle fonction');
        $('#add_fct_fd').val('');
        $('#add_nbarg_fd').val(0);
        $('#add_zarg_fd').html('');
        $('#add_fd').show();
    } else
    if (_type =='ff') {
        $('#add_title').html('Ajouter fin de fonction');
        $('#add_ff').show();
    }
    $('#addelt').modal('show');
}

function add_maj() {
    _sect = $('#maj_section').val();
    _type = $('#add_type').val();
    _maj_section = $('#maj_section').val();
    _maj_idins = $('#maj_idins').val();
    console.log('add_maj   '+_type+'   '+_sect+'   '+_maj_section+'   '+_maj_idins);
    _inst = {'tins': _type,
             'word1': '',
             'word2': '',
             'word3': '',
             'elt1' : '',
             'elt2' : '',
             'elt3' : '',
             'ope'  : '',
             'val1' : '',
             'val2' : '',
             'val3' : '',
             'pin'  : '',
             'pin_mode' : '',
             'fct'  : '',
             'nbarg': 0 ,
             'block': false            
            };

    if (_type =='dp') {
        _device = $('#add_sel_elt_dp').val()
        _inst.elt1 = _device+'_'+$('#add_sel_id_dp').val();
        _inst.pin = $('#add_sel_pin_dp').val();
        _inst.pin_mode = ELT_EXTERNES_TYPES[_device].lmode;
        elements_defined[_inst.elt1] = {};
        elements_defined[_inst.elt1].mode = ELT_EXTERNES_TYPES[$('#add_sel_elt_dp').val()].mode;
        PIN_AUTHORIZED[_inst.pin].free = false;
    } else
    if (_type =='dv') {
        _inst.elt1 = $('#add_var_dv').val();
        _inst.val1 = $('#add_val_dv').val();
        elements_defined[_inst.elt1] = {};
        elements_defined[_inst.elt1].mode= 'IO';
    } else
    if (_type =='av') {
        _inst.elt1 = $('#add_sel_elt1_av').val();
        _inst.elt2 = $('#add_sel_elt2_av').val();
        _inst.val1 = $('#add_val_av').val();
    } else
    if (_type =='at') {
        _inst.elt1 = $('#add_sel_elt1_at').val();
        _inst.val1 = $('#add_val_at').val();
    } else
    if (_type =='ac') {
        _inst.elt1 = $('#add_sel_elt1_ac').val();
        _inst.elt2 = $('#add_sel_elt2_ac').val();
        _inst.elt3 = $('#add_sel_elt3_ac').val();
        _inst.val1 = $('#add_val_ac').val();
        _inst.ope = $('#add_sel_ope_ac').val();
    } else
    if (_type =='ae') {
        _inst.fct  = $('#add_sel_fct_fd').val();
        _inst.nbarg = $('#add_nbarg_fd').val();
        if (_inst.nbarg > 0) {
            _inst.elt1 = $('#add_sel_elt1_fd').val();
            _inst.val1 = $('#add_val1_fd').val();
        }
        if (_inst.nbarg > 1) {
            _inst.elt2 = $('#add_sel_elt2_fd').val();
            _inst.val2 = $('#add_val2_fd').val();
        }
        if (_inst.nbarg > 2) {
            _inst.elt3 = $('#add_sel_elt3_fd').val();
            _inst.val3 = $('#add_val3_fd').val();
        }
    }else
    if (_type =='ci') {
        _inst.elt1 = $('#add_sel_elt1_ci').val();
        _inst.elt2 = $('#add_sel_elt2_ci').val();
        _inst.val1 = $('#add_val_ci').val();
        _inst.ope = $('#add_sel_ope_ci').val();
    } else
    if (_type =='ce') {
    } else
    if (_type =='cw') {
        _inst.elt1 = $('#add_sel_elt1_cw').val();
        _inst.elt2 = $('#add_sel_elt2_cw').val();
        _inst.val1 = $('#add_val_cw').val();
        _inst.ope = $('#add_sel_ope_cw').val();
    } else
    if (_type =='ff') {
    } else
    if (_type =='fd') {
        _inst.fct = $('#add_fct_fd').val();
        _inst.nbarg = $('#add_nbarg_fd').val();
        function_defined [_inst.fct] = _inst.nbarg;
    }
    // Liberation d'un pin suite a modif
    if (_maj_idins != '' && instructions_defined[_maj_section][_maj_idins].pin != '' && instructions_defined[_maj_section][_maj_idins].pin != _inst.pin)
        PIN_AUTHORIZED[instructions_defined[_maj_section][_maj_idins].pin].free = true;
    
    // Re creation element externe declare suite a modif
    if (_maj_idins != '' && instructions_defined[_maj_section][_maj_idins].tins == 'dp' )
        delete elements_defined[instructions_defined[_maj_section][_maj_idins].elt1]

    // Impact instruction modif ou creation
    if (_maj_idins == '')
        instructions_defined[_sect].push(_inst);
    else {
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
    redraw_section(_sect);
    if (drag_sect != drop_sect)
        redraw_section(drag_sect);
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
            output.push(value.elt1);
            output.push('</span> &agrave; broche <span class="pin"> ');
            output.push(value.pin); 
            output.push(' </span></span>');
        } else
        if (value.tins == "dv") {
            output.push('<span class="declare"onclick="add(\'\', \''+section+'\', '+key+')"> Définir <span class="elemt">');
            output.push(value.elt1);
            output.push('</span> valorisé &agrave; ');
            if (value.val1 == '') 
                output.push('<span class="elemt"> '+value.elt2+' </span>'); 
            else
                output.push('<span class="value"> '+value.val1+' </span>');
            output.push('</span>');
        } else
        if (value.tins == "av") {
            output.push('<span class="action"onclick="add(\'\', \''+section+'\', '+key+')"> Valoriser <span class="elemt"> ');
            output.push(value.elt1);
            output.push(' </span> &nbsp &agrave; ');
            if (value.val1 == '') 
                output.push('<span class="elemt"> '+value.elt2); 
            else
                output.push('<span class="value"> '+value.val1);
            output.push(' </span></span>');
        } else
        if (value.tins == "at") {
            output.push('<span class="action"onclick="add(\'\', \''+section+'\', '+key+')"> Attendre ');
            if (value.val1 == '') 
                output.push('<span class="elemt"> '+value.elt1); 
            else
                output.push('<span class="value"> '+value.val1);
            output.push(' </span> s </span>');
        } else
        if (value.tins == "ac") {
            output.push('<span class="action"onclick="add(\'\', \''+section+'\', '+key+')"> Calculer ');
            output.push('<span class="elemt"> '+value.elt1+' </span>');
            output.push(' = '); 
            output.push('<span class="elemt"> '+value.elt2+' </span> ');
            output.push(value.ope);
            if (value.val1 == '') 
                output.push(' <span class="elemt"> '+value.elt3+' </span>'); 
            else
                output.push(' <span class="value"> '+value.val1+' </span>');
            output.push(' </span>');
        } else
        if (value.tins == "ae") {
            output.push('<span class="action"onclick="add(\'\', \''+section+'\', '+key+')"> Exécuter ');
            output.push('<span class="fct"> '+value.fct+' </span>');
            output.push(' ( '); 
            if (value.nbarg > 0) {
                if (value.elt1 != '') 
                    output.push(' <span class="elemt"> '+value.elt1+' </span>'); 
                elif (value.val1 != '')
                    output.push(' <span class="value"> '+value.val1+' </span>');
            }
            if (value.nbarg > 1) {
                if (value.elt2 != '') 
                    output.push(' <span class="elemt"> '+value.elt2+' </span>'); 
                elif (value.val2 != '')
                    output.push(' <span class="value"> '+value.val2+' </span>');
            }
            if (value.nbarg > 2) {
                if (value.elt3 != '') 
                    output.push(' <span class="elemt"> '+value.elt3+' </span>'); 
                elif (value.val3 != '')
                    output.push(' <span class="value"> '+value.val3+' </span>');
            }
            output.push(' ) </span>');
        } else
        if (value.tins == "ci") {
            output.push('<span class="cond"onclick="add(\'\', \''+section+'\', '+key+')"> Quand ');
            output.push('<span class="elemt"> '+value.elt1+' </span>');
            output.push(value.ope); 
            if (value.val1 == '') 
                output.push('<span class="elemt"> '+value.elt2+' </span>'); 
            else
                output.push('<span class="value"> '+value.val1+' </span>');
            output.push(' Faire : </span>');
        } 
        if (value.tins == "cw") {
            output.push('<span class="cond"onclick="add(\'\', \''+section+'\', '+key+')"> Tant que ');
            output.push('<span class="elemt"> '+value.elt1+' </span>');
            output.push(value.ope); 
            if (value.val1 == '') 
                output.push('<span class="elemt"> '+value.elt2+' </span>'); 
            else
                output.push('<span class="value"> '+value.val1+' </span>');
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
                output.push(' <span class="value"> &nbsp &nbsp &nbsp  </span>')
            }
            if (value.nbarg > 2) {
                output.push(' <span class="value"> &nbsp &nbsp &nbsp  </span>')
            }
            output.push(' ) </span>');
        } else

        if (value.tins == "ff") {
            output.push('<span class="fct"onclick="add(\'\', \''+section+'\', '+key+')"> Fin fonction </span>');
        } 
       
        _1c = value.tins.substr(0,1);
       if ( _1c != 'c' && _1c != 'f') {
            if (value.block)
                output.push(' <span id="acts_'+key+' class="actins"><img src="../img/arrowleft_120102.png" onclick="toggle_block(\''+section+'\', '+key+')"/></span>');
            else if ( key >0 && (instructions_defined[section][key-1].tins.substr(0,1) == 'c' || instructions_defined[section][key-1].block))
                output.push(' <span id="acts_'+key+' class="actins"><img src="../img/arrowright_120128.png" onclick="toggle_block(\''+section+'\', '+key+')"/></span>');
            output.push('<style> #divins_'+section+'_'+key+' #acts_'+key+' {opacity:0;} #divins_'+section+'_'+key+' :hover #acts_'+key+'{opacity:1;} </style>');
        }
        output.push('</span>');
        output.push('</div>');
    });
    $('#sect_'+section).html(output.join(''));
}

function toggle_block(section, idelt) {
    instructions_defined[section][idelt].block = ! instructions_defined[section][idelt].block;
    redraw_section(section);
}
function move_elt(sect, idelt, sectnew, idnew) {
    console.log('move_elt   '+sect+'   '+idelt+'   '+sectnew+'   '+idnew);
    _elt = instructions_defined[sect][idelt];
    if (sectnew == "suppr") {
        if (_elt.tins == 'dp' && _elt.pin != '') PIN_AUTHORIZED[_elt.pin].free = true;
        if (_elt.tins == 'dp' || _elt.tins == 'dv') {
            console.log('delete elements_defined   '+sect+'   '+idelt+'   '+sectnew+'   '+idnew);
            delete elements_defined[_elt.elt1];
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
    if (drop_sect != 'suppr') {
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
    if (sect == "trash") {
        move_elt(drag_sect, drag_korigin, sect, -1);
        redraw_section(drag_sect);
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
        redraw_section(drop_sect);
        if (drag_sect != drop_sect)
            redraw_section(drag_sect);
    
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
    $('#sel_device').html('<option value="'+comobj.projet.device+'" selected>'+comobj.projet.device+'</option>');
    $('#sel_firmware').val(comobj.projet.firmware);
    $('#sel_port').val(comobj.projet.port);
    instructions_defined = comobj.projet.instructions;
    elements_defined = comobj.projet.elements_defined;
    function_defined = comobj.projet.function_defined;
    PIN_AUTHORIZED = comobj.projet.PIN_AUTHORIZED;
}
  
function read() {
    comobj = {}
    comobj.projet = {}
    comobj.projet.name = $('#projet_name').val();

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
            if (comobj.cmd == 'read') {
                set_projet(comobj);
                redraw_section('init');
                redraw_section('loop');
                redraw_section('fct');
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
