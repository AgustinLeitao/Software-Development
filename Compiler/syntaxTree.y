%{
#include <stdio.h>
#include <stdlib.h>
#include <conio.h>
#include <string.h>
#include "y.tab.h"

#define CANT_DECLARACIONES 100
#define MAX_SIMBOLOS 100
#define MAX_LONG 30

/* --------- Inicio Variables Bison --------- */
int yystopparser=0;
FILE *yyin;
char *yytext;
int yylval;
/* --------- Fin Variables Bison --------- */
/* --------- Inicio Estructura Declaraciones --------- */
struct tipo_declaracion 
{ 
	char tipo[25];
	char id[30];
};

int marca=0;
int i,min,dif;
int contV =0,contE=0;
char *aux;
char *aux_tipo,*aux_tipo2;
struct tipo_declaracion listaDeclaraciones[CANT_DECLARACIONES];
int indiceTipos = 0;
int indiceIds = 0;
void actualizar_tipos_en_TS();
/* --------- Fin Estructura Declaraciones --------- */
/* --------- Inicio Funciones Arbol Sintactico --------- */
typedef struct
{
  int dato;
  char* datoChar;
  char* tipo;
  char  tipoNodo;

} t_dato;
struct datos_pila
{
	char tipo[100];
	int indicador;
};
struct datos_pila variable;
typedef struct s_nodo
{
  t_dato datos;
  struct s_nodo *izq;
  struct s_nodo *der;

} t_nodo;
t_nodo *  Pcondiciones,
       *  Psentencia,    
       *  Pcadena_id,   
       *  Pdecision,
       *  Piteracion, 
       *  PiteracionE,
       *  Praize,
       *  Parbe,
       *  Pasignacion, 
       *  Pprograma,
       *  PasignacionM,
       *  PiteracionE,
       *  Pvari;   
FILE *ArchArbol;
t_nodo * crear_nodo( char*, t_nodo*, t_nodo*);
t_nodo * crear_hoja(int);
char * strrep(char *, char, char);
t_nodo * construirArbolDeAlcance();
char * strrep(char *, char, char);
void mostrar( t_dato *);
void mostrar_preorden(t_nodo *);
void crearasm(void);
void insertarvariablesasm(FILE*);

/* --------- Fin Funciones Arbol Sintactico --------- */
/* --------- Inicio Funciones Pila --------- */
typedef struct
{
	t_nodo * pila [MAX_SIMBOLOS];
	int tope;
}t_pila;
t_pila pilaExpresionN;
t_pila pilaExpresionS;
t_pila pilaSentencias;
t_pila pilaTermino;
t_pila pilaFactor;
t_pila pilaFactorS;
t_pila pilaCondicion;
t_pila pilaCondiciones;
t_pila pilaElementos;
t_pila pilaVar;
t_pila pilaAsignacionM;
t_pila pilaElementosAux;
void delimitadorDeAlcance( t_pila *);
void inicializarPila (t_pila *);
t_nodo * verPrimero ( t_pila *);
int pilaVacia(t_pila *);
t_nodo* desapilar(t_pila *);
t_nodo* apilar (t_pila *, t_nodo *);

int pilaVariables[MAX_SIMBOLOS];
struct datos_pila pilaExp[MAX_SIMBOLOS];
int topeExp = -1;
int topeVar=-1;
int variableN;
void apilarVariable (int var)
{
	topeVar++;	
	pilaVariables[topeVar]=var;
}

int desapilarVariable ()
{
	int var;
	var = pilaVariables[topeVar];
	topeVar--;	
	return var;
}
int pilavaciaVE()
{
	if(topeExp == -1)
		return 1;
	return 0;
}
void apilarExp(struct datos_pila dato)
{
	topeExp++;
	strcpy(pilaExp[topeExp].tipo,dato.tipo);
	pilaExp[topeExp].indicador = dato.indicador;
}
struct datos_pila desapilarExp()
{
	struct datos_pila dato;
	dato = pilaExp[topeExp];
	topeExp--;
	return dato;
}
/* --------- Fin Funciones Pila --------- */
%}

