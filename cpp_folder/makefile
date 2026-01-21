CC=g++ -O3 -g -Wall -Wextra -std=c++17
UNAME_S := $(shell uname -s)

#CC=g++ -std=c++17 -O3 -g -Wall -Wextra -fsanitize=undefined -fno-sanitize=object-size -fsanitize=address -fsanitize=leak -fsanitize=signed-integer-overflow -fsanitize=bounds-strict

ifeq ($(UNAME_S),Darwin)
    GLLIBS = -framework GLUT -framework OpenGL
else
    GLLIBS = -lglut -lGLEW -lGL -lGLU -lX11 -L/usr/lib/nvidia-375
endif

all: testGrid

test: testGrid
	./testGrid

clean:
	rm -f ./testGrid

testGrid: TestGrid.cpp Grid.cpp Grid.h
	$(CC) TestGrid.cpp Grid.cpp -Wno-write-strings -o ./testGrid $(GLLIBS)

UNAME_S := $(shell uname -s)

testg: Test.cpp Grid.cpp Grid.h
	$(CC) Test.cpp Grid.cpp -lglut -lGLEW -lGL -lGLU -lX11 -L/usr/lib/nvidia-375 -Wno-write-strings -o ./testg

tar:
	rm -f *~ a3.tar
	tar cf a3.tar *

submit:
	echo "submit README.txt GridPriv.h GridInclude.h Grid.cpp via eClass"
