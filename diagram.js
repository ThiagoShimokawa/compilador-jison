
function Diagram(c) {
    this.ponto = [];
	//this.texto = texto;
	this.c = c;
	this.x= 10;
	this.y = 10;
    this.Rx = 10;
    this.Ry = 10;
    this.PPontos = [];
    this.Dpoligono = [];
    this.Dquadri = [];
    this.Dtriangulo = [];
    this.xx=Array();
    this.yy=Array();
    this.DCirc = [];
    this.ETexto = [];
    this.img; 
    this.Dlinhas = [];
    this.EspCaneta = 3;
     this.CorCaneta = "Black";
     this.TipoLinha = 0;
     this.Variaveis = Array();
        this.metodos = Array();
     this.Direcao = "leste";
}

function DesenharLinhas(ctx,linhas,Esp,Cor)
{
    
  for(var i=0; i<linhas.length;i++)
   {     
                ctx.moveTo(linhas[i][0],linhas[i][1]);
                ctx.lineTo(linhas[i][2],linhas[i][3]);
                ctx.lineWidth = Esp;
                ctx.strokeStyle  = Cor;
                ctx.stroke();
   }
}

function DesenharLinhasPoli(ctx,linhas,Esp,Cor)
{
   
                ctx.moveTo(linhas[0],linhas[1]);
                ctx.lineTo(linhas[2],linhas[3]);
                ctx.lineWidth = Esp;
                ctx.strokeStyle  = Cor;
                ctx.stroke();
}

function desenharPoligonos(ctx,poligono,Esp,Cor)
{

  for(var i=0; i<poligono.length;i++)
   {    
         for(var j=0; j<(poligono[i].length-1);j++)
             {
           
                  DesenharLinhasPoli(ctx, [poligono[i][j][0],poligono[i][j][1],poligono[i][j+1][0],poligono[i][j+1][1]],Esp,Cor);    
             }

      DesenharLinhasPoli(ctx, [poligono[i][0][0],poligono[i][0][1],poligono[i][poligono[i].length-1][0],poligono[i][poligono[i].length-1][1]],Esp,Cor);   
   }

}
function DesenharCirculos(ctx,circulos,Esp,Cor)
{
  for(var i=0; i<circulos.length;i++)
   {
        ctx.beginPath();
       // ctx.fillStyle = "blue";
        ctx.arc(circulos[i][0],circulos[i][1],circulos[i][2],0,2*Math.PI);
        ctx.lineWidth = Esp;
        ctx.strokeStyle  = Cor;
        ctx.stroke();
      //  ctx.fill();
   }

}

function EscreverTexto(ctx,textos)
{
  for(var i=0; i<textos.length;i++)
   {
       
            ctx.font="14px Georgia";
            ctx.fillStyle = "green";
            ctx.fillText(textos[i][0],textos[i][1],textos[i][2]);

   }
}

function DesenharMarcas(xx,yy,ctx)
{
   for(var i=0; i<xx.length;i++)
   {

        ctx.drawImage(document.getElementById("coco"), xx[i], yy[i], 12, 12); 
   }
}

function DesenhaMarley(ctx,x,y,imagem,dir)
{
       if(imagem == 1)
       {        
              var img = document.getElementById("marley"+dir);
            
       }else
       {
           if(imagem == 2)
           {
                var img = document.getElementById("marque"+dir);
           }else
           {
               var img = document.getElementById("desmarque"+dir);
           }
            
       }

    ctx.drawImage(img, x-12, y-12, 32, 32);  

}



function ParseError(message, hash) {
    _.extend(this, hash);

    this.name = "ParseError";
    this.message = (message || "");

    
}

ParseError.prototype = new Error();

Diagram.ParseError = ParseError;
Diagram.parse = function (input,c) {
    // Create the object to track state and deal with errors
    easy.yy = new Diagram(c);     

    easy.yy.parseError = function (message, hash) {  
      var  ctx = c.getContext("2d");

ctx.clearRect(0, 0,c.width ,c.height );      
    document.getElementById("saidaText").innerHTML = message;
    console.log(message);
        throw new ParseError(message, hash);
    };

    // Parse
    var diagram = easy.parse(input);

    // Then clean up the parseError key that a user won't care about
    delete diagram.parseError; 
 easy.yy.intepretador(diagram);  
    return diagram;
};