%token PR_VAR PR_ENDVAR
%token PR_REAL
%token PR_INTEGER
%token PR_STRING
%token PR_IF PR_THEN PR_ELSE PR_ENDIF
%token PR_WHILE PR_DO PR_ENDWHILE PR_IN
%token PR_WRITE PR_READ
%token OP_ASIG OP_CONCAT OP_SUMA OP_RESTA OP_MULT OP_DIV
%token OP_AND OP_OR OP_NOT
%token ID
%token CONST_INT CONST_STR CONST_REAL
%token DOS_PUNTOS
%token MAYOR MAYOR_IGUAL MENOR MENOR_IGUAL DIFERENTE IGUAL_IGUAL
%token COMA
%token PAR_A PAR_C
%token COR_A COR_C
%%
cabecera: f_declaraciones programa { crearasm(); mostrar_preorden( Pprograma ); printf("\nCompilacion Exitosa.."); printf("\nTabla De simbolos guardada en ./ts.txt");
				                     printf("\nCodigo Intermedio guardado en ./intermedia.tex"); printf("\nArbol Sintactico guardado en ./tree.pdf");
				                     printf("\nCabecera Assembler guardada en ./final.txt");} 
			| print {printf("\nCompilacion Exitosa..");};

print: f_print | print f_print ;
f_print: PR_WRITE CONST_STR | 
			PR_WRITE ID { aux_tipo = (char*) devolver_tipo($2); 
                        if( strcmp(aux_tipo,"float") != 0 && strcmp(aux_tipo,"string") != 0  && strcmp(aux_tipo,"integer") != 0)
                        {
                        	aux = (char*) devolver_lexema($2);
                        	printf("\nCompilacion Erronea.."); printf("\nVariable %s no declarada..\n",aux); fclose(ArchArbol); system("del intermedia.tex > nul"); exit(EXIT_FAILURE);
                        }
                        }; 
f_declaraciones: PR_VAR declaraciones PR_ENDVAR;
declaraciones: declaracion 
			   | declaraciones declaracion ;
declaracion: COR_A l_td COR_C DOS_PUNTOS COR_A l_var COR_C { actualizar_tipos_en_TS(); };

l_td: td {strcpy(listaDeclaraciones[indiceTipos].tipo, yytext); indiceTipos++; }
      | l_td COMA td { strcpy(listaDeclaraciones[indiceTipos].tipo, yytext); indiceTipos++;};
l_var: ID {strcpy(listaDeclaraciones[indiceIds].id, yytext); indiceIds++; }
	   | l_var COMA ID {strcpy(listaDeclaraciones[indiceIds].id, yytext); indiceIds++; };  	     
td: PR_INTEGER | PR_REAL | PR_STRING;

programa: lista_sentencias { Pprograma = crear_nodo( "Programa" , construirArbolDeAlcance() , NULL );};
lista_sentencias : sentencia  {  apilar( &pilaSentencias, Psentencia ) ;} 
				 | lista_sentencias sentenciae 
				 | sentenciae
                 | lista_sentencias sentencia { apilar( &pilaSentencias, Psentencia );};
sentencia: asignacion { Psentencia = Pasignacion; };
sentencia: asignacion_multiple{ Psentencia = PasignacionM;} ;
sentencia: iteracion_while {Psentencia =  Piteracion;};
sentencia: iteracion_ciclo_especial {Psentencia = PiteracionE; };
sentencia: seleccion { Psentencia =  Pdecision;};
sentenciae: mostrar | ingreso;
mostrar: PR_WRITE CONST_STR | 
						PR_WRITE ID { aux_tipo = (char*) devolver_tipo($2); 
                        if( strcmp(aux_tipo,"float") != 0 && strcmp(aux_tipo,"string") != 0  && strcmp(aux_tipo,"integer") != 0)
                        {
                        	aux = (char*) devolver_lexema($2);
                        	printf("\nCompilacion Erronea.."); printf("\nVariable %s no declarada..\n",aux); fclose(ArchArbol); system("del intermedia.tex > nul"); exit(EXIT_FAILURE);
                        }
                        };    
ingreso: PR_READ ID { aux_tipo = (char*) devolver_tipo($2); 
                        if( strcmp(aux_tipo,"float") != 0 && strcmp(aux_tipo,"string") != 0  && strcmp(aux_tipo,"integer") != 0)
                        {
                        	aux = (char*) devolver_lexema($2);
                        	printf("\nCompilacion Erronea.."); printf("\nVariable %s no declarada..\n",aux); fclose(ArchArbol); system("del intermedia.tex > nul"); exit(EXIT_FAILURE);
                        }
                        };      
