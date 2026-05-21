%{
#include <stdio.h>
#include <stdlib.h>
#include <conio.h>
#include <string.h>
#include "y.tab.h"
FILE  *yyin;

#define FLT_MAX 3.4028235E38
#define INT_MAX 32767
#define LEXEMA_SIZE 100
#define TSROWS 100000

int yylval;

struct TS { 
	char lexema[LEXEMA_SIZE]; /* CTE, ID */
	char tipo[20]; /* En el nivel lexico el tipo es desconocido */
	char valor[100]; /* En el nivel lexico, el valor se incluye solo si es constante */
};

struct TS tablaSimbolos[TSROWS]; 
int cantidadFilasTS = 0;

void validar_entero(char *enteroString);
void validar_real(char *realString);
void validar_string(char *string);
int guardar_en_TS(char *lexema, char *tipo, char *valor, int esCTE);
int buscar_en_TS(char *nombreDeSimbolo);
char* devolver_lexema(int);
char* devolver_tipo(int);
void guardar_TS_en_archivo();
int guardar_tipo_en_TS(char *lexema, char *tipo);

%}

%option noyywrap  
%option yylineno 

DIGITO			[0-9]
LETRA			[a-zA-Z]
CONST_STR       \"({LETRA}|{DIGITO})*\"
CONST_REAL      (({DIGITO}+"."{DIGITO}*)|({DIGITO}*"."{DIGITO}+))
CONST_INT       {DIGITO}+
ID			    {LETRA}({LETRA}|{DIGITO}|_)*
COMENTARIO      (("-/"({LETRA}|{DIGITO}|[ ])*"/-")|("-/"({LETRA}|{DIGITO}|[ ])*"-/"({LETRA}|{DIGITO}|[ ])*"/-"({LETRA}|{DIGITO}|[ ])*"/-"))
COMA            ","
DOS_PUNTOS		":"
MENOR 			"<"
IGUAL_IGUAL		"=="
MAYOR			">"
MENOR_IGUAL		"<="
MAYOR_IGUAL		">="
DIFERENTE		"!="
OP_CONCAT		"++"
OP_SUMA        	"+"
OP_RESTA		"-"
OP_MULT      	"*"
OP_DIV			"/"
OP_ASIG   		":="
OP_AND          "and"
OP_OR			"or"
OP_NOT			"not"
COR_A           "["
COR_C           "]"
PAR_A           "("
PAR_C           ")"
PR_WRITE		"WRITE"
PR_READ			"READ"
PR_VAR			"VAR"
PR_ENDVAR		"ENDVAR"
PR_REAL			"float"
PR_INTEGER		"integer"
PR_STRING		"string"
PR_IF			"if"
PR_THEN			"then"
PR_ELSE			"else"
PR_ENDIF		"endif"
PR_WHILE		"while"
PR_DO			"do"
PR_ENDWHILE		"endwhile"
PR_IN			"in"


%%

{PR_VAR}         	{ return PR_VAR;}
{PR_ENDVAR}      	{ return PR_ENDVAR;}
{PR_REAL}		  	{ return PR_REAL;}
{PR_INTEGER}	  	{ return PR_INTEGER;}
{PR_STRING}	  		{ return PR_STRING;}
{PR_IF}		  		{ return PR_IF;}
{PR_THEN}   	  	{ return PR_THEN;}
{PR_ELSE}    	  	{ return PR_ELSE;}
{PR_ENDIF}      	{ return PR_ENDIF;}
{PR_WHILE}	     	{ return PR_WHILE;}
{PR_DO}	      		{ return PR_DO;}
{PR_ENDWHILE} 	  	{ return PR_ENDWHILE;}
{PR_IN}	      		{ return PR_IN;}
{PR_WRITE}       	{ return PR_WRITE;}
{PR_READ}        	{ return PR_READ;}
{OP_ASIG}		  	{ return OP_ASIG;}
{OP_CONCAT}			{ return OP_CONCAT;}
{OP_SUMA}			{ return OP_SUMA;}
{OP_RESTA}			{ return OP_RESTA;}
{OP_MULT}			{ return OP_MULT;}
{OP_DIV}			{ return OP_DIV;}
{PAR_A}		  		{ return PAR_A;}
{PAR_C}			  	{ return PAR_C;}
{COR_A}			  	{ return COR_A;}
{COR_C}			  	{ return COR_C;}
{MAYOR}           	{ return MAYOR;}
{MAYOR_IGUAL}       { return MAYOR_IGUAL;}
{MENOR}           	{ return MENOR;}
{MENOR_IGUAL}       { return MENOR_IGUAL;}
{DIFERENTE}         { return DIFERENTE;}
{IGUAL_IGUAL}       { return IGUAL_IGUAL;}
{OP_AND}         	{ return OP_AND;}
{OP_OR}          	{ return OP_OR;}
{OP_NOT}         	{ return OP_NOT;}
{ID}		  		{ yylval = guardar_en_TS(yytext, "", "", 0); return ID; }
{CONST_INT}	  		{ validar_entero(yytext); yylval = guardar_en_TS(yytext, "CONST_INT", yytext, 1); return CONST_INT; }
{CONST_STR}	  		{ validar_string(yytext); yylval = guardar_en_TS(yytext, "CONST_STR", yytext, 1); return CONST_STR; }
{CONST_REAL}  		{ validar_real(yytext); yylval = guardar_en_TS(yytext, "CONST_REAL", yytext, 1); return CONST_REAL; }
{COMA}		  		{ return COMA;}
{DOS_PUNTOS}        { return DOS_PUNTOS;}
{COMENTARIO} 		;
[ \t\n]       		;      			
.             		;         
%%

