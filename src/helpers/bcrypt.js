const bcrypt = require('bcryptjs');  
const salt = bcrypt.genSaltSync(10);  

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};


const verifyPassword = (password, passwordHashed) => {
    return bcrypt.compareSync(password, passwordHashed);

}

module.exports = { hashPassword, verifyPassword }

//a dif. de jwt que tiene decode, no hay deshash. Se encripta y de dehashea. 
// Adm no puede recuperar password olvidada, solo reestablecerla
// se debe hashear en un solo lugar. si es aquí, entonces no en modelo