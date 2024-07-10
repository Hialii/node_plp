const express = require('express');
const server = express();

const port = 3000;

server.use(express.json());


const alunos = [
   {id: 1, name: "Pedro"},
   {id: 2, name: "Hiali"}
]

server.get("/alunos", (req, res) => {
   res.json(alunos);
})

server.get("/alunos/:id", (req, res) => {
   const id = parseInt(req.params.id);
   const aluno = alunos.find(aluno => aluno.id === id);

   if(!aluno) {
      return res.status(404).send('Aluno não foi encontrado')
   }

   res.json(aluno)
})

server.post('/alunos', (req, res) => {
   const {name} = req.body;

   const id = alunos.length + 1

   const novoAluno = {id, name}

   alunos.push(novoAluno)

   res.json(novoAluno)

})


server.put('/alunos/:id', (req, res) => {
   const id = parseInt(req.params.id);

   const {name} = req.body;

   const aluno = alunos.find(aluno => aluno.id === id);

   if(!aluno) {
      return res.status(404).send('Usuário não encontrado')
   }

   aluno.name = name
   res.json(aluno)
})


server.delete('/alunos/:id', (req, res) => {
   const id = parseInt(req.params.id);

   const index = alunos.findIndex(aluno => aluno.id === id);

   if(index === -1) {
      return res.send('Aluno não encontrado')
   }

   alunos.splice(index, 1)
   res.send('Aluno deletado')
})











server.listen(port, () => {
   console.log("Servidor rodando")
});