Diagram.prototype.intepretador = function(dados) {  
    console.log(dados);
    
    for(var x = 0 ;x<dados.sentencas.length; x++)
    {       
        if(dados.sentencas[x].name=="CMD_MARQUE_AQUI")
        { 
         easy.yy.marcar();         
        }else{
            if(dados.sentencas[x].name=="MOVER_PARA")
                { 
                    easy.yy.moverPara(dados.sentencas[x].params[0].value);
                 
                //    console.log(dados.sentencas[x].params[0].value);            
                }else{
                    if(dados.sentencas[x].name=="CMD_DESMARQUE")
                    { 
                        easy.yy.desmarque();            
                    }
                    else{
                          if(dados.sentencas[x].name=="CMD_DESENHE_LINHA")
                          { 
                                 easy.yy.desenharLinha(dados.sentencas[x].params[0].value);                 
                             //console.log(dados.sentencas[x].params[0].value);            
                          }else{
                              
                                if(dados.sentencas[x].name=="CMD_ESCREVA")
                                { 
                                       easy.yy.escrever(dados.sentencas[x].params[0]);                 
                                    //console.log(dados.sentencas[x].params[0]);            
                                }else
                                {
                                     if(dados.sentencas[x].name=="CMD_DESENHE_CIRC")
                                        { 
                                            easy.yy.desenharCirculo(dados.sentencas[x].params[0]);           
                                        }else{
                                            
                                             if(dados.sentencas[x].name=="CMD_MEMORIZE - CMD_MEMORIZE_EM")
                                                { 
                                                    easy.yy.memorizeVariavel(dados.sentencas[x].params[0],dados.sentencas[x].params[1]);           
                                                }else{

 if(dados.sentencas[x].name=="CMD_DESENHE_TRI")
{ 
   easy.yy.desenharTriangulo(dados.sentencas[x].params[0].value,
   dados.sentencas[x].params[1].value);           
}else
{
	if(dados.sentencas[x].name == "CMD_ESPESSURA_CA")
	{
		easy.yy.mudarEspessura(dados.sentencas[x].params[0]);
		
	}else
	{
		if(dados.sentencas[x].name == "CMD_ESTILO_CA")
		{
			easy.yy.mudarEstilo(dados.sentencas[x].params[0]);
		}else
		{
			if(dados.sentencas[x].name == "CMD_COR_CA")
			{
				easy.yy.mudarCor(dados.sentencas[x].params[0]);
			}else
			{
				if(dados.sentencas[x].name == "CMD_POLIGONO")
				{
                   
					easy.yy.desenharPoligono(dados.sentencas[x].params[0]);
						
				}else
				{
					if(dados.sentencas[x].name == "CMD_QUADRI")
					{
						easy.yy.desenharQuadri(dados.sentencas[x].params[0].value, dados.sentencas[x].params[1].value, dados.sentencas[x].params[2].value);
					}else
					{
						if(dados.sentencas[x].name == "CMD_SAIDA")
						{
							easy.yy.saida(dados.sentencas[x].params[0]);							
						}else
						{
							if(dados.sentencas[x].name == "CMD_MOV")
							{
								easy.yy.mudarDirecao(dados.sentencas[x].params[0]);
							}else
							{
								if(dados.sentencas[x].nome == "CMD_MARCA_AQUI")
								{
									dados.sentencas[x].val= easy.yy.marcaAqui(1);									
								}else
								{
									if(dados.sentencas[x].nome == "CMD_NMARCA_AQUI")	
									{										
										dados.sentencas[x].val= easy.yy.marcaAqui(2);										
									}else
									{
										if(dados.sentencas[x].nome == "CMD_MARCA_EM")
										{											
											dados.sentencas[x].val= easy.yy.marcaEm(1,dados.sentencas[x].params.value);										
										}else
										{
											if(dados.sentencas[x].nome == "CMD_NMARCA_EM")
											{											
												dados.sentencas[x].val= easy.yy.marcaEm(2,dados.sentencas[x].params.value);										
											}else
											{
                                                if(dados.sentencas[x].nodeType == "BLOCOS" || dados.sentencas[x].nodeType == "BLOCO")
                                                {
                                                        test2(dados.sentencas[x]);
                                                }else
                                                {
                                                      if(dados.sentencas[x].nodeType == "CONDICIONAL")
                                                        {   
                                                            console.log(dados.sentencas[x].params[0]);  
                                                              if(dados.sentencas[x].params[0]!= null)
                                                                {
                                                                test2(dados.sentencas[x].params[0]);
                                                                }
                                                        }else
                                                        {
                                                            if(dados.sentencas[x].name == "ENQUANTO")
                                                            {   
                                                                
                                                                for(var z = dados.sentencas[x].params[0].val; z < dados.sentencas[x].params[1].val;z++ )
                                                                {
                                                                        var y = Array();
                                                                        y.push(dados.sentencas[x].params[2]);
                                                                        var d = {sentencas : y};
                                                                        easy.yy.intepretador(d);
                                                                }
                                                            }else
                                                            {
                                                                 if(dados.sentencas[x].nodeType == "NOVO COMANDO")
                                                                { 
                                                                        var y = Array();
                                                                        y.push(dados.sentencas[x].params[1]);
                                                                        var d = {sentencas : y};
                                                                        var vari;
                                                                        vari = dados.sentencas[x].params[0].replace('"',"");
                                                                        vari = vari.replace('"',""); 
                                                                        this.metodos.push({nome:vari,valor:d});
                                                                       console.log(this.metodos);
                                                                }else
                                                                {
                                                                    if(dados.sentencas[x].nodeType == "EXECULTA COMANDO")
                                                                    {
                                                                            var vari;
                                                                        vari = dados.sentencas[x].params[0].replace('"',"");
                                                                        vari = vari.replace('"',"");

                                                                        console.log(dados.sentencas[x]);
                                                                          this.metodos.forEach(c=>{
                                                                              if(c.nome==vari)
                                                                              {
                                                                                   easy.yy.intepretador(c.valor);
                                                                              }
                                                                          });
                                                                        }else
                                                                        {
                                                                            
                                                                        }
                                                                }
                                                            }
                                                        }
                                                }
												
											}
										}
									}
								}
							}								
						}					
					}				
				}
				
			}
		}
	}
	
}
                                                }
                                        }                                    
                                }
                          }                    
                        }
                    }
            }
    }
    
}