asignacion_multiple: COR_A l_vari COR_C OP_ASIG COR_A lista_expresiones COR_C { if(contE <= contV) min = contE; else min = contV;	
																				dif = contE - contV;
																				for(i=0;i<dif;i++)
																				{
																					desapilarExp();
																					desapilar(&pilaElementos);
																				}
																				dif = contV - contE;
																				for(i=0;i<dif;i++)
																				{
																					desapilar(&pilaVar);
																					desapilarVariable();
																				}
																				while(pilavaciaVE() == 0)
																				{
																					variable = desapilarExp();																					variableN = desapilarVariable();	
																					if(variable.indicador == 1)
																					{
																						if(strcmp(variable.tipo,"string") == 0 || strcmp(variable.tipo,"CONST_STR") == 0)
																							if(strcmp((char*) devolver_tipo(variableN),"string") != 0)
																							{
																								printf("\nCompilacion Erronea..");
 											 				 									printf("\nAsignacion Invalida. Lado izquierdo y derecho Incompatibles..\n");
 											  													fclose(ArchArbol); system("del intermedia.tex > nul");
 											  													exit(EXIT_FAILURE);
 											  												}
 											  										}
																					else
																					{
																						if(strcmp(variable.tipo,"numerico") == 0)
																						{
																							if(strcmp((char*) devolver_tipo(variableN),"integer") != 0 && strcmp( (char*) devolver_tipo(variableN),"float") != 0 )
																							{
																								printf("\nCompilacion Erronea..");
 											 				 									printf("\nAsignacion Invalida. Lado izquierdo y derecho Incompatibles..\n");
 											  													fclose(ArchArbol); system("del intermedia.tex > nul");
 											  													exit(EXIT_FAILURE);
 											  												}
 											  											}
 											  											else
 											  											{
 											  												if(strcmp((char*) devolver_tipo(variableN),"string") != 0)
																							{								
																								printf("\nCompilacion Erronea..");
 											 				 									printf("\nAsignacion Invalida. Lado izquierdo y derecho Incompatibles..\n");
 											  													fclose(ArchArbol); system("del intermedia.tex > nul");
 											  													exit(EXIT_FAILURE);
 											  												}	
 											  											}
																					}
																				}																			
																				if( min == 1)
																					PasignacionM = crear_nodo("=",desapilar(&pilaVar),desapilar(&pilaElementos));	
																				else
																				{																																					
																					for(i=0;i<min;i++)																																								
																						apilar(&pilaAsignacionM,crear_nodo("=",desapilar(&pilaVar),desapilar(&pilaElementos)));	
																					PasignacionM = desapilar(&pilaAsignacionM);																																						
																					while( pilaVacia(&pilaAsignacionM) == 0)
																					{
																						PasignacionM = crear_nodo("Sentencia",PasignacionM,desapilar(&pilaAsignacionM));			
																					}
																				}																																																																								       																																																																																																																																													
																				contE = 0;
																				contV = 0;  };																																							
l_vari: ID { contV++; apilarVariable($1); apilar( &pilaVar, crear_hoja($1) ); }
        | l_vari COMA ID {apilarVariable($3); contV++; apilar( &pilaVar, crear_hoja($3) );};
lista_expresiones: elemento { contE++;}
				   | lista_expresiones COMA elemento{ contE++;} ;
elemento : expresion_numerica{ strcpy(variable.tipo,"numerico"); variable.indicador = -1; apilarExp(variable); apilar(&pilaElementos,desapilar(&pilaExpresionN)); }
			                   | expresion_string { variable.indicador = marca; if(marca == 1) { strcpy(variable.tipo,(char*) devolver_tipo($1)); } else strcpy(variable.tipo,"string"); apilarExp(variable); marca = 0; apilar(&pilaElementos,desapilar(&pilaExpresionS));};
