hombre(pedro).
hombre(manuel).
hombre(arturo).
mujer(maría).

padre(pedro, manuel).
padre(pedro, arturo).
padre(pedro, maría) .

niño(X,Y) :- padre(Y,X).
hijo(X,Y) :- padre(Y,X) , hombre(X).
hija(X,Y) :- padre(Y,X) , mujer(X).

hermanohermana(X,Y) :- padre(Z,Y) , padre(Z,X), not(X==Y).
hermano(X,Y) :- hermanohermana(X,Y) , hombre(X).
hermana(X,Y) :- hermanohermana(X,Y) , mujer(X).

