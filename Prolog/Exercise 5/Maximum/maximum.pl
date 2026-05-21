numeros(1).
numeros(1).
numeros(2).
numeros(3).
numeros(4).

productocart(X,Y) :- numeros(X) , numeros(Y).
seleccion(X,Y) :- productocart(X,Y) , X>Y.
proyeccion(X) :- seleccion(X,_).
maximo(X) :- numeros(X) , not(proyeccion(X)).