asignacion: cadena_id expresion_numerica { aux_tipo = (char*) devolver_tipo($1);
										   if(strcmp(aux_tipo,"integer") != 0 && strcmp(aux_tipo,"float") != 0 )
										   {
										      printf("\nCompilacion Erronea..");
 											  printf("\nAsignacion Invalida. Lado izquierdo y derecho Incompatibles..\n");
 											  fclose(ArchArbol); system("del intermedia.tex > nul");
 											  exit(EXIT_FAILURE);
 										   }
										   Pasignacion=crear_nodo("=", Pcadena_id , desapilar( &pilaExpresionN ) );}
            | cadena_id expresion_string {
            							   if( marca == 1) 
            							   { 
            							      aux_tipo2 = (char*) devolver_tipo($1); 
            							   	  aux_tipo = (char*) devolver_tipo($2);        							   
            							   	  if(strcmp(aux_tipo,"CONST_STR") == 0 || strcmp(aux_tipo,"string") == 0 )
            							   	     if(strcmp(aux_tipo2,"string") != 0)
            							   	     {
            							   	        printf("\nCompilacion Erronea..");
 													printf("\nAsignacion Invalida. Lado izquierdo y derecho Incompatibles..\n");
 													fclose(ArchArbol); system("del intermedia.tex > nul");
 													exit(EXIT_FAILURE);
            							   	     }
            							   	  else
            							   	  {
            							   	     if(strcmp(aux_tipo,"CONST_INT") == 0 || strcmp(aux_tipo,"integer") == 0 || strcmp(aux_tipo,"float") == 0 || strcmp(aux_tipo,"CONST_REAL") == 0)
            							   	        if(strcmp(aux_tipo2,"integer") != 0 && strcmp(aux_tipo2,"float") != 0)
            							   	    	{
            							   	    		printf("\nCompilacion Erronea..");
 														printf("\nAsignacion Invalida. Lado izquierdo y derecho Incompatibles..\n");
 														fclose(ArchArbol); system("del intermedia.tex > nul");
 														exit(EXIT_FAILURE);
            							   	    	}
            							   	  }
            							   	  marca = 0;
            							   }	    
            							   else
            							   {
            							      aux_tipo2 = (char*) devolver_tipo($1);
            							      if(strcmp(aux_tipo2,"string") != 0)
            							      {
            							         printf("\nCompilacion Erronea..");
 												 printf("\nAsignacion Invalida. Lado izquierdo y derecho Incompatibles..\n");
 												 fclose(ArchArbol); system("del intermedia.tex > nul");
 												 exit(EXIT_FAILURE);
 											  }
 										   } 										            							   						 	                
             							   Pasignacion=crear_nodo("=", Pcadena_id , desapilar( &pilaExpresionS ) );};
cadena_id: ID OP_ASIG { aux_tipo = (char*) devolver_tipo($1); 
                        if( strcmp(aux_tipo,"float") != 0 && strcmp(aux_tipo,"string") != 0  && strcmp(aux_tipo,"integer") != 0)
                        {
                        	aux = (char*) devolver_lexema($1);
                        	printf("\nCompilacion Erronea.."); printf("\nVariable %s no declarada..\n",aux); fclose(ArchArbol); system("del intermedia.tex > nul"); exit(EXIT_FAILURE);
                        }
                        $$ = $1;
                        Pcadena_id = crear_hoja($1);}
	  | cadena_id ID OP_ASIG { aux_tipo = (char*) devolver_tipo($2); 
                        if( strcmp(aux_tipo,"float") != 0 && strcmp(aux_tipo,"string") != 0  && strcmp(aux_tipo,"integer") != 0)
                        {
                        	aux = (char*) devolver_lexema($2);
                        	printf("\nCompilacion Erronea.."); printf("\nVariable %s no declarada..\n",aux); fclose(ArchArbol); system("del intermedia.tex > nul"); exit(EXIT_FAILURE);
                        }
                        $$ = $2;
	  					Pcadena_id = crear_nodo("=",Pcadena_id,crear_hoja($2));};  
	  					         
expresion_string: factor_string OP_CONCAT factor_string { aux_tipo = (char*) devolver_tipo($1);
														  if( strcmp(aux_tipo,"string") != 0 && strcmp(aux_tipo,"CONST_STR") != 0)	 
														  { 
														  	printf("\nCompilacion Erronea..");
 														  	printf("\nExpresion String Invalida. Posee Factores que no son Strings..\n");
 														  	fclose(ArchArbol); system("del intermedia.tex > nul");
 														  	exit(EXIT_FAILURE);
 														  }
 														  aux_tipo = (char*) devolver_tipo($3);
														  if( strcmp(aux_tipo,"string") != 0 && strcmp(aux_tipo,"CONST_STR") != 0)	 
														  { 
														  	printf("\nCompilacion Erronea..");
 														  	printf("\nExpresion String Invalida. Posee Factores que no son Strings..\n");
 														  	fclose(ArchArbol); system("del intermedia.tex > nul");
 														  	exit(EXIT_FAILURE);
 														  }
														  apilar(&pilaExpresionS, crear_nodo("++", desapilar(&pilaFactorS), desapilar( &pilaFactorS) )) ;}
                  | factor_string {$$ = $1; marca = 1;
                                   apilar(&pilaExpresionS, desapilar( &pilaFactorS) );} ;
