const bcrypt = require('bcrypt');

const plainPassword = '123';
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
    if (err) {
        console.error('Erro ao gerar o hash:', err);
        return;
    }
    console.log('Senha em texto plano:', plainPassword);
    console.log('Hash gerado:', hash);
});