function test2(dad)
{  
     if(dad.value != null)
    {
        if(dad.value.length == 1)
        {
                //console.log(dad);
                var y = Array();
                y.push(dad.value[0].comandos);
                var d = {sentencas : y};
                easy.yy.intepretador(d);
        }else{
            // console.log(dad);
                var y = Array();
                y.push(dad.value[0].comandos);
                var d = {sentencas : y};
                easy.yy.intepretador(d);
                test2(dad.value[1]);

        }
    }else{
          var y = Array();
                y.push(dad);
                var d = {sentencas : y};
                  easy.yy.intepretador(d);
    }

}

Diagram.prototype.moverPara = function(ponto) {
       this.img = 1;
      easy.yy.Ponto(ponto[0].val,ponto[1].val);
       this.desenharFormas();
}

Diagram.prototype.desenharLinha = function(ponto) {
    easy.yy.Ponto(ponto[0],ponto[1]);
 this.Dlinhas.push([this.Rx,this.Ry,ponto[0].val,ponto[1].val]);
 this.desenharFormas();
}


Diagram.prototype.escrever = function(texto) {

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
texto = texto.replace('"',"");

this.ETexto.push([texto.replace('"',""),this.x,this.y]);
 this.img="";
   this.desenharFormas();
}


Diagram.prototype.desenharFormas = function() {
    var ctx = this.c.getContext("2d");
    ctx.clearRect(0, 0,this.c.width ,this.c.height );
    if(this.TipoLinha == 1)
    {
         var dashList = [5, 5, 5, 5];
         ctx.setLineDash(dashList);
    }else{

         var dashList = [0, 0, 0, 0];
         ctx.setLineDash(dashList);
    }

  
    $("#saidaText").html("");


    DesenharMarcas(this.xx,this.yy,ctx);
    desenharPoligonos(ctx,this.Dpoligono,this.EspCaneta,this.CorCaneta);
    desenharPoligonos(ctx,this.Dquadri,this.EspCaneta,this.CorCaneta);
    desenharPoligonos(ctx,this.Dtriangulo,this.EspCaneta,this.CorCaneta);
    DesenharCirculos(ctx,this.DCirc, this.EspCaneta, this.CorCaneta);
    DesenharLinhas(ctx,this.Dlinhas, this.EspCaneta, this.CorCaneta);
    DesenhaMarley(ctx,this.x,this.y,this.img,this.Direcao);
    EscreverTexto(ctx,this.ETexto);
    
}

Diagram.prototype.desenharCirculo = function(valor) {

        var ctx = this.c.getContext("2d");

      this.DCirc.push([this.x,this.y,valor]);
   this.desenharFormas();

console.log(valor);
}


Diagram.prototype.desenharQuadri = function(ponto1,ponto2,ponto3) {

		easy.yy.Ponto3(ponto1[0].val,ponto1[1].val);
        easy.yy.Ponto3(ponto2[0].val,ponto2[1].val);
		easy.yy.Ponto3(ponto3[0].val,ponto3[1].val);
      this.Dquadri.push(this.PPontos);
      this.PPontos = [];

       var ctx = this.c.getContext("2d");
       desenharPoligonos(ctx,this.Dquadri,this.EspCaneta,this.CorCaneta);
}

Diagram.prototype.desenharTriangulo = function(ponto1,ponto2) {
        easy.yy.Ponto3(ponto1[0].valponto1[1].val);
        easy.yy.Ponto3(ponto2[0].val,ponto2[1].val);

      this.Dtriangulo.push(this.PPontos);
      this.PPontos = [];

       var ctx = this.c.getContext("2d");
       desenharPoligonos(ctx,this.Dtriangulo,this.EspCaneta,this.CorCaneta);
}

