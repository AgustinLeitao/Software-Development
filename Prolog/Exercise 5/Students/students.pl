alumno(pedro,4,10).
alumno(valentin,10,9).
alumno(alonso,4,8).
alumno(carla,2,9).
alumno(stefi,4,4).

aprobados(Alumno,Nota) :- alumno(Alumno,X,Y), X>=7 , Y>=7, Nota is (X+Y)/2.
reprueban(Alumnos) :- alumno(Alumnos,X,Y) , (X < 4 ; Y < 4).
cursan(Alumnos) :- alumno(Alumnos,_,_) , not(aprobados(Alumnos,_)) , not(reprueban(Alumnos)).
productocart(X,Y) :- aprobados(_,X) , aprobados(_,Y).
seleccion(X,Y) :- productocart(X,Y) , X<Y.
proyeccion(X) :- seleccion(X,_).
maximo(Nombre,Nota) :- aprobados(Nombre,Nota) , not(proyeccion(Nota)).
