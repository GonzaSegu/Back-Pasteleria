const { createOrden, readOrdenes, readOrden } = require('../../src/models/Ordenes');
const pool = require('../../src/config/db');
const format = require('pg-format');

jest.mock('../../src/config/db', () => ({
    query: jest.fn()
}));

describe('ORDEN MODEL TESTS', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('createOrden debe agregar una orden y retornar la orden con detalles', async () => {
        const mockProductos = [
            { id: 1, precio: 5000 },
            { id: 2, precio: 7500 }
        ];
        
        const mockOrden = [{ id: 10, user_id: 1, estado_id: 1, monto_total: 62500 }];
        const mockDetalle = [
            { producto_id: 1, orden_id: 10, porcion_id: 2, cantidad: 5, precio: 5000 },
            { producto_id: 2, orden_id: 10, porcion_id: 1, cantidad: 5, precio: 7500 }
        ];
        
        pool.query.mockImplementation((query) => {
            if (query.includes('SELECT id, precio FROM Producto WHERE id IN (1, 2)')) {
                return Promise.resolve({ rows: mockProductos });
            }
            if (query.includes('INSERT INTO Orden')) {
                return Promise.resolve({ rows: mockOrden });
            }
            if (query.includes('INSERT INTO Detalle_Orden')) {
                return Promise.resolve({ rows: mockDetalle });
            }
            return Promise.resolve({ rows: [] });
        });
        
        const detalle_orden = [
            { producto_id: 1, porcion_id: 2, cantidad: 5 },
            { producto_id: 2, porcion_id: 1, cantidad: 5 }
        ];
        
        const result = await createOrden(1, 1, detalle_orden);
        
        expect(result.orden).toEqual(mockOrden);
        expect(result.detalle).toEqual(mockDetalle);
        expect(pool.query).toHaveBeenCalledTimes(3);
    });

    test('readOrdenes debe retornar orden con paginación', async () => {
        const mockOrders = [{ id: 1, user_id: 1, estado_id: 2, monto_total: 50000 }];
        
        pool.query.mockImplementation((query) => {
            if (query.includes('SELECT * FROM Orden')) {
                return Promise.resolve({ rows: mockOrders });
            }
            if (query.includes('SELECT COUNT(*) AS count')) {
                return Promise.resolve({ rows: [{ count: 10 }] });
            }
            return Promise.resolve({ rows: [] });
        });
        
        const result = await readOrdenes(5, "id_ASC", 1);
        
        expect(result.results).toEqual(mockOrders);
        expect(result.pagination.total_pages).toBe(2);
        expect(pool.query).toHaveBeenCalledTimes(2);
    });

    test('debería retornar órdenes paginadas', async () => {
        const mockRows = [
            { id: 1, user_id: 1, total: 100 },
            { id: 2, user_id: 1, total: 200 }
        ];
        const mockCount = [{ count: 2 }];

        pool.query = jest.fn()
            .mockResolvedValueOnce({ rows: mockRows })
            .mockResolvedValueOnce({ rows: mockCount });

        const result = await readOrden(1, 2, "id_DESC", 1);

        expect(result.results).toEqual(mockRows);
        expect(result.total).toBe(2);
        expect(result.pagination).toEqual({
            current_page: 1,
            total_pages: 1,
            next_page: null,
            prev_page: null,
        });
    });

    test('debería manejar errores correctamente', async () => {
        pool.query = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(readOrden(1)).rejects.toThrow('Database error');
    });
});