factor_string: CONST_STR { $$ = $1 ; apilar( &pilaFactorS, crear_hoja($1) ); }
		       | ID {   aux_tipo = (char*) devolver_tipo($1); 
                        if( strcmp(aux_tipo,"float") != 0 && strcmp(aux_tipo,"string") != 0  && strcmp(aux_tipo,"integer") != 0)
                        {
                        	aux = (char*) devolver_lexema($1);
                        	printf("\nCompilacion Erronea.."); printf("\nVariable %s no declarada..\n",aux); fclose(ArchArbol); system("del intermedia.tex > nul"); exit(EXIT_FAILURE);
                        }
                        $$ = $1;
		       			apilar( &pilaFactorS, crear_hoja($1) ); };    	  					
expresion_numerica: expresion_numerica OP_RESTA termino  { apilar( &pilaExpresionN, crear_nodo("-",desapilar( &pilaExpresionN ),desapilar(&pilaTermino) )) ;} 
					| expresion_numerica OP_SUMA termino {apilar( &pilaExpresionN, crear_nodo("+",desapilar( &pilaExpresionN ),desapilar(&pilaTermino) )) ;}
            		| termino { apilar( &pilaExpresionN, desapilar( &pilaTermino) );};            		
termino :  factor {apilar(&pilaTermino, desapilar( &pilaFactor) );}
	   | termino OP_MULT factor {apilar(&pilaTermino, crear_nodo("*", desapilar(&pilaTermino), desapilar( &pilaFactor) )) ;}
	   | termino OP_DIV factor  {apilar(&pilaTermino, crear_nodo("/",desapilar(&pilaTermino), desapilar( &pilaFactor) )) ;};
                 
factor: ID { aux_tipo = (char*) devolver_tipo($1); 
                        if( strcmp(aux_tipo,"float") != 0 && strcmp(aux_tipo,"string") != 0  && strcmp(aux_tipo,"integer") != 0)
                        {
                        	aux = (char*) devolver_lexema($1);
                        	printf("\nCompilacion Erronea.."); printf("\nVariable %s no declarada..\n",aux); fclose(ArchArbol); system("del intermedia.tex > nul"); exit(EXIT_FAILURE);
                        }
                        if(strcmp(aux_tipo,"float") !=0 && strcmp(aux_tipo,"integer") !=0)
                        {
                        	printf("\nCompilacion Erronea..");
 							printf("\nExpresion Numerica Invalida. Posee Factores que no son numericos..\n");
 							fclose(ArchArbol); system("del intermedia.tex > nul");
 							exit(EXIT_FAILURE); 
 						}
						apilar( &pilaFactor, crear_hoja($1) );} 
		| CONST_INT {apilar( &pilaFactor, crear_hoja($1) ) ;} 
        | CONST_REAL {apilar( &pilaFactor, crear_hoja($1) ) ;} 
        | PAR_A expresion_numerica PAR_C {apilar( &pilaFactor, desapilar( &pilaExpresionN) );};
                      	
seleccion: PR_IF condiciones PR_THEN lista_sentencias PR_ELSE {delimitadorDeAlcance( &pilaSentencias );} lista_sentencias PR_ENDIF { Pdecision= crear_nodo("If",desapilar(&pilaCondiciones),crear_nodo("cuerpo",construirArbolDeAlcance(), construirArbolDeAlcance() )) ;}
		   | PR_IF condiciones PR_THEN lista_sentencias PR_ENDIF { Pdecision = crear_nodo("If", desapilar(&pilaCondiciones), construirArbolDeAlcance() );};
		   
iteracion_while: PR_WHILE condiciones PR_DO lista_sentencias PR_ENDWHILE { Piteracion=crear_nodo("While", desapilar( &pilaCondiciones) , construirArbolDeAlcance() );};