void validar_entero(char *enteroString) {
	int valor;
	valor = atoi(enteroString);
	
	if(valor > INT_MAX) {
		printf("\nConstante entera %s fuera de rango!", enteroString);
		exit(1);
	}
}

void validar_real(char *realString) {
	double valor;
	valor = atof(realString);
	
	if(valor == 0) {
		return;
	}
	
	if(valor > FLT_MAX) {
		printf("\nConstante real %s fuera de rango!", realString);
		exit(1);
	}

}

void validar_string(char *string) {
	int tamanio = strlen(string);
	
	if(tamanio >= 32) {
		printf("\nConstante string %s fuera de rango!", string);
		exit(1);
	}
}

/******************************************************************************************
**************************** FUNCIONES DE TABLA DE SIMBOLOS *******************************
******************************************************************************************/

/* Primero busca el lexema en TS.
Si lo encuentra: modifica los valores
Si no lo encuentra, lo agrega a la TS
En cualquiera de los dos casos, devuelve la posicion de TS donde lo agrego */

int guardar_en_TS(char *lexema, char *tipo, char *valor, int esCTE) {
	int posicionEnTS = -1;	
	char valor_new[100];
	char nuevoLexema[LEXEMA_SIZE + 1] = "";
	
	/*Agrego el '_' al lexema */
	if(esCTE == 1) {
		nuevoLexema[0] = '_';
		nuevoLexema[1] = '\0';
	}
	if(strcmp(tipo,"CONST_STR") == 0)
	{
		lexema++;
		char *aux = lexema;
		while(*lexema != '\0')
			lexema++;
		lexema--;
		*lexema = '\0';
		lexema = aux;
		strcpy(valor_new,lexema);
	}		
	strcat(nuevoLexema, lexema);
	posicionEnTS = buscar_en_TS(nuevoLexema);
	
	if(posicionEnTS != -1) {
		/*Lo encontro! Actualiza!*/
		if(strcmp(tablaSimbolos[posicionEnTS].tipo, tipo) != 0 && strcmp(tipo, "") != 0) {
			printf("\n1 Variable %s de tipo %s no puede cambiar a tipo %s!!", lexema, tablaSimbolos[posicionEnTS].tipo, tipo);
			exit(1);
		}
	} else {
		/*No lo encontro! Agrega!*/
		strcpy(tablaSimbolos[cantidadFilasTS].lexema, nuevoLexema);
		strcpy(tablaSimbolos[cantidadFilasTS].tipo, tipo);
		if(strcmp(tipo,"CONST_STR") == 0)
			strcpy(tablaSimbolos[cantidadFilasTS].valor, valor_new);	
		else
			strcpy(tablaSimbolos[cantidadFilasTS].valor, valor);	
		cantidadFilasTS++;
		posicionEnTS = cantidadFilasTS -1;
	}

	return posicionEnTS;
}

/*	USAR SOLO EN LEXICO
	Busca un simbolo en la TS devolviendo su posicion en la misma.
	Si no lo encuentra devuelve -1 	*/
int buscar_en_TS(char *nombreDeSimbolo) {
	int i = 0;
	
	for(i = 0 ; i < cantidadFilasTS ; i++) {
		if(strcmp(nombreDeSimbolo, tablaSimbolos[i].lexema) == 0) {
			return i;
		}
	}
	
	return -1;
}

void guardar_TS_en_archivo() {
	int i = 0;
	FILE *tosFP;
	
	tosFP = fopen("ts.txt", "w+");
	if(tosFP == NULL) {
		printf("\nIMPOSIBLE GUARDAR TS EN ARCHIVO!");
		exit(1);
	}
	
	fprintf(tosFP, "NOMBRE \t\t\t TIPO \t\t\t VALOR");
	
	for(i = 0 ; i < cantidadFilasTS ; i++) {
		fprintf(tosFP, "\n%s \t\t\t %s \t\t\t %s", tablaSimbolos[i].lexema, tablaSimbolos[i].tipo, tablaSimbolos[i].valor);
	}
	
	fclose(tosFP);
}

int guardar_tipo_en_TS(char *lexema, char *tipo) {
	int posicionEnTS = -1;	
	
	posicionEnTS = buscar_en_TS(lexema);
	
	if(posicionEnTS != -1) {
		/*Lo encontro! Actualiza!*/
		if(strcmp(tablaSimbolos[posicionEnTS].tipo, "") == 0) {
			strcpy(tablaSimbolos[posicionEnTS].tipo, tipo);
		} else {
			/* Lo encontro e intenta actualizar pero es de tipo diferente!*/
			if(strcmp(tablaSimbolos[posicionEnTS].tipo, tipo) != 0) {
				printf("\nVariable %s de tipo %s no puede cambiar a tipo %s!!", lexema, tablaSimbolos[posicionEnTS].tipo, tipo);
				exit(1);
			}
		}

	} else {
		/*No lo encontro! Es un error porque debería encontrarlo!*/
		printf("Error: No encontró la lexema solicitada: %s\n", lexema);
		exit(1);

	}

	return posicionEnTS;
}

char* devolver_lexema(int pos)
{
    return tablaSimbolos[pos].lexema;
}
char* devolver_tipo(int pos)
{
	return tablaSimbolos[pos].tipo;
}
int devolver_indice()
{
	return cantidadFilasTS;
}