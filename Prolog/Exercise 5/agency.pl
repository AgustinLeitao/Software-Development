hombre(juan,alta,negro,adulta).
hombre(pedro,media,rubio,joven).
hombre(arturo,baja,castaño,vieja).

mujer(maria,baja,castaño,joven).
mujer(marta,media,pelirrojo,adulta).
mujer(laura,baja,rubio,vieja).

gusta(juan,pop,aventura,tenis).
gusta(pedro,pop,cienciaficcion,natacion).
gusta(arturo,jazz,policiaca,jogging).
gusta(maria,clasico,aventura,tenis).
gusta(marta,pop,aventura,tenis).
gusta(laura,clasico,policiaca,jogging).

busca(juan,media,pelirrojo,adulta) .
busca(pedro,baja,rubio,joven) .
busca(arturo,media,pelirrojo,joven) .
busca(maria,baja,castaño,joven) .
busca(marta,alta,negro,adulta) .
busca(laura,media,pelirrojo,adulta) .

caracteristicas(X,Y,Z,W) :- hombre(X,Y,Z,W) ; mujer(X,Y,Z,W).
verificarsexodif(X,Y) :- hombre(X,_,_,_) , mujer(Y,_,_,_).
verificarsexodif(X,Y) :- hombre(Y,_,_,_) , mujer(X,_,_,_).

coincidencia(Nombre,Altura,Cabello,Edad) :- busca(Nombre,Altura,Cabello,Edad) ,
	                                    caracteristicas(Nombre,AlturaP,CabelloP,EdadP) ,
					    busca(NombreP,AlturaP,CabelloP,EdadP) ,
					    verificarsexodif(Nombre,NombreP) ,
					    caracteristicas(NombreP,Altura,Cabello,Edad) ,
					    gusta(Nombre,Musica,Libros,Deportes) ,
					    gusta(NombreP,Musica,Libros,Deportes).












