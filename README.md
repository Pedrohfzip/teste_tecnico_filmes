Clonar Projeto
  git clone https://github.com/Pedrohfzip/teste_tecnico_filmes.git 

Iniciar Projeto

SIGA TODOS OS PASSOS !

-Banco de Dados: 
     O banco de dados foi implementado atraves do aplicativo pgAdmin4 do postgres 
      Download: https://www.pgadmin.org/download/pgadmin-4-windows/
      
      
- Criar um banco de dados com o nome dev
- ![image](https://github.com/Pedrohfzip/teste_tecnico_filmes/assets/82663313/93775a09-eeff-46d2-93a7-ff11ba4a5259)
        
- Clique com o mouse direito em no schema public e abra o Query Tool
- ![image](https://github.com/Pedrohfzip/teste_tecnico_filmes/assets/82663313/63fed7b6-cc60-42fa-8e0b-e1c0414e40b0)

      -Entao execute estes SQL´s: 
        CREATE TABLE IF NOT EXISTS movies (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          release_year INTEGER NOT NULL,
          available BOOLEAN NOT NULL
        );

      CREATE TABLE IF NOT EXISTS actors (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          nationality VARCHAR(100) NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS movies_actors (
          id SERIAL PRIMARY KEY,
          movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
          actor_id INTEGER REFERENCES actors(id) ON DELETE CASCADE
      );


    
  1 ° - Despois de clonar o repositório abra 2 terminais na pasta do projeto 
  2° - Em um terminal execute " npm run start ", para iniciar o React
        Em outro terminal execute "npm run dev" para inicar a API
