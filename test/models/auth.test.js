const {verificarCredenciales, register, readUsuario, deleteUsuario, existsEmail, existsUser} = require('../../src/models/Auth')
const pool = require('../../src/config/db')
const { verifyPassword, hashPassword } = require('../../src/helpers/bcrypt')

// Mock de la función verifyPassword
jest.mock('../../src/helpers/bcrypt', () => ({
    verifyPassword: jest.fn(),
    hashPassword: jest.fn(),
}));

// Mock de la configuración de la base de datos
jest.mock('../../src/config/db'); 

describe('AUTH MODEL TESTS', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpiar mocks después de cada test
    });
    test('verificarCredenciales - usuario encontrado', async () => {
        const email = 'nombre.apellido@example.cl';
        const password = 'Bla1234';

        const userMock = {
            id: 1,
            email,
            password: 'hashedPassword', // Contraseña hash simulada
        };

        // Mock de la respuesta de pool.query
        pool.query.mockResolvedValue({ rows: [userMock], rowCount: 1 });

        // Mock de verifyPassword para que retorne true (simula que la contraseña es correcta)
        verifyPassword.mockReturnValue(true);

        const result = await verificarCredenciales(email, password);

        expect(result).toBeInstanceOf(Object);
        expect(pool.query).toHaveBeenCalledTimes(1);
        expect(verifyPassword).toHaveBeenCalledWith(password, userMock.password); // Verificamos que se haya llamado correctamente
    });

    test('verificarCredenciales - usuario no encontrado', async () => {
        const email = 'noexistent.user@example.cl';
        const password = 'anyPassword';

        // Simulando que no se encuentra el usuario
        pool.query.mockResolvedValue({ rows: [], rowCount: 0 });

        // Comprobando que se lanza el error adecuado
        await expect(verificarCredenciales(email, password)).rejects.toThrow('USER_NOT_FOUND');
        expect(pool.query).toHaveBeenCalledTimes(1);
    });

    test('verificarCredenciales - contraseña incorrecta', async () => {
        const email = 'nombre.apellido@example.cl';
        const password = 'WrongPassword';

        const userMock = {
            id: 1,
            email,
            password: 'hashedPassword', // Contraseña hash simulada
        };

        pool.query.mockResolvedValue({ rows: [userMock], rowCount: 1 });

        // Mock de verifyPassword para que retorne false (simula que la contraseña no coincide)
        verifyPassword.mockReturnValue(false);

        // Comprobamos que se lanza el error adecuado
        await expect(verificarCredenciales(email, password)).rejects.toThrow('INVALID_CREDENTIALS');
        expect(pool.query).toHaveBeenCalledTimes(1);
    });

    test('Debe registrar un nuevo usuario exitosamente', async () => {
        // Datos de prueba
        const nombre = 'Juan';
        const apellido = 'Pérez';
        const telefono = '123456789';
        const comuna_id = 1;
        const direccion = 'Calle Falsa 123';
        const email = 'juan.perez@example.com';
        const password = '12345678';
        const rol_id = 2;

        // Datos mock de la respuesta del query
        const newUserMock = {
            id: 1,
            nombre,
            apellido,
            telefono,
            comuna_id,
            direccion,
            email,
            password: 'hashed_password', // El valor debe coincidir con el valor hasheado de la contraseña
            rol_id,
        };

         // Mock de hashPassword para devolver una contraseña 'hasheada' mock
         hashPassword.mockReturnValue('hashed_password');

         // Mock de la respuesta de pool.query
         pool.query.mockResolvedValue({ rows: [newUserMock] });
 
         // Llamada a la función que quieres testear
         const result = await register(nombre, apellido, telefono, comuna_id, direccion, email, password, rol_id);
 
         // Verifica que el resultado sea el esperado
         expect(result).toEqual(newUserMock);
         expect(hashPassword).toHaveBeenCalledWith(password); // Verifica que se haya llamado con la contraseña correcta
         expect(pool.query).toHaveBeenCalledTimes(1);
    });

    test('existsEmail debe devolver true si el email existe', async () => {
        pool.query.mockResolvedValueOnce({ rowCount: 1 });
        
        const result = await existsEmail('test@example.com');
        
        expect(result).toBe(true);
    });

    test('existsEmail debe devolver false si el email no existe', async () => {
        pool.query.mockResolvedValueOnce({ rowCount: 0 });
        
        const result = await existsEmail('notfound@example.com');
        
        expect(result).toBe(false);
    });

    test('existsUser debe devolver true si el usuario existe', async () => {
        pool.query.mockResolvedValueOnce({ rowCount: 1 });
        
        const result = await existsUser(1);
        
        expect(result).toBe(true);
    });

    test('existsUser debe devolver false si el usuario no existe', async () => {
        pool.query.mockResolvedValueOnce({ rowCount: 0 });
        
        const result = await existsUser(999);
        
        expect(result).toBe(false);
    });
});