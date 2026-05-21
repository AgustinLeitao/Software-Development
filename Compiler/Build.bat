flex Lexico.l
bison -dyv Sintactico.y
gcc lex.yy.c y.tab.c -o Sintactico.exe
Sintactico.exe prueba.txt
del lex.yy.c
del y.tab.c
del y.output
del y.tab.h
del Sintactico.exe
del intermedia.aux
del tree.log
del tree.aux
pause