Diagram.prototype.desmarque = function() {


this.img = 3;

 for(var i=0; i<this.xx.length;i++)
   {
		if(this.xx[i]==this.x && this.yy[i]==this.y)
		{
			this.xx.splice(i,1);
            this.yy.splice(i,1);
		}
      
   }

   this.desenharFormas();
   
}

Diagram.prototype.marcar = function() {
this.img = 2;
this.desenharFormas();
this.xx.push(this.x);
    this.yy.push(this.y);
    
}

Diagram.prototype.Ponto = function(x, y) {

this.Rx = this.x;
this.Ry = this.y;
this.x = x;
this.y = y;

    return [x, y];
}


Diagram.prototype.Ponto2 = function(x, y) {
	
    
    return [x, y];
}


Diagram.prototype.mudarEstilo = function(x) {
    
    $("#saidaText").html("Estilo Alterado para: "+x);
  
   if(x=="1")
   {
        this.TipoLinha = 1;
   }else
   {
         if(x=="0"){
             this.TipoLinha = 0;
         }
    }

  
}

Diagram.prototype.Ponto3 = function(x, y) {
if(this.PPontos.length==0)
{

this.PPontos.push([this.x,this.y]);
this.PPontos.push([x,y]);

}else
{
this.PPontos.push([x,y]);
}
	
    return [x, y];
}



Diagram.prototype.validaLogica = function(x,z) {
    
   
}

Diagram.prototype.mudarEspessura = function(valor) {
 
 this.EspCaneta = valor;
  
    $("#saidaText").html("Espessura Alterada para: "+ valor);
}


Diagram.prototype.mudarCor = function(valor) {
 valor = valor.replace('"',"");
 this.CorCaneta = valor.replace('"',"");

   $("#saidaText").html("Cor da caneta alterada para: "+ this.CorCaneta);

}



Diagram.prototype.saida = function(valor) {
 valor = valor.replace('"',"");
    valor = valor.replace('"',"");

   $("#saidaText").html(valor);

}

  $("#saidaText").html("Cor da caneta alterada para: "+ this.CorCaneta);



Diagram.prototype.Logica = function(x) {
    $("#saidaText").html(x);   
}

Diagram.prototype.marcaAqui = function(x) {
    if(x==1)
    {

            for(var i=0; i<this.xx.length;i++)
            {
                    if(this.xx[i]==this.x && this.yy[i]==this.y)
                    { 
                        //$("#saidaText").html("Não há uma marca em : ("+this.x+","+this.y+")");   
                        return true;
                      
                        
                    
                    }
                
            }
            return false;

    }else
    {

            for(var i=0; i<this.xx.length;i++)
            {
                    if(this.xx[i]==this.x && this.yy[i]==this.y)
                    { 
                      //  $("#saidaText").html("Não há uma marca em : ("+this.x+","+this.y+")");   
                        return false;
                    
                    }
                
            } 
               return true;


    }
     
}




Diagram.prototype.marcaEm = function(x,ponto) {

    if(x==1)
    {

            for(var i=0; i<this.xx.length;i++)
            {
                    if(this.xx[i]==ponto[0].val && this.yy[i]==ponto[1].val)
                    { 
                        return true;   
                    
                    }                
            }
				
            return false;

    }else
    {
		
            for(var i=0; i<this.xx.length;i++)
            {
                     if(this.xx[i]==ponto[0].val && this.yy[i]==ponto[1].val)
                    {                  
									
                        return false;                    
                    }
                
            } 
		
               return true;

    }
     
}






Diagram.prototype.desenharPoligono = function(pontos) {
	
	easy.yy.Ponto3(pontos.value[0].value[0].val,pontos.value[0].value[1].val);
		if(pontos.value[1]!= null)
		{    
            
			easy.yy.desenharPoligono(pontos.value[1]);
		}else
		{
						easy.yy.desenharPoligonoRe();
		}
        
}


Diagram.prototype.desenharPoligonoRe = function() {
    
	

    this.Dpoligono.push(this.PPontos);
    this.PPontos = [];

       var ctx = this.c.getContext("2d");
    desenharPoligonos(ctx,this.Dpoligono,this.EspCaneta,this.CorCaneta);

}


Diagram.prototype.memorizeVariavel = function(ex,vari) {
    
    vari = vari.replace('"',"");
    vari = vari.replace('"',"");   
console.log('dasd');
this.Variaveis.push({nome:vari,valor:ex});

 $("#saidaText").html("Variável: '" + vari +"' contém o valor : "+ ex);

}



Diagram.prototype.mudarDirecao = function(ex) {


this.Direcao = ex;
this.desenharFormas();



}




