entrada(paella).
entrada(gazpacho).
entrada(consomé).

carne(filete_de_cerdo).
carne(pollo_asado).

pescado(trucha).
pescado(bacalao).

postre(flan).
postre(helado).
postre(pastel).

bebida(vino).
bebida(cerveza).
bebida(agua).

principal(X):-carne(X);pescado(X).
menucompleto(X,Y,W,Z) :- entrada(X) , principal(Y), postre(W) , bebida(Z).
consome(X,Y,W,Z) :- menucompleto(X,Y,W,Z) , X==consomé.
filtro(X,Y,W,Z) :- menucompleto(X,Y,W,Z) , not(W==flan).