iteracion_ciclo_especial: PR_WHILE ID PR_IN COR_A lista_expresionesE { delimitadorDeAlcance(  &pilaSentencias ); } COR_C PR_DO lista_sentencias PR_ENDWHILE { 
												while(pilavaciaVE() == 0)
												{
													variable = desapilarExp();		
													if(variable.indicador == 1)
													{
														if(strcmp(variable.tipo,"string") == 0 || strcmp(variable.tipo,"CONST_STR") == 0)
															if(strcmp((char*) devolver_tipo($2),"string") != 0)
															{
																printf("\nCompilacion Erronea..");
							 									printf("\nAsignacion Invalida en ciclo While [variable] in, no puede haber expresiones que posean tipo incompatible con la variable...\n");
																fclose(ArchArbol); system("del intermedia.tex > nul");
																exit(EXIT_FAILURE);
															}
													}
													else
													{
														if(strcmp(variable.tipo,"numerico") == 0)
														{
															if(strcmp((char*) devolver_tipo($2),"integer") != 0 && strcmp( (char*) devolver_tipo($2),"float") != 0 )
															{
																printf("\nCompilacion Erronea..");
							 									printf("\nAsignacion Invalida en ciclo While [variable] in, no puede haber expresiones que posean tipo incompatible con la variable...\n");
																fclose(ArchArbol); system("del intermedia.tex > nul");
																exit(EXIT_FAILURE);
															}
														}
														else
														{
															if(strcmp((char*) devolver_tipo($2),"string") != 0)
															{								
																printf("\nCompilacion Erronea..");
							 									printf("\nAsignacion Invalida en ciclo While [variable] in, no puede haber expresiones que posean tipo incompatible con la variable...\n");
																fclose(ArchArbol); system("del intermedia.tex > nul");
																exit(EXIT_FAILURE);
															}	
														}
													}
												}						
																				
												while(pilaVacia(&pilaElementos) == 0)
													apilar(&pilaElementosAux,desapilar(&pilaElementos));																																																			       
											    Parbe = desapilar(&pilaElementosAux); 
											    while(pilaVacia(&pilaElementosAux) == 0)
											       Parbe = crear_nodo("Sentencia",Parbe,desapilar(&pilaElementosAux));
												Praize = crear_nodo("in",crear_hoja($2),Parbe);																																																							 
												PiteracionE = crear_nodo("While", Praize , construirArbolDeAlcance() );};
lista_expresionesE: elementoE 
				   | lista_expresionesE COMA elementoE ;
elementoE : expresion_numerica{ strcpy(variable.tipo,"numerico"); variable.indicador = -1; apilarExp(variable); apilar(&pilaElementos,desapilar(&pilaExpresionN)); }
			                   | expresion_string { variable.indicador = marca; if(marca == 1) { strcpy(variable.tipo,(char*) devolver_tipo($1));  marca = 0; } else strcpy(variable.tipo,"string"); apilarExp(variable); apilar(&pilaElementos,desapilar(&pilaExpresionS));};
			                   
condiciones : condicion { apilar( &pilaCondiciones, desapilar( &pilaCondicion )) ; delimitadorDeAlcance(  &pilaSentencias );}
	    | condicion OP_AND condicion { apilar( &pilaCondiciones, crear_nodo( "and", desapilar(&pilaCondicion), desapilar(&pilaCondicion) ) )  ; delimitadorDeAlcance(  &pilaSentencias ); }
	    | condicion OP_OR condicion { apilar( &pilaCondiciones, crear_nodo( "or", desapilar(&pilaCondicion), desapilar(&pilaCondicion) ) ) ; delimitadorDeAlcance(  &pilaSentencias );};
	    
condiciones : OP_NOT condicion { apilar( &pilaCondiciones, crear_nodo("not", desapilar(&pilaCondicion),NULL) ); delimitadorDeAlcance(  &pilaSentencias );} ;

condicion : expresion_string MAYOR expresion_string { apilar( &pilaCondicion, crear_nodo("$>$",desapilar( &pilaExpresionS), desapilar( &pilaExpresionS) ));}				   	                 						                              					           					   
	  | expresion_string MAYOR_IGUAL expresion_string { apilar( &pilaCondicion, crear_nodo("$>=$",desapilar( &pilaExpresionS),desapilar( &pilaExpresionS)));}
	  | expresion_string MENOR expresion_string {  apilar( &pilaCondicion, crear_nodo("$<$",desapilar( &pilaExpresionS),desapilar( &pilaExpresionS)));}
	  | expresion_string MENOR_IGUAL expresion_string { apilar( &pilaCondicion, crear_nodo("$<=$",desapilar( &pilaExpresionS),desapilar( &pilaExpresionS)));}
	  | expresion_string IGUAL_IGUAL expresion_string {  apilar(  &pilaCondicion,crear_nodo("==",desapilar( &pilaExpresionS),desapilar( &pilaExpresionS)));}
	  | expresion_string DIFERENTE expresion_string {  apilar( &pilaCondicion, crear_nodo("!=",desapilar(&pilaExpresionS),desapilar( &pilaExpresionS)));} ;

