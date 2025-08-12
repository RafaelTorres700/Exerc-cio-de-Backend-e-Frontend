const db = require('../db')

//exibir os dados da tabela games
exports.getAll = (req, res) => {
    const sql = 'select * from games'
    db.query(sql, (erro, resultado) => {
        if(erro) return res.status(500).json({erro: erro})
            res.json(resultado)
    })
}

//criar registros na tabela games
exports.create = (req, res) => {
    const {nome, tipo, ano} = req.body;
    const sql = 'insert into games (nome, tipo, ano) values (?, ?, ?)'
    db.query(sql, [nome, tipo, ano], (erro) => {
        if(erro) return res.status(500).json({erro: erro})
            res.status(201).json({ mensagem: 'game criado com sucesso!!' })
    })
}

//atualizar registros da tabela games
exports.update = (req, res) => {
    const {id} = req.params;
    const {nome, tipo, ano} = req.body;
    const sql = 'update games set nome = ?, tipo = ?, ano = ? where id = ?'
    db.query(sql, [nome, tipo, ano, id], (erro) => {
        if(erro) return res.status(500).json({erro: erro})
            res.json({ mensagem: 'Game atualizado com sucesso!!' })
    })

 }

 // Excluir registros da tabela games
exports.delete = (req, res) => {
    const {id} = req.params;
    const sql = 'delete from games where id = ?'
    db.query(sql, [id], (erro) => {
        if(erro) return res.status(500).json({erro: erro})
            res.json({ mensagem: 'Game excluido com sucesso!!' })
    })
}