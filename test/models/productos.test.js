const { readProducts, readProduct, existsProduct } = require('../../src/models/Productos');
const pool = require('../../src/config/db');

jest.mock('../../src/config/db'); // Mock de la conexión a la base de datos

describe('PRODUCTOS MODEL TESTS', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpiar mocks después de cada test
    });

    test('readProducts debe devolver una lista de productos con paginación', async () => {
        pool.query.mockResolvedValueOnce({ rows: [
            { id: 1, nombre_producto: 'Pastel', precio: 1000, stock: 5 }
        ] });
        pool.query.mockResolvedValueOnce({ rows: [{ count: 1 }] });

        const result = await readProducts(5, 'id_ASC', 1);
        
        expect(result.results.length).toBe(1);
        expect(result.results[0]).toHaveProperty('id', 1);
        expect(result.pagination).toEqual({
            current_page: 1,
            total_pages: 1,
            next_page: null,
            prev_page: null,
        });
    });

    test('readProduct debe devolver un producto específico por ID', async () => {
        pool.query.mockResolvedValueOnce({ rows: [
            { id: 1, nombre_producto: 'Pastel', precio: 1000, stock: 5 }
        ] });
        
        const result = await readProduct(1);
        
        expect(result).toHaveProperty('id', 1);
        expect(result).toHaveProperty('nombre_producto', 'Pastel');
    });

    test('readProduct debe lanzar un error si el producto no existe', async () => {
        pool.query.mockResolvedValueOnce({ rows: [] });
        
        await expect(readProduct(999)).rejects.toThrow('Producto no encontrado');
    });

    test('existsProduct debe devolver true si el producto existe', async () => {
        pool.query.mockResolvedValueOnce({ rowCount: 1 });
        
        const result = await existsProduct(1);
        
        expect(result).toBe(true);
    });

    test('existsProduct debe devolver false si el producto no existe', async () => {
        pool.query.mockResolvedValueOnce({ rowCount: 0 });
        
        const result = await existsProduct(999);
        
        expect(result).toBe(false);
    });
});