condicion : expresion_numerica MAYOR expresion_numerica { apilar( &pilaCondicion, crear_nodo("$>$",desapilar( &pilaExpresionN), desapilar( &pilaExpresionN) ));}
	  | expresion_numerica MAYOR_IGUAL expresion_numerica { apilar( &pilaCondicion, crear_nodo("$>=$",desapilar( &pilaExpresionN),desapilar( &pilaExpresionN)));}
	  | expresion_numerica MENOR expresion_numerica {  apilar( &pilaCondicion, crear_nodo("$<$",desapilar( &pilaExpresionN),desapilar( &pilaExpresionN)));}
	  | expresion_numerica MENOR_IGUAL expresion_numerica { apilar( &pilaCondicion, crear_nodo("$<=$",desapilar( &pilaExpresionN),desapilar( &pilaExpresionN)));}
	  | expresion_numerica IGUAL_IGUAL expresion_numerica {  apilar(  &pilaCondicion,crear_nodo("==",desapilar( &pilaExpresionN),desapilar( &pilaExpresionN)));}
	  | expresion_numerica DIFERENTE expresion_numerica {  apilar( &pilaCondicion, crear_nodo("!=",desapilar(&pilaExpresionN),desapilar( &pilaExpresionN)));} ;
%%
int main(int argc,char *argv[])
{
	inicializarPila( & pilaExpresionS );
	inicializarPila( & pilaVar );
	inicializarPila( & pilaElementos );
	inicializarPila( & pilaElementosAux );
	inicializarPila( & pilaExpresionN );
    inicializarPila( & pilaSentencias );
    inicializarPila( & pilaTermino );
    inicializarPila( & pilaFactor );
    inicializarPila( & pilaFactorS );
    inicializarPila( & pilaAsignacionM );
    inicializarPila( & pilaCondiciones );
    inicializarPila( & pilaCondicion );
    delimitadorDeAlcance(& pilaSentencias);
    ArchArbol = fopen("intermedia.tex", "w");
    if( ArchArbol == NULL )
    {
    	printf("\nError: No se pudo crear el archivo intermedia.tex\n");
    	exit(EXIT_FAILURE);
    }
	if ((yyin = fopen(argv[1], "rt")) == NULL) {
		printf("\nNo se puede abrir el archivo: %s\n", argv[1]);
	} else {
		yyparse();
	}

	fclose(yyin);
	guardar_TS_en_archivo();
  	fclose(ArchArbol);
  	system("pdflatex tree.tex > nul");
	return 0;
}
int yyerror(void)
{
	printf("\nCompilacion Erronea..");
 	printf("\nEl programa tiene errores Sintacticos..\n");
 	fclose(ArchArbol);
 	system("del intermedia.tex > nul");
	system("Pause");
	exit(1);
}

//Funcion para agregar los tipos de las variables a la Tabla de simbolos cuando se detectan en las declaraciones.
void actualizar_tipos_en_TS() {
	int indiceFinal, i, posicionTS;

	if(indiceTipos < indiceIds) {
		indiceFinal = indiceTipos;
	} else {
		indiceFinal = indiceIds;
	}
	
	for(i = 0 ; i < indiceFinal ; i++) {
		guardar_tipo_en_TS(listaDeclaraciones[i].id, listaDeclaraciones[i].tipo);
	}
	
	indiceTipos = 0;
	indiceIds = 0;
}
// Funciones De Arbol Sintactico
t_nodo * crear_nodo( char* contenido , t_nodo* izq , t_nodo* der )
{
     t_nodo * pNodo = (t_nodo *) malloc( 1 * sizeof(t_nodo) );

     if ( pNodo == NULL )
     {  
        printf("\nError: no es posible asignar memoria para generar el arbol de codigo intermedio.\n");
        exit(1);
     }
    
    pNodo -> datos.tipoNodo = 'n'; 
    pNodo -> datos.datoChar =  contenido;
    pNodo -> datos.dato = -1;
    pNodo-> izq = izq;
    pNodo-> der = der;
  
    return pNodo;
}
t_nodo * crear_hoja( int paramDato)
{
     t_nodo * pHoja = (t_nodo *) malloc( 1 * sizeof(t_nodo) );

     if ( pHoja == NULL )
     {  
        printf("\nError: no es posible asignar memoria para generar el arbol de codigo intermedio.\n");
        exit(1);
     }
     
     pHoja -> datos.tipoNodo = 'h';
     pHoja -> datos.datoChar =  NULL; 
     pHoja -> datos.dato = paramDato;
     pHoja -> izq = pHoja -> der = NULL;
     
    return pHoja;
}

char * strrep(char *str, char old, char new)  {
    
    char *pos = NULL;
    pos = strchr(str, old);

    if ( pos != NULL )
    {
      *pos = new;
    }
  
    return str;
}

// Funciones De Pila

