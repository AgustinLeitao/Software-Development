destino(roma).
destino(londres).
destino(tunez).

preciotransporte(roma,50).
preciotransporte(londres,150).
preciotransporte(tunez,250).

preciosemanal(roma,hotel,350).
preciosemanal(londres,hotel,1000).
preciosemanal(tunez,hotel,2000).
preciosemanal(roma,camping,250).
preciosemanal(londres,camping,800).
preciosemanal(tunez,camping,1500).
preciosemanal(roma,hostal,300).
preciosemanal(londres,hostal,900).
preciosemanal(tunez,hostal,1600).

multiplicar(P,X,Y):- P is X*Y.
sumar(S,X,Y):- S is X+Y.
menor(X,Y):-X<Y.
calcularprecio(X,Y,W,Z) :- multiplicar(P,X,Y) ,sumar(Z,W,P).
viajes(X,Y,Z,W) :- preciosemanal(X,Z,L) , preciotransporte(X,Q) , calcularprecio(L,Y,Q,W).
viajeconomico(C,S,H,P,M) :- viajes(C,S,H,P) , menor(P,M).


