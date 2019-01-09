/* 
	premios-cyl.js
    Copyright (C) 2018  Laura Rodríguez Martín

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see https://www.gnu.org/licenses/.	
*/

var json_file;
$(function() {
		
	// Setup - add a text input to each footer cell
    $('#example tfoot th').each( function () {
        var title = $(this).text();
        if((title != "Más info")){
	    	$(this).html( '<input type="text" class="form-control form-control-sm" style="width: 100%"/>' );  
        }else{
	       	$(this).html( '' ); 
        }   
    } );
    
	var table = $("#example").DataTable({
        "language": {
	        "search": "Buscar",
            "lengthMenu": "Mostrar _MENU_ resultados por página",
            "zeroRecords": "No se han encontrado resultados",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay datos en la tabla",
            "infoFiltered": "(filtro de un total de _MAX_ registros)",
            "paginate": {
				"previous": "<",
				"next": ">"
    		}
        },
		"columns": [
			{ "width": "15%" },
			{ "width": "70%" },
			{ "width": "15%" }
		],
		"order": [[ 0, "desc" ]]
    });
    // Apply the search
    table.columns().every( function () {
        var that = this;
 
        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
    
	var testDataUrl = "https://analisis.datosabiertos.jcyl.es/resource/udjg-h4xq.json";
	
	loadDataTable();				  					

  	function loadDataTable() {
  		$.ajax({
  			type: 'GET',
  			url: testDataUrl,
  			contentType: "text/plain",
  			dataType: 'json',
  			success: function (data) {
  				myJsonData = data;
  				json_file = myJsonData;
  				populateDataTable(myJsonData);
      		},
	  		error: function (e) {
	  			console.log("Ha habido un error con la petición...");
	  			console.log("error: " + JSON.stringify(e));
      		}
    	});
  	}
  	// populate the data table with JSON data
  	function populateDataTable(data) {
  		console.log("populating data table...");
  		// clear the table before populating it with more data
  		$("#example").DataTable().clear();
  		var aux;
  		data.forEach(function(item){
  			aux = item.fechapublicacionbocyl.split("T");
  			$('#example').dataTable().fnAddData( [
  				aux[0],
  				item.t_tulo,
  				'<center><a href="#detallePremio" id="'+item.identificador+'" class="btn btn-cyl">Ver</a></center>'
  			]);
  		});
  	}
  	
  	$('#example tbody').on( 'click', 'a', function () {
	  	var id_premio = $(this).attr('id');
		var html_content = "";
		var aux;

		json_file.forEach(function(item){
  			if(item.identificador == id_premio){
	  			html_content = html_content + "<center><h2 id='titulo' class='title'>" + item.t_tulo + "</h2><hr class='style-eight'></center><br>";
	  			html_content = html_content + "<div class='row'><div class='col-md-3 sidebar'>";
	  			html_content = html_content + "<div class='py-2 sticky-top flex-grow-1'><div class='nav flex-sm-column'>";
	  			html_content = html_content + "<a href='#titulo' class='nav-link'><i class='fas fa-home'></i> Título</a>";
	  			html_content = html_content + "<a href='#descripcion' class='nav-link'><i class='fas fa-clipboard-list'></i> Descripción</a>";
	  			html_content = html_content + "<a href='#destinatarios' class='nav-link'><i class='fas fa-user'></i> Destinatarios</a>";
	  			html_content = html_content + "<a href='#requisitos' class='nav-link'><i class='fas fa-list-ol'></i> Requisitos</a>";
	  			html_content = html_content + "<a href='#doc' class='nav-link'><i class='fas fa-file-alt'></i> Documentación a presentar</a>";
	  			html_content = html_content + "<a href='#lugar' class='nav-link'><i class='fas fa-map-marker-alt'></i> Lugar de presentación</a>";
	  			html_content = html_content + "<a href='#premios' class='nav-link'><i class='fas fa-medal'></i> Premios</a>";
	  			html_content = html_content + "<a href='#notificacion' class='nav-link'><i class='fas fa-bell'></i> Notificación</a>";
	  			html_content = html_content + "<a href='#info' class='nav-link'><i class='fas fa-info-circle'></i> Información adicional</a>";
	  			html_content = html_content + "<a href='#enlace' class='nav-link'><i class='fas fa-globe'></i> Enlace al contenido y documentos asociados</a></div></div>";	  			
	  			html_content = html_content + "</div>";
	  			html_content = html_content + "<div class='col-md-9'>";
	  			html_content = html_content + "<div class='row'><div class='col-md-9'>";
  				if(item.ultimaactualizacion == null){
	  				html_content = html_content + "<b><i class='fas fa-calendar-alt'></i> Última Actualización </b>No disponible<br>";
  				}else{
	  				aux = item.ultimaactualizacion.split("T");
	  				html_content = html_content + "<b><i class='fas fa-calendar-alt'></i> Última Actualización </b>" + aux[0]+"<br>";
  				} 
				if(item.fechapublicacionbocyl == null){
	  				html_content = html_content + "<b><i class='fas fa-calendar-alt'></i> Fecha Publicación BOCYL </b>No disponible<br>";
  				}else{
	  				aux = item.fechapublicacionbocyl.split("T");
	  				html_content = html_content + "<b><i class='fas fa-calendar-alt'></i> Fecha Publicación BOCYL </b>" + aux[0]+"<br>";
  				}  					  			
  				if(item.organismo_responsable == null){
	  				html_content = html_content + "<b><i class='fas fa-building'></i> Organismo Responsable </b>No disponible<br><br><br>";
  				}else{
	  				html_content = html_content + "<b><i class='fas fa-building'></i> Organismo Responsable </b>" + item.organismo_responsable + "<br><br><br>";
  				}
  				
  				html_content = html_content + "</div><div class='col-md-3'><center><img src='img/icon.png' width='70px'></center></div></div>";
 				 											  			
  				if(item.descripci_n == null){
	  				html_content = html_content + "<h3 id='descripcion'><i class='fas fa-clipboard-list'></i> Descripción </h3><hr class='subtitle'>No disponible<br>";	
  				}else{
	  				html_content = html_content + "<h3 id='descripcion'><i class='fas fa-clipboard-list'></i> Descripción </h3><hr class='subtitle'>" + item.descripci_n + "<br>";
  				}
  				if(item.destinatarios == null){
	  				html_content = html_content + "<h3 id='destinatarios'><i class='fas fa-user'></i> Destinatarios </h3><hr class='subtitle'>No disponible<br><br><br>";
  				}else{
	  				html_content = html_content + "<h3 id='destinatarios'><i class='fas fa-user'></i> Destinatarios </h3><hr class='subtitle'>" + item.destinatarios + "<br><br><br>";
  				}
  				if(item.requisitos_necesarios == null){
	  				html_content = html_content + "<h3 id='requisitos'><i class='fas fa-list-ol'></i> Requisitos </h3><hr class='subtitle'>No disponible<br><br>";
  				}else{
	  				html_content = html_content + "<h3 id='requisitos'><i class='fas fa-list-ol'></i> Requisitos </h3><hr class='subtitle'>" + item.requisitos_necesarios + "<br><br>";
  				} 
  				if(item.documentaci_n_a_presentar == null){
	  				html_content = html_content + "<h3 id='doc'><i class='fas fa-file-alt'></i> Documentación a presentar </h3><hr class='subtitle'>No disponible<br>";
  				}else{
	  				html_content = html_content + "<h3 id='doc'><i class='fas fa-file-alt'></i> Documentación a presentar </h3><hr class='subtitle'>" + item.documentaci_n_a_presentar + "<br>";
  				} 
  				if(item.plazodepresentacion == null){
	  				html_content = html_content + "<b><i class='fas fa-calendar-alt'></i> Plazo Presentación </b>No disponible<br>";
  				}else{
	  				aux = item.plazodepresentacion.split("T");
	  				html_content = html_content + "<b><i class='fas fa-calendar-alt'></i> Plazo Presentación </b>" + aux[0] + "<br>";
  				}
  				if(item.apertura_del_plazo_de_presentaci_n == null){
	  				html_content = html_content + "<b><i class='fas fa-calendar-alt'></i> Apertura Plazo Presentación </b>No disponible<br>";
  				}else{
	  				aux = item.apertura_del_plazo_de_presentaci_n.split("T");
	  				html_content = html_content + "<b><i class='fas fa-calendar-alt'></i> Apertura Plazo Presentación </b>" + aux[0] + "<br>";
  				}
  				if(item.fecha_l_mite_de_presentaci_n_de_candidaturas == null){
	  				html_content = html_content + "<b><i class='fas fa-calendar-alt'></i> Fecha límite Presentación Candidatura </b>No disponible<br><br><br>";
  				}else{
	  				aux = item.fecha_l_mite_de_presentaci_n_de_candidaturas.split("T");
	  				html_content = html_content + "<b><i class='fas fa-calendar-alt'></i> Fecha Límite Presentación Candidatura </b>" + aux[0] + "<br><br><br>";
  				}
  				if(item.lugar_de_presentaci_n == null){
	  				html_content = html_content + "<h3 id='lugar'><i class='fas fa-map-marker-alt'></i> Lugar de Presentación </h3><hr class='subtitle'>No disponible<br><br>";
  				}else{
	  				html_content = html_content + "<h3 id='lugar'><i class='fas fa-map-marker-alt'></i> Lugar de Presentación </h3><hr class='subtitle'>" + item.lugar_de_presentaci_n + "<br><br>";
  				}  				
  				if(item.premios == null){
	  				html_content = html_content + "<h3 id='premios'><i class='fas fa-medal'></i> Premios </h3><hr class='subtitle'>No disponible<br>";
  				}else{
	  				html_content = html_content + "<h3 id='premios'><i class='fas fa-medal'></i> Premios </h3><hr class='subtitle'>" + item.premios + "<br>";
  				}  				
  				if(item.organogestordelpremio == null){
	  				html_content = html_content + "<b><i class='fas fa-building'></i> Órgano Gestor del premio </b>No disponible<br>";
  				}else{
	  				html_content = html_content + "<b><i class='fas fa-building'></i> Órgano Gestor del premio </b>" + item.organogestordelpremio + "<br>";
  				}
				if(item.resolucionpremio == null){
	  				html_content = html_content + "<b><i class='fas fa-medal'></i> Resolución Premio </b>No disponible<br><br><br>";
  				}else{
	  				html_content = html_content + "<b><i class='fas fa-medal'></i> Resolución Premio </b>" + item.resolucionpremio + "<br><br><br>";
  				}   				
  				if(item.notificacion == null){
	  				html_content = html_content + "<h3 id='notificacion'><i class='fas fa-bell'></i> Notificación </h3><hr class='subtitle'>No disponible<br><br>";
  				}else{
	  				html_content = html_content + "<h3 id='notificacion'><i class='fas fa-bell'></i> Notificación </h3><hr class='subtitle'>" + item.notificacion + "<br><br>";
  				}  				  				 				 				  					
  				if(item.informaci_n_adicional == null){
	  				html_content = html_content + "<h3 id='info'><i class='fas fa-info-circle'></i> Información Adicional </h3><hr class='subtitle'>No disponible<br><br>";
  				}else{
	  				html_content = html_content + "<h3 id='info'><i class='fas fa-info-circle'></i> Información Adicional </h3><hr class='subtitle'>" + item.informaci_n_adicional + "<br><br>";
  				}     				  				 				 				  				  			  
  				if(item.enlace_al_contenido == null){
	  				html_content = html_content + "<h3 id='enlace'><i class='fas fa-globe'></i> Enlace al contenido y documentos asociados </h3><hr class='subtitle'>No disponible<br>";
  				}else{
	  				html_content = html_content + "<h3 id='enlace'><i class='fas fa-globe'></i> Enlace al contenido y documentos asociados </h3><hr class='subtitle'><a href='"+item.enlace_al_contenido+"' target='_blank'>Acceder</a><br>";
  				} 	  					 	
  				html_content = html_content + "</div></div>";
  				$( "#detallePremio" ).html(html_content);
  				$( "#detallePremio" ).css("display", "block");	
		 	}
		}); 		
	});
  				
});