t_nodo* apilar (t_pila * Ppila, t_nodo * nodo )
{  
  Ppila->tope++;
  Ppila->pila[ Ppila->tope ]= nodo;  
  return Ppila->pila[ Ppila->tope ] ;
}
t_nodo* desapilar(t_pila * Ppila)
{
     t_nodo * nodo;
     nodo =  Ppila->pila[ Ppila->tope ];
     Ppila->tope--;
   
     return nodo;
}
int pilaVacia(t_pila * Ppila)
{
    int vacia = 0;

    if( Ppila->tope == -1 )
    {
        vacia= 1;
    }
    return vacia;
}
t_nodo * verPrimero ( t_pila * Ppila )
{       
    return  Ppila->pila[ Ppila->tope ];
}
void inicializarPila (t_pila * Ppila )
{
    Ppila-> tope = -1;
}

t_nodo * construirArbolDeAlcance()
{
    t_pila pilaAux;
    t_nodo * nodo_aux,* nodo_tope;
    t_nodo * sentencia;

    inicializarPila( &pilaAux );
    
    sentencia = desapilar( &pilaSentencias ) ;      

    while (  !pilaVacia( &pilaSentencias )  && strcmp( sentencia->datos.datoChar , "delimitadorDeAlcance" ) != 0  )
    {
        apilar( &pilaAux, sentencia );
        sentencia = desapilar( &pilaSentencias ) ;     
    }

    nodo_aux = crear_nodo( "Sentencia", NULL , NULL );    

    nodo_tope = nodo_aux;

    while ( !pilaVacia( &pilaAux )  )
    {
        nodo_aux->izq = desapilar( &pilaAux );
      
        nodo_aux->der = crear_nodo( "Sentencia", NULL , NULL );
        nodo_aux = nodo_aux->der;
  
    }
    
    return nodo_tope;
}

void delimitadorDeAlcance( t_pila * Ppila)
{
    t_nodo * nodo_aux = crear_nodo( "delimitadorDeAlcance" , NULL  , NULL  );
       
    apilar( Ppila, nodo_aux  )  ;
}

void mostrar( t_dato * paramDato) 
{
    
    if(paramDato)
    {
      if ( paramDato->tipoNodo == 'n' )
      {
          fprintf(ArchArbol ," .%s. ", strrep(paramDato -> datoChar,'.',',') );
      }
      else
      {
         aux = (char*) devolver_lexema(paramDato -> dato);
         if(*aux == '_')
         	aux++;
         fprintf(ArchArbol ," .%s. ", strrep( aux,'.',',') );
      }
    }
    else
      fprintf(ArchArbol, "( .Programa. ");
}
void mostrar_preorden(t_nodo * arbol)
{
  if( arbol )
  {
    if ( arbol->der || arbol->izq )
        fprintf(ArchArbol ," ( ");
    
    mostrar( &arbol->datos );
     
    mostrar_preorden(arbol->izq);
    
    mostrar_preorden(arbol->der);
    
    if ( arbol->der || arbol->izq )
            fprintf(ArchArbol ," ) ");
    
  }
}

void crearasm()
{
	FILE *asem;
	asem=fopen("final.txt", "w" );
	if(asem == NULL)
	{
		printf("Error al crear el archivo final.txt\n");
		exit(EXIT_FAILURE);
	}
	insertarvariablesasm(asem);
	fclose(asem);
}
void insertarvariablesasm(FILE *salida){
	int ind,i;
	char nombre[100],tipo[100];
	/*AGREGO LA CABECERA*/
	fprintf (salida, ".MODEL LARGE\n");
    fprintf (salida, ".386\n");
    fprintf (salida, ".STACK 200h\n");
    fprintf (salida, ".DATA\n");
    ind = devolver_indice();
    for(i=0;i<ind;i++)
    {
		strcpy(nombre,(char*) devolver_lexema(i));
		strcpy(tipo, (char*) devolver_tipo(i));
		if( strcmp(tipo,"string") == 0)
			fprintf(salida, "\t%s db %d dup (?),'$'\n", nombre, MAX_LONG);
		else
		{
			if(strcmp(tipo,"integer") == 0)
				fprintf(salida, "\t%s dd ?\n", nombre);
			else
			{
			   if(strcmp(tipo,"float") == 0)
			      fprintf(salida, "\t%s dd ?\n", nombre);
			}
		}
	}
 	fprintf (salida, ".CODE\n"); 
 	fprintf (salida, "\tmov ax,@data\n");
    fprintf (salida, "\tmov ds,ax\n");
    fprintf (salida, "\tmov AH,09h\n");
    fprintf (salida, "\tint 21h\n");
    fprintf (salida, "\tmov ah,4ch\n");
    fprintf (salida, "\tint 21h\n");
    fprintf (salida, "END\n"); 
}